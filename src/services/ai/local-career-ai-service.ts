import {
  buildAnalysisSummary,
  clampMatchScore,
} from "./career-analysis-schema";
import type { CareerAiService, CareerAnalysisInput } from "./types";

const skillSignals = [
  "typescript",
  "react",
  "next.js",
  "postgresql",
  "prisma",
  "tailwind",
  "analytics",
  "research",
  "leadership",
  "design systems",
  "accessibility",
  "ai",
  "product strategy",
  "experimentation",
  "customer discovery",
  "stakeholder",
  "sql",
  "api",
  "saas",
];

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9.+#\s-]/g, " ");
}

function findMatches(resume: string, job: string) {
  const resumeText = normalize(resume);
  const jobText = normalize(job);
  const required = skillSignals.filter((skill) => jobText.includes(skill));
  const matched = required.filter((skill) => resumeText.includes(skill));
  const missing = required.filter((skill) => !resumeText.includes(skill));

  return { required, matched, missing };
}

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export const localCareerAiService: CareerAiService = {
  async analyze(input: CareerAnalysisInput) {
    const { required, matched, missing } = findMatches(input.resume, input.jobDescription);
    const resumeLengthScore = Math.min(18, Math.floor(input.resume.length / 220));
    const coverageScore =
      required.length === 0 ? 45 : Math.round((matched.length / required.length) * 62);
    const roleSignal = normalize(input.resume).includes(normalize(input.title).split(" ")[0])
      ? 10
      : 4;
    const matchScore = clampMatchScore(Math.max(38, Math.min(96, coverageScore + resumeLengthScore + roleSignal)));
    const matchedSkills = matched.length > 0 ? matched.map(sentenceCase) : ["Relevant project execution", "Cross-functional collaboration"];
    const missingSkills = missing.length > 0 ? missing.map(sentenceCase) : ["No major required skills detected as missing"];
    const nextBestAction =
      missing.length > 0
        ? `Add one honest resume bullet or project note that demonstrates ${sentenceCase(missing[0])}, then rerun the analysis.`
        : `Tailor the opening summary to ${input.title} and apply with the generated cover letter.`;

    return {
      matchScore,
      summary: buildAnalysisSummary({
        matchScore,
        title: input.title,
        company: input.company,
        strengths: matchedSkills
          .slice(0, 5)
          .map((skill) => `${skill} appears in both your resume and the job requirements.`),
        missingSkills,
        nextBestAction,
      }),
      strengths: matchedSkills.slice(0, 5).map((skill) => `${skill} appears in both your resume and the job requirements.`),
      weaknesses: [
        "Some experience is described by responsibility rather than measurable outcomes.",
        "The resume could mirror the job language more directly in the summary and recent work.",
        "A stronger opening narrative would make the career fit easier for recruiters to scan.",
      ],
      missingSkills,
      suggestedImprovements: [
        `Add a short profile summary that names the ${input.title} target role and the hiring context.`,
        "Rewrite two recent bullets with metrics, scope, and business impact.",
        `Add a skills block that includes ${missingSkills.slice(0, 3).join(", ")} when accurate.`,
        "Move the most relevant project or achievement into the top third of the resume.",
      ],
      nextBestAction,
      coverLetter: `Dear ${input.company} hiring team,\n\nI am excited to apply for the ${input.title} role. My background combines ${matchedSkills.slice(0, 3).join(", ")} with a practical record of turning ambiguous product needs into clear, shipped outcomes.\n\nWhat stands out about this opportunity is the need for someone who can connect user insight, execution quality, and measurable business impact. In my recent work, I have partnered across functions, clarified priorities, and delivered experiences that made complex workflows easier to adopt.\n\nI would welcome the chance to discuss how my experience can help ${input.company} move faster while maintaining a high bar for product quality.\n\nBest,\n${input.userName}`,
    };
  },
};
