import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import type { PoolConfig } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export function getPrisma() {
  if (!globalForPrisma.prisma) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("DATABASE_URL is required to initialize Prisma");
    }

    globalForPrisma.prisma = new PrismaClient({
      adapter: new PrismaPg(getPgConfig(connectionString)),
    });
  }

  return globalForPrisma.prisma;
}

function getPgConfig(connectionString: string): PoolConfig {
  const hostname = new URL(connectionString).hostname;
  const isLocalDatabase = hostname === "localhost" || hostname === "127.0.0.1";

  return {
    connectionString,
    ssl: isLocalDatabase ? undefined : { rejectUnauthorized: true },
  };
}
