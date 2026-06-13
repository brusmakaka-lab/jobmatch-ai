# JobMatch AI

JobMatch AI is a production-ready SaaS portfolio project for AI-powered job matching, resume analysis, cover letter generation, and application tracking.

## Screenshots

> Replace these placeholders with deployed screenshots before publishing the portfolio case study.

- Landing page: `docs/screenshots/landing.png`
- Dashboard: `docs/screenshots/dashboard.png`
- Analysis result: `docs/screenshots/analysis-result.png`
- Application tracker: `docs/screenshots/applications.png`

## Portfolio Pitch

JobMatch AI helps candidates turn a job description into an actionable application plan. Users save resumes, paste a job offer, receive a compatibility score, review strengths and gaps, generate a tailored cover letter, and track the application from saved to offer.

The project is designed to demonstrate full-stack product thinking: a polished SaaS interface, structured server actions, Prisma/Postgres persistence, AI-service abstraction, and a realistic demo dataset that makes screenshots and walkthroughs feel credible.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS
- shadcn/ui source components
- Prisma ORM with PostgreSQL
- Neon-ready `DATABASE_URL`
- Server Actions, repository layer, Zod validation
- AI service abstraction in `src/services/ai`

## Features

- AI resume-to-job compatibility scoring
- Real OpenAI provider mode with local fallback mode
- Candidate profile
- Resume manager with active resume selection and guarded deletion
- Job offer analyzer
- Match score from 0 to 100
- Strengths, weaknesses, missing skills, and improvements
- Tailored cover letter generation with copy and TXT download actions
- Saved job analyses dashboard
- Application tracker with visual status timeline for `saved`, `applied`, `interview`, `rejected`, and `offer`
- Empty/loading states and responsive dashboard layout
- Friendly workspace error boundary
- Demo auth seam for local portfolio use and production auth replacement

## Architecture Overview

```txt
src/app                 App Router pages, route groups, loading/error states, server actions
src/components          Product UI, cover letter actions, timelines, form components
src/components/ui       shadcn/ui primitives owned by the app
src/lib                 Prisma client, auth seam, validation, formatting, navigation
src/repositories        Data access layer for users, resumes, analyses, applications
src/services/ai         AI provider interface and local deterministic implementation
prisma                  Schema, SQL migration, and realistic portfolio seed data
```

## Architecture Diagram

```txt
User
  -> App Router pages
  -> Server Actions
  -> Zod validation
  -> Services / Repositories
  -> Prisma Client
  -> Neon PostgreSQL

Analyze job flow:
Resume + JobPost
  -> CareerAiService
  -> LocalCareerAIService or OpenAICareerAIService
  -> Zod-validated structured output
  -> JobAnalysis + CoverLetter + Application
```

Key decisions:

- Server Actions handle mutations and return structured action states for inline errors.
- Repositories isolate Prisma calls from route components.
- `src/services/ai` exposes a replaceable career AI interface.
- `src/proxy.ts` protects app routes in production while keeping demo mode simple locally.
- Dashboard queries avoid loading full resume content where summary data is enough.

## Getting Started

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Open `http://localhost:3000`.

## Demo Flow

1. Open the landing page and enter the dashboard.
2. Review the screenshot-friendly dashboard cards and recent analyses.
3. Open the resume manager, add a resume, set it active, or test guarded deletion.
4. Paste a job description in the analyzer and generate a match report.
5. Open the result page, review the score, next best action, premium insight cards, and cover letter.
6. Copy or download the cover letter.
7. Move the application through the tracker timeline.

## Database

Create a Neon PostgreSQL project and paste the pooled or direct connection string into `.env`:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/jobmatch?sslmode=require"
```

For Vercel, add the same `DATABASE_URL` in Project Settings, then deploy. The `postinstall` script runs `prisma generate` during install.

For production deployments, run migrations against Neon:

```bash
npm run prisma:deploy
```

## AI Provider

The app ships with two career AI providers behind the same interface:

```bash
CAREER_AI_PROVIDER="local"   # deterministic demo/dev analyzer
CAREER_AI_PROVIDER="openai"  # real OpenAI-backed analyzer
```

Local demo mode is the default and does not require an API key. It keeps the portfolio runnable in development and seeded demo environments.

OpenAI mode uses `src/services/ai/openai-career-ai-service.ts` and requires:

```bash
CAREER_AI_PROVIDER="openai"
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4o-mini"
```

The OpenAI provider requests strict structured JSON, validates the response with Zod, clamps `matchScore` between 0 and 100, and refuses to save malformed AI output. If `CAREER_AI_PROVIDER=openai` is set without `OPENAI_API_KEY`, the analyze form shows a clear configuration error.

## Auth Seam

JobMatch AI V1.1 includes a clear demo auth seam in `src/proxy.ts`.

- Local development keeps demo mode enabled automatically.
- Production redirects unauthenticated workspace requests back to `/`.
- `DEMO_AUTH_ENABLED="true"` can be used for a production demo deployment.
- The current seam checks for a `jobmatch_session` cookie in production.

To add real authentication, replace the cookie check in `src/proxy.ts` and the demo identity helper in `src/lib/demo-user.ts` with Auth.js, Clerk, or your provider of choice. Keep authorization checks in Server Components, Server Actions, or Route Handlers for production-sensitive data.

## Project Structure

```txt
src/app                 App Router pages and server actions
src/components          Reusable product UI components
src/components/ui       shadcn/ui primitives
src/lib                 Prisma, formatting, validation, navigation
src/repositories        Data access layer
src/services/ai         AI service interface and implementation
prisma                  Schema, migrations, seed data
```

## Future Roadmap

- Replace demo auth with Auth.js or Clerk.
- Add provider-backed AI analysis through OpenAI or the Vercel AI SDK.
- Export cover letters as PDF.
- Add resume file upload and parsing.
- Add role comparison across multiple resumes.
- Add analytics for recurring missing skills and pipeline conversion.

## Deployment Notes

- Deploy on Vercel as a standard Next.js App Router project.
- See `DEPLOYMENT.md` for the launch checklist.
- Create a Neon PostgreSQL database and set `DATABASE_URL` in Vercel environment variables.
- For local demo mode, set `CAREER_AI_PROVIDER=local`.
- For real AI mode, set `CAREER_AI_PROVIDER=openai`, `OPENAI_API_KEY`, and optionally `OPENAI_MODEL`.
- Never expose `OPENAI_API_KEY` to the client; keep it only in server environment variables.
- Run `npm run prisma:deploy` for schema migration.
- Run `npm run prisma:seed` for a portfolio demo environment.
- Keep `DEMO_AUTH_ENABLED="false"` in production unless the deployment is intentionally public-demo only.

Recommended Vercel environment variables:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/jobmatch?sslmode=require"
CAREER_AI_PROVIDER="openai"
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4o-mini"
DEMO_AUTH_ENABLED="false"
```

Neon + Prisma deployment flow:

```bash
npm run prisma:generate
npm run prisma:deploy
npm run prisma:seed
```

## Notes

Authentication is represented by a demo user helper in `src/lib/demo-user.ts` to keep the portfolio runnable without external auth setup. The profile email is read-only while demo auth is active because it is tied to that demo identity.
