import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { PageHeading } from "@/components/page-heading";
import { BIBLIOGRAPHY_CATEGORIES } from "@/lib/constants";
import { getBibliography } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Indicações Bibliográficas",
  description: "Biblioteca de indicações de leitura do GEDEP.",
};

export default async function BibliotecaPage({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const items = await getBibliography();
  const params = await searchParams;
  const filtered = params.categoria ? items.filter((item) => item.category === params.categoria) : items;
  return (
    <main className="page-shell site-container">
      <PageHeading
        eyebrow="Biblioteca"
        title="Indicações Bibliográficas"
        description="Leituras organizadas por autor, tema e nível. Somente indicações oficiais do GEDEP aparecem aqui."
      />
      <nav className="category-nav" aria-label="Categorias bibliográficas">
        <Link className={!params.categoria ? "active" : ""} href="/biblioteca">Todas</Link>
        {BIBLIOGRAPHY_CATEGORIES.map((category) => (
          <Link className={params.categoria === category ? "active" : ""} key={category} href={`/biblioteca?categoria=${encodeURIComponent(category)}`}>{category}</Link>
        ))}
      </nav>
      {filtered.length ? (
        <div className="bibliography-list">
          {filtered.map((item) => (
            <article key={item.id}>
              <div className="book-index">{String(item.id).padStart(3, "0")}</div>
              <div>
                <span className="card-meta">{item.category} · {item.readingLevel}</span>
                <h2>{item.title}</h2>
                <p className="book-author">{item.author}{item.year ? `, ${item.year}` : ""}</p>
                <p>{item.description}</p>
                <p><strong>Por que ler:</strong> {item.whyRead}</p>
                {item.url ? <a className="text-link" href={item.url} target="_blank" rel="noreferrer">Acessar referência →</a> : null}
              </div>
            </article>
          ))}
        </div>
      ) : <EmptyState />}
    </main>
  );
}
