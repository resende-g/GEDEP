"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinksProps = {
  items: readonly (readonly [string, string])[];
  className?: string;
  label: string;
};

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks({ items, className, label }: NavLinksProps) {
  const pathname = usePathname() ?? "";

  return (
    <nav className={className} aria-label={label}>
      {items.map(([text, href]) => (
        <Link
          key={href}
          href={href}
          aria-current={isActive(pathname, href) ? "page" : undefined}
          // Fecha o menu <details> em que o link estiver após a navegação.
          onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}
        >
          {text}
        </Link>
      ))}
    </nav>
  );
}
