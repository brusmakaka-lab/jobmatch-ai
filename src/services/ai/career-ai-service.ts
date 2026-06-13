import { localCareerAiService } from "./local-career-ai-service";
import { openAICareerAiService } from "./openai-career-ai-service";
import { CareerAiConfigurationError, type CareerAiService } from "./types";

export type CareerAiProvider = "local" | "openai";

export function getCareerAiProvider(): CareerAiProvider {
  const provider = process.env.CAREER_AI_PROVIDER;

  if (!provider) {
    return "local";
  }

  if (provider === "local") {
    return "local";
  }

  if (provider === "openai") {
    return "openai";
  }

  throw new CareerAiConfigurationError(
    `Unsupported CAREER_AI_PROVIDER "${provider}". Use "local" or "openai".`
  );
}

export function getCareerAiService(): CareerAiService {
  return getCareerAiProvider() === "openai"
    ? openAICareerAiService
    : localCareerAiService;
}
