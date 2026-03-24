import { NextResponse } from "next/server";
import { joinBuzzerTeam } from "@/lib/buzzer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const team = await joinBuzzerTeam(String(body.room || ""), String(body.name || ""));
    return NextResponse.json({ team });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to join room" },
      { status: 400 }
    );
  }
}
