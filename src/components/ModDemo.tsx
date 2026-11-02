"use client";

import { useState, type ReactNode } from "react";
import { durationHuman } from "@/lib/format";
import { AppWindow, ChatInput, LevelBadge, ModBadge, Name, StreamHeader, SubBadge, Switch, Time } from "./AppWindow";

type Chatter = { color: string; level: number; mod?: boolean; sub?: boolean; showsLevel?: boolean };

const chatters: Record<string, Chatter> = {
  PatWiFi: { color: "#f0b232", level: 42, sub: true, showsLevel: true },
  ToxicTim: { color: "#ff5c5c", level: 2 },
  Leeqo: { color: "#c74bff", level: 18, sub: true },
  RealityDOSE: { color: "#00ff88", level: 31, mod: true, showsLevel: true },
  twoslav: { color: "#4bd6ff", level: 9 },
};

type Action = "timed out" | "permanently banned";

type Row =
  | { id: number; time: string; user: string; text: string }
  | { id: number; time: string; action: Action; target: string; minutes?: number };

const initialRows: Row[] = [
  { id: 13, time: "21:11", user: "twoslav", text: "gear check?" },
  { id: 14, time: "21:11", user: "PatWiFi", text: "full void lets go" },
  { id: 15, time: "21:11", user: "RealityDOSE", text: "no links in chat please" },
  { id: 8, time: "21:12", user: "Leeqo", text: "first pk trip of the night" },
  { id: 9, time: "21:12", user: "twoslav", text: "he is so back" },
  { id: 10, time: "21:13", user: "PatWiFi", text: "smite incoming" },
  { id: 11, time: "21:13", user: "RealityDOSE", text: "keep it civil chat" },
  { id: 12, time: "21:13", user: "Leeqo", text: "that was a clean KO" },
  { id: 1, time: "21:14", user: "PatWiFi", text: "that was clean" },
  { id: 2, time: "21:14", user: "ToxicTim", text: "streamer is washed lol" },
  { id: 3, time: "21:15", user: "Leeqo", text: "W stream" },
  { id: 4, time: "21:15", user: "ToxicTim", text: "cry about it" },
  { id: 5, time: "21:15", user: "RealityDOSE", text: "chat behave" },
  { id: 6, time: "21:16", user: "twoslav", text: "chat moving too fast" },
  { id: 7, time: "21:16", user: "ToxicTim", text: "nobody is watching this" },
];

const presets = [1, 5, 10, 30, 60, 1440, 10080];

function Badges({ chatter, level }: { chatter: Chatter; level: boolean }) {
  return (
    <span className="mr-1 inline-flex gap-0.5 align-[-3px]">
      {chatter.mod && <ModBadge />}
      {chatter.sub && <SubBadge />}
      {level && <LevelBadge level={chatter.level} />}
    </span>
  );
}

function ActionButton({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded text-(--w-text3) transition-colors hover:bg-(--w-sel) hover:text-(--w-text) focus-visible:outline-2 focus-visible:outline-mint disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent"
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {children}
      </svg>
    </button>
  );
}

export function ModDemo() {
  const [rows, setRows] = useState(initialRows);
  const [removed, setRemoved] = useState<number[]>([]);
  const [timeoutUser, setTimeoutUser] = useState<string | null>(null);
  const [preset, setPreset] = useState(2);
  const [levels, setLevels] = useState(true);
  const changed = rows !== initialRows || removed.length > 0;

  function punish(target: string, action: Action, minutes?: number) {
    setRows((r) => [...r, { id: 100 + r.length, time: "21:17", action, target, minutes }]);
    setRemoved((d) => [...d, ...rows.filter((r) => "user" in r && r.user === target).map((r) => r.id)]);
    setTimeoutUser(null);
  }

  function reset() {
    setRows(initialRows);
    setRemoved([]);
    setTimeoutUser(null);
  }

  return (
    <div className="flex flex-col gap-5">
      <AppWindow label="Kickerino moderator view with quick actions and level badges" className="h-[560px]">
        <StreamHeader name="odablock">
          <span className="min-w-0 flex-1 truncate text-(--w-text3)">OSRS PvP grind</span>
          <span className="shrink-0 rounded bg-(--w-sel) px-1.5 py-0.5 text-[11px] text-(--w-text2)">Moderator</span>
        </StreamHeader>

        <div className="relative flex flex-1 flex-col justify-end overflow-hidden px-2 py-1">
          {rows.map((r, i) => {
            if ("action" in r) {
              return (
                <div key={r.id} className="msg-in flex items-baseline gap-1.5 px-1.5 py-1 pl-[62px] text-[12.5px] text-(--w-text3)">
                  <Time time={r.time} />
                  <span>
                    <span className="font-semibold text-(--w-text2)">enzonik</span> {r.action}{" "}
                    <span className="font-semibold text-(--w-text2)">{r.target}</span>
                    {r.minutes && ` for ${durationHuman(r.minutes * 60)}`}
                  </span>
                </div>
              );
            }
            const c = chatters[r.user];
            const gone = removed.includes(r.id);
            return (
              <div key={r.id} className={`flex items-center gap-1.5 rounded px-1.5 py-1 leading-snug ${i % 2 ? "bg-(--w-row)" : ""}`}>
                <span className="flex shrink-0 gap-0.5">
                  <ActionButton label={`Timeout ${r.user}`} onClick={() => setTimeoutUser(r.user)}>
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 5v3l2 1.5" />
                  </ActionButton>
                  <ActionButton label={`Ban ${r.user}`} onClick={() => punish(r.user, "permanently banned")}>
                    <path d="m2.5 13.5 6-6" />
                    <path d="m6.5 4.5 3-3 5 5-3 3z" />
                  </ActionButton>
                  <ActionButton label={`Delete message from ${r.user}`} disabled={gone} onClick={() => setRemoved((d) => [...d, r.id])}>
                    <path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.7 9h5.6l.7-9" />
                  </ActionButton>
                </span>
                <Time time={r.time} />
                <span className={`min-w-0 break-words ${gone ? "opacity-55" : ""}`}>
                  <Badges chatter={c} level={levels || !!c.showsLevel} />
                  <Name user={r.user} color={c.color} />: <span className="text-(--w-text2)">{r.text}</span>
                </span>
              </div>
            );
          })}

          {timeoutUser && (
            <div className="absolute inset-x-2 bottom-2 z-10 rounded-md border border-(--w-border) bg-(--w-nav) p-3 shadow-xl">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="text-(--w-text3)">
                  Timeout <span className="font-semibold text-(--w-text)">{timeoutUser}</span>
                </span>
                <span className="font-semibold">{durationHuman(presets[preset] * 60)}</span>
              </div>
              <div className="mt-2.5 flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={presets.length - 1}
                  value={preset}
                  onChange={(e) => setPreset(Number(e.target.value))}
                  aria-label="Timeout length"
                  aria-valuetext={durationHuman(presets[preset] * 60)}
                  className="min-w-0 flex-1 cursor-pointer accent-[#17f640]"
                />
                <button
                  type="button"
                  onClick={() => punish(timeoutUser, "timed out", presets[preset])}
                  className="btn-green px-3 py-1 text-xs font-semibold"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  aria-label="Cancel timeout"
                  onClick={() => setTimeoutUser(null)}
                  className="cursor-pointer text-(--w-text3) hover:text-(--w-text)"
                >
                  &#10005;
                </button>
              </div>
            </div>
          )}
        </div>

        <ChatInput />
      </AppWindow>

      <div className="flex items-center justify-between gap-4 rounded-md border border-line px-4 py-3">
        <span>
          <span className="block text-sm font-semibold">Always show level badges</span>
          <span className="stamp">Settings &gt; Chat &gt; Badges</span>
        </span>
        <span className="flex items-center gap-4">
          {changed && (
            <button type="button" onClick={reset} className="stamp cursor-pointer underline underline-offset-4 hover:text-mint">
              Reset demo
            </button>
          )}
          <Switch on={levels} onChange={setLevels} label="Always show level badges" />
        </span>
      </div>
    </div>
  );
}
