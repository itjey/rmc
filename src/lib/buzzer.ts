import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";

type RoomRow = {
  code: string;
  title: string;
  activeQuestion: string | null;
  buzzOpen: number;
  lockedTeamId: string | null;
  createdAt: string;
};

type TeamRow = {
  id: string;
  roomCode: string;
  name: string;
  color: string;
  score: number;
  createdAt: string;
};

type BuzzRow = {
  id: string;
  roomCode: string;
  teamId: string;
  createdAt: string;
};

function roomCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function color() {
  const palette = ["#2563eb", "#dc2626", "#16a34a", "#7c3aed", "#ea580c"];
  return palette[Math.floor(Math.random() * palette.length)];
}

export async function ensureBuzzerTables() {
  await prisma.$executeRawUnsafe(
    'CREATE TABLE IF NOT EXISTS "BuzzerRoom" ("code" TEXT NOT NULL PRIMARY KEY, "title" TEXT NOT NULL, "activeQuestion" TEXT, "buzzOpen" INTEGER NOT NULL DEFAULT 0, "lockedTeamId" TEXT, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)'
  );
  await prisma.$executeRawUnsafe(
    'CREATE TABLE IF NOT EXISTS "BuzzerTeam" ("id" TEXT NOT NULL PRIMARY KEY, "roomCode" TEXT NOT NULL, "name" TEXT NOT NULL, "color" TEXT NOT NULL, "score" INTEGER NOT NULL DEFAULT 0, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)'
  );
  await prisma.$executeRawUnsafe(
    'CREATE TABLE IF NOT EXISTS "BuzzerBuzz" ("id" TEXT NOT NULL PRIMARY KEY, "roomCode" TEXT NOT NULL, "teamId" TEXT NOT NULL, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)'
  );
  await prisma.$executeRawUnsafe(
    'CREATE UNIQUE INDEX IF NOT EXISTS "BuzzerTeam_roomCode_name_key" ON "BuzzerTeam"("roomCode", "name")'
  );
}

export async function createBuzzerRoom(title: string) {
  await ensureBuzzerTables();
  let code = roomCode();
  let exists = true;

  while (exists) {
    const rows = await prisma.$queryRawUnsafe<RoomRow[]>(
      'SELECT "code" FROM "BuzzerRoom" WHERE "code" = ?',
      code
    );
    exists = rows.length > 0;
    if (exists) {
      code = roomCode();
    }
  }

  await prisma.$executeRawUnsafe(
    'INSERT INTO "BuzzerRoom" ("code", "title") VALUES (?, ?)',
    code,
    title || "Buzzer Room"
  );

  return code;
}

export async function joinBuzzerTeam(room: string, name: string) {
  await ensureBuzzerTables();
  const roomCode = room.trim().toUpperCase();
  const teamName = name.trim();

  const rooms = await prisma.$queryRawUnsafe<RoomRow[]>(
    'SELECT * FROM "BuzzerRoom" WHERE "code" = ?',
    roomCode
  );

  if (!rooms.length) {
    throw new Error("Room not found");
  }

  const existing = await prisma.$queryRawUnsafe<TeamRow[]>(
    'SELECT * FROM "BuzzerTeam" WHERE "roomCode" = ? AND "name" = ?',
    roomCode,
    teamName
  );

  if (existing.length) {
    return existing[0];
  }

  const id = randomUUID();
  await prisma.$executeRawUnsafe(
    'INSERT INTO "BuzzerTeam" ("id", "roomCode", "name", "color") VALUES (?, ?, ?, ?)',
    id,
    roomCode,
    teamName,
    color()
  );

  const created = await prisma.$queryRawUnsafe<TeamRow[]>(
    'SELECT * FROM "BuzzerTeam" WHERE "id" = ?',
    id
  );

  return created[0];
}

export async function getBuzzerState(room: string) {
  await ensureBuzzerTables();
  const roomCode = room.trim().toUpperCase();
  const rooms = await prisma.$queryRawUnsafe<RoomRow[]>(
    'SELECT * FROM "BuzzerRoom" WHERE "code" = ?',
    roomCode
  );

  if (!rooms.length) {
    return null;
  }

  const teams = await prisma.$queryRawUnsafe<TeamRow[]>(
    'SELECT * FROM "BuzzerTeam" WHERE "roomCode" = ? ORDER BY "score" DESC, "createdAt" ASC',
    roomCode
  );

  const buzzes = await prisma.$queryRawUnsafe<BuzzRow[]>(
    'SELECT * FROM "BuzzerBuzz" WHERE "roomCode" = ? ORDER BY "createdAt" ASC',
    roomCode
  );

  const roomRow = rooms[0];
  const lockedTeam = teams.find((team) => team.id === roomRow.lockedTeamId) || null;

  return {
    room: {
      code: roomRow.code,
      title: roomRow.title,
      activeQuestion: roomRow.activeQuestion || "",
      buzzOpen: Boolean(roomRow.buzzOpen),
      lockedTeamId: roomRow.lockedTeamId,
      lockedTeam,
    },
    teams,
    buzzes,
  };
}

export async function openBuzzerQuestion(room: string, question: string) {
  await ensureBuzzerTables();
  const roomCode = room.trim().toUpperCase();
  await prisma.$executeRawUnsafe(
    'DELETE FROM "BuzzerBuzz" WHERE "roomCode" = ?',
    roomCode
  );
  await prisma.$executeRawUnsafe(
    'UPDATE "BuzzerRoom" SET "activeQuestion" = ?, "buzzOpen" = 1, "lockedTeamId" = NULL WHERE "code" = ?',
    question.trim(),
    roomCode
  );
}

export async function buzz(room: string, teamId: string) {
  await ensureBuzzerTables();
  const roomCode = room.trim().toUpperCase();
  const changed = await prisma.$executeRawUnsafe(
    'UPDATE "BuzzerRoom" SET "lockedTeamId" = ?, "buzzOpen" = 0 WHERE "code" = ? AND "buzzOpen" = 1 AND "lockedTeamId" IS NULL',
    teamId,
    roomCode
  );

  if (!changed) {
    return false;
  }

  await prisma.$executeRawUnsafe(
    'INSERT INTO "BuzzerBuzz" ("id", "roomCode", "teamId") VALUES (?, ?, ?)',
    randomUUID(),
    roomCode,
    teamId
  );

  return true;
}

export async function clearBuzzerLock(room: string) {
  await ensureBuzzerTables();
  const roomCode = room.trim().toUpperCase();
  await prisma.$executeRawUnsafe(
    'UPDATE "BuzzerRoom" SET "lockedTeamId" = NULL, "buzzOpen" = 0 WHERE "code" = ?',
    roomCode
  );
}

export async function updateBuzzerScore(teamId: string, delta: number) {
  await ensureBuzzerTables();
  await prisma.$executeRawUnsafe(
    'UPDATE "BuzzerTeam" SET "score" = "score" + ? WHERE "id" = ?',
    delta,
    teamId
  );
}

export async function resetBuzzerRoom(room: string) {
  await ensureBuzzerTables();
  const roomCode = room.trim().toUpperCase();
  await prisma.$executeRawUnsafe(
    'DELETE FROM "BuzzerBuzz" WHERE "roomCode" = ?',
    roomCode
  );
  await prisma.$executeRawUnsafe(
    'UPDATE "BuzzerRoom" SET "activeQuestion" = "", "buzzOpen" = 0, "lockedTeamId" = NULL WHERE "code" = ?',
    roomCode
  );
  await prisma.$executeRawUnsafe(
    'UPDATE "BuzzerTeam" SET "score" = 0 WHERE "roomCode" = ?',
    roomCode
  );
}
