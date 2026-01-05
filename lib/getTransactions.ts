import { prisma } from "@/lib/prisma";
import { Transaction } from "@prisma/client";

export async function getTransactions(): Promise<Transaction[]> {
  return prisma.transaction.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
