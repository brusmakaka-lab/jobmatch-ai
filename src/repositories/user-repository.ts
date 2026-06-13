import { getPrisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export const userRepository = {
  upsertDemoUser(data: Prisma.UserCreateInput) {
    return getPrisma().user.upsert({
      where: { email: data.email },
      create: data,
      update: {},
    });
  },

  update(id: string, data: Prisma.UserUpdateInput) {
    return getPrisma().user.update({
      where: { id },
      data,
    });
  },
};

