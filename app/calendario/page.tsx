import type { Metadata } from "next";
import { CalendarView } from "@/components/calendar-view";
import { EmptyState } from "@/components/empty-state";
import { EventCard } from "@/components/event-card";
import { PageHeading } from "@/components/page-heading";
import { getAllEvents, getUpcomingEvents } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Calendário",
  description: "Agenda de encontros e atividades do GEDEP.",
};

export default async function CalendarioPage() {
  const [events, upcoming] = await Promise.all([getAllEvents(), getUpcomingEvents(1)]);
  return (
    <main className="page-shell site-container">
      <PageHeading
        eyebrow="Agenda"
        title="Calendário do GEDEP"
        description="Encontros agendados, confirmados, realizados, cancelados ou ainda a definir."
      />
      <section className="calendar-feature">
        <div className="section-heading"><h2>Próximo encontro</h2></div>
        {upcoming[0] ? <EventCard event={upcoming[0]} /> : <EmptyState description="Nenhum encontro futuro foi publicado." />}
      </section>
      <section className="calendar-all">
        <div className="section-heading"><h2>Todos os eventos</h2></div>
        {events.length ? <CalendarView events={events} /> : <EmptyState />}
      </section>
    </main>
  );
}
