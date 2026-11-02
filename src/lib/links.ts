const REPO = "VDiPaola/Kickerino-releases";
const RELEASES = `https://github.com/${REPO}/releases`;
const LATEST = `${RELEASES}/latest/download`;

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@example.com";

const STORE_ID = "9PH17GRBMQ4K";
const STORE_LISTING = `https://apps.microsoft.com/detail/${STORE_ID}`;

export const links = {
  winSetup: `${LATEST}/Kickerino-win-Setup.exe`,
  winPortable: `${LATEST}/Kickerino-win-Portable.zip`,
  linux: `${LATEST}/Kickerino.AppImage`,
  store: process.env.NEXT_PUBLIC_MS_STORE_URL ?? STORE_LISTING,
  // Clean listing URL without tracking parameters, used as an identity link in structured data.
  storeListing: STORE_LISTING,
  storeId: STORE_ID,
  releases: RELEASES,
  latestApi: `https://api.github.com/repos/${REPO}/releases/latest`,
  contactEmail: CONTACT_EMAIL,
  contact: `mailto:${CONTACT_EMAIL}`,
  discordUser: "@enzonik",
  discordServer: "https://discord.gg/Y6H93EyZ96",
  streambench: "https://streambench.cc",
};

export const discordInvite = links.discordServer.replace(/^https?:\/\//, "");
