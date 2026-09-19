import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container header-row">
        <Link href="/" className="wordmark" aria-label="GEDEP — página inicial">
          <span className="wordmark-mark" aria-hidden="true">G</span>
          <span>
            <strong>GEDEP</strong>
            <small>Direito e Economia Política</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {NAV_ITEMS.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>

        <details className="mobile-nav">
          <summary>Menu</summary>
          <nav aria-label="Navegação principal para dispositivos móveis">
            {NAV_ITEMS.map(([label, href]) => (
              <Link key={href} href={href}>{label}</Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
