import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { ApplicationStatusTimeline } from "@/components/application-status-timeline";
import { ApplicationUpdateForm } from "@/components/forms/application-update-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/lib/demo-user";
import { formatDate } from "@/lib/format";
import { applicationRepository } from "@/repositories/application-repository";

export default async function ApplicationsPage() {
  const user = await getCurrentUser();
  const applications = await applicationRepository.listByUser(user.id);

  return (
    <>
      <PageHeader
        eyebrow="Application tracker"
        title="Pipeline"
        description="Track every analyzed job from saved through applied, interview, rejected, or offer."
        action={
          <Button asChild>
            <Link href="/jobs/analyze">Add from analysis</Link>
          </Button>
        }
      />
      {applications.length === 0 ? (
        <EmptyState
          icon={BriefcaseBusiness}
          title="No applications yet"
          description="Analyze a job to create a saved application with a score, generated cover letter, next step, notes, and status timeline."
          action={{ href: "/jobs/analyze", label: "Analyze a role" }}
        />
      ) : (
        <div className="grid gap-4">
          {applications.map((application) => (
            <Card key={application.id} className="transition hover:ring-primary/10">
              <CardContent className="p-5">
                <div className="grid gap-6 xl:grid-cols-[1fr_400px]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-semibold tracking-tight">
                        {application.jobPost.title}
                      </h2>
                      <StatusBadge status={application.status} />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {application.jobPost.company} ·{" "}
                      {application.jobPost.location ?? "Location flexible"} · Updated{" "}
                      {formatDate(application.updatedAt)}
                    </p>
                    <Separator className="my-4" />
                    <div className="grid gap-4">
                      <ApplicationStatusTimeline status={application.status} />
                      <div className="grid gap-3 rounded-lg border border-border bg-muted/20 p-4 text-sm">
                        <p className="leading-6 text-muted-foreground">
                          Match score:{" "}
                          <span className="font-semibold text-foreground">
                            {application.jobAnalysis?.matchScore ?? "N/A"}
                          </span>
                        </p>
                        <p className="leading-6 text-muted-foreground">
                          Next step:{" "}
                          <span className="text-foreground">
                            {application.nextStep || "No next step recorded"}
                          </span>
                        </p>
                        <p className="leading-6 text-muted-foreground">
                          Notes:{" "}
                          <span className="text-foreground">
                            {application.notes || "No notes yet"}
                          </span>
                        </p>
                      </div>
                    </div>
                    {application.jobAnalysis ? (
                      <Button
                        asChild
                        variant="link"
                        className="mt-1 h-auto p-0 text-primary"
                      >
                        <Link href={`/analysis/${application.jobAnalysis.id}`}>
                          Open analysis result
                        </Link>
                      </Button>
                    ) : null}
                  </div>
                  <ApplicationUpdateForm
                    applicationId={application.id}
                    status={application.status}
                    nextStep={application.nextStep}
                    notes={application.notes}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
