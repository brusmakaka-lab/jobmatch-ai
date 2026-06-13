"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/demo-user";
import { formString, profileSchema } from "@/lib/validations";
import { userRepository } from "@/repositories/user-repository";
import { actionError, type ActionResult, flattenErrors } from "@/lib/action-result";

export async function updateProfileAction(
  _prev: unknown,
  formData: FormData
): Promise<ActionResult> {
  try {
    const currentUser = await getCurrentUser();
    const parseResult = profileSchema.safeParse({
      name: formString(formData, "name"),
      email: currentUser.email,
      headline: formString(formData, "headline"),
      location: formString(formData, "location"),
      targetRole: formString(formData, "targetRole"),
      bio: formString(formData, "bio"),
    });

    if (!parseResult.success) {
      return { success: false, errors: flattenErrors(parseResult.error.issues) };
    }

    await userRepository.update(currentUser.id, parseResult.data);
    revalidatePath("/profile");
    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return actionError("Profile could not be saved. Please try again.");
  }
}
