import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Silkscreen } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, HOME_TITLE, HOME_DESCRIPTION } from "@/lib/identity";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
const silkscreen = Silkscreen({ variable: "--font-silkscreen", subsets: ["latin"], weight: "400" });

// No canonical here: each page sets its own, so subpages never inherit the home page canonical.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  applicationName: "Kickerino",
  creator: "StreamBench",
  publisher: "StreamBench",
  openGraph: {
    title: "Kickerino by StreamBench",
    description: "A fast native Kick.com chat client built in Rust, by StreamBench.",
    siteName: "Kickerino",
    images: ["/screens/customise.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${jetbrains.variable} ${silkscreen.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
