"use client";

import Image from "next/image";
import { useState } from "react";
import { Section } from "./Section";

const shots = [
  {
    key: "chatroom",
    label: "Chatroom",
    src: "/screens/chatroom.png",
    w: 347,
    h: 1011,
    caption: "Timestamps, badges, emotes, mod events, and more.",
  },
  {
    key: "customise",
    label: "Customize",
    src: "/screens/customise.png",
    w: 1505,
    h: 1000,
    caption: "Themes, timestamps, alternating rows, notification sounds, font size and tab position.",
  },
  {
    key: "commands",
    label: "Commands",
    src: "/screens/commands.png",
    w: 666,
    h: 1005,
    caption: "Support for every kick slash command",
  },
];

export function Showcase() {
  const [active, setActive] = useState(0);
  const shot = shots[active];

  return (
    <Section id="screens" index="02" title="Screenshots" lead="">
      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div role="tablist" aria-label="Screenshots" className="grid grid-cols-3 gap-2 lg:flex lg:flex-col">
          {shots.map((s, i) => (
            <button
              key={s.key}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`min-w-0 truncate border px-3 py-3 text-left text-sm transition-colors ${
                i === active
                  ? "border-mint bg-panel text-white"
                  : "border-line text-fog hover:border-line-2 hover:text-white"
              }`}
            >
              <span className="stamp mr-2 hidden sm:inline">0{i + 1}</span>
              {s.label}
            </button>
          ))}
          <p className="hidden text-sm leading-relaxed text-fog/80 lg:block lg:pt-4" aria-live="polite">
            {shot.caption}
          </p>
        </div>

        <div className="min-w-0 overflow-hidden rounded-lg border border-white/15 bg-[#050f09]">
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#0c1610] px-3 py-2 text-xs text-moss">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="ml-3 font-mono">{shot.src.split("/").pop()}</span>
          </div>
          <div className="flex h-[440px] items-center justify-center bg-[#020a05] p-4 sm:h-[700px] sm:p-8">
            {shots.map((s, i) => (
              <Image
                key={s.key}
                src={s.src}
                width={s.w}
                height={s.h}
                alt={`Kickerino ${s.label} screenshot`}
                priority={i === 0}
                hidden={i !== active}
                className="max-h-full max-w-full w-auto h-auto rounded border border-white/10 object-contain"
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-fog/80 lg:hidden">{shot.caption}</p>
      </div>
    </Section>
  );
}
