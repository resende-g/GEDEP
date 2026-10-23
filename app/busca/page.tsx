import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { PageHeading } from "@/components/page-heading";
import { getAllEvents, getApprovedPublications, getBibliography, getRecords } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Busca",
  description: "Busca nas páginas, encontros, registros, indicações bibliográficas e produções do GEDEP.",
  robots: { index: false },
};

type Result = { href: string; title: string; meta: string; summary?: string | null };

const PAGES: (Result & { keywords: string })[] = [
  { href: "/sobre", title: "Sobre", meta: "Página", summary: "Apresentação institucional do GEDEP — UFBA.", keywords: "quem somos grupo de estudos ufba" },
  { href: "/o-discurso", title: "O Discurso", meta: "Página", summary: "Carta de Princípios do GEDEP.", keywords: "carta de principios comunistas gedepeanos manifesto" },
  { href: "/calendario", title: "Calendário", meta: "Página", summary: "Agenda de encontros e atividades do GEDEP.", keywords: "agenda datas" },
  { href: "/encontros", title: "Encontros", meta: "Página", summary: "Agenda e histórico dos encontros de estudo.", keywords: "reunioes estudo coletivo" },
  { href: "/registros", title: "Registros", meta: "Página", summary: "Arquivo dos eventos e encontros anteriores.", keywords: "arquivo historico memoria" },
  { href: "/biblioteca", title: "Indicações Bibliográficas", meta: "Página", summary: "Leituras organizadas por autor, tema e nível.", keywords: "biblioteca livros leituras marx pachukanis" },
  { href: "/producoes", title: "Produções", meta: "Página", summary: "Produção intelectual aprovada pelo GEDEP.", keywords: "artigos ensaios resenhas publicacoes producao" },
  { href: "/escreva", title: "Escreva para o GEDEP", meta: "Página", summary: "Envie uma contribuição para avaliação.", keywords: "enviar contribuicao texto submissao" },
  { href: "/contato", title: "Contato", meta: "Página", summary: "Canais institucionais do GEDEP.", keywords: "email instagram fale conosco" },
];

function normalize(value: string) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function matches(terms: string[], ...fields: (string | null | undefined)[]) {
  const haystack = normalize(fields.filter(Boolean).join(" "));
  return terms.every((term) => haystack.includes(term));
}

export default async function BuscaPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = ((await searchParams).q ?? "").trim().slice(0, 120);
  const terms = normalize(query).split(/\s+/).filter(Boolean);

  let results: Result[] = [];
  if (terms.length) {
    const [events, records, books, publications] = await Promise.all([
      getAllEvents(),
      getRecords(),
      getBibliography(),
      getApprovedPublications(),
    ]);

    results = [
      ...PAGES.filter((page) => matches(terms, page.title, page.summary, page.keywords)),
      ...events
        .filter((event) => matches(terms, event.title, event.description, event.theme, event.work, event.location))
        .map((event) => ({ href: "/calendario", title: event.title, meta: `Encontro · ${formatDate(event.date)}`, summary: event.description })),
      ...records
        .filter((record) => matches(terms, record.title, record.description, record.theme, record.work, record.content))
        .map((record) => ({ href: `/registros/${record.slug}`, title: record.title, meta: `Registro · ${formatDate(record.date)}`, summary: record.description })),
      ...books
        .filter((book) => matches(terms, book.title, book.author, book.category, book.description))
        .map((book) => ({ href: `/biblioteca?categoria=${encodeURIComponent(book.category)}`, title: book.title, meta: `Biblioteca · ${book.author}`, summary: book.description })),
      ...publications
        .filter((publication) => matches(terms, publication.title, publication.summary, publication.type, publication.content))
        .map((publication) => ({ href: `/producoes/${publication.slug}`, title: publication.title, meta: `Produção · ${publication.type}`, summary: publication.summary })),
    ];
  }

  return (
    <main className="page-shell site-container">
      <PageHeading eyebrow="Busca" title="Buscar no GEDEP" description="Páginas, encontros, registros, indicações bibliográficas e produções publicadas." />
      <form className="search-page-form glass" action="/busca" method="get" role="search">
        <label htmlFor="busca-pagina" className="sr-only">Termo de busca</label>
        <input id="busca-pagina" name="q" type="search" defaultValue={query} placeholder="Ex.: Pachukanis, forma jurídica, O Capital" maxLength={120} />
        <button className="button" type="submit"><Search aria-hidden="true" /> Buscar</button>
      </form>

      {terms.length ? (
        <section aria-live="polite">
          <p className="search-count">
            {results.length === 1 ? "1 resultado" : `${results.length} resultados`} para <strong>“{query}”</strong>
          </p>
          {results.length ? (
            <div className="search-results">
              {results.map((result) => (
                <Link className="search-result glass" key={`${result.meta}-${result.href}-${result.title}`} href={result.href}>
                  <span className="card-meta">{result.meta}</span>
                  <h2>{result.title}</h2>
                  {result.summary ? <p>{result.summary}</p> : null}
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState title="Nada encontrado." description="Tente outro termo ou navegue pelas seções do site." />
          )}
        </section>
      ) : null}
    </main>
  );
}
