"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/demo-user";
import { analysisSchema, formString } from "@/lib/validations";
import { analysisRepository } from "@/repositories/analysis-repository";
import { resumeRepository } from "@/repositories/resume-repository";
import { getCareerAiService } from "@/services/ai/career-ai-service";
import {
  CareerAiAnalysisError,
  CareerAiConfigurationError,
} from "@/services/ai/types";
import { actionError, type ActionResult, flattenErrors } from "@/lib/action-result";

export async function analyzeJobAction(
  _prev: unknown,
  formData: FormData
): Promise<ActionResult> {
  let analysisId = "";

  try {
    const user = await getCurrentUser();
    const parseResult = analysisSchema.safeParse({
      resumeId: formString(formData, "resumeId"),
      company: formString(formData, "company"),
      title: formString(formData, "title"),
      location: formString(formData, "location"),
      description: formString(formData, "description"),
    });

    if (!parseResult.success) {
      return { success: false, errors: flattenErrors(parseResult.error.issues) };
    }

    const resume = await resumeRepository.getByIdForUser(parseResult.data.resumeId, user.id);

    if (!resume) {
      return { success: false, errors: { resumeId: ["Resume not found"] } };
    }

    const ai = getCareerAiService();
    const result = await ai.analyze({
      resume: resume.content,
      jobDescription: parseResult.data.description,
      company: parseResult.data.company,
      title: parseResult.data.title,
      userName: user.name,
    });

    const analysis = await analysisRepository.createAnalysis({
      userId: user.id,
      resumeId: resume.id,
      company: parseResult.data.company,
      title: parseResult.data.title,
      location: parseResult.data.location,
      description: parseResult.data.description,
      ...result,
    });

    analysisId = analysis.id;
  } catch (error) {
    if (
      error instanceof CareerAiConfigurationError ||
      error instanceof CareerAiAnalysisError
    ) {
      return actionError(error.message);
    }

    return actionError("Analysis could not be completed. Please try again.");
  }

  redirect(`/analysis/${analysisId}`);
}
