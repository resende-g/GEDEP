import type { Event } from "@/db/schema";
import { formatDate, formatTime, STATUS_LABELS } from "@/lib/format";

export function EventCard({ event }: { event: Event }) {
  return (
    <article className="event-card">
      <div className="event-date">
        <strong>{event.date.slice(8, 10)}</strong>
        <span>{new Intl.DateTimeFormat("pt-BR", { month: "short", timeZone: "UTC" }).format(new Date(`${event.date}T12:00:00Z`)).replace(".", "")}</span>
      </div>
      <div className="event-content">
        <div className="event-meta">
          <span className={`status status-${event.status}`}>{STATUS_LABELS[event.status]}</span>
          <time dateTime={event.date}>{formatDate(event.date)}</time>
          <span>{formatTime(event.startTime)}</span>
        </div>
        <h2>{event.title}</h2>
        {event.theme ? <p className="event-theme">{event.theme}</p> : null}
        <p>{event.description}</p>
        <dl className="compact-details">
          {event.work ? <><dt>Obra</dt><dd>{event.work}</dd></> : null}
          {event.location ? <><dt>Local</dt><dd>{event.location}</dd></> : null}
        </dl>
      </div>
    </article>
  );
}
