import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Trust } from "@/components/Trust";
import { Chatters, Moderators, Streamers } from "@/components/Roles";
import { Showcase } from "@/components/Showcase";
import { Performance } from "@/components/Performance";
import { Commands } from "@/components/Commands";
import { Download } from "@/components/Download";
import { IdentityNotice } from "@/components/IdentityNotice";
import { Footer } from "@/components/Footer";
import { RestoreHomeScroll } from "@/components/HomeScroll";
import { JsonLd } from "@/components/JsonLd";
import { homeGraph } from "@/lib/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph()} />
      <RestoreHomeScroll />
      <Nav />
      <main>
        <Hero />
        <Trust />
        <Showcase />
        <Chatters />
        <Moderators />
        <Streamers />
        <Performance />
        <Commands />
        <Download />
        <IdentityNotice />
      </main>
      <Footer />
    </>
  );
}
