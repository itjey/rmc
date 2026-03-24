import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ensureBuzzerTables } from "@/lib/buzzer";
import { BuzzerClient } from "./BuzzerClient";

export default async function BuzzerPage() {
  await ensureBuzzerTables();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="border border-[var(--border)] bg-[var(--surface)] p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[var(--round-buzzer)]">Buzzer platform</p>
              <h1 className="mt-3 font-serif text-5xl text-[var(--foreground)]">
                Live room system for moderated finals
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                Moderators can create rooms, open questions, accept the first
                buzz, clear lockouts, and adjust scores. Teams join from separate
                devices with a room code.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/rounds"
                className="border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--round-buzzer)] hover:text-[var(--round-buzzer)]"
              >
                Round details
              </Link>
              <Link
                href="/team"
                className="border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--round-team)] hover:text-[var(--round-team)]"
              >
                Team round
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="border-l-4 border-[var(--round-buzzer)] bg-[var(--surface)] p-6">
            <h2 className="font-serif text-xl text-[var(--foreground)]">Qualification</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              The buzzer round is the final stage of competition. Only the top-performing
              teams from the individual and team rounds qualify for the live buzzer finals.
              Qualification is based on combined scores across earlier rounds.
            </p>
          </div>
          <div className="border-l-4 border-[var(--round-buzzer)] bg-[var(--surface)] p-6">
            <h2 className="font-serif text-xl text-[var(--foreground)]">Try it out</h2>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              Want to see how the buzzer system works before competition day?
            </p>
            <Link
              href="/archive"
              className="mt-3 inline-block text-sm font-medium text-[var(--round-buzzer)] transition hover:text-[var(--foreground)]"
            >
              Try the buzzer demo in the Archive &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <BuzzerClient />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
