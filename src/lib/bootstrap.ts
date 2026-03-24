import { prisma } from "@/lib/prisma";

export async function ensureSeed() {
  const count = await prisma.problem.count();

  if (count > 0) {
    return;
  }

  const now = new Date();

  await prisma.problem.createMany({
    data: [
      {
        title: "Opening Sprint",
        statement:
          "Find the value of 1 + 2 + 3 + ... + 50. Enter a single integer.",
        answer: "1275",
        points: 5,
        releaseAt: new Date(now.getTime() - 1000 * 60 * 10),
      },
      {
        title: "Prime Check",
        statement:
          "How many prime numbers are there between 1 and 20 inclusive? Enter a single integer.",
        answer: "8",
        points: 5,
        releaseAt: new Date(now.getTime() + 1000 * 60 * 60 * 24),
      },
    ],
  });
}
