import { prisma } from "@/lib/prisma";

export async function ensureRegistrationTables() {
  await prisma.$executeRawUnsafe(
    'CREATE TABLE IF NOT EXISTS "StudentProfile" ("email" TEXT NOT NULL PRIMARY KEY, "grade" TEXT NOT NULL, "division" TEXT NOT NULL, "graduationYear" TEXT, "city" TEXT, "state" TEXT, "timezone" TEXT NOT NULL, "teamPreference" TEXT, "guardianName" TEXT, "guardianEmail" TEXT, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)'
  );
  await prisma.$executeRawUnsafe(
    'CREATE TABLE IF NOT EXISTS "VolunteerInterest" ("id" TEXT NOT NULL PRIMARY KEY, "name" TEXT NOT NULL, "email" TEXT NOT NULL, "role" TEXT NOT NULL, "city" TEXT NOT NULL, "state" TEXT NOT NULL, "ageBracket" TEXT NOT NULL, "affiliation" TEXT, "availability" TEXT NOT NULL, "notes" TEXT, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)'
  );
}
