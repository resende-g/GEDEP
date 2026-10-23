import type { Metadata } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_DESCRIPTION } from "@/lib/constants";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "GEDEP — Direito e Economia Política",
    template: "%s | GEDEP",
  },
  description: SITE_DESCRIPTION,
  applicationName: "GEDEP",
  keywords: [
    "GEDEP",
    "UFBA",
    "Marxismo",
    "Direito",
    "Economia Política",
    "Materialismo histórico e dialético",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "GEDEP — Grupo de Estudos em Direito e Economia Política",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${spaceMono.variable}`}>
      <body>
        <div className="backdrop" aria-hidden="true">
          <span className="backdrop-blob backdrop-blob-red" />
          <span className="backdrop-blob backdrop-blob-ink" />
          <span className="backdrop-blob backdrop-blob-rose" />
        </div>
        <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
        <SiteHeader />
        <div id="conteudo">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
