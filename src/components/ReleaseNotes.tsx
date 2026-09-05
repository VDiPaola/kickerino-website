"use client";

import { links } from "@/lib/links";
import { useLatestRelease } from "./Version";

type Block = { type: "heading"; text: string } | { type: "list"; items: string[] };

function parseNotes(notes: string): Block[] {
  const blocks: Block[] = [];
  for (const raw of notes.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const heading = line.match(/^#+\s+(.*)$/);
    if (heading) {
      blocks.push({ type: "heading", text: heading[1] });
      continue;
    }
    const item = line.replace(/^[-*+]\s+/, "");
    const last = blocks[blocks.length - 1];
    if (last?.type === "list") last.items.push(item);
    else blocks.push({ type: "list", items: [item] });
  }
  return blocks;
}

function formatDate(iso: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function ReleaseNotes() {
  const { release, loaded } = useLatestRelease();

  if (!loaded) {
    return (
      <p className="stamp mt-10" role="status">
        Loading release notes...
      </p>
    );
  }

  if (!release) {
    return (
      <p className="mt-10 text-fog" role="status">
        Release notes could not be loaded. See{" "}
        <a href={links.releases} className="underline underline-offset-4 hover:text-mint">
          GitHub Releases
        </a>
        .
      </p>
    );
  }

  const blocks = parseNotes(release.notes);
  const date = formatDate(release.publishedAt);

  return (
    <article className="mt-10 rounded-lg border border-mint/40 bg-panel p-8">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-2xl font-semibold">v{release.version}</h2>
        {date && (
          <time dateTime={release.publishedAt} className="stamp">
            {date}
          </time>
        )}
      </header>

      {blocks.length === 0 ? (
        <p className="mt-6 text-fog">No release notes for this version.</p>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {blocks.map((block, i) =>
            block.type === "heading" ? (
              <h3 key={i} className="pixel-tag">
                {block.text}
              </h3>
            ) : (
              <ul key={i} className="flex flex-col gap-2 text-fog">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="text-mint" aria-hidden>
                      {">"}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ),
          )}
        </div>
      )}

      <p className="stamp mt-8">
        <a href={release.url} className="underline underline-offset-4 hover:text-mint">
          View on GitHub
        </a>
      </p>
    </article>
  );
}
