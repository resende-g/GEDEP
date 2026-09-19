import type { MetadataRoute } from "next";

const routes = ["", "/sobre", "/o-discurso", "/calendario", "/encontros", "/registros", "/biblioteca", "/producoes", "/escreva", "/contato"];

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gedep-ufba.example";
  return routes.map((route) => ({ url: `${origin}${route}`, changeFrequency: "monthly" }));
}
