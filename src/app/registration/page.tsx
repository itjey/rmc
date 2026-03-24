import Link from "next/link";
import { registerContestant, registerVolunteer } from "@/app/actions";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  eligibility,
  proctoringNotes,
  registrationChecklist,
  schedule,
} from "@/lib/content";

export default async function RegistrationPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      {/* PAGE HEADER */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            Now open
          </p>
          <h1 className="mt-3 font-serif text-5xl text-[var(--foreground)]">
            Registration
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Registration for the inaugural edition of RMC Mathematics
            Competition is open and free for all students in grades 6 through
            12. Complete the student form to secure your spot, and use the
            volunteer form if an adult would like to help proctor or coordinate.
          </p>
          {params.message && (
            <p className="mt-5 inline-block border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-4 py-2.5 text-sm font-medium text-[var(--accent)]">
              {params.message}
            </p>
          )}
        </div>
      </section>

      {/* TWO-COLUMN LAYOUT */}
      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* LEFT COLUMN — Information */}
          <div className="space-y-10">
            {/* Eligibility */}
            <section>
              <h2 className="font-serif text-3xl text-[var(--foreground)]">
                Eligibility
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                The competition is split into two divisions so every student
                faces problems scaled to their level: Middle School for grades
                6&ndash;8 and Upper School for grades 9&ndash;12.
              </p>
              <div className="mt-6 space-y-5">
                {eligibility.map((item) => (
                  <div
                    key={item.label}
                    className="border-l-2 border-[var(--accent)] pl-5"
                  >
                    <h3 className="text-sm font-semibold text-[var(--foreground)]">
                      {item.label}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Team Formation */}
            <section className="border border-[var(--border)] bg-[var(--surface)] p-7">
              <h2 className="font-serif text-2xl text-[var(--foreground)]">
                Team formation
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm leading-6 text-[var(--muted)]">
                <li className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-[var(--accent)]">&#9670;</span>
                  Teams consist of 4 to 6 students, typically from the same
                  school or math program.
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-[var(--accent)]">&#9670;</span>
                  Same-school teams are preferred, but mixed teams from
                  different schools are permitted for the inaugural year with
                  prior approval.
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-[var(--accent)]">&#9670;</span>
                  Students without a team may register individually and request
                  placement with other unaffiliated registrants.
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-[var(--accent)]">&#9670;</span>
                  One student or coach should register the team; individual
                  members register separately with a matching team preference.
                </li>
              </ul>
            </section>

            {/* Registration Checklist */}
            <section>
              <h2 className="font-serif text-2xl text-[var(--foreground)]">
                Registration checklist
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Make sure you have the following information ready before
                filling out the student form.
              </p>
              <ul className="mt-5 space-y-3">
                {registrationChecklist.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8.5l3.5 3.5 6.5-7" />
                    </svg>
                    <span className="text-[var(--muted)]">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Parent/Guardian Consent */}
            <section className="border border-[var(--border)] bg-[var(--surface)] p-7">
              <h2 className="font-serif text-2xl text-[var(--foreground)]">
                Parent or guardian consent
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Parent or guardian consent is required for all students under
                18. The registration form collects a guardian name and email so
                we can confirm consent and coordinate proctoring logistics.
                Guardians will receive a confirmation email after registration.
              </p>
            </section>

            {/* Proctoring Requirements */}
            <section>
              <h2 className="font-serif text-2xl text-[var(--foreground)]">
                Proctoring requirements
              </h2>
              <div className="mt-4 space-y-4">
                {proctoringNotes.map((item, i) => (
                  <div key={item} className="flex gap-4 text-sm leading-6">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-[var(--accent)] text-xs font-semibold text-[var(--accent)]">
                      {i + 1}
                    </span>
                    <p className="text-[var(--muted)]">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Schedule */}
            <section className="border border-[var(--border)] bg-[var(--surface)] p-7">
              <h2 className="font-serif text-2xl text-[var(--foreground)]">
                Competition schedule
              </h2>
              <div className="mt-5 divide-y divide-[var(--border)]">
                {schedule.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-1 py-3 sm:grid-cols-[170px_1fr]"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                      {item.label}
                    </span>
                    <span className="text-sm text-[var(--foreground)]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* No Fee + Honor Code */}
            <div className="grid gap-6 sm:grid-cols-2">
              <section className="border border-[var(--border)] bg-[var(--surface)] p-7">
                <h3 className="font-serif text-xl text-[var(--foreground)]">
                  No registration fee
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  The inaugural edition has no registration fee for any student
                  or team. We want to remove financial barriers and make the
                  competition accessible to as many students as possible.
                </p>
              </section>
              <section className="border border-[var(--border)] bg-[var(--surface)] p-7">
                <h3 className="font-serif text-xl text-[var(--foreground)]">
                  Honor code
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  All participants agree to the competition honor code
                  covering academic integrity, allowed materials, and conduct.{" "}
                  <Link
                    href="/rounds#honor-code"
                    className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-2 hover:decoration-[var(--accent)]"
                  >
                    Read the full honor code
                  </Link>
                </p>
              </section>
            </div>
          </div>

          {/* RIGHT COLUMN — Forms */}
          <aside className="space-y-10">
            {/* Student Registration Form */}
            <section
              id="student-form"
              className="border border-[var(--border)] bg-[var(--surface)] p-8"
            >
              <h2 className="font-serif text-3xl text-[var(--foreground)]">
                Student registration
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Fill out every field to register as a contestant. Fields marked
                with an asterisk are required by the system.
              </p>
              <form action={registerContestant} className="mt-6 grid gap-3">
                <input
                  name="name"
                  placeholder="Full name"
                  className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Student email"
                  className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                />
                <input
                  name="school"
                  placeholder="School or program"
                  className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                />
                <input
                  name="country"
                  placeholder="Country"
                  className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <select
                    name="grade"
                    className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)]"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Grade
                    </option>
                    <option value="6">Grade 6</option>
                    <option value="7">Grade 7</option>
                    <option value="8">Grade 8</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                  <select
                    name="division"
                    className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)]"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Division
                    </option>
                    <option value="Middle School">Middle School</option>
                    <option value="Upper School">Upper School</option>
                  </select>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    name="graduationYear"
                    placeholder="Graduation year"
                    className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                  />
                  <input
                    name="timezone"
                    placeholder="Time zone"
                    className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    name="city"
                    placeholder="City"
                    className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                  />
                  <input
                    name="state"
                    placeholder="State or region"
                    className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                  />
                </div>
                <input
                  name="teamPreference"
                  placeholder="Team preference"
                  className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    name="guardianName"
                    placeholder="Parent or guardian name"
                    className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                  />
                  <input
                    name="guardianEmail"
                    type="email"
                    placeholder="Parent or guardian email"
                    className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                  />
                </div>
                <label className="mt-3 flex items-start gap-3 border border-[var(--border)] bg-[var(--background)] p-4">
                  <input
                    type="checkbox"
                    name="honorCodeAgreement"
                    required
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
                  />
                  <span className="text-xs leading-5 text-[var(--muted)]">
                    I have read and agree to the{" "}
                    <a
                      href="/rounds#honor-code"
                      target="_blank"
                      className="font-medium text-[var(--accent)] underline"
                    >
                      RMC Honor Code
                    </a>
                    . I understand that all rounds are monitored via proctor
                    recording and webcam, that my session activity is tracked on
                    the platform, and that any violation of the honor code will
                    result in disqualification. I commit to completing all work
                    honestly and independently.
                  </span>
                </label>
                <button className="mt-3 bg-[var(--accent)] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#7c3610]">
                  Submit student registration
                </button>
              </form>
            </section>

            {/* Volunteer / Proctor Form */}
            <section
              id="volunteer-form"
              className="border border-[var(--border)] bg-[var(--surface)] p-8"
            >
              <h2 className="font-serif text-3xl text-[var(--foreground)]">
                Volunteer and proctor interest
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                This form is for adults only: parent volunteers, school
                coordinators, remote proctors, and room staff.
              </p>
              <form action={registerVolunteer} className="mt-6 grid gap-3">
                <input
                  name="name"
                  placeholder="Adult full name"
                  className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Adult email"
                  className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    name="city"
                    placeholder="City"
                    className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                  />
                  <input
                    name="state"
                    placeholder="State or region"
                    className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <select
                    name="role"
                    className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)]"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Role
                    </option>
                    <option value="Parent volunteer">Parent volunteer</option>
                    <option value="Remote proctor">Remote proctor</option>
                    <option value="School coordinator">School coordinator</option>
                    <option value="Room staff">Room staff</option>
                  </select>
                  <select
                    name="ageBracket"
                    className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)]"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Age bracket
                    </option>
                    <option value="18-24">18-24</option>
                    <option value="25-39">25-39</option>
                    <option value="40-54">40-54</option>
                    <option value="55+">55+</option>
                  </select>
                </div>
                <input
                  name="affiliation"
                  placeholder="School, student, or program affiliation"
                  className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                />
                <input
                  name="availability"
                  placeholder="Availability and time zone"
                  className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                />
                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Notes"
                  className="w-full border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                />
                <button className="mt-2 bg-[var(--accent)] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#7c3610]">
                  Submit volunteer interest
                </button>
              </form>
            </section>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
