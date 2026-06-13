import type { ZodIssue } from "zod";

export type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; errors: Record<string, string[]> };

export function actionError(message = "Something went wrong. Please try again."): ActionResult {
  return { success: false, errors: { _form: [message] } };
}

export function flattenErrors(issues: ZodIssue[]) {
  const errors: Record<string, string[]> = {};
  for (const issue of issues) {
    const key = issue.path.filter((p): p is string => typeof p === "string").join(".") || "_form";
    if (!errors[key]) errors[key] = [];
    errors[key].push(issue.message);
  }
  return errors;
}
