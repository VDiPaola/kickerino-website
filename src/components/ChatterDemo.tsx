"use client";

import { useState } from "react";
import { appThemes, themeVars } from "@/lib/themes";
import { AppWindow, ChatInput, Emote, Name, StreamHeader, Time } from "./AppWindow";

const streams = [
  { name: "xqc", title: "REACT + GAMES" },
  { name: "Sliker", title: "Just Chatting" },
  { name: "odablock", title: "OSRS PvP grind" },
];

const outcomes = [
  { label: "Yes", share: 62 },
  { label: "No", share: 38 },
];

type Line =
  | { time: string; user: string; color: string; text?: string; emote?: number; deleted?: boolean }
  | { time: string; mod: string; target: string; length: string };

const lines: Line[] = [
  { time: "21:03", user: "PatWiFi", color: "#f0b232", text: "this round is huge" },
  { time: "21:03", user: "Colitepat", color: "#4bd6ff", emote: 1 },
  { time: "21:03", user: "RealityDOSE", color: "#ff5c5c", text: "betting everything on yes" },
  { time: "21:04", user: "Gaben", color: "#ff5c5c", text: "no shot he clutches" },
  { time: "21:04", user: "PogTX", color: "#c74bff", text: "he is three steps ahead" },
  { time: "21:04", user: "Keeks", color: "#ff9c3a", emote: 0 },
  { time: "21:05", user: "sussyguy", color: "#4bd6ff", text: "FREE SUBS click my profile", deleted: true },
  { time: "21:05", mod: "Hydroponicz", target: "sussyguy", length: "10 minutes" },
  { time: "21:05", user: "Tachys", color: "#00d0ff", text: "mods are fast today" },
  { time: "21:06", user: "Leeqo", color: "#c74bff", text: "we are so back", emote: 1 },
  { time: "21:06", user: "MericKat", color: "#ff5c5c", text: "@Hydroponicz W mod" },
];

export function ChatterDemo() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [active, setActive] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const stream = streams[active];

  return (
    <div className="flex flex-col gap-5">
      <AppWindow
        label="Kickerino chat with stream tabs, a prediction, 7TV emotes, a deleted message and a visible moderator action"
        style={themeVars(appThemes[themeIndex])}
        className="h-[560px]"
      >
        <div className="flex flex-wrap gap-1.5 border-b border-(--w-border) bg-(--w-nav) p-2">
          {streams.map((s, i) => (
            <button
              key={s.name}
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={`flex cursor-pointer items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-mint ${
                i === active
                  ? "border-(--w-accent)/60 bg-(--w-sel) text-(--w-text)"
                  : "border-(--w-border) text-(--w-text2) hover:text-(--w-text)"
              }`}
            >
              {s.name}
            </button>
          ))}
          <span className="rounded-md border border-(--w-border) px-2 py-0.5 text-xs text-(--w-text2)">Add +</span>
        </div>

        <StreamHeader name={stream.name}>
          <span className="min-w-0 flex-1 truncate text-(--w-text3)">{stream.title}</span>
          <span className="shrink-0 font-mono text-[11px] text-(--w-accent)">12,450 pts</span>        </StreamHeader>

        <div className="border-b border-(--w-border) bg-(--w-nav) px-3 py-2.5">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="font-semibold">Does he clutch this round?</span>
            <span className="shrink-0 font-mono text-[11px] text-(--w-text3)">0:48 left</span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            {outcomes.map((o, i) => (
              <button
                key={o.label}
                type="button"
                aria-pressed={pick === i}
                onClick={() => setPick(i)}
                className={`relative cursor-pointer overflow-hidden rounded border px-2 py-1.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-mint ${
                  pick === i ? "border-(--w-accent)" : "border-(--w-border) hover:border-(--w-text3)"
                }`}
              >
                <span className="absolute inset-y-0 left-0 bg-(--w-accent)/15" style={{ width: `${o.share}%` }} />
                <span className="relative flex justify-between gap-2">
                  <span className="font-semibold">{o.label}</span>
                  <span className="font-mono text-[11px] text-(--w-text2)">
                    {o.share}% &middot; 1:{(100 / o.share).toFixed(1)}
                  </span>
                </span>
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-[11px] text-(--w-text3)" aria-live="polite">
            {pick === null ? "Pick an outcome to wager channel points" : `500 points on ${outcomes[pick].label}`}
          </p>
        </div>

        <div className="relative flex flex-1 flex-col justify-end overflow-hidden px-2 py-1">
          <span className="absolute right-2 top-2 flex items-center gap-2 rounded-md border border-(--w-border) bg-(--w-nav) px-2 py-1.5 text-[11px] text-(--w-text2) shadow-lg">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-(--w-text)" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden>
              <path d="M4 10V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
              <rect x="3" y="10" width="18" height="10" rx="1.5" />
              <path d="M7 4.6V20M17 4.6V20" />
              <rect x="10" y="8.5" width="4" height="5" rx="1" fill="currentColor" />
            </svg>
            Daily chest ready
          </span>
          {lines.map((l, i) =>
            "mod" in l ? (
              <div key={i} className="flex items-baseline gap-1.5 px-1.5 py-1 text-[12.5px] text-(--w-text3)">
                <Time time={l.time} />
                <span>
                  <span className="font-semibold text-(--w-text2)">{l.mod}</span> timed out{" "}
                  <span className="font-semibold text-(--w-text2)">{l.target}</span> for {l.length}
                </span>
              </div>
            ) : (
              <div
                key={i}
                className={`flex items-baseline gap-1.5 rounded px-1.5 py-1 leading-snug ${i % 2 ? "bg-(--w-row)" : ""}`}
              >
                <Time time={l.time} />
                <span className={`min-w-0 break-words ${l.deleted ? "opacity-55" : ""}`}>
                  <Name user={l.user} color={l.color} />:{" "}
                  {l.text && <span className="text-(--w-text2)">{l.text}</span>}
                  {l.emote !== undefined && <Emote index={l.emote} />}
                </span>
                {l.deleted && (
                  <span className="ml-auto shrink-0 self-center rounded border border-(--w-accent)/50 px-1 text-[10px] uppercase tracking-wider text-(--w-accent)">
                    deleted
                  </span>
                )}
              </div>
            ),
          )}
        </div>

        <div className="border-t border-(--w-border)">
          <ChatInput />
        </div>
      </AppWindow>

      <div>
        <p className="pixel-tag mb-3">8 themes</p>
        <div role="group" aria-label="Preview a chat theme" className="flex flex-wrap gap-2">
          {appThemes.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-pressed={i === themeIndex}
              onClick={() => setThemeIndex(i)}
              className={`flex cursor-pointer items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-mint ${
                i === themeIndex ? "border-mint bg-panel text-white" : "border-line text-fog hover:border-line-2 hover:text-white"
              }`}
            >
              <span
                className="h-3.5 w-3.5 rounded-sm border border-white/20"
                style={{ background: `linear-gradient(135deg, ${t.bg} 50%, ${t.accent} 50%)` }}
                aria-hidden
              />
              {t.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
