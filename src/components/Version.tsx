"use client";

import { useEffect, useState } from "react";
import { links } from "@/lib/links";

let pending: Promise<string | null> | null = null;

function fetchLatest() {
  pending ??= fetch(links.latestApi, { headers: { Accept: "application/vnd.github+json" } })
    .then((r) => (r.ok ? r.json() : null))
    .then((json: { tag_name?: string } | null) => json?.tag_name?.replace(/^v/, "") ?? null)
    .catch(() => null);
  return pending;
}

export function useLatestVersion() {
  const [version, setVersion] = useState<string | null>(null);
  useEffect(() => {
    let live = true;
    fetchLatest().then((v) => live && setVersion(v));
    return () => {
      live = false;
    };
  }, []);
  return version;
}

export function Version({ prefix = "v", fallback = "latest" }: { prefix?: string; fallback?: string }) {
  const version = useLatestVersion();
  return <>{version ? `${prefix}${version}` : fallback}</>;
}
