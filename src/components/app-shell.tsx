"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Plus, Sparkles } from "lucide-react";
import { mainNav } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function AppShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { name: string; email: string; targetRole?: string | null };
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-border bg-sidebar/80 px-4 py-5 backdrop-blur lg:block">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-sidebar-accent"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">JobMatch AI</span>
        </Link>

        <nav className="mt-8 grid gap-1">
          {mainNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-4 right-4 rounded-xl border border-sidebar-border bg-background p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {user.targetRole ?? user.email}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/85 px-4 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open navigation">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-sidebar">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    JobMatch AI
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 grid gap-1">
                  {mainNav.map((item) => {
                    const active =
                      pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/dashboard" className="font-semibold tracking-tight">
              JobMatch AI
            </Link>
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-foreground">AI career workspace</p>
            <p className="text-xs text-muted-foreground">
              Plan, analyze, and track your next move.
            </p>
          </div>
          <Button asChild className="gap-1.5">
            <Link href="/jobs/analyze">
              <Plus className="h-4 w-4" />
              New analysis
            </Link>
          </Button>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
