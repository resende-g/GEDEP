import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { PageHeading } from "@/components/page-heading";
import { getApprovedPublications } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Produções",
  description: "Produção intelectual aprovada pelo GEDEP.",
};

export default async function ProducoesPage() {
  const publications = await getApprovedPublications();
  return (
    <main className="page-shell site-container">
      <PageHeading
        eyebrow="Produção intelectual"
        title="Produções"
        description="Artigos, ensaios, resenhas, fichamentos, textos coletivos, materiais de estudo e registros de debates."
      />
      {publications.length ? (
        <div className="archive-grid">
          {publications.map((publication) => (
            <Link className="archive-card" key={publication.id} href={`/producoes/${publication.slug}`}>
              <span className="card-meta">{publication.type}{publication.publishedAt ? ` · ${formatDate(publication.publishedAt)}` : ""}</span>
              <h2>{publication.title}</h2>
              <p>{publication.summary}</p>
            </Link>
          ))}
        </div>
      ) : <EmptyState description="Nenhuma produção aprovada foi publicada." href="/escreva" action="Enviar uma contribuição" />}
    </main>
  );
}
