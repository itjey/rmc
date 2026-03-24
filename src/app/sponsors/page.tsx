import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { sponsorTiers, sponsorPitch, rounds } from "@/lib/content";

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <section className="bg-[#0a0c10] text-[var(--foreground)]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
          <h1 className="max-w-3xl font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Partner With RMC
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            Help build the next serious mathematics competition for students
            nationwide
          </p>
          <p className="mt-8 max-w-2xl leading-7 text-[var(--muted)]">
            {sponsorPitch.mission}
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="inline-flex items-center bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
            >
              Download Sponsorship Prospectus (PDF)
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[var(--accent-light)]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
            Our Audience
          </h2>
          <p className="mt-6 max-w-3xl leading-7 text-[var(--muted)]">
            {sponsorPitch.audience}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Grades 6\u201312", "Four competition rounds", "National reach"].map(
              (stat) => (
                <span
                  key={stat}
                  className="border border-[var(--accent)]/20 bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--accent)]"
                >
                  {stat}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
            Competitor Pipeline & Alumni
          </h2>
          <p className="mt-6 max-w-3xl leading-7 text-[var(--muted)]">
            RMC attracts the brightest quantitative minds from across the country. Our participants are heavily recruited by elite universities and subsequently by top-tier financial and tech firms.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="border border-[var(--border)] bg-[var(--background)] p-6 text-center">
              <p className="text-3xl font-bold text-white">85%</p>
              <p className="mt-2 text-sm text-[var(--muted)]">Target top-20 STEM universities</p>
            </div>
            <div className="border border-[var(--border)] bg-[var(--background)] p-6 text-center">
              <p className="text-3xl font-bold text-white">600+</p>
              <p className="mt-2 text-sm text-[var(--muted)]">Calculus & higher math experience</p>
            </div>
            <div className="border border-[var(--border)] bg-[var(--background)] p-6 text-center">
              <p className="text-3xl font-bold text-white">99th</p>
              <p className="mt-2 text-sm text-[var(--muted)]">Percentile standardized test scores</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
            Why Sponsor RMC
          </h2>
          <ul className="mt-8 max-w-3xl space-y-4">
            {sponsorPitch.whySponsor.map((reason) => (
              <li key={reason} className="flex items-start gap-3">
                <span className="mt-1.5 block h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                <span className="leading-7 text-[var(--muted)]">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
            What Funding Supports
          </h2>
          <ul className="mt-8 max-w-3xl space-y-4">
            {sponsorPitch.whatFundingSupports.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 block h-2 w-2 shrink-0 bg-[var(--accent)]" />
                <span className="leading-7 text-[var(--muted)]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
            Sponsorship Tiers
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sponsorTiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`border bg-[var(--surface)] p-6 ${
                  i === 0
                    ? "border-[var(--accent)] border-2 sm:col-span-2 lg:col-span-1 lg:row-span-2"
                    : "border-[var(--border)]"
                }`}
              >
                <h3
                  className={`font-serif font-bold text-[var(--foreground)] ${
                    i === 0 ? "text-2xl" : "text-xl"
                  }`}
                >
                  {tier.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {tier.description}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {tier.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2.5 text-sm leading-6 text-[var(--foreground)]"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="mt-1 shrink-0"
                      >
                        <path
                          d="M3 8.5L6.5 12L13 4"
                          stroke="var(--accent)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
            Sponsor a Specific Round
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
            Round sponsors receive naming rights and featured branding across all
            materials for that round.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {rounds.map((round) => (
              <div
                key={round.slug}
                className="border border-[var(--border)] bg-[var(--surface)] p-6"
                style={{ borderLeftWidth: "4px", borderLeftColor: round.color }}
              >
                <h3 className="font-serif text-xl font-semibold text-[var(--foreground)]">
                  {round.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-[var(--muted)]">
                  <span>{round.duration}</span>
                  <span>{round.problems}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  Naming rights available. Your organization&apos;s name appears
                  on all {round.title.toLowerCase()} materials, problem packets,
                  and results pages.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="inquiry" className="bg-[#0a0c10] text-[var(--foreground)]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
          <h2 className="font-serif text-3xl text-white sm:text-4xl">
            Interested in Sponsoring RMC?
          </h2>
          <p className="mt-6 max-w-2xl leading-7 text-[var(--muted)]">
            We welcome partnerships at every level. Contact us to discuss how
            your organization can support the next generation of mathematical
            thinkers.
          </p>
          <a
            href="mailto:sponsors@therulemath.org"
            className="mt-8 inline-flex items-center bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
          >
            sponsors@therulemath.org
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
