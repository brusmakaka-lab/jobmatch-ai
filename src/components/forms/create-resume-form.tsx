"use client";

import * as React from "react";
import { useActionState } from "react";
import { createResumeAction } from "@/app/actions/resume-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FormSubmitButton } from "./form-submit-button";
import { FieldError, FormError } from "./field-error";

export function CreateResumeForm() {
  const [state, action] = useActionState(createResumeAction, undefined);
  const errors = state?.success === false ? state.errors : undefined;

  return (
    <form action={action} className="grid gap-5">
      <FormError errors={errors} />
      <Field label="Resume title" name="title" required errors={errors}>
        <Input
          id="title"
          name="title"
          placeholder="e.g. AI product lead resume"
        />
      </Field>
      <Field label="Paste resume" name="content" required errors={errors}>
        <Textarea
          id="content"
          name="content"
          rows={13}
          placeholder="Paste your resume text here. Aim for at least 120 characters so the analyzer can find meaningful matches."
        />
      </Field>
      <div className="flex items-start gap-3">
        <Checkbox id="isActive" name="isActive" defaultChecked={false} />
        <div className="grid gap-1 leading-none">
          <Label htmlFor="isActive">Set as active resume</Label>
          <p className="text-xs text-muted-foreground">
            The analyzer will use this resume by default for new job comparisons.
          </p>
        </div>
      </div>
      <FormSubmitButton>Add resume</FormSubmitButton>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  errors,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  errors?: Record<string, string[]>;
  children: React.ReactNode;
}) {
  const hasError = !!errors?.[name];
  return (
    <div className="grid gap-2">
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      {React.cloneElement(children as React.ReactElement<{ "aria-invalid"?: boolean }>, {
        "aria-invalid": hasError || undefined,
      })}
      <FieldError name={name} errors={errors} />
    </div>
  );
}
