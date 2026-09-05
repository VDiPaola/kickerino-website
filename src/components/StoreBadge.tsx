export function StoreBadge({ large = false }: { large?: boolean }) {
  return (
    <div
      role="img"
      aria-label="Microsoft Store listing coming soon"
      className={`relative inline-flex select-none items-center gap-3 rounded-md border border-white/20 bg-black text-white ${
        large ? "px-6 py-4" : "px-4 py-2.5"
      }`}
    >
      <div className="flex items-center gap-3 opacity-40">
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
      </div>
      <span
        aria-hidden
        className="pixel-tag absolute inset-0 flex items-center justify-center"
      >
        <span className="-rotate-6 bg-green px-3 py-1.5 text-black shadow-[3px_3px_0_0_#0a5c1c]">
          Coming soon
        </span>
      </span>
    </div>
  );
}
