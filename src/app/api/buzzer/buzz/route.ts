import { NextResponse } from "next/server";
import { buzz } from "@/lib/buzzer";

export async function POST(request: Request) {
  const body = await request.json();
  const accepted = await buzz(String(body.room || ""), String(body.teamId || ""));
  return NextResponse.json({ accepted });
}
