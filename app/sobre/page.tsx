import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Apresentação institucional do GEDEP — UFBA.",
};

export default function SobrePage() {
  return (
    <main className="page-shell site-container">
      <PageHeading
        eyebrow="Sobre o grupo"
        title="GEDEP"
        description="Grupo de Estudos em Direito e Economia Política — UFBA."
      />
      <div className="about-grid">
        <div className="prose">
          <p>
            O GEDEP organiza seu estudo no encontro entre marxismo, Direito,
            Economia Política e práxis, a partir do materialismo histórico e
            dialético.
          </p>
          <p>
            Este portal reúne a memória do grupo: princípios, calendário,
            encontros, registros, indicações bibliográficas e produções.
          </p>
          <blockquote className="pull-quote">Sem escolta na volta.</blockquote>
        </div>
        <dl className="fact-list">
          <div><dt>Nome</dt><dd>Grupo de Estudos em Direito e Economia Política</dd></div>
          <div><dt>Contexto</dt><dd>GEDEP — UFBA</dd></div>
          <div><dt>Eixo</dt><dd>O Capital de Marx e a forma jurídica</dd></div>
          <div><dt>Base</dt><dd>Materialismo histórico e dialético</dd></div>
          <div><dt>Instagram</dt><dd><a href="https://www.instagram.com/gedep.marx/" target="_blank" rel="noreferrer">@gedep.marx</a></dd></div>
        </dl>
      </div>
    </main>
  );
}
