import { NextResponse } from "next/server";
import { getBuzzerState } from "@/lib/buzzer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const room = searchParams.get("room") || "";
  const state = await getBuzzerState(room);

  if (!state) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }

  return NextResponse.json(state);
}
