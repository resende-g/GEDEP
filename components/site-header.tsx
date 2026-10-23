import Link from "next/link";
import { ChevronDown, Menu, Search } from "lucide-react";
import { NavLinks } from "@/components/nav-links";
import { NAV_ITEMS, PRIMARY_NAV_ITEMS, SECONDARY_NAV_ITEMS } from "@/lib/constants";

function SearchForm({ id, className }: { id: string; className?: string }) {
  return (
    <form className={className} action="/busca" method="get" role="search">
      <label htmlFor={id} className="sr-only">Buscar no site</label>
      <input id={id} name="q" type="search" placeholder="Buscar" autoComplete="off" maxLength={120} />
      <button type="submit" aria-label="Buscar">
        <Search aria-hidden="true" />
      </button>
    </form>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container header-row">
        <div className="header-bar glass">
          <Link href="/" className="wordmark" aria-label="GEDEP — página inicial">
            <span className="wordmark-mark" aria-hidden="true">G</span>
            <span>
              <strong>GEDEP</strong>
              <small>Grupo de Estudos Direito &amp; Economia Política</small>
            </span>
          </Link>

          <NavLinks items={PRIMARY_NAV_ITEMS} className="desktop-nav" label="Navegação principal" />

          <details className="more-nav">
            <summary>
              Mais <ChevronDown aria-hidden="true" />
            </summary>
            <NavLinks items={SECONDARY_NAV_ITEMS} className="glass glass-popover" label="Mais seções" />
          </details>
        </div>

        <SearchForm id="busca-cabecalho" className="header-search glass" />

        <details className="mobile-nav">
          <summary className="glass">
            <Menu aria-hidden="true" />
            <span>Menu</span>
          </summary>
          <div className="glass glass-popover mobile-panel">
            <SearchForm id="busca-menu" className="mobile-search" />
            <NavLinks items={NAV_ITEMS} label="Navegação principal para dispositivos móveis" />
          </div>
        </details>
      </div>
    </header>
  );
}
