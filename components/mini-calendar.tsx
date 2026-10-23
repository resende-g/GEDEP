import Link from "next/link";
import type { Event } from "@/db/schema";
import { formatTime, STATUS_LABELS } from "@/lib/format";

type MiniCalendarEvent = Pick<Event, "id" | "title" | "date" | "startTime" | "status">;

const weekdays = [
  ["D", "Domingo"],
  ["S", "Segunda-feira"],
  ["T", "Terça-feira"],
  ["Q", "Quarta-feira"],
  ["Q", "Quinta-feira"],
  ["S", "Sexta-feira"],
  ["S", "Sábado"],
] as const;

function isoDay(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function todayInSalvador() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bahia" }).format(new Date());
}

export function MiniCalendar({ events, anchor }: { events: MiniCalendarEvent[]; anchor: string }) {
  const year = Number(anchor.slice(0, 4));
  const month = Number(anchor.slice(5, 7)) - 1;
  const first = new Date(Date.UTC(year, month, 1));
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const leading = first.getUTCDay();
  const totalCells = Math.ceil((leading + daysInMonth) / 7) * 7;
  const today = todayInSalvador();
  const monthLabel = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric", timeZone: "UTC" }).format(first);

  const byDay = new Map<string, MiniCalendarEvent[]>();
  for (const event of events) {
    if (event.status === "cancelled") continue;
    byDay.set(event.date, [...(byDay.get(event.date) ?? []), event]);
  }

  const cells = Array.from({ length: totalCells }, (_, index) => {
    const date = new Date(Date.UTC(year, month, index - leading + 1));
    return { iso: isoDay(date), day: date.getUTCDate(), outside: date.getUTCMonth() !== month };
  });
  const weeks = Array.from({ length: totalCells / 7 }, (_, week) => cells.slice(week * 7, week * 7 + 7));

  return (
    <div className="mini-calendar glass">
      <table>
        <caption>
          <span>Calendário</span>
          <span className="mini-calendar-month">{monthLabel}</span>
        </caption>
        <thead>
          <tr>
            {weekdays.map(([short, full], index) => (
              <th key={index} scope="col"><abbr title={full}>{short}</abbr></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => (
            <tr key={index}>
              {week.map((cell) => {
                const onDay = cell.outside ? [] : byDay.get(cell.iso) ?? [];
                const classes = [
                  cell.outside ? "is-outside" : "",
                  onDay.length ? "has-event" : "",
                  cell.iso === today ? "is-today" : "",
                ].filter(Boolean).join(" ");
                return (
                  <td key={cell.iso} className={classes || undefined}>
                    <time dateTime={cell.iso}>{cell.day}</time>
                    {onDay.map((event) => (
                      <span key={event.id} className="sr-only">
                        {` — ${event.title}, ${formatTime(event.startTime)} (${STATUS_LABELS[event.status]})`}
                      </span>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/calendario" className="mini-calendar-link">Abrir calendário completo →</Link>
    </div>
  );
}
