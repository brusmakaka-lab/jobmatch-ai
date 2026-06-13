"use client";

import * as React from "react";
import { useActionState } from "react";
import { updateProfileAction } from "@/app/actions/profile-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormSubmitButton } from "./form-submit-button";
import { FieldError, FormError } from "./field-error";

export function UpdateProfileForm({
  user,
  isDemoAuthActive,
}: {
  user: {
    name: string;
    email: string;
    headline?: string | null;
    location?: string | null;
    targetRole?: string | null;
    bio?: string | null;
  };
  isDemoAuthActive: boolean;
}) {
  const [state, action] = useActionState(updateProfileAction, undefined);
  const errors = state?.success === false ? state.errors : undefined;

  return (
    <form action={action} className="grid gap-5">
      <FormError errors={errors} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required errors={errors}>
          <Input id="name" name="name" defaultValue={user.name} />
        </Field>
        <Field
          label="Email"
          name="email"
          required
          errors={errors}
          description={
            isDemoAuthActive
              ? "Email is tied to the local demo identity. Swap the auth seam with Auth.js or Clerk to manage real user emails."
              : undefined
          }
        >
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={user.email}
            readOnly={isDemoAuthActive}
            aria-describedby={isDemoAuthActive ? "email-help" : undefined}
          />
        </Field>
      </div>
      <Field label="Headline" name="headline" errors={errors}>
        <Input
          id="headline"
          name="headline"
          defaultValue={user.headline ?? ""}
          placeholder="e.g. Senior product designer moving into AI-powered SaaS"
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Location" name="location" errors={errors}>
          <Input
            id="location"
            name="location"
            defaultValue={user.location ?? ""}
            placeholder="Remote, US"
          />
        </Field>
        <Field label="Target role" name="targetRole" errors={errors}>
          <Input
            id="targetRole"
            name="targetRole"
            defaultValue={user.targetRole ?? ""}
            placeholder="e.g. Product Design Lead"
          />
        </Field>
      </div>
      <Field label="Bio" name="bio" errors={errors}>
        <Textarea
          id="bio"
          name="bio"
          rows={5}
          defaultValue={user.bio ?? ""}
          placeholder="A short summary of your background and what you're looking for next."
        />
      </Field>
      <FormSubmitButton className="w-fit">Save profile</FormSubmitButton>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  errors,
  description,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  errors?: Record<string, string[]>;
  description?: string;
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
      {description ? (
        <p id={`${name}-help`} className="text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      ) : null}
      <FieldError name={name} errors={errors} />
    </div>
  );
}
