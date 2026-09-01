import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/PixelIcon";
import { links } from "@/lib/links";

export const metadata: Metadata = {
  title: "Privacy Policy | Kickerino",
  description: "What data Kickerino handles and where it goes.",
};

export default function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/" className="flex items-center gap-2.5 font-semibold">
        <Mark /> Kickerino
      </Link>
      <p className="stamp mt-12">Last updated 30 August 2026</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">Privacy Policy</h1>

      <div className="mt-10 space-y-10 text-fog [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-mint [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-mint">
        <section>
          <h2>Summary</h2>
          <ul>
            <li>Kickerino does not collect, transmit, or sell any personal data to the developer.</li>
            <li>The app contains no telemetry, analytics, or advertising.</li>
            <li>All settings and session data are stored locally on your device.</li>
            <li>The app communicates only with Kick.com and 7TV to provide chat functionality.</li>
          </ul>
        </section>

        <section>
          <h2>Data stored on your device</h2>
          <p>
            Kickerino stores the following files in your local configuration directory (<code>%APPDATA%\Kickerino</code> on Windows,{" "}
            <code>~/.config/Kickerino</code> on Linux):
          </p>
          <ul>
            <li><code>settings.json</code>: user preferences and window state</li>
            <li><code>state.json</code>: open chatrooms, muted users, recent emotes, and cached session identifiers</li>
            <li><code>auth.json</code>: Kick session cookies used to sign in</li>
            <li><code>sounds/</code>: notification sound files</li>
          </ul>
          <p className="mt-3">
            Downloaded emotes, badges, and profile images are cached in the local cache directory to reduce network use. All of this
            data stays on your device. Uninstalling the app removes it.
          </p>
        </section>

        <section>
          <h2>Sign in and session cookies</h2>
          <p>Kickerino signs in to Kick using session cookies. You can provide them in three ways:</p>
          <ol>
            <li>
              <b>Browser import</b>: with your explicit action, the app reads Kick.com cookies from a browser installed on your device.
              Only Kick.com cookies are read. They are stored locally in <code>auth.json</code> and are never sent anywhere except to
              Kick.com itself.
            </li>
            <li>
              <b>WebView2 login</b>: a login window loads the official Kick.com sign in page. Credentials are entered directly on Kick&apos;s
              site and are never visible to Kickerino.
            </li>
            <li>
              <b>Manual paste</b>: you paste cookie values yourself.
            </li>
          </ol>
          <p className="mt-3">The developer never receives your credentials, cookies, or tokens.</p>
        </section>

        <section>
          <h2>Network connections</h2>
          <p>The app connects to these services, and only to provide chat features:</p>
          <ul>
            <li>
              <b>Kick.com</b> (REST API and Pusher websocket): chat messages, channel data, emotes, moderation actions, and
              authentication. <a href="https://kick.com/privacy-policy">Kick&apos;s privacy policy</a> applies.
            </li>
            <li>
              <b>7TV</b> (REST API and EventAPI websocket): emote sets, badges, and cosmetics.{" "}
              <a href="https://7tv.app/legal/privacy">7TV&apos;s privacy policy</a> applies.
            </li>
          </ul>
          <p className="mt-3">
            Messages you send go directly to Kick. The developer operates no servers and cannot see your messages or activity.
          </p>
        </section>

        <section>
          <h2>Data sharing</h2>
          <p>None. The developer receives no data from the app and therefore shares none.</p>
        </section>

        <section>
          <h2>Children</h2>
          <p>Kickerino is a client for Kick.com and is subject to Kick&apos;s own age requirements.</p>
        </section>

        <section>
          <h2>Changes</h2>
          <p>Changes to this policy will be published on this page with an updated date.</p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about this policy: <a href={links.contact}>contact@example.com</a>
          </p>
        </section>
      </div>
    </main>
  );
}
