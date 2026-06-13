import { FileText, Info } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { AnalyzeJobForm } from "@/components/forms/analyze-job-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getCurrentUser } from "@/lib/demo-user";
import { resumeRepository } from "@/repositories/resume-repository";
import { getCareerAiProvider } from "@/services/ai/career-ai-service";

export default async function AnalyzeJobPage() {
  const user = await getCurrentUser();
  const resumes = await resumeRepository.listByUser(user.id);
  const activeResume = resumes.find((resume) => resume.isActive) ?? resumes[0];
  const provider = getCareerAiProvider();
  const showProviderDetails = process.env.NODE_ENV !== "production";

  return (
    <>
      <PageHeader
        eyebrow="Job analysis"
        title="Analyze a job offer"
        description="Paste the role description and compare it against a saved resume. The analysis is saved with an application record."
      />
      {resumes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Add a resume first"
          description="The analyzer needs resume text before it can score compatibility or produce a tailored cover letter."
          action={{ href: "/resumes", label: "Add resume" }}
        />
      ) : (
        <div className="mx-auto max-w-3xl">
          {showProviderDetails ? (
            <Alert className="mb-6 border-primary/20 bg-primary/5">
              <Info className="h-4 w-4 text-primary" />
              <AlertTitle className="text-primary">AI provider: {provider}</AlertTitle>
              <AlertDescription>
                Set{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">
                  CAREER_AI_PROVIDER=openai
                </code>{" "}
                and add{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">
                  OPENAI_API_KEY
                </code>{" "}
                to use the real provider. Local mode remains available for demo/dev.
              </AlertDescription>
            </Alert>
          ) : null}

          <AnalyzeJobForm
            resumes={resumes.map((r) => ({
              id: r.id,
              title: r.title,
              isActive: r.isActive,
            }))}
            activeResumeId={activeResume?.id ?? ""}
          />
        </div>
      )}
    </>
  );
}
