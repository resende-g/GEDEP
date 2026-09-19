import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell site-container narrow">
      <p className="eyebrow">Erro 404</p>
      <h1 className="not-found-title">Página não encontrada.</h1>
      <p>O endereço pode ter mudado ou o conteúdo ainda não foi publicado.</p>
      <Link href="/" className="button">Voltar ao início</Link>
    </main>
  );
}
