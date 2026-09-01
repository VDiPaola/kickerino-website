import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Trust } from "@/components/Trust";
import { Features } from "@/components/Features";
import { Showcase } from "@/components/Showcase";
import { Commands } from "@/components/Commands";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
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
