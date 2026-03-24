import Link from "next/link";

const competition = [
  { href: "/", label: "Home" },
  { href: "/registration", label: "Registration" },
  { href: "/rounds", label: "Rounds" },
  { href: "/problems", label: "Problems" },
];

const resources = [
  { href: "/archive", label: "Archive" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/buzzer", label: "Buzzer Platform" },
  { href: "/rounds#honor-code", label: "Rules & Honor Code" },
];

const info = [
  { href: "/rounds#faq", label: "FAQ" },
  { href: "/registration#volunteer-form", label: "Volunteer Interest" },
  { href: "/sponsors#inquiry", label: "Sponsor Inquiry" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--dark-bg)] text-[var(--dark-text)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.3fr_0.6fr_0.6fr_0.5fr] lg:px-10">
        <div>
          <p className="font-serif text-lg font-bold text-white">RMC</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-400">
            Rule Mathematics Competition — a rigorous multi-round competition
            for grades 6 through 12, covering algebra, combinatorics, geometry,
            and number theory.
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            Inaugural edition: October 2026
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Competition
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            {competition.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-neutral-400 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Resources
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            {resources.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-neutral-400 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Info
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            {info.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-neutral-400 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-4 lg:px-10">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Rule Mathematics Competition
          </p>
        </div>
      </div>
    </footer>
  );
}
