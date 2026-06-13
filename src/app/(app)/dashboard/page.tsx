import Link from "next/link";
import {
  BriefcaseBusiness,
  FileText,
  Gauge,
  Info,
  Radar,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { EmptyState } from "@/components/empty-state";
import { ScoreRing } from "@/components/score-ring";
import { StatusBadge } from "@/components/status-badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCurrentUser } from "@/lib/demo-user";
import { formatDate } from "@/lib/format";
import { analysisRepository } from "@/repositories/analysis-repository";
import { applicationRepository } from "@/repositories/application-repository";
import { resumeRepository } from "@/repositories/resume-repository";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const [resumeCount, analyses, applications] = await Promise.all([
    resumeRepository.countByUser(user.id),
    analysisRepository.listSummariesByUser(user.id),
    applicationRepository.listByUser(user.id),
  ]);
  const averageScore =
    analyses.length > 0
      ? Math.round(
          analyses.reduce((total, analysis) => total + analysis.matchScore, 0) /
            analyses.length
        )
      : 0;
  const interviews = applications.filter(
    (application) => application.status === "interview"
  ).length;
  const offers = applications.filter((application) => application.status === "offer").length;
  const activeApplications = applications.filter(
    (application) => !["rejected", "offer"].includes(application.status)
  ).length;
  const latest = analyses.slice(0, 5);
  const topMatch = analyses[0];

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title={`Welcome back, ${user.name.split(" ")[0]}`}
        description="Monitor resume readiness, role fit, generated letters, and your application pipeline from one place."
        action={
          <Button asChild>
            <Link href="/jobs/analyze">Run analysis</Link>
          </Button>
        }
      />

      <Alert className="mb-6 border-primary/20 bg-primary/5">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary">Portfolio demo workspace</AlertTitle>
        <AlertDescription>
          This dashboard is seeded with realistic demo data so reviewers can see the
          full workflow. Connect Neon and OpenAI environment variables to run it with
          live data in production.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Average match"
          value={averageScore || "N/A"}
          detail="Across saved analyses"
          icon={Gauge}
        />
        <StatCard
          label="Analyses"
          value={analyses.length}
          detail="Job matches stored"
          icon={Radar}
        />
        <StatCard
          label="Resumes"
          value={resumeCount}
          detail="Profiles ready to compare"
          icon={FileText}
        />
        <StatCard
          label="Interviews"
          value={interviews}
          detail="Active interview-stage roles"
          icon={BriefcaseBusiness}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio demo snapshot</CardTitle>
            <CardDescription>
              Screenshot-ready summary of fit, momentum, and next action.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <p className="text-xs text-muted-foreground">Active pipeline</p>
              <p className="mt-2 text-3xl font-semibold">{activeApplications}</p>
              <p className="mt-1 text-xs text-muted-foreground">roles still in motion</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <p className="text-xs text-muted-foreground">Offer outcomes</p>
              <p className="mt-2 text-3xl font-semibold">{offers}</p>
              <p className="mt-1 text-xs text-muted-foreground">tracked wins</p>
            </div>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-xs text-muted-foreground">Best match</p>
              <p className="mt-2 text-3xl font-semibold">
                {topMatch ? topMatch.matchScore : "N/A"}
              </p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {topMatch ? topMatch.jobPost.company : "Run an analysis"}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Suggested focus</CardTitle>
            <CardDescription>
              The next move that makes the demo feel like a real workflow.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-7 text-muted-foreground">
              {averageScore
                ? "Use the strongest match to tailor outreach, then update the tracker as the application moves forward."
                : "Add one resume and analyze one job to unlock the complete AI career workflow."}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card id="insights">
          <CardHeader>
            <CardTitle>Readiness snapshot</CardTitle>
            <CardDescription>
              Your combined profile health based on saved analyses.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <ScoreRing score={averageScore} />
            <div className="flex-1">
              <p className="text-sm leading-7 text-muted-foreground">
                {averageScore
                  ? "Your saved roles show a healthy baseline. Focus on missing skills that repeat across multiple analyses to raise your average."
                  : "Add a resume and analyze your first job offer to build a readiness baseline."}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild variant="outline" size="sm">
                  <Link href="/resumes">Manage resumes</Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link href="/applications">View tracker</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent analyses</CardTitle>
            <CardDescription>Your latest role comparisons.</CardDescription>
          </CardHeader>
          <CardContent>
            {latest.length === 0 ? (
              <EmptyState
                icon={Radar}
                title="No analyses yet"
                description="Paste a role description to generate a score, identify missing skills, write a tailored cover letter, and create a trackable application."
                action={{ href: "/jobs/analyze", label: "Analyze a job" }}
              />
            ) : (
              <div className="overflow-hidden rounded-xl border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="w-[45%]">Role</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {latest.map((analysis) => (
                      <TableRow key={analysis.id}>
                        <TableCell>
                          <Link
                            href={`/analysis/${analysis.id}`}
                            className="font-medium hover:text-primary hover:underline"
                          >
                            {analysis.jobPost.title}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            {analysis.jobPost.company}
                          </p>
                        </TableCell>
                        <TableCell>
                          <span
                            className="inline-flex h-7 min-w-9 items-center justify-center rounded-md bg-primary/10 px-2 text-sm font-semibold text-primary"
                            aria-label={`Match score ${analysis.matchScore}`}
                          >
                            {analysis.matchScore}
                          </span>
                        </TableCell>
                        <TableCell>
                          {analysis.application ? (
                            <StatusBadge status={analysis.application.status} />
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {formatDate(analysis.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
