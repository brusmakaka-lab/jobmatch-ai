import OpenAI from "openai";
import {
  buildAnalysisSummary,
  careerAiResponseSchema,
  clampMatchScore,
} from "./career-analysis-schema";
import {
  CareerAiAnalysisError,
  CareerAiConfigurationError,
  type CareerAiService,
  type CareerAnalysisInput,
} from "./types";

let openaiClient: OpenAI | null = null;

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new CareerAiConfigurationError(
      "OpenAI mode is enabled, but OPENAI_API_KEY is missing. Add it to your environment or set CAREER_AI_PROVIDER=local."
    );
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey });
  }

  return openaiClient;
}

const responseSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    matchScore: {
      type: "number",
      minimum: 0,
      maximum: 100,
      description: "Compatibility score from 0 to 100.",
    },
    strengths: {
      type: "array",
      minItems: 1,
      maxItems: 6,
      items: { type: "string" },
    },
    weaknesses: {
      type: "array",
      minItems: 1,
      maxItems: 6,
      items: { type: "string" },
    },
    missingSkills: {
      type: "array",
      minItems: 1,
      maxItems: 8,
      items: { type: "string" },
    },
    suggestedImprovements: {
      type: "array",
      minItems: 1,
      maxItems: 6,
      items: { type: "string" },
    },
    nextBestAction: {
      type: "string",
      description: "One concrete next action before applying.",
    },
    coverLetter: {
      type: "string",
      description: "Concise, professional, tailored cover letter signed with the user's name.",
    },
  },
  required: [
    "matchScore",
    "strengths",
    "weaknesses",
    "missingSkills",
    "suggestedImprovements",
    "nextBestAction",
    "coverLetter",
  ],
} as const;

export const openAICareerAiService: CareerAiService = {
  async analyze(input: CareerAnalysisInput) {
    const client = getOpenAIClient();

    try {
      const completion = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        temperature: 0.2,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "career_match_analysis",
            strict: true,
            schema: responseSchema,
          },
        },
        messages: [
          {
            role: "system",
            content:
              "You are a senior technical recruiter and career strategist. Analyze only the resume and job description provided. Prefer concrete, role-specific advice. Do not invent experience, employers, credentials, metrics, or skills that are not present in the resume. Avoid generic phrases.",
          },
          {
            role: "user",
            content: [
              `Candidate name: ${input.userName}`,
              `Company: ${input.company}`,
              `Role title: ${input.title}`,
              "",
              "Resume:",
              input.resume,
              "",
              "Job description:",
              input.jobDescription,
              "",
              "Return strict JSON only. The cover letter must be concise, professional, tailored to the company and role, and signed with the candidate name.",
            ].join("\n"),
          },
        ],
      });

      const content = completion.choices[0]?.message.content;

      if (!content) {
        throw new CareerAiAnalysisError("OpenAI returned an empty analysis.");
      }

      const parsed = careerAiResponseSchema.safeParse(JSON.parse(content));

      if (!parsed.success) {
        throw new CareerAiAnalysisError("OpenAI returned malformed analysis output.");
      }

      const matchScore = clampMatchScore(parsed.data.matchScore);

      return {
        ...parsed.data,
        matchScore,
        summary: buildAnalysisSummary({
          matchScore,
          title: input.title,
          company: input.company,
          strengths: parsed.data.strengths,
          missingSkills: parsed.data.missingSkills,
          nextBestAction: parsed.data.nextBestAction,
        }),
      };
    } catch (error) {
      if (error instanceof CareerAiConfigurationError || error instanceof CareerAiAnalysisError) {
        throw error;
      }

      throw new CareerAiAnalysisError(
        "OpenAI analysis failed. Check provider configuration and try again."
      );
    }
  },
};

