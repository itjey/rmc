import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const dynamic = "force-static";

async function getData() {
  try {
    const { ensureSeed } = await import("@/lib/bootstrap");
    const { prisma } = await import("@/lib/prisma");
    await ensureSeed();
    const now = new Date();
    const [problems, submissions] = await Promise.all([
      prisma.problem.findMany({
        where: { releaseAt: { lte: now } },
        orderBy: [{ releaseAt: "asc" }, { createdAt: "asc" }],
      }),
      prisma.submission.findMany({
        include: { problem: true },
        orderBy: { updatedAt: "desc" },
        take: 25,
      }),
    ]);
    return { problems, submissions, message: "" };
  } catch {
    return { problems: [] as any[], submissions: [] as any[], message: "" };
  }
}

let submitAnswer: any = async () => {};
try {
  const mod = require("@/app/actions");
  submitAnswer = mod.submitAnswer;
} catch {}

export default async function ContestPage() {
  const { problems, submissions, message: _msg } = await getData();
  const params = { message: "" };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-6">
            <div className="border border-[var(--border)] bg-[var(--surface)] p-8">
              <p className="text-sm font-medium text-[var(--muted)]">Individual round</p>
              <h1 className="mt-3 font-serif text-5xl text-[var(--foreground)]">
                Written individual contest platform
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                Released problems appear below. Students submit one answer per
                problem using the same email address they used during registration.
              </p>
            </div>

            <div className="border-l-4 border-[var(--round-individual)] bg-[var(--surface)] p-5">
              <p className="text-sm font-medium text-[var(--round-individual)]">Honor Code Reminder</p>
              <p className="mt-2 leading-7 text-[var(--muted)]">
                All work must be your own. You may not use any outside resources,
                calculators, or assistance from other people during the individual
                round. Violations will result in disqualification.
              </p>
            </div>

            {problems.map((problem: Problem, index: number) => (
              <article
                key={problem.id}
                className="border-l-4 border-[var(--round-individual)] bg-[var(--surface)] p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-sm text-[var(--muted)]">Problem {index + 1}</p>
                    <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
                      {problem.title}
                    </h2>
                  </div>
                  <span className="rounded-sm bg-[#1e3a5f]/10 px-3 py-1 font-mono text-sm font-medium text-[var(--round-individual)]">
                    {problem.points} pts
                  </span>
                </div>
                <p className="mt-5 whitespace-pre-wrap leading-8 text-[var(--muted)]">
                  {problem.statement}
                </p>
                <form action={submitAnswer} className="mt-6 space-y-3">
                  <input type="hidden" name="problemId" value={problem.id} />
                  <input
                    name="email"
                    type="email"
                    placeholder="Registered email"
                    className="w-full border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                  />
                  <input
                    name="answer"
                    placeholder="Your answer"
                    className="w-full border border-[var(--border)] bg-[var(--surface)] px-3 py-3 font-mono text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                  />
                  <button className="bg-[var(--accent)] px-5 py-3 font-medium text-white transition hover:bg-[var(--accent-hover)]">
                    Submit answer
                  </button>
                </form>
              </article>
            ))}
          </section>

          <aside className="space-y-6">
            <section className="border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="font-serif text-2xl text-[var(--foreground)]">Round notes</h2>
              <div className="mt-4 space-y-3 text-[var(--muted)]">
                <p>Duration: <span className="font-mono text-[var(--foreground)]">75</span> minutes.</p>
                <p>Format: <span className="font-mono text-[var(--foreground)]">18</span> short-answer problems.</p>
                <p>Topics: algebra, combinatorics, geometry, and number theory.</p>
                <p>Difficulty: roughly AMC 10 through low AIME bridge at the end.</p>
              </div>
            </section>

            <section className="border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="font-serif text-2xl text-[var(--foreground)]">Submission status</h2>
              {params.message ? (
                <div className="mt-4 border-l-4 border-[var(--accent)] bg-[var(--accent-light)] px-4 py-3">
                  <p className="text-sm leading-6 text-[var(--accent-hover)]">{params.message}</p>
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                  Use the same email address from registration.
                </p>
              )}
            </section>

            <section className="border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-serif text-2xl text-[var(--foreground)]">Recent submissions</h2>
                <Link
                  href="/rounds"
                  className="text-sm font-medium text-[var(--accent)] transition hover:text-[var(--accent-hover)]"
                >
                  See round details
                </Link>
              </div>
              <div className="mt-5 space-y-3">
                {submissions.length === 0 ? (
                  <p className="text-sm text-[var(--muted)]">No submissions yet.</p>
                ) : (
                  submissions.map(
                    (submission: Submission & { problem: Problem }) => (
                      <div key={submission.id} className="border border-[var(--border)] p-4 transition hover:bg-[var(--background)]">
                        <p className="font-medium text-[var(--foreground)]">
                          {submission.contestantEmail}
                        </p>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          {submission.problem.title} · <span className="font-mono">{submission.score}</span> points
                        </p>
                      </div>
                    )
                  )
                )}
              </div>
            </section>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
