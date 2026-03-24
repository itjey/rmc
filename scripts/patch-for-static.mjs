import { readFileSync, writeFileSync, rmSync } from "fs";

function patch(file, replacements) {
  let src = readFileSync(file, "utf8");
  for (const [find, replace] of replacements) {
    if (find instanceof RegExp) {
      src = src.replace(find, replace);
    } else {
      src = src.replaceAll(find, replace);
    }
  }
  writeFileSync(file, src);
}

patch("src/app/registration/page.tsx", [
  ['import { registerContestant, registerVolunteer } from "@/app/actions";\n', ""],
  ["action={registerContestant}", 'action="#"'],
  ["action={registerVolunteer}", 'action="#"'],
  [
    `export default async function RegistrationPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;`,
    `export default async function RegistrationPage() {
  const params = { message: "" };`,
  ],
]);

patch("src/app/contest/page.tsx", [
  ['import type { Problem, Submission } from "@prisma/client";\n', ""],
  ['import { submitAnswer } from "@/app/actions";\n', ""],
  ["action={submitAnswer}", 'action="#"'],
  ["let submitAnswer: any = async () => {};\n", ""],
  ['try {\n  const mod = require("@/app/actions");\n  submitAnswer = mod.submitAnswer;\n} catch {}\n', ""],
  [": Problem,", ": any,"],
  [": Submission & { problem: Problem }", ": any"],
]);

writeFileSync(
  "src/app/admin/page.tsx",
  `import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-6 py-20 text-center lg:px-10">
        <h1 className="font-serif text-4xl font-bold text-white">Admin</h1>
        <p className="mt-4 text-[var(--muted)]">Requires server environment.</p>
      </div>
      <SiteFooter />
    </main>
  );
}
`
);

rmSync("src/app/api", { recursive: true, force: true });
console.log("Patched for static export");
