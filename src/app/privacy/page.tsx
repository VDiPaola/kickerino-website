import type { Metadata } from "next";
import { HomeLink } from "@/components/HomeScroll";
import { Mark } from "@/components/PixelIcon";
import { links } from "@/lib/links";

export const metadata: Metadata = {
  title: "Privacy Policy | Kickerino",
  description: "What data Kickerino handles, where it is stored, and which external services it communicates with.",
};

export default function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <HomeLink className="flex items-center gap-2.5 font-semibold">
        <Mark /> Kickerino
      </HomeLink>
      <p className="stamp mt-12">Last updated 30 August 2026</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-fog">
        Kickerino is a desktop chat client for <a href="https://kick.com" className="underline underline-offset-4 hover:text-mint">Kick.com</a>.
        This policy explains what data Kickerino handles, where it is stored, and which external services it communicates with.
      </p>

      <div className="mt-10 space-y-10 text-fog [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-mint [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-mint">
        <section>
          <h2>Summary</h2>
          <ul>
            <li>Kickerino does <b>not</b> collect, transmit, or sell personal data to the developer.</li>
            <li>Kickerino contains <b>no</b> telemetry, analytics, or advertising.</li>
            <li>Settings and authentication data are stored <b>locally</b> on your device.</li>
            <li>Kickerino does <b>not</b> operate a backend server or proxy your data through developer-controlled infrastructure.</li>
            <li>Kickerino communicates <b>directly</b> with Kick.com, 7TV, and jsDelivr as described below.</li>
          </ul>
        </section>

        <section>
          <h2>Data stored on your device</h2>
          <p>
            Kickerino stores application data in its local configuration directory (<code>%APPDATA%\Kickerino</code> on Windows), including:
          </p>
          <ul>
            <li><code>settings.json</code>: user preferences and window state</li>
            <li><code>state.json</code>: open chatrooms, muted users, recent emotes, and cached session identifiers</li>
            <li><code>auth.json</code>: Kick.com session cookies used for authentication</li>
            <li><code>sounds/</code>: notification sound files</li>
          </ul>
          <p className="mt-3">Downloaded emotes, badges, and profile images are also cached locally to reduce network use.</p>
          <p className="mt-3">
            This data is not uploaded to or stored on servers operated by the Kickerino developer. It remains on your device unless you
            choose to provide or transmit it through the application&apos;s normal interactions with external services such as Kick.com.
          </p>
        </section>

        <section>
          <h2>Sign in and session cookies</h2>
          <p>Kickerino uses Kick.com session cookies to authenticate with Kick.com. You can sign in in three ways:</p>
          <ul>
            <li>
              <b>Browser import:</b> When you explicitly choose Quick Login, Kickerino reads the Kick.com cookies from a supported browser
              installed on your device. The app only looks for cookies associated with Kick.com and does not import cookies for unrelated
              websites. The resulting Kick.com session information is stored locally and is used to authenticate with Kick.com.
            </li>
            <li>
              <b>WebView2 login:</b> Kickerino can open a login window displaying the official Kick.com sign-in page. Your credentials are
              entered directly into Kick.com and are not provided to or stored by Kickerino.
            </li>
            <li>
              <b>Manual paste:</b> You can manually provide your Kick.com session cookie values to Kickerino.
            </li>
          </ul>
          <p className="mt-3">
            Kickerino does not send your credentials, browser cookies, or authentication tokens to the developer. The developer operates
            no authentication server or backend through which these credentials are processed.
          </p>
        </section>

        <section>
          <h2>Network connections</h2>
          <p>Kickerino communicates directly with the following external services:</p>
          <ul>
            <li>
              <b>Kick.com:</b> Used for chat, channel information, emotes, moderation actions, authentication, and other core application
              functionality. Messages you send are transmitted directly to Kick.com.
            </li>
            <li>
              <b>7TV:</b> Used to retrieve emote sets, badges, cosmetics, and related emote information.
            </li>
            <li>
              <b>jsDelivr:</b> Used to retrieve Twemoji images displayed for Unicode emoji in chat. These resources are cached locally after
              download.
            </li>
          </ul>
          <p className="mt-3">
            Kickerino does not operate a proxy or intermediary server for these connections. The developer cannot see your Kick.com
            messages, authentication credentials, cookies, or chat activity through Kickerino&apos;s infrastructure.
          </p>
          <p className="mt-3">Each service&apos;s own privacy policy applies to the data it processes:</p>
          <ul>
            <li>
              Kick.com: <a href="https://kick.com/privacy-policy">kick.com/privacy-policy</a>
            </li>
            <li>
              7TV: <a href="https://7tv.app/legal/privacy">7tv.app/legal/privacy</a>
            </li>
            <li>
              jsDelivr:{" "}
              <a href="https://www.jsdelivr.com/terms/privacy-policy-jsdelivr-net">jsdelivr.com/terms/privacy-policy-jsdelivr-net</a>
            </li>
          </ul>
        </section>

        <section>
          <h2>Data sharing</h2>
          <p>Kickerino does not share your personal data with the developer or third parties through developer-operated servers.</p>
          <p className="mt-3">
            The application does communicate directly with Kick.com, 7TV, and jsDelivr as described in this policy. Those services may
            process information according to their own privacy policies.
          </p>
        </section>

        <section>
          <h2>Children</h2>
          <p>Kickerino is a client for Kick.com. Users should comply with Kick.com&apos;s applicable age requirements when using the service.</p>
        </section>

        <section>
          <h2>Changes</h2>
          <p>Changes to this policy will be published on this page with an updated date.</p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            For questions about this privacy policy: <a href={links.contact}>{links.contactEmail}</a>
          </p>
        </section>
      </div>
    </main>
  );
}
