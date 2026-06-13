"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/demo-user";
import { formString, resumeSchema } from "@/lib/validations";
import { resumeRepository } from "@/repositories/resume-repository";
import { actionError, type ActionResult, flattenErrors } from "@/lib/action-result";

export async function createResumeAction(
  _prev: unknown,
  formData: FormData
): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    const parseResult = resumeSchema.safeParse({
      title: formString(formData, "title"),
      content: formString(formData, "content"),
      isActive: formData.get("isActive") === "on",
    });

    if (!parseResult.success) {
      return { success: false, errors: flattenErrors(parseResult.error.issues) };
    }

    await resumeRepository.create(user.id, parseResult.data);
    revalidatePath("/resumes");
    revalidatePath("/jobs/analyze");
    return { success: true };
  } catch {
    return actionError("Resume could not be saved. Please try again.");
  }
}

export async function setActiveResumeAction(
  _prev: unknown,
  formData: FormData
): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    const resumeId = formString(formData, "resumeId");

    if (!resumeId) {
      return { success: false, errors: { resumeId: ["Resume is required"] } };
    }

    await resumeRepository.setActive(resumeId, user.id);
    revalidatePath("/resumes");
    revalidatePath("/jobs/analyze");
    return { success: true };
  } catch {
    return actionError("Active resume could not be changed. Please try again.");
  }
}

export async function deleteResumeAction(
  _prev: unknown,
  formData: FormData
): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    const resumeId = formString(formData, "resumeId");

    if (!resumeId) {
      return { success: false, errors: { resumeId: ["Resume is required"] } };
    }

    await resumeRepository.deleteByIdForUser(resumeId, user.id);
    revalidatePath("/resumes");
    revalidatePath("/dashboard");
    revalidatePath("/jobs/analyze");
    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error && error.message === "Cannot delete the only active resume"
        ? "Add another resume and make it active before deleting this one."
        : "Resume could not be deleted. Please try again.";
    return actionError(message);
  }
}
