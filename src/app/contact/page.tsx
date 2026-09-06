import type { Metadata } from "next";
import { HomeLink } from "@/components/HomeScroll";
import { Mark } from "@/components/PixelIcon";
import { links } from "@/lib/links";

export const metadata: Metadata = {
  title: "Contact | Kickerino",
  description: "Get in touch about Kickerino by email or Discord.",
};

export default function Contact() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <HomeLink className="flex items-center gap-2.5 font-semibold">
        <Mark /> Kickerino
      </HomeLink>

      <p className="stamp mt-12">
        <span className="text-mint">{">"}</span> {"//"} contact
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">Get in touch</h1>
      <p className="mt-3 max-w-md text-fog">
        Bug reports, feature ideas or anything else.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        <a
          href={links.contact}
          className="btn-ghost group flex flex-col items-start gap-2 rounded-lg p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <span>
            <span className="pixel-tag">Email</span>
            <span className="mt-1 block font-semibold text-white">Send me an email</span>
            <span className="mt-0.5 block text-sm text-fog/70">
              Best for bug reports with logs or screenshots attached.
            </span>
          </span>
          <span className="stamp break-all group-hover:text-mint sm:shrink-0">
            {links.contactEmail}
          </span>
        </a>

        <a
          href={links.discordServer}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost group flex flex-col items-start gap-2 rounded-lg p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <span>
            <span className="pixel-tag">Discord</span>
            <span className="mt-1 block font-semibold text-white">Join the StreamBench Discord server</span>
            <span className="mt-0.5 block text-sm text-fog/70">
              Chat with other users, or message me directly at{" "}
              <b className="text-fog">{links.discordUser}</b>.
            </span>
          </span>
        </a>
      </div>

      <p className="stamp mt-10">
        <HomeLink className="underline underline-offset-4 hover:text-mint">
          Back to home
        </HomeLink>
      </p>
    </main>
  );
}
