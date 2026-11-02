import Link from "next/link";
import { Mark } from "./PixelIcon";
import { Version } from "./Version";

const items = [
  ["Screens", "/#screens"],
  ["Chatters", "/#chatters"],
  ["Moderators", "/#moderators"],
  ["Streamers", "/#streamers"],
  ["Performance", "/#performance"],
  ["Commands", "/#commands"],
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b rule bg-ink/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5" aria-label="Main">
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Mark />
          Kickerino
          <span className="stamp hidden sm:inline">
            <Version />
          </span>
        </a>
        <ul className="hidden lg:flex items-center gap-6 text-sm text-fog">
          {items.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="hover:text-mint transition-colors">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <a href="#download" className="btn-green px-4 py-1.5 text-sm font-semibold">
          Download
        </a>
      </nav>
    </header>
  );
}
