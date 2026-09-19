import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicationBySlug } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const publication = await getPublicationBySlug((await params).slug);
  return publication ? { title: publication.title, description: publication.summary } : { title: "Produção não encontrada" };
}

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const publication = await getPublicationBySlug((await params).slug);
  if (!publication) notFound();
  return (
    <main className="page-shell site-container">
      <article className="record-layout">
        <header className="page-heading">
          <p className="eyebrow">{publication.type}{publication.publishedAt ? ` · ${formatDate(publication.publishedAt)}` : ""}</p>
          <h1>{publication.title}</h1>
          <p className="page-description">{publication.summary}</p>
          {publication.authors.length ? <p className="byline">Por {publication.authors.join(", ")}</p> : null}
        </header>
        <div className="prose record-content">{publication.content.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        {publication.url ? <p><a className="button button-secondary" href={publication.url} target="_blank" rel="noreferrer">Acessar publicação externa</a></p> : null}
      </article>
    </main>
  );
}
