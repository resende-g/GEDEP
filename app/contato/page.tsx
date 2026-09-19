import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { CONTACT_EMAIL, INSTAGRAM_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contato",
  description: "Canais institucionais do GEDEP.",
};

export default function ContatoPage() {
  return (
    <main className="page-shell site-container">
      <PageHeading
        eyebrow="Contato institucional"
        title="Fale com o GEDEP"
        description="Para informações, diálogo acadêmico e envio de contribuições."
      />
      <div className="contact-grid">
        <div>
          <p className="footer-label">E-mail</p>
          <p className="contact-line"><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        </div>
        <div>
          <p className="footer-label">Instagram</p>
          <p className="contact-line"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@gedep.marx</a></p>
        </div>
      </div>
    </main>
  );
}
