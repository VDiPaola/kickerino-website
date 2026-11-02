import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { appThemes, themeVars } from "@/lib/themes";

const emotes = ["/emotes/emote1.avif", "/emotes/emote2.gif"];

type WindowProps = {
  label: string;
  user?: ReactNode;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
};

export function AppWindow({ label, user, style, className = "", children }: WindowProps) {
  return (
    <div
      role="group"
      aria-label={label}
      style={{ ...themeVars(appThemes[0]), ...style }}
      className={`relative flex w-full flex-col overflow-hidden rounded-lg border border-(--w-border) bg-(--w-bg) text-[13px] text-(--w-text) shadow-[0_30px_80px_-20px_rgba(0,255,136,0.2)] transition-colors ${className}`}
    >
      <div className="flex items-center justify-between border-b border-(--w-border) bg-(--w-nav) px-3 py-1.5 text-xs">
        <span className="text-(--w-text3)">Kickerino</span>
        {user ?? <span className="rounded border border-(--w-border) px-2 py-0.5 text-(--w-text2)">enzonik</span>}
        <span className="flex gap-2 text-(--w-text3)" aria-hidden>
          <span>&#8212;</span>
          <span>&#9633;</span>
          <span>&#10005;</span>
        </span>
      </div>
      {children}
    </div>
  );
}

export function StreamHeader({ name, children }: { name: string; children?: ReactNode }) {
  return (
    <div className="flex items-center gap-2 border-b border-(--w-border) px-3 py-2 text-xs">
      <span className="font-semibold">{name}</span>
      <span className="live-dot inline-block h-2 w-2 shrink-0 rounded-full bg-live" />
      {children}
    </div>
  );
}

export function Time({ time }: { time: string }) {
  return <span className="shrink-0 font-mono text-[11px] text-(--w-text3)">{time}</span>;
}

export function Name({ user, color }: { user: string; color: string }) {
  return (
    <span className="font-semibold" style={{ color, filter: "var(--w-name-filter)" }}>
      {user}
    </span>
  );
}

export function Emote({ index }: { index: number }) {
  return (
    <Image
      src={emotes[index % emotes.length]}
      width={24}
      height={24}
      alt=""
      unoptimized
      className="ml-0.5 inline-block h-6 w-6 align-middle"
    />
  );
}

export function ChatInput({ children }: { children?: ReactNode }) {
  return (
    <div className="m-2 flex items-center justify-between rounded-md border border-(--w-border) bg-(--w-input) px-3 py-2">
      {children ?? <span className="text-(--w-text3)">Send a message...</span>}
      <span className="text-[11px] text-(--w-text3)">7TV</span>
    </div>
  );
}

export function LevelBadge({ level }: { level: number }) {
  const tone = level >= 40 ? "#f0b232" : level >= 25 ? "#00d0ff" : level >= 10 ? "#17f640" : "#9aa7b2";
  return (
    <span
      role="img"
      aria-label={`Level ${level}`}
      className="inline-flex h-4 min-w-4 items-center justify-center rounded-[3px] px-0.5 font-mono text-[9px] font-bold leading-none text-black"
      style={{ background: tone }}
    >
      {level}
    </span>
  );
}

export function ModBadge() {
  return (
    <svg role="img" aria-label="Moderator" viewBox="0 0 16 16" className="h-4 w-4">
      <rect width="16" height="16" rx="3" fill="#00c950" />
      <path d="M13 3v2l-5.5 5.5-2-2L11 3ZM4 8l4 4-1 1-4-4ZM4.5 10.5l1 1-2 2-1-1Z" fill="#fff" />
    </svg>
  );
}

export function SubBadge() {
  return (
    <svg role="img" aria-label="Subscriber" viewBox="0 0 16 16" className="h-4 w-4">
      <rect width="16" height="16" rx="3" fill="#7c3aed" />
      <path d="m8 3 1.5 3.1 3.4.5-2.5 2.4.6 3.4L8 10.8l-3 1.6.6-3.4-2.5-2.4 3.4-.5Z" fill="#fff" />
    </svg>
  );
}

type SwitchProps = { on: boolean; onChange: (on: boolean) => void; label: string };

export function Switch({ on, onChange, label }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint ${
        on ? "bg-[#37aa66]" : "bg-[#4c5d53]"
      }`}
    >
      <span
        className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${on ? "translate-x-4" : ""}`}
      />
    </button>
  );
}
