import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { SubmissionForm } from "@/components/submission-form";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Escreva para o GEDEP",
  description: "Envie uma contribuição para avaliação do GEDEP.",
};

export default function EscrevaPage() {
  return (
    <main className="page-shell site-container">
      <PageHeading
        eyebrow="Chamada aberta"
        title="Escreva para o GEDEP"
        description="Envie artigos, ensaios, resenhas, fichamentos, textos de opinião e relatos para avaliação."
      />
      <div className="form-layout">
        <SubmissionForm />
        <aside className="form-sidebar">
          <h2>Antes de enviar</h2>
          <p>O envio não implica publicação. Toda contribuição será recebida para análise e permanecerá privada até eventual aprovação.</p>
          <p>O GEDEP não renderiza HTML enviado pelo formulário e valida anexos antes de armazená-los.</p>
          <p className="footer-label">Destino institucional</p>
          <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        </aside>
      </div>
    </main>
  );
}
