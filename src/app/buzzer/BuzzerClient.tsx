"use client";

import { useEffect, useEffectEvent, useState, startTransition } from "react";

type Team = {
  id: string;
  roomCode: string;
  name: string;
  color: string;
  score: number;
  createdAt: string;
};

type State = {
  room: {
    code: string;
    title: string;
    activeQuestion: string;
    buzzOpen: boolean;
    lockedTeamId: string | null;
    lockedTeam: Team | null;
  };
  teams: Team[];
  buzzes: {
    id: string;
    roomCode: string;
    teamId: string;
    createdAt: string;
  }[];
};

async function json<T>(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  return response.json() as Promise<T>;
}

export function BuzzerClient() {
  const [roomInput, setRoomInput] = useState("");
  const [teamInput, setTeamInput] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [teamId, setTeamId] = useState("");
  const [moderator, setModerator] = useState(false);
  const [status, setStatus] = useState("Create a room or join one.");
  const [state, setState] = useState<State | null>(null);

  const load = useEffectEvent(async () => {
    if (!roomCode) {
      return;
    }

    const response = await fetch(`/api/buzzer/state?room=${roomCode}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return;
    }

    const data = (await response.json()) as State;
    setState(data);
  });

  useEffect(() => {
    if (!roomCode) {
      return;
    }

    void load();
    const timer = window.setInterval(() => {
      startTransition(() => {
        void load();
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [roomCode, load]);

  async function createRoom() {
    const data = await json<{ code: string }>("/api/buzzer/room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "The Rule Buzzer" }),
    });
    setModerator(true);
    setRoomCode(data.code);
    setRoomInput(data.code);
    setStatus(`Room ${data.code} created.`);
  }

  async function joinRoom() {
    try {
      const data = await json<{ team: Team; error?: string }>("/api/buzzer/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room: roomInput, name: teamInput }),
      });

      if ("error" in data && data.error) {
        setStatus(data.error);
        return;
      }

      setModerator(false);
      setRoomCode(roomInput.toUpperCase());
      setTeamId(data.team.id);
      setStatus(`Joined room ${roomInput.toUpperCase()} as ${data.team.name}.`);
    } catch {
      setStatus("Unable to join room.");
    }
  }

  async function openQuestion() {
    await json("/api/buzzer/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room: roomCode, question: questionInput }),
    });
    setStatus("Question opened for buzzing.");
    await load();
  }

  async function buzzNow() {
    const data = await json<{ accepted: boolean }>("/api/buzzer/buzz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room: roomCode, teamId }),
    });
    setStatus(data.accepted ? "Buzz accepted." : "Buzz not accepted.");
    await load();
  }

  async function clearLock() {
    await json("/api/buzzer/clear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room: roomCode }),
    });
    setStatus("Lock cleared.");
    await load();
  }

  async function adjustScore(targetTeamId: string, delta: number) {
    await json("/api/buzzer/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamId: targetTeamId, delta }),
    });
    await load();
  }

  async function resetRoom() {
    await json("/api/buzzer/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room: roomCode }),
    });
    setQuestionInput("");
    setStatus("Room reset.");
    await load();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
      <aside className="space-y-6">
        <section className="border border-slate-200 bg-white p-6">
          <h2 className="font-serif text-2xl text-slate-950">Room setup</h2>
          <div className="mt-5 space-y-4">
            <button
              onClick={createRoom}
              className="w-full bg-slate-950 px-4 py-3 font-medium text-white transition hover:bg-slate-800"
            >
              Create moderator room
            </button>
            <div className="space-y-3 border-t border-slate-200 pt-4">
              <input
                value={roomInput}
                onChange={(event) => setRoomInput(event.target.value)}
                placeholder="Room code"
                className="w-full border border-slate-300 px-3 py-3 outline-none focus:border-slate-950"
              />
              <input
                value={teamInput}
                onChange={(event) => setTeamInput(event.target.value)}
                placeholder="Team name"
                className="w-full border border-slate-300 px-3 py-3 outline-none focus:border-slate-950"
              />
              <button
                onClick={joinRoom}
                className="w-full border border-slate-300 px-4 py-3 font-medium text-slate-950 transition hover:bg-slate-50"
              >
                Join as team
              </button>
            </div>
          </div>
        </section>

        <section className="border border-slate-200 bg-white p-6">
          <h2 className="font-serif text-2xl text-slate-950">Status</h2>
          <p className="mt-4 text-sm leading-6 text-slate-700">{status}</p>
          {state ? (
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>Room code: {state.room.code}</p>
              <p>Room title: {state.room.title}</p>
              <p>
                Buzz state: {state.room.buzzOpen ? "Open" : "Closed"}
              </p>
              <p>
                Locked team: {state.room.lockedTeam?.name || "None"}
              </p>
            </div>
          ) : null}
        </section>

        <section className="border border-slate-200 bg-white p-6">
          <h2 className="font-serif text-2xl text-slate-950">Round flow</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            <p>1. Moderator creates a room and shares the room code.</p>
            <p>2. Teams join from their own devices.</p>
            <p>3. Moderator opens a question and teams race to buzz.</p>
            <p>4. The first accepted buzz locks the room until it is cleared.</p>
          </div>
        </section>
      </aside>

      <section className="space-y-6">
        <div className="border border-slate-200 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl text-slate-950">Live room</h2>
              <p className="mt-2 leading-7 text-slate-700">
                {state?.room.activeQuestion || "No active question yet."}
              </p>
            </div>
            <div className="bg-slate-950 px-4 py-2 text-sm font-medium text-white">
              {state?.room.code || "No room selected"}
            </div>
          </div>

          {moderator && roomCode ? (
            <div className="mt-6 grid gap-3 border-t border-slate-200 pt-6">
              <textarea
                value={questionInput}
                onChange={(event) => setQuestionInput(event.target.value)}
                placeholder="Enter the next buzzer question prompt"
                rows={4}
                className="w-full border border-slate-300 px-3 py-3 outline-none focus:border-slate-950"
              />
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={openQuestion}
                  className="bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Open question
                </button>
                <button
                  onClick={clearLock}
                  className="border border-slate-300 px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-50"
                >
                  Clear buzz lock
                </button>
                <button
                  onClick={resetRoom}
                  className="border border-slate-300 px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-50"
                >
                  Reset room
                </button>
              </div>
            </div>
          ) : null}

          {!moderator && teamId && roomCode ? (
            <div className="mt-6 border-t border-slate-200 pt-6">
              <button
                onClick={buzzNow}
                disabled={!state?.room.buzzOpen}
                className="w-full bg-[#dc2626] px-4 py-6 text-2xl font-semibold text-white transition enabled:hover:bg-[#b91c1c] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Buzz
              </button>
            </div>
          ) : null}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="border border-slate-200 bg-white p-6">
            <h2 className="font-serif text-2xl text-slate-950">Scoreboard</h2>
            <div className="mt-5 space-y-3">
              {state?.teams.length ? (
                state.teams.map((team) => (
                  <div
                    key={team.id}
                    className="border border-slate-200 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="h-3 w-3"
                          style={{ backgroundColor: team.color }}
                        />
                        <span className="font-medium text-slate-950">
                          {team.name}
                        </span>
                      </div>
                      <span className="text-xl font-semibold text-slate-950">
                        {team.score}
                      </span>
                    </div>
                    {moderator ? (
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => adjustScore(team.id, 10)}
                          className="border border-slate-300 px-3 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-50"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => adjustScore(team.id, -10)}
                          className="border border-slate-300 px-3 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-50"
                        >
                          -10
                        </button>
                      </div>
                    ) : null}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-600">No teams in the room yet.</p>
              )}
            </div>
          </section>

          <section className="border border-slate-200 bg-white p-6">
            <h2 className="font-serif text-2xl text-slate-950">Buzz order</h2>
            <div className="mt-5 space-y-3">
              {state?.buzzes.length ? (
                state.buzzes.map((buzzItem, index) => {
                  const team = state.teams.find((entry) => entry.id === buzzItem.teamId);
                  return (
                    <div
                      key={buzzItem.id}
                      className="flex items-center justify-between border border-slate-200 p-4"
                    >
                      <div>
                        <p className="font-medium text-slate-950">
                          {team?.name || "Unknown team"}
                        </p>
                        <p className="text-sm text-slate-500">
                          Buzz {index + 1}
                        </p>
                      </div>
                      <p className="text-sm text-slate-600">
                        {new Date(buzzItem.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-slate-600">No accepted buzzes yet.</p>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
