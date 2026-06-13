"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/demo-user";
import { applicationStatusSchema, formString } from "@/lib/validations";
import { applicationRepository } from "@/repositories/application-repository";
import { actionError, type ActionResult, flattenErrors } from "@/lib/action-result";

export async function updateApplicationStatusAction(
  _prev: unknown,
  formData: FormData
): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    const parseResult = applicationStatusSchema.safeParse({
      applicationId: formString(formData, "applicationId"),
      status: formString(formData, "status"),
      notes: formString(formData, "notes"),
      nextStep: formString(formData, "nextStep"),
    });

    if (!parseResult.success) {
      return { success: false, errors: flattenErrors(parseResult.error.issues) };
    }

    await applicationRepository.updateStatus(parseResult.data.applicationId, user.id, {
      status: parseResult.data.status,
      notes: parseResult.data.notes,
      nextStep: parseResult.data.nextStep,
    });

    revalidatePath("/applications");
    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return actionError("Application could not be updated. Please try again.");
  }
}
