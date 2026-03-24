import { NextResponse } from "next/server";
import { openBuzzerQuestion } from "@/lib/buzzer";

export async function POST(request: Request) {
  const body = await request.json();
  await openBuzzerQuestion(String(body.room || ""), String(body.question || ""));
  return NextResponse.json({ ok: true });
}
