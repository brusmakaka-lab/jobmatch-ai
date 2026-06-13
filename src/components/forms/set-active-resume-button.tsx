"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { setActiveResumeAction } from "@/app/actions/resume-actions";
import { FormError } from "./field-error";
import { FormSubmitButton } from "./form-submit-button";

export function SetActiveResumeButton({ resumeId }: { resumeId: string }) {
  const [state, action] = useActionState(setActiveResumeAction, undefined);
  const errors = state?.success === false ? state.errors : undefined;

  return (
    <form action={action} className="grid gap-2">
      <input type="hidden" name="resumeId" value={resumeId} />
      <FormError errors={errors} />
      <FormSubmitButton variant="outline" size="sm">
        <CheckCircle2 className="mr-1.5 h-4 w-4" />
        Set active
      </FormSubmitButton>
    </form>
  );
}
