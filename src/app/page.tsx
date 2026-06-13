import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Gauge,
  Mail,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Gauge,
    title: "Compatibility scoring",
    description:
      "See how well your resume aligns with any role through a single, explainable match score.",
  },
  {
    icon: Target,
    title: "Gap analysis",
    description:
      "Surface missing skills, weak phrasing, and strengths the hiring manager is actually looking for.",
  },
  {
    icon: Mail,
    title: "Tailored cover letters",
    description:
      "Generate a focused cover letter that connects your experience to the specific job requirements.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Application tracking",
    description:
      "Move roles from saved to applied, interview, rejected, or offer without losing context.",
  },
];

const steps = [
  {
    step: "01",
    title: "Upload your resume",
    description: "Save one or more resume versions and mark your default.",
  },
  {
    step: "02",
    title: "Paste the job offer",
    description: "Drop in the role description, title, company, and location.",
  },
  {
    step: "03",
    title: "Get actionable insight",
    description: "Review the score, gaps, and a cover letter built for that exact role.",
  },
];

const highlights = [
  "Resume-job compatibility scoring",
  "Strengths, gaps, and missing skills",
  "Tailored cover letters",
  "Saved analyses and application tracking",
];

const builtWith = [
  "Next.js",
  "Prisma",
  "Neon",
  "Vercel",
  "OpenAI",
  "Tailwind",
  "shadcn/ui",
];

const architectureHighlights = [
  "AI provider abstraction with local and OpenAI modes",
  "Zod validation for form inputs and AI responses",
  "Server Actions for mutations and inline form states",
  "Repository pattern around Prisma data access",
  "Neon PostgreSQL deployment path",
];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <MarketingNav />

      <section className="relative border-b border-border">
        <div className="pointer-events-none absolute inset-0 glow-hero opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.7_0.16_166/0.08),transparent_50%)]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              AI career intelligence platform
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Land the right role, faster.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              JobMatch AI analyzes every job against your resume, surfaces the exact gaps,
              writes a targeted cover letter, and tracks your pipeline from saved to offer.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/dashboard">
                  Open dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link href="/jobs/analyze">Analyze a job</Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {highlights.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-3xl" />
            <div className="relative rounded-2xl border border-border/80 bg-card/90 p-5 shadow-xl ring-1 ring-foreground/[0.06] backdrop-blur">
              <div className="grid gap-4">
                <div className="rounded-xl border border-border bg-background p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Match score</p>
                      <p className="mt-1 text-5xl font-semibold tracking-tight">87</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Gauge className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: "87%" }}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <PreviewMetric icon={Target} label="Missing skills" value="3" />
                  <PreviewMetric icon={FileText} label="Cover letter" value="Ready" />
                </div>
                <div className="rounded-xl border border-border bg-background p-5">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    Fit summary
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Strong product leadership and research signal. Add clearer AI workflow
                    examples and quantify conversion impact before applying.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30 py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Built with
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {builtWith.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-medium text-primary">Architecture highlights</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Built like a real AI SaaS product
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The demo is designed for portfolio review: clean boundaries,
              production deployment seams, and a provider architecture that can run
              locally or with OpenAI in production.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {architectureHighlights.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-primary">Features</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to apply with confidence
            </h2>
            <p className="mt-4 text-muted-foreground">
              A focused toolkit that replaces scattered notes and guesswork with clear,
              data-informed next steps.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group rounded-xl bg-card p-6 shadow-sm ring-1 ring-foreground/[0.07] transition hover:shadow-md hover:ring-primary/20"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/20 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-primary">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              From job post to application in minutes
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map(({ step, title, description }) => (
              <div
                key={step}
                className="relative rounded-xl bg-card p-6 shadow-sm ring-1 ring-foreground/[0.07]"
              >
                <span className="text-4xl font-bold text-primary/20">{step}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.6_0.16_166/0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Try the portfolio demo
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Open the seeded dashboard, review realistic analyses, then run a fresh job
            match with the local demo analyzer or OpenAI provider.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/dashboard">
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/jobs/analyze">Analyze a job</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-muted/20 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-lg font-semibold tracking-tight">JobMatch AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Copyright {new Date().getFullYear()} JobMatch AI. Built for portfolio demonstration.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function MarketingNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-lg font-semibold tracking-tight">JobMatch AI</span>
        </Link>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild size="sm" className="gap-1.5">
            <Link href="/jobs/analyze">
              Analyze <Zap className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function PreviewMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Target;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-5 transition hover:border-primary/20">
      <Icon className="h-5 w-5 text-primary" />
      <p className="mt-4 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}
