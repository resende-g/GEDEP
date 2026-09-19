import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRecordBySlug } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const record = await getRecordBySlug((await params).slug);
  return record ? { title: record.title, description: record.description } : { title: "Registro não encontrado" };
}

export default async function RecordPage({ params }: { params: Promise<{ slug: string }> }) {
  const record = await getRecordBySlug((await params).slug);
  if (!record) notFound();
  return (
    <main className="page-shell site-container">
      <article className="record-layout">
        <header className="page-heading">
          <p className="eyebrow">Registro · {formatDate(record.date)}</p>
          <h1>{record.title}</h1>
          <p className="page-description">{record.description}</p>
        </header>
        <dl className="fact-list record-facts">
          {record.location ? <div><dt>Local</dt><dd>{record.location}</dd></div> : null}
          {record.theme ? <div><dt>Tema</dt><dd>{record.theme}</dd></div> : null}
          {record.work ? <div><dt>Obra discutida</dt><dd>{record.work}</dd></div> : null}
          {record.authors.length ? <div><dt>Autores</dt><dd>{record.authors.join(", ")}</dd></div> : null}
        </dl>
        <div className="prose record-content">{record.content.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </article>
    </main>
  );
}
