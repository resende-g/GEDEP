import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { GlassStar, HalftoneSphere, InstagramGlyph, SpeedLines, Star, WireGrid } from "@/components/decor";
import { EmptyState } from "@/components/empty-state";
import { EventCard } from "@/components/event-card";
import { MiniCalendar, todayInSalvador } from "@/components/mini-calendar";
import {
  CONTACT_EMAIL,
  FACULTY_ADDRESS,
  FACULTY_MAP_QUERY,
  FACULTY_NAME,
  INSTAGRAM_URL,
} from "@/lib/constants";
import {
  getAllEvents,
  getApprovedPublications,
  getBibliography,
  getRecords,
  getUpcomingEvents,
} from "@/lib/data";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

const mapQuery = encodeURIComponent(FACULTY_MAP_QUERY);

export default async function Home() {
  const [upcoming, events, records, books, publications] = await Promise.all([
    getUpcomingEvents(1),
    getAllEvents(),
    getRecords(),
    getBibliography(),
    getApprovedPublications(3),
  ]);
  const calendarAnchor = upcoming[0]?.date ?? todayInSalvador();

  return (
    <main className="home">
      <h1 className="sr-only">GEDEP — Grupo de Estudos em Direito e Economia Política (UFBA)</h1>

      <section className="site-container hero" aria-label="Apresentação">
        <div className="hero-who">
          <h2 className="display display-sm">Quem somos?</h2>
          <p className="who-text">
            O Grupo de Estudos Direito &amp; Economia Política (<strong>GEDEP</strong>) é composto por
            estudantes, trabalhadoras e trabalhadores.
          </p>
          <div className="hero-art" aria-hidden="true">
            <WireGrid className="art-grid" />
            <GlassStar className="art-star" />
            <div className="art-glass glass" />
          </div>
          <p className="specter">Um espectro ronda a UFBA</p>
        </div>

        <div className="hero-how">
          <div className="title-with-lines">
            <SpeedLines className="speed-lines" />
            <h2 className="display">Como atuamos?</h2>
          </div>
          <div className="glass how-panel">
            <p>
              Realizamos encontros na Faculdade de Direito da UFBA, para investigar a obra O’ Capital de
              Karl Marx e a crítica marxista do direito de E. B. Pachukanis. Em nossas reuniões, promovemos
              a análise conjunta da obra de Marx com a crítica da forma jurídica de Pachukanis. A finalidade
              última do método de O’ Capital é “descobrir a lei econômica do movimento da sociedade
              moderna” (MARX, 2025, p. 65). Nessa perspectiva, para Pachukanis, a própria forma jurídica
              está intrinsecamente ligada à forma mercadoria. Como afirmou o jurista marxista: “Somente a
              sociedade burguesa-capitalista cria todas as condições necessárias para que o elemento
              jurídico nas relações sociais alcance plena determinação” (PACHUKANIS, 2017, p. 80). Nesse
              sentido, a nossa investigação científica considera as complexidades das relações sociais de
              valor, a forma social do valor, raça, gênero, etc. a subjetividade jurídica, a ideologia
              jurídico-burguesa, a forma política, a forma estatal, e as perspectivas da transformação
              radical da sociedade que constituem as condições históricas para a superação do capital.
            </p>
          </div>
          <div className="glass contact-pill">
            <div className="contact-links">
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                <InstagramGlyph className="contact-icon" />
                <span>@gedep.marx</span>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`}>
                <Mail className="contact-icon" aria-hidden="true" />
                <span>{CONTACT_EMAIL}</span>
              </a>
            </div>
            <HalftoneSphere className="contact-sphere" />
          </div>
        </div>

        <aside className="hero-capital" aria-label="Eixo de estudos">
          <p className="capital-lockup">
            <span className="capital-pre">Ler O</span>
            <span className="capital-word">Capital</span>
            <span className="capital-post">de Marx</span>
          </p>
          <p className="capital-sub">à luz da forma jurídica de Pachukanis</p>
        </aside>
      </section>

      <section className="site-container meet-grid" aria-label="Onde e quando nos encontramos">
        <div className="faculty">
          <div className="title-with-lines title-end">
            <SpeedLines className="speed-lines" flip />
            <h2 className="display display-md">{FACULTY_NAME}</h2>
            <span className="glass glass-icon" aria-hidden="true"><MapPin /></span>
          </div>
          <div className="glass map-frame">
            <iframe
              title={`Mapa: ${FACULTY_NAME}`}
              src={`https://www.google.com/maps?q=${mapQuery}&hl=pt-BR&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="map-caption">
            <span>{FACULTY_ADDRESS}</span>
            <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer">
              Abrir no mapa <ArrowUpRight aria-hidden="true" />
            </a>
          </p>
        </div>

        <div className="upcoming">
          <h2 className="display display-md">Próximos encontros</h2>
          <div className="star-legend">
            <span className="star-row" aria-hidden="true">
              {Array.from({ length: 6 }, (_, index) => <Star key={index} className="star" />)}
              <Star className="star" tone="red" />
            </span>
            <span className="legend-label"><span className="legend-swatch" aria-hidden="true" /> = encontro</span>
          </div>
          <MiniCalendar events={events} anchor={calendarAnchor} />
          <div className="upcoming-next">
            {upcoming[0] ? (
              <EventCard event={upcoming[0]} />
            ) : (
              <EmptyState description="Nenhum encontro futuro foi publicado." href="/calendario" action="Acompanhar o calendário" />
            )}
          </div>
        </div>
      </section>

      <section className="home-section site-container">
        <div className="section-heading">
          <h2>Últimos registros</h2>
          <Link href="/registros">Ver arquivo</Link>
        </div>
        {records.length ? (
          <div className="archive-grid">
            {records.slice(0, 3).map((record) => (
              <Link className="archive-card glass" key={record.id} href={`/registros/${record.slug}`}>
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
            <div className="stack-list glass">
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
            <div className="stack-list glass">
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

      <section className="site-container manifesto-callout">
        <div className="manifesto-grid glass glass-red">
          <p className="eyebrow">Documento central</p>
          <h2>O Discurso</h2>
          <p>A Carta de Princípios reúne a orientação teórica e política do GEDEP.</p>
          <Link href="/o-discurso" className="button button-light">Ler a Carta de Princípios</Link>
        </div>
      </section>
    </main>
  );
}
