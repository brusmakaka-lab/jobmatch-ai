"use client";

import * as React from "react";
import { useActionState } from "react";
import Link from "next/link";
import { analyzeJobAction } from "@/app/actions/analysis-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSubmitButton } from "./form-submit-button";
import { FieldError, FormError } from "./field-error";

export function AnalyzeJobForm({
  resumes,
  activeResumeId,
}: {
  resumes: { id: string; title: string; isActive: boolean }[];
  activeResumeId: string;
}) {
  const [state, action] = useActionState(analyzeJobAction, undefined);
  const errors = state?.success === false ? state.errors : undefined;

  return (
    <form action={action} className="grid gap-5">
      <FormError errors={errors} />
      <div className="grid gap-2">
        <Label htmlFor="resumeId" required>
          Resume
        </Label>
        <Select name="resumeId" defaultValue={activeResumeId}>
          <SelectTrigger id="resumeId" aria-invalid={!!errors?.resumeId}>
            <SelectValue placeholder="Choose a resume" />
          </SelectTrigger>
          <SelectContent>
            {resumes.map((resume) => (
              <SelectItem key={resume.id} value={resume.id}>
                {resume.title}
                {resume.isActive ? " (active)" : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError name="resumeId" errors={errors} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company" name="company" required errors={errors}>
          <Input id="company" name="company" placeholder="Vercel" />
        </Field>
        <Field label="Role title" name="title" required errors={errors}>
          <Input
            id="title"
            name="title"
            placeholder="Senior Product Manager, AI"
          />
        </Field>
      </div>

      <Field label="Location" name="location" errors={errors}>
        <Input id="location" name="location" placeholder="Remote" />
      </Field>

      <Field label="Job offer" name="description" required errors={errors}>
        <Textarea
          id="description"
          name="description"
          rows={16}
          placeholder="Paste the full job description, responsibilities, and requirements. Aim for at least 160 characters for a useful analysis."
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row">
        <FormSubmitButton>Analyze compatibility</FormSubmitButton>
        <Button asChild variant="outline">
          <Link href="/resumes">Manage resumes</Link>
        </Button>
      </div>
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
