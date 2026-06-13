export type CareerAnalysisInput = {
  resume: string;
  jobDescription: string;
  company: string;
  title: string;
  userName: string;
};

export type CareerAnalysisResult = {
  matchScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  suggestedImprovements: string[];
  nextBestAction: string;
  coverLetter: string;
};

export interface CareerAiService {
  analyze(input: CareerAnalysisInput): Promise<CareerAnalysisResult>;
}

export class CareerAiConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CareerAiConfigurationError";
  }
}

export class CareerAiAnalysisError extends Error {
  constructor(message = "AI analysis failed. Please try again.") {
    super(message);
    this.name = "CareerAiAnalysisError";
  }
}
