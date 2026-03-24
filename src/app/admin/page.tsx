import type { Contestant, Submission, Problem } from "@prisma/client";
import { adminLogin, adminLogout, createProblem, setReleaseNow } from "@/app/actions";
import { isAdmin } from "@/lib/auth";
import { ensureSeed } from "@/lib/bootstrap";
import { prisma } from "@/lib/prisma";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  await ensureSeed();
  const params = await searchParams;
  const admin = await isAdmin();

  if (!admin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101917] px-6 py-8 text-stone-50">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
            Admin
          </p>
          <h1 className="mt-3 font-serif text-4xl">Unlock The Rule</h1>
          <p className="mt-3 text-sm text-stone-300">
            {params.message || "Use the admin password from your environment."}
          </p>
          <form action={adminLogin} className="mt-6 space-y-4">
            <input
              name="password"
              type="password"
              placeholder="Admin password"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none transition focus:border-orange-400"
            />
            <button className="w-full rounded-2xl bg-orange-500 px-4 py-3 font-medium text-stone-950">
              Enter admin
            </button>
          </form>
        </div>
      </main>
    );
  }

  const [contestants, problems, submissions] = await Promise.all([
    prisma.contestant.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.problem.findMany({
      orderBy: [{ releaseAt: "asc" }, { createdAt: "asc" }],
    }),
    prisma.submission.findMany({
      include: { problem: true },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  return (
    <main className="min-h-screen bg-[#f3ead8] px-6 py-8 text-stone-950 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-900/10 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-stone-500">
              The Rule
            </p>
            <h1 className="mt-3 font-serif text-4xl">Admin Console</h1>
          </div>
          <form action={adminLogout}>
            <button className="rounded-full bg-stone-950 px-4 py-2 text-sm font-medium text-stone-50">
              Log out
            </button>
          </form>
        </header>

        <p className="mt-4 text-sm text-stone-600">
          {params.message || "Manage registrations, releases, and answers."}
        </p>

        <div className="mt-8 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <section className="space-y-6">
            <div className="rounded-[2rem] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,21,0.08)]">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                New problem
              </p>
              <form action={createProblem} className="mt-4 space-y-3">
                <input
                  name="title"
                  placeholder="Title"
                  className="w-full rounded-2xl border border-stone-900/10 bg-stone-50 px-4 py-3 outline-none"
                />
                <textarea
                  name="statement"
                  placeholder="Statement"
                  rows={6}
                  className="w-full rounded-2xl border border-stone-900/10 bg-stone-50 px-4 py-3 outline-none"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    name="answer"
                    placeholder="Answer key"
                    className="w-full rounded-2xl border border-stone-900/10 bg-stone-50 px-4 py-3 outline-none"
                  />
                  <input
                    name="points"
                    type="number"
                    min="1"
                    placeholder="Points"
                    className="w-full rounded-2xl border border-stone-900/10 bg-stone-50 px-4 py-3 outline-none"
                  />
                </div>
                <input
                  name="releaseAt"
                  type="datetime-local"
                  className="w-full rounded-2xl border border-stone-900/10 bg-stone-50 px-4 py-3 outline-none"
                />
                <button className="w-full rounded-2xl bg-stone-950 px-4 py-3 font-medium text-stone-50">
                  Create problem
                </button>
              </form>
            </div>

            <div className="rounded-[2rem] bg-stone-950 p-6 text-stone-50">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
                Registrants
              </p>
              <div className="mt-4 space-y-3">
                {contestants.length === 0 ? (
                  <p className="text-sm text-stone-300">No registrants yet.</p>
                ) : (
                  contestants.map((contestant: Contestant) => (
                    <div
                      key={contestant.id}
                      className="rounded-2xl border border-white/10 px-4 py-3"
                    >
                      <p className="font-medium">{contestant.name}</p>
                      <p className="text-sm text-stone-300">
                        {contestant.email} · {contestant.school} · {contestant.country}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-[2rem] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,21,0.08)]">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                Problems
              </p>
              <div className="mt-4 space-y-4">
                {problems.map((problem: Problem) => (
                  <div
                    key={problem.id}
                    className="rounded-[1.5rem] border border-stone-900/10 p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h2 className="font-serif text-2xl">{problem.title}</h2>
                        <p className="mt-1 text-sm text-stone-600">
                          {problem.points} pts · releases{" "}
                          {problem.releaseAt.toLocaleString()}
                        </p>
                      </div>
                      <form action={setReleaseNow}>
                        <input type="hidden" name="problemId" value={problem.id} />
                        <button className="rounded-full border border-stone-900/15 px-4 py-2 text-sm font-medium">
                          Release now
                        </button>
                      </form>
                    </div>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-stone-700">
                      {problem.statement}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-orange-500 p-6 text-stone-950">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-800">
                Submissions
              </p>
              <div className="mt-4 space-y-3">
                {submissions.length === 0 ? (
                  <p className="text-sm text-stone-900/80">No answers yet.</p>
                ) : (
                  submissions.map(
                    (submission: Submission & { problem: Problem }) => (
                    <div
                      key={submission.id}
                      className="rounded-2xl border border-stone-900/10 bg-white/55 px-4 py-3"
                    >
                      <p className="font-medium">{submission.contestantEmail}</p>
                      <p className="text-sm text-stone-800">
                        {submission.problem.title} · {submission.answer} ·{" "}
                        {submission.score} pts
                      </p>
                    </div>
                    )
                  )
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
