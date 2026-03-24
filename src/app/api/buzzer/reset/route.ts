import { NextResponse } from "next/server";
import { resetBuzzerRoom } from "@/lib/buzzer";

export async function POST(request: Request) {
  const body = await request.json();
  await resetBuzzerRoom(String(body.room || ""));
  return NextResponse.json({ ok: true });
}
