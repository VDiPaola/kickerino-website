"use client";

import { useEffect, useState } from "react";
import { commands, shortcuts } from "@/lib/data";
import { useReducedMotion } from "@/lib/hooks";
import { Section } from "./Section";

function useTypewriter(words: string[]) {
  const [i, setI] = useState(0);
  const [len, setLen] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const word = words[i];
    let delay = deleting ? 35 : 70;
    if (!deleting && len === word.length) delay = 1400;
    if (deleting && len === 0) delay = 300;
    const t = setTimeout(() => {
      if (!deleting && len === word.length) setDeleting(true);
      else if (deleting && len === 0) {
        setDeleting(false);
        setI((i + 1) % words.length);
      } else setLen(len + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(t);
  }, [i, len, deleting, words, reduced]);

  return reduced ? words[0] : words[i].slice(0, len);
}

const typed = ["/timeout sussyguy 10", "/clip 60 he did it again", "/slow 6", "/followers 30", "/raid nickwhite"];

export function Commands() {
  const text = useTypewriter(typed);

  return (
    <Section id="commands" index="03" title="Manage everything from one place" lead="Slash command support">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="overflow-hidden rounded-md border border-white/12 bg-[#050f09] font-mono text-sm">
          <div className="grid max-h-[420px] grid-cols-1 overflow-y-auto sm:grid-cols-2">
            {commands.map((c) => (
              <div key={c.cmd} className="flex flex-col gap-0.5 border-b border-white/[0.06] px-4 py-2.5 sm:odd:border-r">
                <span className="text-white">
                  {c.cmd}
                  {c.role && <span className="ml-2 text-[10px] uppercase tracking-wider text-moss">{c.role}</span>}
                </span>
                <span className="text-xs text-moss">{c.desc}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/12 p-3">
            <div className="rounded-md border border-mint/50 bg-[#171d19] px-3 py-2.5 text-fog">
              <span className="caret">{text}</span>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-white/12 p-5">
          <p className="pixel-tag mb-4">Shortcuts</p>
          <dl className="space-y-3 text-sm">
            {shortcuts.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4">
                <dt className="text-fog/80">{v}</dt>
                <dd className="flex gap-1">
                  {k.split(" ").map((part) => (
                    <kbd
                      key={part}
                      className="rounded border border-white/20 bg-panel px-1.5 py-0.5 font-mono text-[11px] text-white shadow-[0_2px_0_0_rgba(255,255,255,0.12)]"
                    >
                      {part}
                    </kbd>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
