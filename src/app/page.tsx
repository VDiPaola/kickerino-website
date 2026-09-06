import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Trust } from "@/components/Trust";
import { Features } from "@/components/Features";
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
        <Features />
        <Showcase />
        <Commands />
        <Download />
      </main>
      <Footer />
    </>
  );
}
