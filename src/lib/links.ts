const REPO = "VDiPaola/Kickerino-releases";
const RELEASES = `https://github.com/${REPO}/releases`;
const LATEST = `${RELEASES}/latest/download`;

export const links = {
  store:
    process.env.NEXT_PUBLIC_MS_STORE_URL ??
    "https://apps.microsoft.com/search?query=Kickerino",
  winSetup: `${LATEST}/Kickerino-win-Setup.exe`,
  winPortable: `${LATEST}/Kickerino-win-Portable.zip`,
  linux: `${LATEST}/Kickerino.AppImage`,
  releases: RELEASES,
  latestApi: `https://api.github.com/repos/${REPO}/releases/latest`,
  contact: "mailto:contact@example.com",
};
