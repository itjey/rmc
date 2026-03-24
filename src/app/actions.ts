"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminCookie, isAdmin, setAdminCookie } from "@/lib/auth";
import { ensureSeed } from "@/lib/bootstrap";
import { prisma } from "@/lib/prisma";
import { ensureRegistrationTables } from "@/lib/registration";

function text(value: FormDataEntryValue | null) {
  return String(value || "").trim();
}

export async function registerContestant(formData: FormData) {
  await ensureSeed();
  await ensureRegistrationTables();

  const name = text(formData.get("name"));
  const email = text(formData.get("email")).toLowerCase();
  const school = text(formData.get("school"));
  const country = text(formData.get("country"));
  const grade = text(formData.get("grade"));
  const division = text(formData.get("division"));
  const graduationYear = text(formData.get("graduationYear"));
  const city = text(formData.get("city"));
  const state = text(formData.get("state"));
  const timezone = text(formData.get("timezone"));
  const teamPreference = text(formData.get("teamPreference"));
  const guardianName = text(formData.get("guardianName"));
  const guardianEmail = text(formData.get("guardianEmail")).toLowerCase();

  if (!name || !email || !school || !country || !grade || !division || !timezone) {
    redirect("/registration?message=Please%20complete%20the%20required%20student%20fields#student-form");
  }

  await prisma.contestant.upsert({
    where: { email },
    update: { name, school, country },
    create: { name, email, school, country },
  });

  await prisma.$executeRawUnsafe(
    'INSERT INTO "StudentProfile" ("email", "grade", "division", "graduationYear", "city", "state", "timezone", "teamPreference", "guardianName", "guardianEmail") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT("email") DO UPDATE SET "grade" = excluded."grade", "division" = excluded."division", "graduationYear" = excluded."graduationYear", "city" = excluded."city", "state" = excluded."state", "timezone" = excluded."timezone", "teamPreference" = excluded."teamPreference", "guardianName" = excluded."guardianName", "guardianEmail" = excluded."guardianEmail", "updatedAt" = CURRENT_TIMESTAMP',
    email,
    grade,
    division,
    graduationYear || null,
    city || null,
    state || null,
    timezone,
    teamPreference || null,
    guardianName || null,
    guardianEmail || null
  );

  revalidatePath("/");
  revalidatePath("/registration");
  redirect("/registration?message=Student%20registration%20saved#student-form");
}

export async function registerVolunteer(formData: FormData) {
  await ensureRegistrationTables();

  const name = text(formData.get("name"));
  const email = text(formData.get("email")).toLowerCase();
  const role = text(formData.get("role"));
  const city = text(formData.get("city"));
  const state = text(formData.get("state"));
  const ageBracket = text(formData.get("ageBracket"));
  const affiliation = text(formData.get("affiliation"));
  const availability = text(formData.get("availability"));
  const notes = text(formData.get("notes"));

  if (!name || !email || !role || !city || !state || !ageBracket || !availability) {
    redirect("/registration?message=Please%20complete%20the%20required%20volunteer%20fields#volunteer-form");
  }

  await prisma.$executeRawUnsafe(
    'INSERT INTO "VolunteerInterest" ("id", "name", "email", "role", "city", "state", "ageBracket", "affiliation", "availability", "notes") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    randomUUID(),
    name,
    email,
    role,
    city,
    state,
    ageBracket,
    affiliation || null,
    availability,
    notes || null
  );

  revalidatePath("/registration");
  redirect("/registration?message=Volunteer%20interest%20saved#volunteer-form");
}

export async function submitAnswer(formData: FormData) {
  const email = text(formData.get("email")).toLowerCase();
  const answer = text(formData.get("answer"));
  const problemId = text(formData.get("problemId"));

  if (!email || !answer || !problemId) {
    redirect("/contest?message=Missing%20submission%20data");
  }

  const contestant = await prisma.contestant.findUnique({ where: { email } });

  if (!contestant) {
    redirect("/contest?message=Register%20before%20submitting");
  }

  const problem = await prisma.problem.findUnique({ where: { id: problemId } });

  if (!problem || problem.releaseAt > new Date()) {
    redirect("/contest?message=That%20problem%20is%20not%20live");
  }

  const normalizedAnswer = answer.replace(/\s+/g, " ").trim().toLowerCase();
  const normalizedKey = problem.answer.replace(/\s+/g, " ").trim().toLowerCase();
  const isCorrect = normalizedAnswer === normalizedKey;

  await prisma.submission.upsert({
    where: {
      problemId_contestantEmail: {
        problemId,
        contestantEmail: email,
      },
    },
    update: {
      answer,
      isCorrect,
      score: isCorrect ? problem.points : 0,
    },
    create: {
      answer,
      contestantEmail: email,
      isCorrect,
      score: isCorrect ? problem.points : 0,
      problemId,
    },
  });

  redirect(
    `/contest?message=${encodeURIComponent(
      isCorrect ? "Correct submission saved" : "Submission saved"
    )}`
  );
}

export async function adminLogin(formData: FormData) {
  const password = text(formData.get("password"));

  if (password !== (process.env.ADMIN_PASSWORD || "rule-admin")) {
    redirect("/admin?message=Wrong%20password");
  }

  await setAdminCookie();
  redirect("/admin");
}

export async function adminLogout() {
  await clearAdminCookie();
  redirect("/admin");
}

export async function createProblem(formData: FormData) {
  if (!(await isAdmin())) {
    redirect("/admin?message=Admin%20session%20required");
  }

  const title = text(formData.get("title"));
  const statement = text(formData.get("statement"));
  const answer = text(formData.get("answer"));
  const points = Number(text(formData.get("points")) || "0");
  const releaseAt = text(formData.get("releaseAt"));

  if (!title || !statement || !answer || !points || !releaseAt) {
    redirect("/admin?message=Fill%20all%20problem%20fields");
  }

  await prisma.problem.create({
    data: {
      title,
      statement,
      answer,
      points,
      releaseAt: new Date(releaseAt),
    },
  });

  revalidatePath("/");
  revalidatePath("/contest");
  redirect("/admin?message=Problem%20created");
}

export async function setReleaseNow(formData: FormData) {
  if (!(await isAdmin())) {
    redirect("/admin?message=Admin%20session%20required");
  }

  const problemId = text(formData.get("problemId"));

  await prisma.problem.update({
    where: { id: problemId },
    data: { releaseAt: new Date() },
  });

  revalidatePath("/");
  revalidatePath("/contest");
  redirect("/admin?message=Problem%20released");
}
