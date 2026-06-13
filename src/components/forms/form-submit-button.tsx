"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FormSubmitButton({
  children,
  variant,
  size,
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      variant={variant}
      size={size}
      className={className}
    >
      {pending ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
}
