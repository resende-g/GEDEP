import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { EventCard } from "@/components/event-card";
import {
  getApprovedPublications,
  getBibliography,
  getRecords,
  getUpcomingEvents,
} from "@/lib/data";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [upcoming, records, books, publications] = await Promise.all([
    getUpcomingEvents(1),
    getRecords(),
    getBibliography(),
    getApprovedPublications(3),
  ]);

  return (
    <main>
      <section className="home-hero">
        <div className="site-container hero-grid">
          <div className="hero-main">
            <p className="eyebrow">Grupo de Estudos em Direito e Economia Política — UFBA</p>
            <h1>GEDEP</h1>
            <p className="hero-subtitle">Marxismo, Direito, Economia Política e práxis.</p>
            <div className="hero-actions">
              <Link href="/o-discurso" className="button">Carta de Princípios</Link>
              <Link href="/calendario" className="button button-secondary">Ver calendário</Link>
            </div>
          </div>
          <aside className="hero-note" aria-label="Eixo e base teórica">
            <span className="hero-number">01</span>
            <p className="footer-label">Eixo</p>
            <p>O Capital de Marx e a forma jurídica</p>
            <p className="footer-label">Base teórica e política</p>
            <p>Materialismo histórico e dialético</p>
          </aside>
        </div>
        <div className="site-container pillars" aria-label="Eixos do GEDEP">
          {['ESTUDO', 'DIREITO', 'ORGANIZAÇÃO', 'PRÁXIS'].map((item, index) => (
            <div key={item}><span>0{index + 1}</span>{item}</div>
          ))}
        </div>
      </section>

      <section className="home-section site-container">
        <div className="section-heading">
          <h2>Próximo encontro</h2>
          <Link href="/calendario">Calendário completo</Link>
        </div>
        {upcoming[0] ? (
          <EventCard event={upcoming[0]} />
        ) : (
          <EmptyState description="Nenhum encontro futuro foi publicado." href="/calendario" action="Acompanhar o calendário" />
        )}
      </section>

      <section className="home-section site-container">
        <div className="section-heading">
          <h2>Últimos registros</h2>
          <Link href="/registros">Ver arquivo</Link>
        </div>
        {records.length ? (
          <div className="archive-grid">
            {records.slice(0, 3).map((record) => (
              <Link className="archive-card" key={record.id} href={`/registros/${record.slug}`}>
                <span className="card-meta">{formatDate(record.date)}</span>
                <h3>{record.title}</h3>
                <p>{record.description}</p>
              </Link>
            ))}
          </div>
        ) : <EmptyState />}
      </section>

      <section className="home-section split-section site-container">
        <div>
          <div className="section-heading">
            <h2>Indicações bibliográficas</h2>
            <Link href="/biblioteca">Biblioteca</Link>
          </div>
          {books.length ? (
            <div className="stack-list">
              {books.slice(0, 3).map((book) => (
                <article key={book.id}>
                  <span className="card-meta">{book.category}</span>
                  <h3>{book.title}</h3>
                  <p>{book.author}{book.year ? `, ${book.year}` : ""}</p>
                </article>
              ))}
            </div>
          ) : <EmptyState />}
        </div>
        <div>
          <div className="section-heading">
            <h2>Produções recentes</h2>
            <Link href="/producoes">Produções</Link>
          </div>
          {publications.length ? (
            <div className="stack-list">
              {publications.map((publication) => (
                <article key={publication.id}>
                  <span className="card-meta">{publication.type}</span>
                  <h3><Link href={`/producoes/${publication.slug}`}>{publication.title}</Link></h3>
                  <p>{publication.summary}</p>
                </article>
              ))}
            </div>
          ) : <EmptyState />}
        </div>
      </section>

      <section className="manifesto-callout">
        <div className="site-container manifesto-grid">
          <p className="eyebrow">Documento central</p>
          <h2>O Discurso</h2>
          <p>A Carta de Princípios reúne a orientação teórica e política do GEDEP.</p>
          <Link href="/o-discurso" className="button">Ler a Carta de Princípios</Link>
        </div>
      </section>
    </main>
  );
}
