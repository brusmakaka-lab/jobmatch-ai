import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  Lightbulb,
  Mail,
  MoveRight,
  XCircle,
} from "lucide-react";
import { CoverLetterActions } from "@/components/cover-letter-actions";
import { PageHeader } from "@/components/page-header";
import { ScoreRing } from "@/components/score-ring";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/lib/demo-user";
import { analysisRepository } from "@/repositories/analysis-repository";

export default async function AnalysisResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  const analysis = await analysisRepository.getByIdForUser(id, user.id);

  if (!analysis) {
    notFound();
  }

  const coverLetter = analysis.coverLetter?.content ?? "";
  const nextBestAction = getNextBestAction(analysis.matchScore, analysis.missingSkills);
  const fileName = `${analysis.jobPost.company}-${analysis.jobPost.title}-cover-letter`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <>
      <PageHeader
        eyebrow="Analysis result"
        title={`${analysis.jobPost.title} at ${analysis.jobPost.company}`}
        description={analysis.summary}
        action={
          <Button asChild variant="outline">
            <Link href="/dashboard">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <Card>
          <CardContent className="flex flex-col items-center gap-5 p-6 text-center">
            <ScoreRing score={analysis.matchScore} />
            <div>
              <p className="font-semibold">Compatibility score</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {getScoreSummary(analysis.matchScore)}
              </p>
            </div>
            {analysis.application ? (
              <StatusBadge status={analysis.application.status} />
            ) : null}
            <Separator />
            <div className="w-full rounded-lg border border-primary/20 bg-primary/5 p-4 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <MoveRight className="h-4 w-4" />
                Next best action
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {nextBestAction}
              </p>
            </div>
            <div className="w-full text-left text-sm">
              <p className="font-medium text-foreground">Resume used</p>
              <p className="mt-1 text-muted-foreground">{analysis.resume.title}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-5">
          <InsightCard
            title="Strengths"
            icon={CheckCircle2}
            items={analysis.strengths}
            tone="positive"
          />
          <InsightCard
            title="Weaknesses"
            icon={XCircle}
            items={analysis.weaknesses}
            tone="warning"
          />
          <InsightCard
            title="Missing skills"
            icon={Lightbulb}
            items={analysis.missingSkills}
            tone="neutral"
          />
          <InsightCard
            title="Suggested improvements"
            icon={Copy}
            items={analysis.suggestedImprovements}
            tone="positive"
          />
          <Card className="border-primary/25 bg-primary/5 shadow-lg shadow-primary/5">
            <CardHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Tailored cover letter
                </CardTitle>
                <CardDescription className="mt-2">
                  Generated for {analysis.jobPost.title} at {analysis.jobPost.company}.
                </CardDescription>
              </div>
              {coverLetter ? (
                <CoverLetterActions content={coverLetter} fileName={fileName} />
              ) : null}
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-primary/20 bg-background p-6 text-sm leading-7 text-muted-foreground shadow-sm">
                {coverLetter.split("\n").map((paragraph, index) =>
                  paragraph.trim() ? (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ) : null
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

function InsightCard({
  title,
  icon: Icon,
  items,
  tone,
}: {
  title: string;
  icon: typeof CheckCircle2;
  items: string[];
  tone: "positive" | "warning" | "neutral";
}) {
  const toneClasses = {
    positive: "border-primary/20 bg-primary/5",
    warning: "border-amber-500/20 bg-amber-500/5",
    neutral: "border-border bg-card",
  };

  return (
    <Card className={toneClasses[tone]}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No items listed.</p>
        ) : (
          <ul className="grid gap-3">
            {items.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="rounded-xl border border-border bg-background/80 p-4 text-sm leading-6 text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function getScoreSummary(score: number) {
  if (score >= 85) {
    return "Excellent fit. Your resume already maps strongly to the role; apply with targeted positioning and a tailored letter.";
  }
  if (score >= 70) {
    return "Strong fit with clear upside. Address the highest-impact gaps before applying to improve recruiter scan quality.";
  }
  if (score >= 55) {
    return "Promising but uneven fit. Rework the top third of your resume around role keywords before outreach.";
  }
  return "Early fit signal. Use the missing skills and improvement plan to decide whether this role is worth pursuing.";
}

function getNextBestAction(score: number, missingSkills: string[]) {
  const firstMissing = missingSkills.find(
    (skill) => !skill.toLowerCase().includes("no major")
  );

  if (score >= 85) {
    return "Copy the generated cover letter, personalize the opening sentence, and apply while the role is fresh.";
  }

  if (firstMissing) {
    return `Add one honest resume bullet that demonstrates ${firstMissing}, then rerun the analysis before applying.`;
  }

  return "Tighten the resume summary to mirror the job title and move the most relevant project into the first screen.";
}
