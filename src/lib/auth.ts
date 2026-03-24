import { cookies } from "next/headers";

const key = "rule_admin";

export async function isAdmin() {
  const store = await cookies();
  return store.get(key)?.value === process.env.ADMIN_PASSWORD;
}

export async function setAdminCookie() {
  const store = await cookies();
  store.set(key, process.env.ADMIN_PASSWORD || "rule-admin", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.set(key, "", { path: "/", maxAge: 0 });
}
