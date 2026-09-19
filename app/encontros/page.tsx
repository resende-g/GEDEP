import type { Metadata } from "next";
import { EmptyState } from "@/components/empty-state";
import { EventCard } from "@/components/event-card";
import { PageHeading } from "@/components/page-heading";
import { getCompletedEvents, getUpcomingEvents } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Encontros",
  description: "Encontros de estudo do GEDEP.",
};

export default async function EncontrosPage() {
  const [upcoming, completed] = await Promise.all([getUpcomingEvents(), getCompletedEvents()]);
  return (
    <main className="page-shell site-container">
      <PageHeading
        eyebrow="Estudo coletivo"
        title="Encontros"
        description="Agenda e histórico dos encontros de estudo do GEDEP."
      />
      <section>
        <div className="section-heading"><h2>Próximos encontros</h2></div>
        {upcoming.length ? <div className="event-list">{upcoming.map((event) => <EventCard event={event} key={event.id} />)}</div> : <EmptyState />}
      </section>
      <section className="spaced-section">
        <div className="section-heading"><h2>Encontros realizados</h2></div>
        {completed.length ? <div className="event-list">{completed.map((event) => <EventCard event={event} key={event.id} />)}</div> : <EmptyState />}
      </section>
    </main>
  );
}
