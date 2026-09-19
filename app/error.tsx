"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="page-shell site-container narrow">
      <p className="eyebrow">Indisponibilidade temporária</p>
      <h1 className="not-found-title">Não foi possível carregar esta página.</h1>
      <p>Tente novamente. Se o problema continuar, use os canais institucionais do GEDEP.</p>
      <button type="button" className="button" onClick={reset}>Tentar novamente</button>
    </main>
  );
}
