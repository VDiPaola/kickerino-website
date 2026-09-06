"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { ComponentProps } from "react";

const KEY = "kickerino:home-scroll";

function save(value: number) {
  try {
    sessionStorage.setItem(KEY, String(value));
  } catch {}
}

function take(): number | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw === null) return null;
    sessionStorage.removeItem(KEY);
    return Number(raw);
  } catch {
    return null;
  }
}

export function LeaveHomeLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} onNavigate={() => save(window.scrollY)} />;
}

export function HomeLink(props: Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      {...props}
      href="/"
      onNavigate={() => {
        try {
          if (sessionStorage.getItem(KEY) === null) save(0);
        } catch {}
      }}
    />
  );
}

export function RestoreHomeScroll() {
  useEffect(() => {
    const top = take();
    if (top !== null) window.scrollTo({ top, behavior: "instant" });
  }, []);
  return null;
}
