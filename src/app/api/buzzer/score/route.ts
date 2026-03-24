import { NextResponse } from "next/server";
import { updateBuzzerScore } from "@/lib/buzzer";

export async function POST(request: Request) {
  const body = await request.json();
  await updateBuzzerScore(String(body.teamId || ""), Number(body.delta || 0));
  return NextResponse.json({ ok: true });
}
