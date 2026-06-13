import { getPrisma } from "@/lib/prisma";

export const resumeRepository = {
  listByUser(userId: string) {
    return getPrisma().resume.findMany({
      where: { userId },
      orderBy: [{ isActive: "desc" }, { updatedAt: "desc" }],
    });
  },

  countByUser(userId: string) {
    return getPrisma().resume.count({
      where: { userId },
    });
  },

  getByIdForUser(id: string, userId: string) {
    return getPrisma().resume.findFirst({
      where: { id, userId },
    });
  },

  async create(userId: string, data: { title: string; content: string; isActive?: boolean }) {
    return getPrisma().$transaction(async (tx) => {
      if (data.isActive) {
        await tx.resume.updateMany({
          where: { userId },
          data: { isActive: false },
        });
      }

      return tx.resume.create({
        data: {
          userId,
          title: data.title,
          content: data.content,
          isActive: Boolean(data.isActive),
        },
      });
    });
  },

  async setActive(id: string, userId: string) {
    return getPrisma().$transaction(async (tx) => {
      await tx.resume.updateMany({
        where: { userId },
        data: { isActive: false },
      });

      return tx.resume.update({
        where: { id, userId },
        data: { isActive: true },
      });
    });
  },

  async deleteByIdForUser(id: string, userId: string) {
    return getPrisma().$transaction(async (tx) => {
      const resume = await tx.resume.findFirst({
        where: { id, userId },
        select: { id: true, isActive: true },
      });

      if (!resume) {
        throw new Error("Resume not found");
      }

      const resumeCount = await tx.resume.count({ where: { userId } });

      if (resume.isActive && resumeCount <= 1) {
        throw new Error("Cannot delete the only active resume");
      }

      if (resume.isActive) {
        const replacement = await tx.resume.findFirst({
          where: { userId, id: { not: id } },
          orderBy: { updatedAt: "desc" },
          select: { id: true },
        });

        if (replacement) {
          await tx.resume.update({
            where: { id: replacement.id, userId },
            data: { isActive: true },
          });
        }
      }

      return tx.resume.delete({
        where: { id, userId },
      });
    });
  },
};
