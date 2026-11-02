"use client";

import { useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { memoryPhases, memoryUsage } from "@/lib/data";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { Section } from "./Section";

const MAX_MB = 500;
const OTHERS = "#7d8f84";
const { kickerino, others } = memoryUsage;
const last = kickerino.length - 1;
const gridlines = [0, 100, 200, 300, 400, 500];
const minuteTicks = [0, 10, 20, 30];

const left = (i: number) => `${(i / last) * 100}%`;
const top = (mb: number) => `${(1 - mb / MAX_MB) * 100}%`;

const line = (values: number[]) => values.map((v, i) => `${i ? "L" : "M"}${i} ${MAX_MB - v}`).join(" ");
const area = (values: number[]) => `${line(values)} L${last} ${MAX_MB} L0 ${MAX_MB} Z`;

const IDLE = 4;
const PEAK = 15;
const AFTER = 28;

const valueLabels = [
  { i: IDLE, mb: kickerino[IDLE], mint: true },
  { i: IDLE, mb: others[IDLE], mint: false },
  { i: PEAK, mb: kickerino[PEAK], mint: true },
  { i: PEAK, mb: others[PEAK], mint: false },
];

const summary = [
  ["Idle", kickerino[IDLE], others[IDLE]],
  ["Heavy load", kickerino[PEAK], others[PEAK]],
  ["10 minutes after", kickerino[AFTER], others[AFTER]],
] as const;

function Swatch({ dashed = false }: { dashed?: boolean }) {
  return (
    <svg width="18" height="4" aria-hidden className="shrink-0">
      <line
        x1="0"
        y1="2"
        x2="18"
        y2="2"
        stroke={dashed ? OTHERS : "var(--color-mint)"}
        strokeWidth="2"
        strokeDasharray={dashed ? "4 3" : undefined}
      />
    </svg>
  );
}

function Tag({ i, mb, mint, children }: { i: number; mb: number; mint: boolean; children: string }) {
  return (
    <span
      className="absolute flex items-center gap-1.5 whitespace-nowrap text-xs text-fog"
      style={{ left: left(i), top: top(mb), transform: "translate(-6px, calc(-100% - 12px))" }}
    >
      <span className={`size-1.5 ${mint ? "bg-mint" : ""}`} style={mint ? undefined : { background: OTHERS }} />
      {children}
    </span>
  );
}

export function Performance() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const shown = inView || reduced;

  const reveal: CSSProperties = {
    clipPath: shown ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
    transition: reduced ? undefined : "clip-path 1.8s cubic-bezier(0.22, 1, 0.36, 1)",
  };
  const fade = (delay: number): CSSProperties => ({
    opacity: shown ? 1 : 0,
    transition: reduced ? undefined : `opacity 500ms ease ${delay}ms`,
  });

  function onPointer(e: PointerEvent<HTMLDivElement>) {
    const box = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - box.left) / box.width, 0), 1);
    setHover(Math.round(ratio * last));
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    setHover((h) => Math.min(Math.max((h ?? 0) + step, 0), last));
  }

  return (
    <Section
      id="performance"
      index="05"
      className="bg-ink-2"
      title={
        <>
          Light on memory.
          <br />
          <span className="text-mint">Up to 80% less.</span>
        </>
      }
      lead="Memory use compared to other chat clients."
    >
      <figure className="overflow-hidden rounded-md border border-white/12 bg-[#050f09]">
        <figcaption className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-white/12 px-4 py-2.5">
          <span className="stamp">memory usage (MB)</span>
          <span className="flex items-center gap-5 text-xs text-fog">
            <span className="flex items-center gap-2">
              <Swatch />
              Kickerino
            </span>
            <span className="flex items-center gap-2">
              <Swatch dashed />
              Other clients
            </span>
          </span>
        </figcaption>

        <div ref={ref} className="relative mb-9 ml-14 mr-5 mt-12 h-[260px] sm:mr-8 sm:h-[340px]">
          {memoryPhases.map((p, n) => (
            <div
              key={p.label}
              className={`absolute inset-y-0 ${n === 1 ? "border-x border-dashed border-white/10 bg-white/[0.025]" : ""}`}
              style={{ left: left(p.from), width: `${((p.to - p.from) / last) * 100}%` }}
            >
              <span className="stamp absolute -top-7 inset-x-0 truncate px-1 text-center">{p.label}</span>
            </div>
          ))}

          {gridlines.map((mb) => (
            <div key={mb} className="absolute inset-x-0 border-t border-white/[0.06]" style={{ top: top(mb) }}>
              <span className="stamp absolute right-full mr-3 -translate-y-1/2 whitespace-nowrap">{mb}</span>
            </div>
          ))}

          {minuteTicks.map((m) => (
            <span
              key={m}
              className={`stamp absolute top-full mt-2 whitespace-nowrap ${m === 30 ? "-translate-x-full" : "-translate-x-1/2"}`}
              style={{ left: left(m) }}
            >
              {m === 30 ? "30 min" : m}
            </span>
          ))}

          <div className="absolute inset-0" style={reveal}>
            <svg
              viewBox={`0 0 ${last} ${MAX_MB}`}
              preserveAspectRatio="none"
              className="absolute inset-0 size-full overflow-visible"
              aria-hidden
            >
              <defs>
                <linearGradient id="mint-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--color-mint)" stopOpacity="0.35" />
                  <stop offset="1" stopColor="var(--color-mint)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={area(others)} fill={OTHERS} fillOpacity="0.07" />
              <path
                d={line(others)}
                fill="none"
                stroke={OTHERS}
                strokeWidth="2"
                strokeDasharray="5 4"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <path d={area(kickerino)} fill="url(#mint-fill)" />
              <path
                d={line(kickerino)}
                fill="none"
                stroke="var(--color-mint)"
                strokeWidth="2.5"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div aria-hidden style={fade(1200)}>
            {valueLabels.map((l) => (
              <span
                key={`${l.i}-${l.mb}`}
                className={`absolute whitespace-nowrap font-mono text-sm font-bold ${l.mint ? "text-mint" : "text-fog/70"}`}
                style={{ left: left(l.i), top: top(l.mb), transform: "translate(-50%, calc(-100% - 6px))" }}
              >
                {l.mb} MB
              </span>
            ))}
            <span className="hidden sm:contents">
              <Tag i={20} mb={kickerino[20]} mint>
                Freed instantly
              </Tag>
              <Tag i={24} mb={others[24]} mint={false}>
                Still holding memory
              </Tag>
            </span>
          </div>

          {hover !== null && (
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute inset-y-0 border-l border-white/30" style={{ left: left(hover) }} />
              {[
                [kickerino[hover], "bg-mint"],
                [others[hover], ""],
              ].map(([mb, tone]) => (
                <span
                  key={tone}
                  className={`absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[#050f09] ${tone}`}
                  style={{ left: left(hover), top: top(mb as number), background: tone ? undefined : OTHERS }}
                />
              ))}
              <div
                className="absolute top-2 w-52 whitespace-nowrap rounded-md border border-white/15 bg-panel px-3 py-2 text-xs shadow-lg"
                style={{
                  left: left(hover),
                  transform: hover > last * 0.6 ? "translateX(calc(-100% - 12px))" : "translateX(12px)",
                }}
              >
                <p className="stamp mb-1.5">Minute {hover}</p>
                <p className="flex items-center justify-between gap-3 text-fog">
                  <span className="flex items-center gap-2">
                    <Swatch />
                    Kickerino
                  </span>
                  <span className="font-mono text-white">{kickerino[hover]} MB</span>
                </p>
                <p className="mt-1 flex items-center justify-between gap-3 text-fog">
                  <span className="flex items-center gap-2">
                    <Swatch dashed />
                    Other clients
                  </span>
                  <span className="font-mono text-white">{others[hover]} MB</span>
                </p>
              </div>
            </div>
          )}

          <div
            role="img"
            tabIndex={0}
            aria-label="Memory chart. Use the left and right arrow keys to read values by minute."
            aria-describedby="memory-table"
            className="absolute inset-0 cursor-crosshair outline-none focus-visible:ring-1 focus-visible:ring-mint/60"
            onPointerMove={onPointer}
            onPointerDown={onPointer}
            onPointerLeave={() => setHover(null)}
            onKeyDown={onKey}
            onBlur={() => setHover(null)}
          />
          <span className="sr-only" aria-live="polite">
            {hover !== null && `Minute ${hover}: Kickerino ${kickerino[hover]} MB, other clients ${others[hover]} MB.`}
          </span>
        </div>

        <table id="memory-table" className="sr-only">
          <caption>Memory use in megabytes</caption>
          <thead>
            <tr>
              <th scope="col">Moment</th>
              <th scope="col">Kickerino</th>
              <th scope="col">Other clients</th>
            </tr>
          </thead>
          <tbody>
            {summary.map(([moment, k, o]) => (
              <tr key={moment}>
                <th scope="row">{moment}</th>
                <td>{k} MB</td>
                <td>{o} MB</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="stamp border-t border-white/12 px-4 py-2.5">
          Representative figures.
        </p>
      </figure>
    </Section>
  );
}
