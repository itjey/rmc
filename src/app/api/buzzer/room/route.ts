import { NextResponse } from "next/server";
import { createBuzzerRoom } from "@/lib/buzzer";

export async function POST(request: Request) {
  const body = await request.json();
  const code = await createBuzzerRoom(String(body.title || "The Rule Buzzer"));
  return NextResponse.json({ code });
}
