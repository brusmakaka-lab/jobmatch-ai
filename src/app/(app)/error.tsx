"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function WorkspaceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void error;

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-destructive/10 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <CardTitle>Workspace could not load</CardTitle>
          <CardDescription>
            We could not load this workspace right now. Please try again in a moment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={reset}>
            <RefreshCcw className="h-4 w-4" />
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
