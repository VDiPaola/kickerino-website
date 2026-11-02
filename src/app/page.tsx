import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Trust } from "@/components/Trust";
import { Chatters, Moderators, Streamers } from "@/components/Roles";
import { Showcase } from "@/components/Showcase";
import { Commands } from "@/components/Commands";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";
import { RestoreHomeScroll } from "@/components/HomeScroll";

export default function Home() {
  return (
    <>
      <RestoreHomeScroll />
      <Nav />
      <main>
        <Hero />
        <Trust />
        <Showcase />
        <Chatters />
        <Moderators />
        <Streamers />
        <Commands />
        <Download />
      </main>
      <Footer />
    </>
  );
}
