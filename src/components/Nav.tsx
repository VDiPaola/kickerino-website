import Link from "next/link";
import { Mark } from "./PixelIcon";
import { Version } from "./Version";

const items = [
  ["Features", "/#features"],
  ["Screens", "/#screens"],
  ["Commands", "/#commands"],
  ["What's new", "/whats-new"],
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
        <ul className="hidden md:flex items-center gap-7 text-sm text-fog">
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
