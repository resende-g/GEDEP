"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Event } from "@/db/schema";
import { formatDate, formatTime, STATUS_LABELS } from "@/lib/format";

type CalendarEvent = Pick<
  Event,
  "id" | "title" | "description" | "date" | "startTime" | "location" | "theme" | "work" | "status"
>;

const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function monthKey(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function CalendarView({ events }: { events: CalendarEvent[] }) {
  const initial = events.find((event) => event.status !== "completed" && event.status !== "cancelled")?.date;
  const [cursor, setCursor] = useState(() => {
    const base = initial ? new Date(`${initial}T12:00:00Z`) : new Date();
    return new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), 1));
  });
  const [view, setView] = useState<"month" | "list">("month");

  const monthEvents = useMemo(
    () => events.filter((event) => event.date.startsWith(monthKey(cursor))),
    [cursor, events],
  );

  const daysInMonth = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 0)).getUTCDate();
  const firstWeekday = cursor.getUTCDay();
  const cells = Array.from({ length: firstWeekday + daysInMonth }, (_, index) =>
    index < firstWeekday ? null : index - firstWeekday + 1,
  );

  function moveMonth(amount: number) {
    setCursor((current) => new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth() + amount, 1)));
  }

  return (
    <div>
      <div className="calendar-toolbar">
        <div className="calendar-switch" aria-label="Modo de visualização">
          <Button type="button" variant="outline" aria-pressed={view === "month"} onClick={() => setView("month")}>Mês</Button>
          <Button type="button" variant="outline" aria-pressed={view === "list"} onClick={() => setView("list")}>Lista</Button>
        </div>
        {view === "month" ? (
          <div className="month-nav">
            <Button type="button" variant="outline" onClick={() => moveMonth(-1)} aria-label="Mês anterior">←</Button>
            <strong>{new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric", timeZone: "UTC" }).format(cursor)}</strong>
            <Button type="button" variant="outline" onClick={() => moveMonth(1)} aria-label="Próximo mês">→</Button>
          </div>
        ) : null}
      </div>

      {view === "month" ? (
        <div className="month-calendar">
          {weekdays.map((weekday) => <div className="weekday" key={weekday}>{weekday}</div>)}
          {cells.map((day, index) => {
            const date = day ? `${monthKey(cursor)}-${String(day).padStart(2, "0")}` : "";
            const onDay = day ? monthEvents.filter((event) => event.date === date) : [];
            return (
              <div className={`calendar-cell${day ? "" : " calendar-cell-empty"}`} key={`${date}-${index}`}>
                {day ? <time dateTime={date}>{day}</time> : null}
                {onDay.map((event) => (
                  <article key={event.id} className={`calendar-entry entry-${event.status}`}>
                    <span>{formatTime(event.startTime)}</span>
                    <strong>{event.title}</strong>
                  </article>
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="calendar-list">
          {events.map((event) => (
            <article key={event.id}>
              <time dateTime={event.date}>{formatDate(event.date)}</time>
              <div>
                <span className={`status status-${event.status}`}>{STATUS_LABELS[event.status]}</span>
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p className="calendar-place">{formatTime(event.startTime)}{event.location ? ` · ${event.location}` : ""}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
