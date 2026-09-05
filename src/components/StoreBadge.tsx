import { links } from "@/lib/links";

export function StoreBadge({ large = false }: { large?: boolean }) {
  return (
    <a
      href={links.store}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get Kickerino from the Microsoft Store"
      className={`inline-flex items-center gap-3 rounded-md border border-white/20 bg-black text-white transition hover:border-white/50 hover:bg-[#0c0c0c] ${
        large ? "px-6 py-4" : "px-4 py-2.5"
      }`}
    >
      <svg width={large ? 34 : 26} height={large ? 34 : 26} viewBox="0 0 24 24" aria-hidden>
        <path fill="#f25022" d="M1 1h10.5v10.5H1z" />
        <path fill="#7fba00" d="M12.5 1H23v10.5H12.5z" />
        <path fill="#00a4ef" d="M1 12.5h10.5V23H1z" />
        <path fill="#ffb900" d="M12.5 12.5H23V23H12.5z" />
      </svg>
      <span className="flex flex-col leading-none text-left">
        <span className={`text-white/70 ${large ? "text-xs" : "text-[10px]"}`}>Get it from</span>
        <span className={`font-semibold ${large ? "text-xl" : "text-base"}`}>Microsoft Store</span>
      </span>
    </a>
  );
}
