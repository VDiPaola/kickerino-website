"use client";

import { useEffect, useState } from "react";
import { links } from "@/lib/links";

export type Release = {
  version: string;
  publishedAt: string;
  url: string;
  notes: string;
};

type ReleaseJson = {
  tag_name?: string;
  published_at?: string;
  html_url?: string;
  body?: string;
};

let pending: Promise<Release | null> | null = null;

function fetchLatest() {
  pending ??= fetch(links.latestApi, { headers: { Accept: "application/vnd.github+json" } })
    .then((r) => (r.ok ? r.json() : null))
    .then((json: ReleaseJson | null): Release | null => {
      if (!json?.tag_name) return null;
      return {
        version: json.tag_name.replace(/^v/, ""),
        publishedAt: json.published_at ?? "",
        url: json.html_url ?? links.releases,
        notes: json.body ?? "",
      };
    })
    .catch(() => null);
  return pending;
}

export function useLatestRelease() {
  const [state, setState] = useState<{ release: Release | null; loaded: boolean }>({
    release: null,
    loaded: false,
  });
  useEffect(() => {
    let live = true;
    fetchLatest().then((release) => live && setState({ release, loaded: true }));
    return () => {
      live = false;
    };
  }, []);
  return state;
}

export function useLatestVersion() {
  return useLatestRelease().release?.version ?? null;
}

export function Version({ prefix = "v", fallback = "latest" }: { prefix?: string; fallback?: string }) {
  const version = useLatestVersion();
  return <>{version ? `${prefix}${version}` : fallback}</>;
}
