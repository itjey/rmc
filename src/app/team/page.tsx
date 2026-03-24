import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const teamNotes = [
  "Teams should usually have 4 to 6 students.",
  "The round is collaborative and intentionally longer-form than the individual round.",
  "Shared packet access, team strategy, and communication matter more than raw speed alone.",
  "A school coordinator or approved adult can supervise team participation remotely.",
];

const teamStructure = [
  { label: "Duration", value: "55 minutes" },
  { label: "Problem count", value: "10 team problems" },
  { label: "Difficulty", value: "Upper AMC 10 through stronger collaborative team problems" },
  { label: "Format", value: "One shared packet with multi-step questions" },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-8">
            <div className="border border-[var(--border)] bg-[var(--surface)] p-8">
              <p className="text-sm font-medium text-[var(--round-team)]">Team round</p>
              <h1 className="mt-3 font-serif text-5xl text-[var(--foreground)]">
                Collaborative problem solving
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                The team round is the place for longer problems, discussion,
                allocation of work, and cleaner multi-step reasoning than the
                shorter written rounds can support.
              </p>
            </div>

            <section className="border-l-4 border-[var(--round-team)] bg-[var(--surface)] p-8">
              <h2 className="font-serif text-3xl text-[var(--foreground)]">What makes this round different</h2>
              <div className="mt-5 space-y-3">
                {teamNotes.map((item) => (
                  <p key={item} className="border-l-2 border-[var(--border)] pl-4 leading-7 text-[var(--muted)]">
                    {item}
                  </p>
                ))}
              </div>
            </section>

            <section className="border-l-4 border-[var(--round-team)] bg-[var(--surface)] p-8">
              <h2 className="font-serif text-3xl text-[var(--foreground)]">Expected packet style</h2>
              <div className="mt-5 space-y-4 leading-7 text-[var(--muted)]">
                <p>
                  Team problems should be longer than the individual round and
                  reward splitting the work intelligently.
                </p>
                <p>
                  Some problems can be algebraic or combinatorial, while others
                  should involve a useful diagram, a counting structure, or a
                  short chain of claims that a team can distribute across members.
                </p>
                <p>
                  This is also the best place for rich problems that would be too
                  long for sprint and too awkward for buzzer play.
                </p>
              </div>
            </section>

            <div className="bg-[var(--surface)] border border-[var(--border)] p-6">
              <Link
                href="/archive"
                className="text-sm font-medium text-[var(--round-team)] transition hover:text-[var(--foreground)]"
              >
                Practice with the team demo packet in the Archive &rarr;
              </Link>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="font-serif text-2xl text-[var(--foreground)]">Round structure</h2>
              <div className="mt-4 divide-y divide-[var(--border)] border border-[var(--border)]">
                {teamStructure.map((item) => (
                  <div key={item.label} className="px-4 py-4">
                    <p className="text-sm text-[var(--muted)]">{item.label}</p>
                    <p className="mt-1 font-medium text-[var(--foreground)]">
                      {item.label === "Duration" || item.label === "Problem count" ? (
                        <span className="font-mono">{item.value}</span>
                      ) : (
                        item.value
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="font-serif text-2xl text-[var(--foreground)]">Other rounds</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/contest"
                  className="border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--round-individual)] hover:text-[var(--round-individual)]"
                >
                  Individual
                </Link>
                <Link
                  href="/sprint"
                  className="border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--round-sprint)] hover:text-[var(--round-sprint)]"
                >
                  Sprint
                </Link>
                <Link
                  href="/buzzer"
                  className="border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--round-buzzer)] hover:text-[var(--round-buzzer)]"
                >
                  Buzzer
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
