import { getPrisma } from "@/lib/prisma";
import type { ApplicationStatus } from "@/generated/prisma/enums";

export const analysisRepository = {
  listByUser(userId: string) {
    return getPrisma().jobAnalysis.findMany({
      where: { userId },
      include: {
        jobPost: true,
        resume: true,
        application: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  listSummariesByUser(userId: string) {
    return getPrisma().jobAnalysis.findMany({
      where: { userId },
      select: {
        id: true,
        matchScore: true,
        createdAt: true,
        jobPost: {
          select: {
            title: true,
            company: true,
          },
        },
        application: {
          select: {
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  getByIdForUser(id: string, userId: string) {
    return getPrisma().jobAnalysis.findFirst({
      where: { id, userId },
      include: {
        jobPost: true,
        resume: true,
        coverLetter: true,
        application: true,
      },
    });
  },

  async createAnalysis(input: {
    userId: string;
    resumeId: string;
    company: string;
    title: string;
    location?: string;
    description: string;
    matchScore: number;
    summary: string;
    strengths: string[];
    weaknesses: string[];
    missingSkills: string[];
    suggestedImprovements: string[];
    coverLetter: string;
    status?: ApplicationStatus;
  }) {
    return getPrisma().$transaction(async (tx) => {
      const jobPost = await tx.jobPost.create({
        data: {
          userId: input.userId,
          company: input.company,
          title: input.title,
          location: input.location,
          description: input.description,
        },
      });

      const analysis = await tx.jobAnalysis.create({
        data: {
          userId: input.userId,
          resumeId: input.resumeId,
          jobPostId: jobPost.id,
          matchScore: input.matchScore,
          summary: input.summary,
          strengths: input.strengths,
          weaknesses: input.weaknesses,
          missingSkills: input.missingSkills,
          suggestedImprovements: input.suggestedImprovements,
        },
      });

      await tx.coverLetter.create({
        data: {
          userId: input.userId,
          jobAnalysisId: analysis.id,
          content: input.coverLetter,
        },
      });

      await tx.application.create({
        data: {
          userId: input.userId,
          jobPostId: jobPost.id,
          jobAnalysisId: analysis.id,
          status: input.status ?? "saved",
          nextStep: "Review recommendations and tailor outreach",
        },
      });

      return analysis;
    });
  },
};
