import Link from "next/link";
import { links } from "@/lib/links";

export function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-4 text-sm text-moss sm:flex-row sm:items-center sm:justify-between">
          <p>Kickerino by StreamBench. Not affiliated with Kick.com or 7TV.</p>
          <nav className="flex gap-5" aria-label="Footer">
            <Link href="/privacy" className="hover:text-mint">
              Privacy
            </Link>
            <a href={links.releases} className="hover:text-mint">
              Releases
            </a>
            <Link href="/contact" className="hover:text-mint">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
