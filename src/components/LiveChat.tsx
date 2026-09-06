"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { chatMessages, chatUsers } from "@/lib/data";
import { clock, useClock, useReducedMotion } from "@/lib/hooks";

const emotes = ["/emotes/emote1.avif", "/emotes/emote2.gif"];
const tabs = ["AdinRoss", "Sliker", "Ice Poseidon"];

type Line = { id: number; user: string; color: string; text: string; emote?: number; time?: string };

function seeded(i: number): Line {
  const u = chatUsers[(i * 7) % chatUsers.length];
  const withEmote = i % 8 === 2 || i % 8 === 5 || i % 8 === 7;
  return {
    id: i,
    user: u.name,
    color: u.color,
    text: withEmote ? "" : chatMessages[(i * 13) % chatMessages.length],
    emote: withEmote ? (i % 2) + 1 : undefined,
  };
}

function random(id: number): Line {
  const u = chatUsers[Math.floor(Math.random() * chatUsers.length)];
  const emoteOnly = Math.random() < 0.375;
  return {
    id,
    user: u.name,
    color: u.color,
    text: emoteOnly ? "" : chatMessages[Math.floor(Math.random() * chatMessages.length)],
    emote: emoteOnly || Math.random() < 0.33 ? Math.floor(Math.random() * 2) + 1 : undefined,
    time: clock(),
  };
}

export function LiveChat() {
  const [lines, setLines] = useState<Line[]>(() => Array.from({ length: 12 }, (_, i) => seeded(i)));
  const next = useRef(12);
  const list = useRef<HTMLDivElement>(null);
  const now = useClock();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setLines((prev) => [...prev.slice(-24), random(next.current++)]);
    }, 900 + Math.random() * 500);
    return () => clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    const el = list.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  return (
    <div
      className="flex h-[560px] w-full max-w-[400px] flex-col overflow-hidden rounded-lg border border-white/15 bg-[#050f09] text-[13px] shadow-[0_30px_80px_-20px_rgba(0,255,136,0.25)]"
      role="img"
      aria-label="Kickerino chat window showing a live Kick chatroom"
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0c1610] px-3 py-1.5 text-xs">
        <span className="text-moss">Kickerino</span>
        <span className="rounded border border-white/15 px-2 py-0.5 text-fog">enzonik</span>
        <span className="flex gap-2 text-moss">
          <span>&#8212;</span>
          <span>&#9633;</span>
          <span>&#10005;</span>
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 border-b border-white/10 bg-[#0c1610] p-2">
        {tabs.map((t, i) => (
          <span
            key={t}
            className={`rounded-md border px-2 py-0.5 text-xs ${
              i === 2 ? "border-mint/60 bg-[#1f3a2c] text-white" : "border-white/15 text-fog"
            }`}
          >
            {t} <span className="ml-1 text-moss">&#10005;</span>
          </span>
        ))}
        <span className="rounded-md border border-white/15 px-2 py-0.5 text-xs text-fog">Add +</span>
      </div>
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-xs">
        <span className="font-semibold text-white">Ice Poseidon</span>
        <span className="live-dot inline-block h-2 w-2 rounded-full bg-live" />
        <span className="truncate text-moss">Day in the life</span>
      </div>

      <div ref={list} className="chat-scroll flex-1 overflow-y-auto px-2 py-1">
        {lines.map((l, i) => (
          <div
            key={l.id}
            className={`msg-in flex items-baseline gap-1.5 rounded px-1.5 py-1 leading-snug ${
              i % 2 ? "bg-white/[0.025]" : ""
            }`}
          >
            <span className="shrink-0 font-mono text-[11px] text-moss">{l.time ?? now}</span>
            <span className="min-w-0 break-words">
              <span className="font-semibold" style={{ color: l.color }}>
                {l.user}:
              </span>{" "}
              {l.text && <span className="text-fog">{l.text}</span>}
              {l.emote && (
                <Image
                  src={emotes[l.emote % emotes.length]}
                  width={24}
                  height={24}
                  alt=""
                  unoptimized
                  className="ml-0.5 inline-block h-6 w-6 align-middle"
                />
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-1.5 border-t border-white/10 px-2 py-1.5">
        {[0, 1].map((e, i) => (
          <Image key={i} src={emotes[e]} width={24}
            height={24} alt="" unoptimized className="h-6 w-6 opacity-80" />
        ))}
      </div>
      <div className="border-t border-white/10 bg-[#26372d] px-3 py-1.5 text-xs text-fog">
        Followers Only Mode [5 hours]
      </div>
      <div className="m-2 flex items-center justify-between rounded-md border border-white/15 bg-[#171d19] px-3 py-2 text-fog">
        <span className="text-moss">Send a message...</span>
        <span className="flex items-center gap-2 text-[11px] text-moss">
          7TV <span className="h-3 w-px bg-white/20" /> <span className="text-base leading-none" aria-hidden>&#128514;</span>
        </span>
      </div>
    </div>
  );
}
