import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { archivePackets } from "@/lib/archive-data";

const pastYears = [
  { year: 2025, label: "RMC 2025" },
  { year: 2024, label: "RMC 2024" },
  { year: 2023, label: "RMC 2023" },
];

const roundFiles = [
  { slug: "individual", label: "Individual Round", color: "#1e3a5f" },
  { slug: "team", label: "Team Round", color: "#1a4731" },
  { slug: "sprint", label: "Sprint Round", color: "#7c4a03" },
  { slug: "buzzer", label: "Buzzer Finals", color: "#7f1d1d" },
];

export default function ArchivePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
        <div className="border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
            Competition Archive
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            Three years of RMC competition papers, answer keys, and practice
            materials. Download problem sets and solutions for every round.
          </p>
        </div>

        {pastYears.map((yr) => (
          <section key={yr.year} className="mt-10">
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif text-3xl font-bold text-[var(--foreground)]">
                {yr.label}
              </h2>
              <p className="hidden text-sm text-[var(--muted)] sm:block">
                4 rounds &middot; problems + answer keys
              </p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {roundFiles.map((round) => (
                <div
                  key={round.slug}
                  className="border border-[var(--border)] bg-[var(--surface)] p-6"
                  style={{ borderLeftWidth: 4, borderLeftColor: round.color }}
                >
                  <h3 className="text-lg font-bold text-[var(--foreground)]">
                    {round.label}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={`/archive/${yr.year}/rmc-${yr.year}-${round.slug}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 2v8M4 7l3 3 3-3M2 11h10" />
                      </svg>
                      Problems
                    </a>
                    <a
                      href={`/archive/${yr.year}/rmc-${yr.year}-${round.slug}-answers.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 2v8M4 7l3 3 3-3M2 11h10" />
                      </svg>
                      Answer Key
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="mt-14">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-3xl font-bold text-[var(--foreground)]">
              2026 Practice Materials
            </h2>
            <p className="hidden text-sm text-[var(--muted)] sm:block">
              {archivePackets.reduce((sum, p) => sum + p.problemCount, 0)} problems across{" "}
              {archivePackets.length} packets
            </p>
          </div>
          <p className="mt-2 text-[var(--muted)]">
            Additional practice packets for the upcoming RMC 2026. Browse
            problems, answer keys, and solutions inline.
          </p>

          <div className="mt-6 space-y-6">
            {archivePackets.map((packet) => {
              const hasSolutions = packet.problems.some((p) => p.solution);

              return (
                <article
                  key={packet.id}
                  className="border border-[var(--border)] bg-[var(--surface)]"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-[var(--foreground)]">
                          {packet.title}
                        </h3>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          {packet.subtitle}
                        </p>
                      </div>
                      <span className="hidden shrink-0 bg-[var(--background)] px-3 py-1 text-xs font-medium text-[var(--muted)] sm:inline-block">
                        {packet.problemCount} problems
                      </span>
                    </div>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
                      {packet.description}
                    </p>
                  </div>

                  <div className="border-t border-[var(--border)]">
                    <details>
                      <summary className="flex items-center gap-3 px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--background)] sm:px-8">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform [[open]>&]:rotate-90">
                          <path d="M4 2l4 4-4 4" />
                        </svg>
                        View problems
                      </summary>
                      <div className="border-t border-[var(--border)] px-6 py-5 sm:px-8">
                        <ol className="space-y-4">
                          {packet.problems.map((problem) => (
                            <li key={problem.number} className="flex gap-4">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[var(--background)] font-mono text-xs font-bold text-[var(--muted)]">
                                {problem.number}
                              </span>
                              <div className="pt-0.5">
                                {problem.difficulty && (
                                  <span className="mb-2 inline-block rounded-full bg-[var(--background)] px-2.5 py-0.5 text-xs font-medium text-[var(--muted)] border border-[var(--border)]">
                                    {problem.difficulty}
                                  </span>
                                )}
                                <p className="leading-7 text-[var(--foreground)]">
                                  {problem.statement}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </details>
                  </div>

                  <div className="border-t border-[var(--border)]">
                    <details>
                      <summary className="flex items-center gap-3 px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--background)] sm:px-8">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform [[open]>&]:rotate-90">
                          <path d="M4 2l4 4-4 4" />
                        </svg>
                        Answer key
                      </summary>
                      <div className="border-t border-[var(--border)] px-6 py-5 sm:px-8">
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                          {packet.problems.map((problem) => (
                            <div key={problem.number} className="flex items-center gap-3 bg-[var(--background)] px-3 py-2">
                              <span className="font-mono text-xs font-bold text-[var(--muted)]">
                                {problem.number}.
                              </span>
                              <span className="font-mono text-sm font-semibold text-[var(--foreground)]">
                                {problem.answer}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </details>
                  </div>

                  {hasSolutions && (
                    <div className="border-t border-[var(--border)]">
                      <details>
                        <summary className="flex items-center gap-3 px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--background)] sm:px-8">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform [[open]>&]:rotate-90">
                            <path d="M4 2l4 4-4 4" />
                          </svg>
                          Full solutions
                        </summary>
                        <div className="border-t border-[var(--border)] px-6 py-5 sm:px-8">
                          <ol className="space-y-5">
                            {packet.problems
                              .filter((p) => p.solution)
                              .map((problem) => (
                                <li key={problem.number}>
                                  <div className="flex gap-4">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[var(--accent-light)] font-mono text-xs font-bold text-[var(--accent)]">
                                      {problem.number}
                                    </span>
                                    <div className="pt-0.5">
                                      <p className="text-sm font-semibold text-[var(--foreground)]">
                                        {problem.statement}
                                      </p>
                                      <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                                        {problem.solution}
                                      </p>
                                      <p className="mt-1 text-sm font-medium text-[var(--accent)]">
                                        Answer: {problem.answer}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </ol>
                        </div>
                      </details>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-3xl font-bold text-[var(--foreground)]">
            Quick Links
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Link
              href="/problems"
              className="border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--accent)]"
            >
              <p className="font-bold text-[var(--foreground)]">Sample Problems</p>
              <p className="mt-1 text-sm text-[var(--muted)]">20 problems across all rounds</p>
            </Link>
            <Link
              href="/rounds"
              className="border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--accent)]"
            >
              <p className="font-bold text-[var(--foreground)]">Round Details</p>
              <p className="mt-1 text-sm text-[var(--muted)]">Format, scoring, difficulty</p>
            </Link>
            <Link
              href="/buzzer"
              className="border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--accent)]"
            >
              <p className="font-bold text-[var(--foreground)]">Buzzer Platform</p>
              <p className="mt-1 text-sm text-[var(--muted)]">Live demo rooms available</p>
            </Link>
          </div>
        </section>
      </section>

      <SiteFooter />
    </main>
  );
}
