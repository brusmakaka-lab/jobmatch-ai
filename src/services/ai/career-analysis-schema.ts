import { z } from "zod";

export const careerAiResponseSchema = z.object({
  matchScore: z.coerce.number().min(0).max(100),
  strengths: z.array(z.string().min(8)).min(1).max(6),
  weaknesses: z.array(z.string().min(8)).min(1).max(6),
  missingSkills: z.array(z.string().min(2)).min(1).max(8),
  suggestedImprovements: z.array(z.string().min(8)).min(1).max(6),
  nextBestAction: z.string().min(12).max(280),
  coverLetter: z.string().min(180).max(2500),
});

export type CareerAiStructuredOutput = z.infer<typeof careerAiResponseSchema>;

export function clampMatchScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function buildAnalysisSummary(input: {
  matchScore: number;
  title: string;
  company: string;
  strengths: string[];
  missingSkills: string[];
  nextBestAction: string;
}) {
  const fitLabel =
    input.matchScore >= 85
      ? "excellent"
      : input.matchScore >= 70
        ? "strong"
        : input.matchScore >= 55
          ? "promising"
          : "early";
  const topStrength = input.strengths[0] ?? "the strongest resume evidence";
  const gap = input.missingSkills.find(
    (skill) => !skill.toLowerCase().includes("no major")
  );

  return `This is an ${fitLabel} fit for ${input.title} at ${input.company}. ${topStrength} ${
    gap ? `The clearest gap to address is ${gap}.` : "No major required skills were detected as missing."
  } Next best action: ${input.nextBestAction}`;
}

