const REPO = "VDiPaola/Kickerino-releases";
const RELEASES = `https://github.com/${REPO}/releases`;
const LATEST = `${RELEASES}/latest/download`;

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@example.com";

export const links = {
  store:
    process.env.NEXT_PUBLIC_MS_STORE_URL ??
    "https://apps.microsoft.com/search?query=Kickerino",
  winSetup: `${LATEST}/Kickerino-win-Setup.exe`,
  winPortable: `${LATEST}/Kickerino-win-Portable.zip`,
  linux: `${LATEST}/Kickerino.AppImage`,
  releases: RELEASES,
  latestApi: `https://api.github.com/repos/${REPO}/releases/latest`,
  contactEmail: CONTACT_EMAIL,
  contact: `mailto:${CONTACT_EMAIL}`,
  discordUser: "@enzonik",
  discordServer: "https://discord.gg/QBEVSUp5sc",
};
