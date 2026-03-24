import { NextResponse } from "next/server";
import { clearBuzzerLock } from "@/lib/buzzer";

export async function POST(request: Request) {
  const body = await request.json();
  await clearBuzzerLock(String(body.room || ""));
  return NextResponse.json({ ok: true });
}
