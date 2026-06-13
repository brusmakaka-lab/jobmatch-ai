# JobMatch AI Deployment Checklist

## 1. Neon Setup

1. Create a Neon PostgreSQL project.
2. Copy the pooled or direct connection string.
3. Use SSL mode in the URL:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/jobmatch?sslmode=require"
```

## 2. Vercel Environment Variables

Add these in Vercel Project Settings:

```bash
NEXT_PUBLIC_SITE_URL="https://your-domain.vercel.app"
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/jobmatch?sslmode=require"
CAREER_AI_PROVIDER="openai"
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4o-mini"
DEMO_AUTH_ENABLED="false"
DEMO_PUBLIC_ACCESS="false"
```

For a public portfolio demo without OpenAI, use:

```bash
CAREER_AI_PROVIDER="local"
DEMO_PUBLIC_ACCESS="true"
```

## 3. Prisma Deploy

Generate the client and deploy migrations:

```bash
npm run prisma:generate
npm run prisma:deploy
```

## 4. Seed Demo Data

For a portfolio demo environment:

```bash
npm run prisma:seed
```

Do not seed a real production workspace with user data.

## 5. OpenAI Provider Setup

Use OpenAI mode when you want live AI analysis:

```bash
CAREER_AI_PROVIDER="openai"
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4o-mini"
```

The OpenAI API key is only used server-side. Do not prefix it with `NEXT_PUBLIC_`.

## 6. Local Fallback Mode

Local mode keeps the app demoable without API keys:

```bash
CAREER_AI_PROVIDER="local"
```

This uses the deterministic analyzer in `src/services/ai/local-career-ai-service.ts`.

## 7. Troubleshooting

- Dashboard redirects to landing in production: set real auth or enable `DEMO_PUBLIC_ACCESS="true"` for a public portfolio demo.
- Analyze form says OpenAI key is missing: add `OPENAI_API_KEY` or switch to `CAREER_AI_PROVIDER="local"`.
- Prisma cannot connect: verify the Neon connection string, SSL mode, and Vercel environment scope.
- Tables are missing: run `npm run prisma:deploy`.
- Demo dashboard is empty: run `npm run prisma:seed`.
- Metadata URLs are localhost: set `NEXT_PUBLIC_SITE_URL` to the deployed URL.
