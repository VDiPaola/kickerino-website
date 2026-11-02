import type { CSSProperties } from "react";

export type AppTheme = {
  name: string;
  bg: string;
  nav: string;
  sel: string;
  input: string;
  text: string;
  text2: string;
  text3: string;
  accent: string;
  border: string;
  light?: boolean;
};

export const appThemes: AppTheme[] = [
  { name: "Default", bg: "#020a05", nav: "#0c1610", sel: "#1f3a2c", input: "#171d19", text: "#ffffff", text2: "#d1e8db", text3: "#657a6e", accent: "#00ff88", border: "rgba(255,255,255,0.14)" },
  { name: "Dark", bg: "#141414", nav: "#161616", sel: "#363636", input: "#353535", text: "#ffffff", text2: "#e0e0e0", text3: "#777777", accent: "#e7e7e7", border: "rgba(255,255,255,0.16)" },
  { name: "Midnight", bg: "#0b0f1a", nav: "#0d1220", sel: "#1f2a44", input: "#121828", text: "#e6ebf5", text2: "#b4bdd2", text3: "#6f7a96", accent: "#7aa2f7", border: "rgba(255,255,255,0.12)" },
  { name: "Slate", bg: "#1b1f24", nav: "#171a1f", sel: "#333b46", input: "#1f242a", text: "#f1f4f8", text2: "#c2cad4", text3: "#8390a0", accent: "#a8d8ff", border: "rgba(255,255,255,0.13)" },
  { name: "Ocean", bg: "#03101f", nav: "#020b17", sel: "#0f3252", input: "#051a2e", text: "#e6f6ff", text2: "#a9d3ec", text3: "#5d8aa8", accent: "#22e3ff", border: "rgba(120,220,255,0.14)" },
  { name: "Wood", bg: "#1c1410", nav: "#160f0c", sel: "#3e2d22", input: "#261b15", text: "#f4e6d3", text2: "#d4bea4", text3: "#97806a", accent: "#d9a066", border: "rgba(255,200,150,0.13)" },
  { name: "Dracula", bg: "#0a0508", nav: "#070305", sel: "#2e0f1a", input: "#140810", text: "#f1e4e8", text2: "#c9adb6", text3: "#8a6472", accent: "#e01b3c", border: "rgba(255,40,80,0.16)" },
  { name: "Light", bg: "#e3e6ea", nav: "#d9dde2", sel: "#d6dbe2", input: "#eef0f3", text: "#1f2328", text2: "#4b5259", text3: "#7a838c", accent: "#2563b8", border: "rgba(0,0,0,0.13)", light: true },
];

export function themeVars(t: AppTheme): CSSProperties {
  return {
    "--w-bg": t.bg,
    "--w-nav": t.nav,
    "--w-sel": t.sel,
    "--w-input": t.input,
    "--w-text": t.text,
    "--w-text2": t.text2,
    "--w-text3": t.text3,
    "--w-accent": t.accent,
    "--w-border": t.border,
    "--w-row": t.light ? "rgba(0,0,0,0.035)" : "rgba(255,255,255,0.025)",
    "--w-name-filter": t.light ? "brightness(0.62) saturate(1.4)" : "none",
  } as CSSProperties;
}
