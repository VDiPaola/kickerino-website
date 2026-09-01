import { LiveChat } from "./LiveChat";
import { StoreBadge } from "./StoreBadge";
import { links } from "@/lib/links";

const direct = [
  ["Windows installer", links.winSetup],
  ["Windows portable", links.winPortable],
  ["Linux AppImage", links.linux],
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b rule">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:pt-24">
        <div>
          <h1 className="text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            The Best
            <br />
            Chat Experience
            <br />
            <span className="text-mint">Made for Kick</span>
          </h1>
          <p className="mt-7 max-w-md text-lg text-fog">
            chatrooms, 7TV support, mod tools, notifications, and more.
            Written in Rust.
          </p>

          <div className="mt-9 flex flex-col items-start gap-5">
            <StoreBadge large />
            <div className="stamp flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>or direct:</span>
              {direct.map(([label, href]) => (
                <a key={href} href={href} className="text-fog underline decoration-line-2 underline-offset-4 hover:text-mint">
                  {label}
                </a>
              ))}
              <span>macOS soon</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <LiveChat />
        </div>
      </div>
    </section>
  );
}
