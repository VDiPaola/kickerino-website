import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/PixelIcon";
import { ReleaseNotes } from "@/components/ReleaseNotes";

export const metadata: Metadata = {
  title: "What's new | Kickerino",
  description: "Release notes for the latest Kickerino version.",
};

export default function WhatsNew() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/" className="flex items-center gap-2.5 font-semibold">
        <Mark /> Kickerino
      </Link>

      <p className="stamp mt-12">
        <span className="text-mint">{">"}</span> {"//"} whats new
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">What&apos;s new</h1>
      <p className="mt-3 max-w-md text-fog">
        Release notes for the latest version.
      </p>

      <ReleaseNotes />

      <p className="stamp mt-10">
        <Link href="/" className="underline underline-offset-4 hover:text-mint">
          Back to home
        </Link>
      </p>
    </main>
  );
}
