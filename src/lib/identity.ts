// Single source of truth for product identity and disambiguation content.
// Used by the /product-identity page, page metadata, JSON-LD and /llms.txt,
// so the wording stays identical everywhere it appears.

import { links } from "./links";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kickerino.com").replace(/\/+$/, "");

export const absolute = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const IDENTITY_PATH = "/product-identity/";

// Date the identity page content was last reviewed. Update when the page changes.
export const IDENTITY_UPDATED = "2026-11-02";
export const IDENTITY_UPDATED_LABEL = "2 November 2026";

export const PRODUCT_NAME = "Kickerino";
export const PRODUCT_FULL_NAME = "Kickerino by StreamBench";
export const COMPANY_NAME = "StreamBench";

/** Product description, shared by the home page metadata and structured data. */
export const SITE_DESCRIPTION =
  "A fast native Kick.com chat client. Multiple chatrooms, 7TV emotes, moderation tools and notifications in one GPU rendered window. Built in Rust.";

export const HOME_TITLE = "Kickerino by StreamBench | Native Kick.com chat client";
export const HOME_DESCRIPTION = `Kickerino by StreamBench is a free, fast native Kick.com chat client for Windows and Linux. Multiple chatrooms, 7TV emotes, moderation tools and notifications in one GPU rendered window. Built in Rust.`;

/** One sentence, used in metadata descriptions and short notices. */
export const IDENTITY_SHORT =
  "Kickerino by StreamBench (kickerino.com) is a free desktop Kick.com chat client. It is not affiliated with the separate Kickerino app by CarlBraun (kickerino.app).";

/** Full identity statement, used at the top of the identity page, in llms.txt and in structured data. */
export const IDENTITY_STATEMENT =
  "Kickerino by StreamBench is a free desktop chat client for Kick.com, available for Windows and Linux. It is developed, published and operated by StreamBench, and its official website is kickerino.com. A separate product, also called Kickerino, is developed by CarlBraun and distributed through kickerino.app, GitHub and Google Play. The two products have no affiliation, shared ownership, partnership, endorsement or commercial relationship.";

/** StreamBench's own product. Every value here is shown on the identity page. */
export const ours = {
  developer: COMPANY_NAME,
  developerUrl: links.streambench,
  website: SITE_URL,
  websiteLabel: "www.kickerino.com",
  storeId: links.storeId,
  storeUrl: links.storeListing,
  releasesUrl: links.releases,
  releasesLabel: "github.com/VDiPaola/Kickerino-releases",
  platforms: "Windows 10 or later, Linux",
  mobile: "None. StreamBench does not publish a mobile app.",
  pricing: "Free, with all features included. No in-app purchases or microtransactions.",
  source: "Closed source. Builds are distributed as published releases.",
};

/** The separately operated product. Taken from its public website, GitHub repositories and Google Play listing. */
export const other = {
  name: "Kickerino",
  developer: "CarlBraun",
  developerUrl: "https://github.com/CarlBraun",
  developerKickUrl: "https://kick.com/carlbraun",
  website: "https://kickerino.app/",
  websiteLabel: "kickerino.app",
  desktopRepo: "https://github.com/CarlBraun/Kickerino",
  androidRepo: "https://github.com/CarlBraun/Kickerino_Android",
  playPackage: "com.Kickerino",
  playUrl: "https://play.google.com/store/apps/details?id=com.Kickerino",
  platforms: "Windows, Linux, Android",
  mobile: "Android app on Google Play (package com.Kickerino).",
  pricing: "Its Google Play listing states that it contains in-app purchases.",
  source: "Public GitHub repositories.",
};

export type TimelineEvent = {
  date: string; // ISO date, used for <time dateTime>
  label: string; // visible date
  product: "streambench" | "carlbraun";
  event: string;
  source: { label: string; url: string };
};

const ICANN = "https://lookup.icann.org/en/lookup";

/** Publicly verifiable events only, in chronological order. */
export const timeline: TimelineEvent[] = [
  {
    date: "2026-01-24",
    label: "24 Jan 2026",
    product: "carlbraun",
    event: "GitHub repository CarlBraun/Kickerino (desktop client) created.",
    source: { label: "GitHub", url: other.desktopRepo },
  },
  {
    date: "2026-08-08",
    label: "8 Aug 2026",
    product: "carlbraun",
    event: "GitHub repository CarlBraun/Kickerino_Android created.",
    source: { label: "GitHub", url: other.androidRepo },
  },
  {
    date: "2026-08-30T23:24:11Z",
    label: "30 Aug 2026, 23:24 UTC",
    product: "streambench",
    event: "Domain kickerino.com registered.",
    source: { label: "ICANN Lookup", url: ICANN },
  },
  {
    date: "2026-08-31T11:46:00Z",
    label: "31 Aug 2026, 11:46 UTC",
    product: "carlbraun",
    event: "Domain kickerino.app registered.",
    source: { label: "ICANN Lookup", url: ICANN },
  },
  {
    date: "2026-09-05",
    label: "5 Sep 2026",
    product: "streambench",
    event: "Kickerino by StreamBench released on the Microsoft Store.",
    source: { label: "Microsoft Store", url: links.storeListing },
  },
  {
    date: "2026-09-05T23:37:50Z",
    label: "5 Sep 2026, 23:37 UTC",
    product: "carlbraun",
    event: "Statements calling kickerino.com a scam added to the README files of both CarlBraun GitHub repositories.",
    source: {
      label: "GitHub commit",
      url: "https://github.com/CarlBraun/Kickerino/commit/74b538b571a9ee75cdf47d07ee4c889e9cbc7b1b",
    },
  },
  {
    date: "2026-10-27",
    label: "27 Oct 2026",
    product: "carlbraun",
    event: "Kickerino by CarlBraun released on Google Play.",
    source: { label: "Google Play", url: other.playUrl },
  },
];

export type Allegation = {
  id: string;
  location: string;
  url: string;
  /** Exact text as published, without markup. */
  text: string;
  /** What the statement names as its subject. */
  subject: string;
  /** ISO date of first publication, only when verifiable. */
  firstPublished?: string;
  firstPublishedLabel: string;
  /** Link that verifies the first publication date. */
  firstPublishedSource?: string;
};

/** Statements published by CarlBraun about kickerino.com, quoted exactly as observed on 2 November 2026. */
export const allegations: Allegation[] = [
  {
    id: "kickerino-app-banner",
    location: "Banner at the top of kickerino.app",
    url: other.website,
    text: "Security Warning: kickerino.com is a scam website. Our ONLY official domain is kickerino.app",
    subject: "kickerino.com",
    firstPublishedLabel: "Not independently verified. Observed on 2 November 2026.",
  },
  {
    id: "github-desktop-readme",
    location: "README of the CarlBraun/Kickerino GitHub repository",
    url: other.desktopRepo,
    text: "THE ONLY OFFICIAL SOURCE OF KICKERINO: https://kickerino.app/ | DOMAIN .com is a scam",
    subject: "the .com domain (kickerino.com)",
    firstPublished: "2026-09-05",
    firstPublishedLabel: "5 September 2026, 23:37 UTC (commit 74b538b)",
    firstPublishedSource: "https://github.com/CarlBraun/Kickerino/commit/74b538b571a9ee75cdf47d07ee4c889e9cbc7b1b",
  },
  {
    id: "github-android-readme",
    location: "README of the CarlBraun/Kickerino_Android GitHub repository",
    url: other.androidRepo,
    text: "THE ONLY OFFICIAL SOURCE OF KICKERINO: https://kickerino.app/ | DOMAIN .com is a scam",
    subject: "the .com domain (kickerino.com)",
    firstPublished: "2026-09-05",
    firstPublishedLabel: "5 September 2026, 23:36 UTC (commit b36cbec, current wording from commit e4a313e)",
    firstPublishedSource:
      "https://github.com/CarlBraun/Kickerino_Android/commit/b36cbec458b15a91a27f3d7bb5e905849b2a1eef",
  },
];

/** Suggested neutral summary of the allegations, shown on the page and in llms.txt. */
export const ALLEGATION_SUMMARY =
  "CarlBraun, the developer of a separate product that is also called Kickerino, has described kickerino.com as a scam. StreamBench, which develops Kickerino at kickerino.com, disputes this. The statement is an allegation by a third party, not an established fact.";

export const faqs: { q: string; a: string }[] = [
  {
    q: "Is Kickerino by StreamBench the same product as the Kickerino on kickerino.app?",
    a: "No. Kickerino by StreamBench (kickerino.com) and the Kickerino app by CarlBraun (kickerino.app) are separate products with separate ownership, development and operations. They share a name but have no affiliation.",
  },
  {
    q: "Does StreamBench publish a Kickerino app for Android, iOS or Google Play?",
    a: "No. Kickerino by StreamBench is a desktop application for Windows and Linux. StreamBench does not publish a mobile app. The Kickerino app on Google Play (package com.Kickerino) is published by CarlBraun.",
  },
  {
    q: "Does Kickerino by StreamBench have in-app purchases?",
    a: "No. Kickerino by StreamBench is free, with all features included, and contains no in-app purchases or microtransactions.",
  },
  {
    q: "Is kickerino.com a scam?",
    a: `${ALLEGATION_SUMMARY} The statements are quoted with their sources on this page so that readers can check them.`,
  },
  {
    q: "Where can I download the official Kickerino by StreamBench?",
    a: "From the Microsoft Store (product ID 9PH17GRBMQ4K), or as direct downloads from GitHub Releases at github.com/VDiPaola/Kickerino-releases. Both are linked from kickerino.com.",
  },
  {
    q: "Where can I get support for the Kickerino app by CarlBraun?",
    a: "From CarlBraun, through kickerino.app or its GitHub repositories. StreamBench cannot provide support, refunds or account help for that product.",
  },
];
