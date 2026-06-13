"use client";

import * as React from "react";
import { useActionState } from "react";
import { updateApplicationStatusAction } from "@/app/actions/application-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSubmitButton } from "./form-submit-button";
import { FieldError, FormError } from "./field-error";
import { statusLabel } from "@/lib/format";
import type { ApplicationStatus } from "@/generated/prisma/enums";

const statuses: ApplicationStatus[] = [
  "saved",
  "applied",
  "interview",
  "rejected",
  "offer",
];

export function ApplicationUpdateForm({
  applicationId,
  status,
  nextStep,
  notes,
}: {
  applicationId: string;
  status: ApplicationStatus;
  nextStep: string | null;
  notes: string | null;
}) {
  const [state, action] = useActionState(updateApplicationStatusAction, undefined);
  const errors = state?.success === false ? state.errors : undefined;

  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="applicationId" value={applicationId} />
      <FormError errors={errors} />

      <div className="grid gap-2">
        <Label htmlFor={`status-${applicationId}`}>Status</Label>
        <Select name="status" defaultValue={status}>
          <SelectTrigger id={`status-${applicationId}`}>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {statusLabel(s)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError name="status" errors={errors} />
      </div>

      <Field label="Next step" name="nextStep" errors={errors}>
        <Input
          id={`next-${applicationId}`}
          name="nextStep"
          defaultValue={nextStep ?? ""}
          placeholder="e.g. Follow up by Friday"
        />
      </Field>

      <Field label="Notes" name="notes" errors={errors}>
        <Input
          id={`notes-${applicationId}`}
          name="notes"
          defaultValue={notes ?? ""}
          placeholder="Interviewers, reminders, salary range..."
        />
      </Field>

      <FormSubmitButton variant="secondary">Update</FormSubmitButton>
    </form>
  );
}

function Field({
  label,
  name,
  errors,
  children,
}: {
  label: string;
  name: string;
  errors?: Record<string, string[]>;
  children: React.ReactNode;
}) {
  const hasError = !!errors?.[name];
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      {React.cloneElement(children as React.ReactElement<{ "aria-invalid"?: boolean }>, {
        "aria-invalid": hasError || undefined,
      })}
      <FieldError name={name} errors={errors} />
    </div>
  );
}
