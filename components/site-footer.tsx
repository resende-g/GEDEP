import Link from "next/link";
import { CONTACT_EMAIL, INSTAGRAM_URL } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <p className="eyebrow">GEDEP — UFBA</p>
          <p className="footer-statement">Sem escolta na volta.</p>
        </div>
        <div>
          <p className="footer-label">Eixo de estudos</p>
          <p>O Capital de Marx e a forma jurídica</p>
        </div>
        <div>
          <p className="footer-label">Contato</p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@gedep.marx</a>
        </div>
        <div className="footer-bottom">
          <span>Grupo de Estudos em Direito e Economia Política</span>
          <Link href="/o-discurso">Carta de Princípios</Link>
        </div>
      </div>
    </footer>
  );
}
