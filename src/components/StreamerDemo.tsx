"use client";

import { useState, type ReactNode } from "react";
import { durationHuman } from "@/lib/format";
import { AppWindow, ChatInput, Name, StreamHeader, Switch, Time } from "./AppWindow";

const categories = ["Just Chatting", "IRL", "Slots & Casino", "Old School RuneScape", "Counter-Strike 2"];
const followPresets = [10, 30, 60, 1440, 10080, 43200, 129600];
const slowPresets = [3, 5, 10, 15, 30, 60, 120];
const tools = ["Poll", "Prediction", "Chatters", "Mod log", "Activity feed", "Clear chat"];

const chat = [
  { time: "20:02", user: "PatWiFi", color: "#f0b232", text: "new title goes hard" },
  { time: "20:02", user: "Leeqo", color: "#c74bff", text: "what are we playing tonight" },
  { time: "20:03", user: "Tachys", color: "#00d0ff", text: "W streamer" },
  { time: "20:03", user: "Gaben", color: "#ff5c5c", text: "slow mode saved my eyes" },
  { time: "20:03", user: "twoslav", color: "#4bd6ff", text: "first time catching it live" },
  { time: "20:04", user: "Keeks", color: "#ff9c3a", text: "lets gooo" },
];

function Heading({ children }: { children: ReactNode }) {
  return <p className="mb-1 mt-4 text-[11px] uppercase tracking-wider text-(--w-text3)">{children}</p>;
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1 text-xs">
      <span className="shrink-0 text-(--w-text2)">{label}</span>
      <div className="flex min-w-0 items-center gap-2">{children}</div>
    </div>
  );
}

type ModeSelectProps = {
  label: string;
  value: number | null;
  presets: number[];
  unitSeconds: number;
  onChange: (value: number | null) => void;
};

function ModeSelect({ label, value, presets, unitSeconds, onChange }: ModeSelectProps) {
  return (
    <select
      aria-label={label}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
      className="cursor-pointer rounded border border-(--w-border) bg-(--w-input) px-1.5 py-0.5 text-xs text-(--w-text) outline-none focus-visible:border-mint/70 [&>option]:bg-(--w-input)"
    >
      <option value="">Off</option>
      {presets.map((p) => (
        <option key={p} value={p}>
          {durationHuman(p * unitSeconds)}
        </option>
      ))}
    </select>
  );
}

const button =
  "cursor-pointer rounded border border-(--w-border) px-2 py-1 text-xs transition-colors hover:border-(--w-text3) focus-visible:outline-2 focus-visible:outline-mint disabled:cursor-default disabled:opacity-40 disabled:hover:border-(--w-border)";

export function StreamerDemo() {
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState("Late night chill and Q&A");
  const [draft, setDraft] = useState(title);
  const [category, setCategory] = useState(0);
  const [mature, setMature] = useState(false);
  const [followers, setFollowers] = useState<number | null>(10);
  const [slow, setSlow] = useState<number | null>(null);
  const [subs, setSubs] = useState(false);
  const [emoteOnly, setEmoteOnly] = useState(false);
  const canSave = draft.trim() !== "" && draft.trim() !== title;

  const modes = [
    followers !== null && `Followers Only Mode [${durationHuman(followers * 60)}]`,
    slow !== null && `Slow Mode [${durationHuman(slow)}]`,
    subs && "Subscribers Only Mode",
    emoteOnly && "Emote Only Mode",
  ].filter((m): m is string => !!m);

  return (
    <AppWindow
      label="Kickerino user panel for streamers"
      className="h-[560px]"
      user={
        <button
          type="button"
          aria-expanded={open}
          aria-controls="user-panel"
          onClick={() => setOpen(!open)}
          className={`relative cursor-pointer rounded border px-2 py-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-mint ${
            open ? "border-mint/70 bg-(--w-sel) text-(--w-text)" : "border-(--w-border) text-(--w-text2) hover:text-(--w-text)"
          }`}
        >
          enzonik
          {!open && (
            <span className="absolute -right-1 -top-1 flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-mint opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
          )}
        </button>
      }
    >
      <StreamHeader name="enzonik">
        <span className="min-w-0 flex-1 truncate text-(--w-text3)">{title}</span>
        {mature && <span className="shrink-0 rounded bg-live/20 px-1 text-[10px] font-semibold text-[#ff8a8a]">18+</span>}
        <span className="shrink-0 rounded bg-(--w-sel) px-1.5 py-0.5 text-[11px] text-(--w-text2)">{categories[category]}</span>
      </StreamHeader>

      <div className="flex flex-1 flex-col justify-end overflow-hidden px-2 py-1">
        {chat.map((l, i) => (
          <div key={i} className={`flex items-baseline gap-1.5 rounded px-1.5 py-1 leading-snug ${i % 2 ? "bg-(--w-row)" : ""}`}>
            <Time time={l.time} />
            <span className="min-w-0 break-words">
              <Name user={l.user} color={l.color} />: <span className="text-(--w-text2)">{l.text}</span>
            </span>
          </div>
        ))}
      </div>

      {modes.length > 0 && (
        <div className="border-t border-(--w-border) bg-[#26372d] px-3 py-1.5 text-xs text-fog" aria-live="polite">
          {modes.join(" · ")}
        </div>
      )}
      <ChatInput />

      <div
        id="user-panel"
        role="region"
        aria-label="User panel"
        hidden={!open}
        className="absolute right-3 top-10 z-10 w-[min(330px,calc(100%-1.5rem))] rounded-lg border border-(--w-border) bg-panel p-4 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-mint font-bold text-black" aria-hidden>
            E
          </span>
          <div className="min-w-0">
            <p className="font-semibold">enzonik</p>
            <p className="flex items-center gap-1.5 text-[11px] text-(--w-text3)">
              <span className="rounded bg-live px-1 text-[10px] font-bold text-white">LIVE</span>
              1,284 viewers
            </p>
          </div>
        </div>

        <Heading>Stream</Heading>
        <form
          className="flex gap-2 py-1"
          onSubmit={(e) => {
            e.preventDefault();
            if (canSave) setTitle(draft.trim());
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Stream title"
            maxLength={80}
            className="min-w-0 flex-1 rounded border border-(--w-border) bg-(--w-input) px-2 py-1 text-xs text-(--w-text) outline-none focus:border-mint/70"
          />
          <button type="submit" disabled={!canSave} className={button}>
            Save
          </button>
        </form>
        <Row label="Category">
          <span className="truncate text-(--w-text)">{categories[category]}</span>
          <button type="button" onClick={() => setCategory((category + 1) % categories.length)} className={button}>
            Change
          </button>
        </Row>
        <Row label="18+ content">
          <Switch on={mature} onChange={setMature} label="18+ content" />
        </Row>

        <Heading>Chat modes</Heading>
        <Row label="Followers only">
          <ModeSelect label="Followers only" value={followers} presets={followPresets} unitSeconds={60} onChange={setFollowers} />
        </Row>
        <Row label="Slow mode">
          <ModeSelect label="Slow mode" value={slow} presets={slowPresets} unitSeconds={1} onChange={setSlow} />
        </Row>
        <Row label="Subscribers only">
          <Switch on={subs} onChange={setSubs} label="Subscribers only" />
        </Row>
        <Row label="Emote only">
          <Switch on={emoteOnly} onChange={setEmoteOnly} label="Emote only" />
        </Row>

        <Heading>Tools</Heading>
        <div className="flex flex-wrap gap-1.5">
          {tools.map((t) => (
            <span key={t} className="rounded border border-(--w-border) px-2 py-0.5 text-[11px] text-(--w-text2)">
              {t}
            </span>
          ))}
        </div>
      </div>
    </AppWindow>
  );
}
