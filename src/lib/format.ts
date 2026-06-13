import type { ApplicationStatus } from "@/generated/prisma/enums";

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function statusLabel(status: ApplicationStatus) {
  const labels: Record<ApplicationStatus, string> = {
    saved: "Saved",
    applied: "Applied",
    interview: "Interview",
    rejected: "Rejected",
    offer: "Offer",
  };

  return labels[status];
}

