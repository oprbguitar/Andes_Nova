import { AreasSection } from "./components/AreasSection";
import { ChatbotPanel } from "./components/ChatbotPanel";
import { ClientsSection } from "./components/ClientsSection";
import { FinalCTA } from "./components/FinalCTA";
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
        <ChatbotPanel />
        <WorkProcess />
        <Packages />
        <AreasSection />
        <ClientsSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
