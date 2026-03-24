import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { problemDistribution } from "@/lib/content";
import { sampleProblems } from "@/lib/problems-data";

const roundOrder = ["Individual", "Sprint", "Team", "Buzzer"] as const;

const roundColors: Record<string, string> = {
  Individual: "#1e3a5f",
  Sprint: "#7c4a03",
  Team: "#1a4731",
  Buzzer: "#7f1d1d",
};

export default function ProblemsPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <SiteHeader />

      <div className="mx-auto max-w-5xl px-6 py-14 lg:px-10">
        <header className="pb-10">
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Sample Problems &amp; Practice
          </h1>
          <p
            className="mt-4 max-w-3xl text-lg leading-8"
            style={{ color: "var(--muted)" }}
          >
            Twenty sample problems spanning all four rounds of RMC,
            ranging from approachable AMC 10 difficulty through introductory
            AIME territory. Use them to calibrate your preparation and get a
            feel for what each round demands.
          </p>
        </header>

        <section className="pb-14">
          <h2 className="font-serif text-2xl font-semibold">
            Subject Distribution
          </h2>
          <div
            className="mt-6 overflow-x-auto rounded-md border"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
            }}
          >
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid var(--border)",
                    background: "var(--background)",
                  }}
                >
                  <th className="px-5 py-3 text-left font-semibold">Round</th>
                  <th className="px-5 py-3 text-left font-semibold">Algebra</th>
                  <th className="px-5 py-3 text-left font-semibold">
                    Combinatorics
                  </th>
                  <th className="px-5 py-3 text-left font-semibold">Geometry</th>
                  <th className="px-5 py-3 text-left font-semibold">
                    Number Theory
                  </th>
                  <th className="px-5 py-3 text-left font-semibold">
                    Difficulty Target
                  </th>
                </tr>
              </thead>
              <tbody>
                {problemDistribution.map((entry) => (
                  <tr
                    key={entry.round}
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td className="px-5 py-3 font-medium">{entry.round}</td>
                    <td className="px-5 py-3" style={{ color: "var(--muted)" }}>
                      {entry.algebra}
                    </td>
                    <td className="px-5 py-3" style={{ color: "var(--muted)" }}>
                      {entry.combinatorics}
                    </td>
                    <td className="px-5 py-3" style={{ color: "var(--muted)" }}>
                      {entry.geometry}
                    </td>
                    <td className="px-5 py-3" style={{ color: "var(--muted)" }}>
                      {entry.numberTheory}
                    </td>
                    <td className="px-5 py-3" style={{ color: "var(--muted)" }}>
                      {entry.target}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {roundOrder.map((round) => {
          const color = roundColors[round];
          const problems = sampleProblems.filter((p) => p.round === round);

          return (
            <section key={round} className="pb-14">
              <h2
                className="border-l-4 pl-4 font-serif text-2xl font-semibold"
                style={{ borderColor: color }}
              >
                {round} Round
              </h2>
              <p
                className="mt-2 pl-5 text-sm"
                style={{ color: "var(--muted)" }}
              >
                {problems.length} sample problem{problems.length !== 1 && "s"}
              </p>

              <div className="mt-6 space-y-5">
                {problems.map((problem) => (
                  <article
                    key={problem.id}
                    className="rounded-md border p-6"
                    style={{
                      borderColor: "var(--border)",
                      borderLeft: `3px solid ${color}`,
                      background: "var(--surface)",
                    }}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className="font-mono text-xs font-semibold uppercase tracking-wide"
                        style={{ color }}
                      >
                        {problem.id}
                      </span>
                      <span
                        className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={{
                          background: `${color}12`,
                          color,
                          border: `1px solid ${color}30`,
                        }}
                      >
                        {problem.topic}
                      </span>
                      <span
                        className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={{
                          background: "var(--background)",
                          color: "var(--muted)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {problem.difficulty}
                      </span>
                    </div>

                    <p className="mt-4 leading-7">{problem.statement}</p>

                    <details
                      className="mt-5 rounded border p-4"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--background)",
                      }}
                    >
                      <summary
                        className="cursor-pointer text-sm font-medium select-none"
                        style={{ color: "var(--accent)" }}
                      >
                        View answer &amp; solution
                      </summary>
                      <div className="mt-4 space-y-2 text-sm leading-7">
                        <p>
                          <span className="font-semibold">Answer:</span>{" "}
                          {problem.answer}
                        </p>
                        <p style={{ color: "var(--muted)" }}>
                          {problem.solution}
                        </p>
                      </div>
                    </details>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <section
          className="rounded-md border p-8 text-center"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
          }}
        >
          <h2 className="font-serif text-2xl font-semibold">
            Looking for full practice packets?
          </h2>
          <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
            The archive contains complete past rounds, answer keys, and
            detailed solutions for extended practice.
          </p>
          <Link
            href="/archive"
            className="mt-5 inline-block rounded-md px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Browse the Archive
          </Link>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
