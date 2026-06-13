"use client";

import { useActionState } from "react";
import { Trash2 } from "lucide-react";
import { deleteResumeAction } from "@/app/actions/resume-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FormError } from "./field-error";

export function DeleteResumeForm({
  resumeId,
  title,
  isActive,
  canDeleteActive,
}: {
  resumeId: string;
  title: string;
  isActive: boolean;
  canDeleteActive: boolean;
}) {
  const [state, action] = useActionState(deleteResumeAction, undefined);
  const errors = state?.success === false ? state.errors : undefined;
  const blocked = isActive && !canDeleteActive;

  return (
    <div className="grid gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button type="button" variant="destructive" size="sm">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {blocked ? "Active resume cannot be deleted" : "Delete resume?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {blocked
                ? "Add another resume and make it active before deleting this one. The analyzer needs at least one active resume for job comparisons."
                : `This will permanently delete "${title}" and remove its analysis history links. This cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {blocked ? null : (
              <form action={action}>
                <input type="hidden" name="resumeId" value={resumeId} />
                <AlertDialogAction type="submit" className="bg-destructive/10 text-destructive hover:bg-destructive/20">
                  Delete resume
                </AlertDialogAction>
              </form>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <FormError errors={errors} />
    </div>
  );
}
