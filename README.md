# Kickerino website

Single page marketing site for [Kickerino](../Kickerino), a native Kick.com chat client. Built with Next.js (App Router, static export), React and Tailwind CSS.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

`next.config.ts` sets `output: "export"`, so the build writes a fully static site to `out/`. Deploy that folder to any static host (GitHub Pages, Cloudflare Pages, Netlify, Vercel).

The root layout renders `<Analytics />` from `@vercel/analytics`. It records page views only when the site is deployed on Vercel with Web Analytics enabled for the project. On other hosts the script does nothing.

## Configuration

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the deployed site, used to build absolute Open Graph image URLs. |

Download links, the release repo and the contact address (a placeholder until you set it) live in `src/lib/links.ts`. The displayed version and the release notes on `/whats-new` are read in the browser from the GitHub Releases API (`src/components/Version.tsx`, `src/components/ReleaseNotes.tsx`). The version falls back to "latest" if the request fails. The Microsoft Store badge (`src/components/StoreBadge.tsx`) is not a link yet. It shows a "Coming soon" banner until the Store listing is certified. Direct downloads point at `releases/latest/download/<file>` on the public [Kickerino-releases](https://github.com/VDiPaola/Kickerino-releases) repo, so they always resolve to the newest build:

- `Kickerino-win-Setup.exe`
- `Kickerino-win-Portable.zip`
- `Kickerino.AppImage`

## Content

| File | Content |
| --- | --- |
| `src/lib/data.ts` | Feature list, slash commands, keyboard shortcuts, demo chat lines |
| `src/components/` | One component per page section |
| `src/app/privacy/page.tsx` | Privacy policy, mirrors `PRIVACY.md` in the app repo |
| `public/screens/` | App screenshots used in the showcase |

## Structure

```
src/
  app/            layout, home page, privacy page, global styles
  components/     Nav, Hero, LiveChat, Trust, Features, Showcase, Commands, Download, Footer
  lib/            links.ts (URLs, version), data.ts (page content)
public/
  brand/          app icon
  screens/        screenshots
```
