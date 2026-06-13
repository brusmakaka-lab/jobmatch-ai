import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-8 text-center shadow-sm">
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-primary/15 blur-xl" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <Icon className="h-7 w-7" />
        </div>
      </div>
      <h2 className="mt-5 text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {action ? (
        <Button asChild className="mt-6">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      ) : null}
    </div>
  );
}
