import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicePaths from "@/components/ServicePaths";
import SizeSelector from "@/components/SizeSelector";
import Conversions from "@/components/Conversions";
import Footer from "@/components/Footer";
import StickyContactBar from "@/components/StickyContactBar";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ServicePaths />
      <SizeSelector />
      <Conversions />
      <Footer />
      <StickyContactBar />
    </main>
  );
}
