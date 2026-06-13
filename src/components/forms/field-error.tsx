export function FieldError({
  errors,
  name,
}: {
  errors?: Record<string, string[]>;
  name: string;
}) {
  const messages = errors?.[name];
  if (!messages?.length) return null;
  return (
    <p className="text-xs font-medium text-destructive" role="alert">
      {messages.join(". ")}
    </p>
  );
}

export function FormError({ errors }: { errors?: Record<string, string[]> }) {
  const messages = errors?.["_form"];
  if (!messages?.length) return null;
  return (
    <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
      {messages.join(". ")}
    </div>
  );
}
