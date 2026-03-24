import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  rounds,
  honorCode,
  honorCodeIntro,
  faq,
  buzzerQualification,
} from "@/lib/content";
import { sampleProblems } from "@/lib/problems-data";

const roundNameMap: Record<string, string> = {
  individual: "Individual",
  team: "Team",
  sprint: "Sprint",
  buzzer: "Buzzer",
};

function getSampleProblem(slug: string) {
  const roundLabel = roundNameMap[slug];
  return sampleProblems.find((p) => p.round === roundLabel) ?? null;
}

export default function RoundsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
        <section className="pb-10">
          <h1 className="font-serif text-5xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
            Competition Rounds
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8" style={{ color: "var(--muted)" }}>
            RMC features four distinct rounds, each testing a different dimension of mathematical ability.
            From deep individual problem solving to live head-to-head buzzer competition, every round is designed
            with its own pacing, difficulty curve, and strategic texture.
          </p>
        </section>

        <section className="pb-12">
          <h2 className="font-serif text-3xl font-semibold" style={{ color: "var(--foreground)" }}>
            Round comparison
          </h2>
          <div
            className="mt-6 overflow-x-auto rounded-lg"
            style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
          >
            <table className="w-full text-left text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th className="px-5 py-4 font-semibold" style={{ color: "var(--foreground)" }}>Round</th>
                  <th className="px-5 py-4 font-semibold" style={{ color: "var(--foreground)" }}>Duration</th>
                  <th className="px-5 py-4 font-semibold" style={{ color: "var(--foreground)" }}>Problems</th>
                  <th className="px-5 py-4 font-semibold" style={{ color: "var(--foreground)" }}>Scoring</th>
                  <th className="px-5 py-4 font-semibold" style={{ color: "var(--foreground)" }}>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {rounds.map((round, i) => (
                  <tr
                    key={round.slug}
                    style={{
                      borderBottom: i < rounds.length - 1 ? "1px solid var(--border)" : undefined,
                    }}
                  >
                    <td className="px-5 py-4">
                      <span
                        className="inline-block rounded-sm px-2 py-0.5 font-medium"
                        style={{
                          borderLeft: `4px solid ${round.color}`,
                          color: "var(--foreground)",
                        }}
                      >
                        {round.title}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-sm" style={{ color: "var(--muted)" }}>
                      {round.duration}
                    </td>
                    <td className="px-5 py-4" style={{ color: "var(--muted)" }}>
                      {round.problems}
                    </td>
                    <td className="px-5 py-4" style={{ color: "var(--muted)" }}>
                      {round.scoring}
                    </td>
                    <td className="max-w-xs px-5 py-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {round.difficulty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-10 pb-12">
          {rounds.map((round) => {
            const sample = getSampleProblem(round.slug);
            return (
              <article
                key={round.slug}
                className="rounded-lg p-8"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2
                      className="font-serif text-3xl font-semibold"
                      style={{
                        borderLeft: `4px solid ${round.color}`,
                        paddingLeft: "16px",
                        color: "var(--foreground)",
                      }}
                    >
                      {round.title}
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-4 pl-5 font-mono text-sm" style={{ color: "var(--muted)" }}>
                      <span>{round.duration}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{round.problems}</span>
                    </div>
                  </div>
                  <Link
                    href={round.href}
                    className="mt-1 text-sm font-medium transition-colors hover:opacity-80"
                    style={{ color: round.color }}
                  >
                    Go to {round.title.toLowerCase()} page &rarr;
                  </Link>
                </div>

                <div className="mt-8 grid gap-10 lg:grid-cols-2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                        Summary
                      </h3>
                      <p className="mt-2 leading-7" style={{ color: "var(--foreground)" }}>
                        {round.summary}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                        Difficulty spectrum
                      </h3>
                      <p className="mt-2 leading-7" style={{ color: "var(--foreground)" }}>
                        {round.difficultySpectrum}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                        Scoring
                      </h3>
                      <p className="mt-2 leading-7" style={{ color: "var(--foreground)" }}>
                        {round.scoring}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                        Topic breakdown
                      </h3>
                      <ul className="mt-2 space-y-2">
                        {round.breakdown.map((item) => (
                          <li
                            key={item}
                            className="leading-7"
                            style={{
                              paddingLeft: "14px",
                              borderLeft: `2px solid ${round.color}`,
                              color: "var(--foreground)",
                            }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                        Strategy tips
                      </h3>
                      <ol className="mt-2 space-y-3">
                        {round.strategyTips.map((tip, i) => (
                          <li key={i} className="flex gap-3 leading-7" style={{ color: "var(--foreground)" }}>
                            <span
                              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-white"
                              style={{ background: round.color }}
                            >
                              {i + 1}
                            </span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {sample && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                          Sample problem
                        </h3>
                        <div
                          className="mt-3 rounded-md p-5"
                          style={{ background: "var(--background)", border: "1px solid var(--border)" }}
                        >
                          <p className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                            {sample.id} &middot; {sample.topic} &middot; {sample.difficulty}
                          </p>
                          <p className="mt-3 leading-7" style={{ color: "var(--foreground)" }}>
                            {sample.statement}
                          </p>
                          <details className="mt-4">
                            <summary
                              className="cursor-pointer text-sm font-medium transition-colors hover:opacity-80"
                              style={{ color: round.color }}
                            >
                              Reveal answer &amp; solution
                            </summary>
                            <div className="mt-3 space-y-2 text-sm leading-7" style={{ color: "var(--foreground)" }}>
                              <p>
                                <span className="font-semibold">Answer:</span>{" "}
                                <span className="font-mono">{sample.answer}</span>
                              </p>
                              <p>
                                <span className="font-semibold">Solution:</span> {sample.solution}
                              </p>
                            </div>
                          </details>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section
          className="rounded-lg p-8"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <h2 className="font-serif text-3xl font-semibold" style={{ color: "var(--foreground)" }}>
            Buzzer qualification
          </h2>
          <p className="mt-4 max-w-3xl leading-7" style={{ color: "var(--foreground)" }}>
            {buzzerQualification}
          </p>
        </section>

        <section
          id="honor-code"
          className="mt-10"
        >
          <div
            className="bg-[#0a0c10] p-8 text-[var(--foreground)] sm:p-10"
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--accent)" }}
            >
              Competition Integrity
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">
              Rules &amp; Honor Code
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8" style={{ color: "#a1a1aa" }}>
              {honorCodeIntro}
            </p>
          </div>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            {honorCode.map((item, i) => (
              <div
                key={item.title}
                className="px-8 py-6 sm:px-10"
                style={{
                  borderTop: i > 0 ? "1px solid var(--border)" : undefined,
                }}
              >
                <h3
                  className="text-base font-bold"
                  style={{ color: "var(--foreground)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-7"
                  style={{ color: "var(--muted)" }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="faq"
          className="mt-10 rounded-lg p-8"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <h2 className="font-serif text-3xl font-semibold" style={{ color: "var(--foreground)" }}>
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-0 divide-y" style={{ borderColor: "var(--border)" }}>
            {faq.map((item) => (
              <details key={item.question} className="group py-4" style={{ borderColor: "var(--border)" }}>
                <summary
                  className="cursor-pointer font-medium leading-7 transition-colors hover:opacity-80"
                  style={{ color: "var(--foreground)" }}
                >
                  {item.question}
                </summary>
                <p className="mt-3 leading-7" style={{ color: "var(--muted)" }}>
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
