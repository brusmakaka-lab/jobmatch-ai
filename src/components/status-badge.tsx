import type { ApplicationStatus } from "@/generated/prisma/enums";
import { statusLabel } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

const variants: Record<ApplicationStatus, string> = {
  saved: "border-sky-500/40 bg-sky-500/15 text-sky-700 shadow-sm dark:text-sky-200",
  applied: "border-primary/40 bg-primary/15 text-primary shadow-sm",
  interview: "border-amber-500/40 bg-amber-500/15 text-amber-700 shadow-sm dark:text-amber-200",
  rejected: "border-red-500/40 bg-red-500/15 text-red-700 shadow-sm dark:text-red-200",
  offer: "border-emerald-500/40 bg-emerald-500/15 text-emerald-700 shadow-sm dark:text-emerald-200",
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <Badge variant="outline" className={`px-2.5 py-1 font-semibold ${variants[status]}`}>
      {statusLabel(status)}
    </Badge>
  );
}
