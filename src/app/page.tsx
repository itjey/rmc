import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  homeHighlights,
  quickFacts,
  rounds,
  schedule,
  site,
  sponsorTiers,
} from "@/lib/content";
import { archiveEntries } from "@/lib/archive-data";
async function getStats() {
  try {
    const { ensureSeed } = await import("@/lib/bootstrap");
    const { prisma } = await import("@/lib/prisma");
    await ensureSeed();
    const [contestants, releasedProblems] = await Promise.all([
      prisma.contestant.count(),
      prisma.problem.count({ where: { releaseAt: { lte: new Date() } } }),
    ]);
    return { contestants, releasedProblems };
  } catch {
    return { contestants: 0, releasedProblems: 0 };
  }
}

export default async function Home() {
  const { contestants, releasedProblems } = await getStats();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <section className="bg-[#0e1015]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
          <h1 className="max-w-3xl font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            {site.fullName}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-400">
            {site.hero}
          </p>
          <span className="mt-6 inline-block border border-white/15 bg-white/5 px-4 py-2 font-mono text-sm tracking-wide text-neutral-300">
            {site.competitionDate}
          </span>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/registration"
              className="inline-flex items-center bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
            >
              Register Now
            </Link>
            <Link
              href="/problems"
              className="inline-flex items-center border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Problems
            </Link>
          </div>
          <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="bg-[#0e1015] px-5 py-4">
                <p className="text-xs uppercase tracking-wider text-neutral-500">{fact.label}</p>
                <p className="mt-1.5 text-sm font-medium text-neutral-300">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#131620]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="font-serif text-3xl text-white sm:text-4xl">What Is RMC</h2>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5 leading-7 text-neutral-400">
              <p>{site.summary}</p>
              <p>{homeHighlights[0]}</p>
              <p>{homeHighlights[2]}</p>
            </div>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {schedule.map((item) => (
                <div key={item.label} className="px-1 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-500">{item.label}</p>
                  <p className="mt-1 text-sm text-neutral-300">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0e1015]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="font-serif text-3xl text-white sm:text-4xl">The Four Rounds</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {rounds.map((round) => (
              <article
                key={round.slug}
                className="border border-white/10 bg-[#181b24] p-6"
                style={{ borderLeftWidth: "4px", borderLeftColor: round.color }}
              >
                <h3 className="font-serif text-xl font-semibold text-white">{round.title}</h3>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-neutral-500">
                  <span>{round.duration}</span>
                  <span>{round.problems}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-neutral-400">{round.summary}</p>
                <Link
                  href={round.href}
                  className="mt-4 inline-block text-sm font-medium text-amber-500 transition hover:text-amber-400"
                >
                  Learn more &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#131620]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="font-serif text-3xl text-white sm:text-4xl">By the Numbers</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <div className="border border-white/10 bg-[#181b24] p-8">
              <p className="text-sm text-neutral-500">Registered students</p>
              <p className="mt-3 font-mono text-4xl font-bold text-white">{contestants}</p>
            </div>
            <div className="border border-white/10 bg-[#181b24] p-8">
              <p className="text-sm text-neutral-500">Released problems</p>
              <p className="mt-3 font-mono text-4xl font-bold text-white">{releasedProblems}</p>
            </div>
            <div className="border border-white/10 bg-[#181b24] p-8">
              <p className="text-sm text-neutral-500">Practice problems available</p>
              <p className="mt-3 font-mono text-4xl font-bold text-white">68</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0e1015]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="font-serif text-3xl text-white sm:text-4xl">From the Archive</h2>
          <p className="mt-3 text-neutral-500">Three years of competition papers and practice materials.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {archiveEntries.map((entry) => (
              <div key={entry.title} className="border border-white/10 bg-[#181b24] p-6">
                <p className="font-mono text-xs text-neutral-500">{entry.year}</p>
                <h3 className="mt-2 font-serif text-lg font-semibold text-white">{entry.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-400">{entry.description}</p>
                <Link
                  href={entry.href}
                  className="mt-4 inline-block text-sm font-medium text-amber-500 transition hover:text-amber-400"
                >
                  {entry.action} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#131620]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="font-serif text-3xl text-white sm:text-4xl">Support RMC</h2>
          <p className="mt-4 max-w-2xl leading-7 text-neutral-400">
            RMC is free for students in its inaugural year. Sponsors make it possible to keep
            registration open, develop original problems, and build tools like the live buzzer platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {sponsorTiers.map((tier) => (
              <span
                key={tier.name}
                className="border border-white/15 px-4 py-2 text-sm text-neutral-400"
              >
                {tier.name}
              </span>
            ))}
          </div>
          <Link
            href="/sponsors"
            className="mt-8 inline-block text-sm font-medium text-amber-400 transition hover:text-amber-300"
          >
            Become a sponsor &rarr;
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
