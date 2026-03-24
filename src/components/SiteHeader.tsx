"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/registration", label: "Registration" },
  { href: "/rounds", label: "Rounds" },
  { href: "/problems", label: "Problems" },
  { href: "/archive", label: "Archive" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/buzzer", label: "Buzzer" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-transparent" style={{ borderColor: "var(--header-border)" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5 lg:px-10">
        <Link href="/" className="min-w-0 shrink-0">
          <p className="font-serif text-lg font-bold tracking-tight text-[--header-fg]">
            RMC
          </p>
          <p className="mt-0.5 text-xs tracking-wide text-[--header-muted]">
            Rule Mathematics Competition
          </p>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[--header-muted] md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-amber-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="flex h-8 w-8 items-center justify-center text-[--header-muted] md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="17" y2="6" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="14" x2="17" y2="14" />
              </>
            )}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="border-t px-6 py-4 md:hidden" style={{ borderColor: "var(--header-border)" }}>
          <div className="flex flex-col gap-3 text-sm text-[--header-muted]">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="transition-colors hover:text-amber-500"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
