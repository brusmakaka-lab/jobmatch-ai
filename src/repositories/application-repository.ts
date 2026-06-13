import { getPrisma } from "@/lib/prisma";
import type { ApplicationStatus } from "@/generated/prisma/enums";

export const applicationRepository = {
  listByUser(userId: string) {
    return getPrisma().application.findMany({
      where: { userId },
      include: {
        jobPost: true,
        jobAnalysis: true,
      },
      orderBy: { updatedAt: "desc" },
    });
  },

  updateStatus(
    id: string,
    userId: string,
    data: { status: ApplicationStatus; notes?: string; nextStep?: string },
  ) {
    return getPrisma().application.update({
      where: { id, userId },
      data,
    });
  },
};

