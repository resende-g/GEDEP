# GEDEP — Grupo de Estudos em Direito e Economia Política

Portal institucional, arquivo histórico, calendário, biblioteca e espaço de produção intelectual do GEDEP — UFBA.

## Stack

- Next.js 16 + TypeScript
- Tailwind CSS 4
- Neon PostgreSQL
- Drizzle ORM
- Neon Object Storage para anexos privados

## Rotas

- `/` — página inicial
- `/sobre` — apresentação institucional
- `/o-discurso` — Carta de Princípios
- `/calendario` — calendário mensal e lista de eventos
- `/encontros` — próximos encontros e encontros realizados
- `/registros` e `/registros/[slug]` — arquivo histórico
- `/biblioteca` — indicações bibliográficas
- `/producoes` e `/producoes/[slug]` — publicações aprovadas
- `/escreva` — envio privado de contribuições
- `/contato` — canais institucionais

## Desenvolvimento

Use Node.js 22 ou superior e pnpm.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

O banco é definido em `db/schema.ts`. Gere novas migrações com:

```bash
pnpm db:generate
```

As migrações versionadas ficam em `drizzle/`.

## Variáveis de ambiente

Consulte `.env.example`. Credenciais nunca devem ser enviadas ao GitHub.

- `DATABASE_URL` — conexão PostgreSQL agrupada para a aplicação
- `DATABASE_URL_UNPOOLED` — conexão direta para migrações
- `AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY` — credencial do armazenamento
- `AWS_ENDPOINT_URL_S3`, `AWS_REGION` e `SUBMISSIONS_BUCKET` — configuração do bucket
- `NEXT_PUBLIC_SITE_URL` — origem pública do site

## Conteúdo e publicação

O site não inclui eventos, registros, bibliografias ou produções fictícias. Ausências aparecem como **Conteúdo em construção**. Produções só são públicas quando possuem o status `approved`; submissões sempre entram como `received`.

A Carta de Princípios deve ser inserida integralmente a partir do documento oficial, preservando estrutura e terminologia.

## Segurança do formulário

- validação server-side com Zod;
- texto tratado como conteúdo simples, sem renderização de HTML arbitrário;
- anexos privados com tipos permitidos e limite de 5 MB;
- proteção de origem, campo antispam e limite de três envios por hora;
- mensagens de erro sem exposição de credenciais ou detalhes internos.

## Administração futura

O modelo de dados e os estados editoriais já sustentam uma futura área `/admin` para eventos, registros, bibliografia, produções e revisão de submissões. Autenticação e interface administrativa não fazem parte deste MVP.
