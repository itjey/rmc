import type { Metadata } from "next";
import { Manrope, Sora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const display = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RMC — Rule Mathematics Competition",
  description:
    "A rigorous multi-round mathematics competition for grades 6–12 featuring individual, team, sprint, and live buzzer rounds across algebra, combinatorics, geometry, and number theory.",
  openGraph: {
    title: "RMC — Rule Mathematics Competition",
    description:
      "Four rounds. Four subjects. One serious test of mathematical reasoning.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
