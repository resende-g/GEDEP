import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { PageHeading } from "@/components/page-heading";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { getRecords } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Registros",
  description: "Arquivo dos eventos e encontros anteriores do GEDEP.",
};

export default async function RegistrosPage({ searchParams }: { searchParams: Promise<{ ano?: string; tema?: string }> }) {
  const records = await getRecords();
  const params = await searchParams;
  const years = [...new Set(records.map((record) => record.date.slice(0, 4)))];
  const themes = [...new Set(records.map((record) => record.theme).filter(Boolean))] as string[];
  const filtered = records.filter((record) =>
    (!params.ano || record.date.startsWith(params.ano)) &&
    (!params.tema || record.theme === params.tema),
  );

  return (
    <main className="page-shell site-container">
      <PageHeading
        eyebrow="Arquivo histórico"
        title="Registros"
        description="Registros dos eventos e encontros anteriores."
      />
      {records.length ? (
        <>
          <form className="filter-form" method="get">
            <label>Ano<NativeSelect name="ano" defaultValue={params.ano ?? ""}><NativeSelectOption value="">Todos</NativeSelectOption>{years.map((year) => <NativeSelectOption key={year}>{year}</NativeSelectOption>)}</NativeSelect></label>
            <label>Tema<NativeSelect name="tema" defaultValue={params.tema ?? ""}><NativeSelectOption value="">Todos</NativeSelectOption>{themes.map((theme) => <NativeSelectOption key={theme}>{theme}</NativeSelectOption>)}</NativeSelect></label>
            <button className="button" type="submit">Filtrar</button>
            <Link href="/registros" className="button button-secondary">Limpar</Link>
          </form>
          {filtered.length ? (
            <div className="archive-grid">
              {filtered.map((record) => (
                <Link className="archive-card" key={record.id} href={`/registros/${record.slug}`}>
                  <span className="card-meta">{formatDate(record.date)}{record.theme ? ` · ${record.theme}` : ""}</span>
                  <h2>{record.title}</h2>
                  <p>{record.description}</p>
                </Link>
              ))}
            </div>
          ) : <EmptyState title="Nenhum registro corresponde aos filtros." />}
        </>
      ) : <EmptyState />}
    </main>
  );
}
