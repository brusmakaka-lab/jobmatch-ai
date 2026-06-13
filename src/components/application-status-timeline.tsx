import { CheckCircle2, Circle, XCircle } from "lucide-react";
import type { ApplicationStatus } from "@/generated/prisma/enums";
import { statusLabel } from "@/lib/format";
import { cn } from "@/lib/utils";

const positiveSteps: ApplicationStatus[] = ["saved", "applied", "interview", "offer"];
const rejectedSteps: ApplicationStatus[] = ["saved", "applied", "interview", "rejected"];

export function ApplicationStatusTimeline({ status }: { status: ApplicationStatus }) {
  const steps = status === "rejected" ? rejectedSteps : positiveSteps;
  const currentIndex = steps.indexOf(status);

  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-4 gap-2">
        {steps.map((step, index) => {
          const complete = index <= currentIndex;
          const rejected = step === "rejected" && status === "rejected";
          const Icon = rejected ? XCircle : complete ? CheckCircle2 : Circle;

          return (
            <div key={step} className="min-w-0">
              <div
                className={cn(
                  "mb-2 h-1.5 rounded-full bg-muted",
                  complete && "bg-primary",
                  rejected && "bg-destructive"
                )}
              />
              <div className="flex items-center gap-1.5">
                <Icon
                  className={cn(
                    "h-3.5 w-3.5 text-muted-foreground",
                    complete && "text-primary",
                    rejected && "text-destructive"
                  )}
                />
                <span
                  className={cn(
                    "truncate text-xs text-muted-foreground",
                    status === step && "font-medium text-foreground"
                  )}
                >
                  {statusLabel(step)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

