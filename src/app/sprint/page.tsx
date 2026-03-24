import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const sprintNotes = [
  "Thirty short questions in forty minutes.",
  "A steady difficulty ramp rather than one abrupt jump.",
  "No calculators and no partial credit.",
  "Designed to reward pace, accuracy, and clean arithmetic under pressure.",
];

export default function SprintPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-8">
            <div className="border border-[var(--border)] bg-[var(--surface)] p-8">
              <p className="text-sm font-medium text-[var(--round-sprint)]">Sprint round</p>
              <h1 className="mt-3 font-serif text-5xl text-[var(--foreground)]">
                Fast, clean, and intentionally high pressure
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                The sprint round sits between the longer written rounds and the live
                buzzer finals. It should feel fast without turning into nonsense.
              </p>
            </div>

            <section className="border-l-4 border-[var(--round-sprint)] bg-[var(--surface)] p-8">
              <h2 className="font-serif text-3xl text-[var(--foreground)]">What to expect</h2>
              <div className="mt-5 space-y-3">
                {sprintNotes.map((item) => (
                  <p key={item} className="border-l-2 border-[var(--border)] pl-4 leading-7 text-[var(--muted)]">
                    {item}
                  </p>
                ))}
              </div>
            </section>

            <section className="border-l-4 border-[var(--round-sprint)] bg-[var(--surface)] p-8">
              <h2 className="font-serif text-3xl text-[var(--foreground)]">Difficulty curve</h2>
              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 font-mono text-sm font-medium text-[var(--round-sprint)]">1-10</span>
                  <p className="leading-7 text-[var(--muted)]">Warm-up. Accessible to strong AMC 8 or early AMC 10 students.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 font-mono text-sm font-medium text-[var(--round-sprint)]">11-20</span>
                  <p className="leading-7 text-[var(--muted)]">AMC 10 mid. Standard contest middle questions that require cleaner technique.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 font-mono text-sm font-medium text-[var(--round-sprint)]">21-30</span>
                  <p className="leading-7 text-[var(--muted)]">AMC 10 late under pressure. Forces real time management and accuracy under stress.</p>
                </div>
              </div>
            </section>

            <div className="bg-[var(--surface)] border border-[var(--border)] p-6">
              <Link
                href="/archive"
                className="text-sm font-medium text-[var(--round-sprint)] transition hover:text-[var(--foreground)]"
              >
                Practice with the sprint practice set in the Archive &rarr;
              </Link>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="font-serif text-2xl text-[var(--foreground)]">Round at a glance</h2>
              <div className="mt-4 divide-y divide-[var(--border)] border border-[var(--border)]">
                <div className="px-4 py-4">
                  <p className="text-sm text-[var(--muted)]">Duration</p>
                  <p className="mt-1 font-mono font-medium text-[var(--foreground)]">40 minutes</p>
                </div>
                <div className="px-4 py-4">
                  <p className="text-sm text-[var(--muted)]">Problem count</p>
                  <p className="mt-1 font-mono font-medium text-[var(--foreground)]">30 problems</p>
                </div>
                <div className="px-4 py-4">
                  <p className="text-sm text-[var(--muted)]">Format</p>
                  <p className="mt-1 font-medium text-[var(--foreground)]">Short answer, no partial credit</p>
                </div>
                <div className="px-4 py-4">
                  <p className="text-sm text-[var(--muted)]">Tools allowed</p>
                  <p className="mt-1 font-medium text-[var(--foreground)]">None — no calculators</p>
                </div>
              </div>
            </section>

            <section className="border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="font-serif text-2xl text-[var(--foreground)]">Other round pages</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/contest"
                  className="border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--round-individual)] hover:text-[var(--round-individual)]"
                >
                  Individual
                </Link>
                <Link
                  href="/team"
                  className="border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--round-team)] hover:text-[var(--round-team)]"
                >
                  Team
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
