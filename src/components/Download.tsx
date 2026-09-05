import { links } from "@/lib/links";
import { Version } from "./Version";
import { StoreBadge } from "./StoreBadge";
import { Mark } from "./PixelIcon";

const direct = [
  {
    label: "Windows installer",
    file: "Kickerino-win-Setup.exe",
    note: "Installs per user, updates itself in the background.",
    href: links.winSetup,
  },
  {
    label: "Windows portable",
    file: "Kickerino-win-Portable.zip",
    note: "Unzip and run. Keep both executables together.",
    href: links.winPortable,
  },
  {
    label: "Linux",
    file: "Kickerino.AppImage",
    note: "chmod +x and run. Self updating when writable.",
    href: links.linux,
  },
];

export function Download() {
  return (
    <section id="download" className="border-b rule bg-ink-2">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="mb-12 flex items-center gap-4">
          <Mark size={48} />
          <div>
            <p className="stamp">
              <span className="text-mint">04</span> {"//"} download
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get Kickerino</h2>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col justify-between gap-8 rounded-lg border border-mint/40 bg-panel p-8">
            <div>
              <p className="pixel-tag mb-3">Coming soon</p>
              <h3 className="text-2xl font-semibold">Microsoft Store</h3>
              <p className="mt-2 max-w-md text-fog">
                One click install, automatic updates and no SmartScreen prompts. Windows 10 and later.
                The Store listing is in certification. Use a direct download until it is live.
              </p>
            </div>
            <StoreBadge large />
          </div>

          <ul className="flex flex-col gap-4">
            {direct.map((d) => (
              <li key={d.file}>
                <a
                  href={d.href}
                  className="btn-ghost group flex flex-col items-start gap-2 rounded-lg p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span>
                    <span className="block font-semibold text-white">{d.label}</span>
                    <span className="mt-0.5 block text-sm text-fog/70">{d.note}</span>
                  </span>
                  <span className="stamp break-all group-hover:text-mint sm:shrink-0">{d.file}</span>
                </a>
              </li>
            ))}
            <li className="flex flex-col items-start gap-2 rounded-lg border border-dashed sm:flex-row sm:items-center sm:justify-between sm:gap-4 border-line-2 p-5 text-moss">
              <span>
                <span className="block font-semibold">macOS</span>
                <span className="mt-0.5 block text-sm">Signed and notarised build in progress.</span>
              </span>
              <span className="pixel-tag shrink-0 text-moss">Coming soon</span>
            </li>
          </ul>
        </div>

        <p className="stamp mt-8">
          Direct downloads are the <Version fallback="latest release" /> from{" "}
          <a href={links.releases} className="underline underline-offset-4 hover:text-mint">
            GitHub Releases
          </a>{" "}
          and use Velopack for in app updates. Unsigned builds may show a SmartScreen warning.
        </p>
      </div>
    </section>
  );
}
