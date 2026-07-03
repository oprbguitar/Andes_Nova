import { AreasSection } from "./components/AreasSection";
import { ClientsSection } from "./components/ClientsSection";
import { FinalCTA } from "./components/FinalCTA";
import { FloatingChatbot } from "./components/FloatingChatbot";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Packages } from "./components/Packages";
import { ServicesGrid } from "./components/ServicesGrid";
import { WorkProcess } from "./components/WorkProcess";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesGrid />
        <WorkProcess />
        <Packages />
        <AreasSection />
        <ClientsSection />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingChatbot />
    </>
  );
}
