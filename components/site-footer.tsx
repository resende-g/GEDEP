import { Fragment } from "react";
import Link from "next/link";
import { EyeDiamond, InstagramGlyph } from "@/components/decor";
import { AUFHEBEN_TERMS, CONTACT_EMAIL, INSTAGRAM_URL, NAV_ITEMS } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <p className="aufheben-strip">
          {AUFHEBEN_TERMS.map((term, index) => (
            <Fragment key={term}>
              {index > 0 ? <EyeDiamond className="aufheben-sep" /> : null}
              <span>{term}</span>
            </Fragment>
          ))}
        </p>

        <div className="footer-grid glass">
          <div>
            <p className="eyebrow">GEDEP — UFBA</p>
            <p className="footer-statement">Sem escolta na volta.</p>
          </div>
          <div>
            <p className="footer-label">Navegação</p>
            <nav className="footer-nav" aria-label="Navegação do rodapé">
              {NAV_ITEMS.map(([label, href]) => (
                <Link key={href} href={href}>{label}</Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="footer-label">Contato</p>
            <a className="footer-contact" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a className="footer-contact" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <InstagramGlyph className="footer-icon" />@gedep.marx
            </a>
            <p className="footer-label footer-axis">Eixo de estudos</p>
            <p>O Capital de Marx e a forma jurídica</p>
          </div>
          <div className="footer-bottom">
            <span>Grupo de Estudos em Direito e Economia Política</span>
            <Link href="/o-discurso">Carta de Princípios</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
