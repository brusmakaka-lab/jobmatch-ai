import { FileText } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { CreateResumeForm } from "@/components/forms/create-resume-form";
import { DeleteResumeForm } from "@/components/forms/delete-resume-form";
import { SetActiveResumeButton } from "@/components/forms/set-active-resume-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/demo-user";
import { formatDate } from "@/lib/format";
import { resumeRepository } from "@/repositories/resume-repository";

export default async function ResumesPage() {
  const user = await getCurrentUser();
  const resumes = await resumeRepository.listByUser(user.id);

  return (
    <>
      <PageHeader
        eyebrow="Resume manager"
        title="Resume library"
        description="Store multiple resume versions and mark the one you want the analyzer to use by default."
      />
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <CardContent className="p-5">
            <CreateResumeForm />
          </CardContent>
        </Card>

        <div className="space-y-4">
          {resumes.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No resumes saved"
              description="Add a resume to unlock role-fit scoring, missing skill detection, tailored improvements, and generated cover letters for every job."
            />
          ) : (
            resumes.map((resume) => (
              <Card
                key={resume.id}
                className="transition hover:ring-primary/10"
              >
                <CardContent className="p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-semibold tracking-tight">
                          {resume.title}
                        </h2>
                        {resume.isActive ? <Badge>Active</Badge> : null}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Updated {formatDate(resume.updatedAt)} ·{" "}
                        {resume.content.length.toLocaleString()} characters
                      </p>
                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {resume.content}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      {!resume.isActive ? (
                        <SetActiveResumeButton resumeId={resume.id} />
                      ) : null}
                      <DeleteResumeForm
                        resumeId={resume.id}
                        title={resume.title}
                        isActive={resume.isActive}
                        canDeleteActive={resumes.length > 1}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
}
