import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { AppFooter } from "./components/AppFooter";
import { FloatingChatbot } from "./components/FloatingChatbot";
import { HomeView } from "./components/HomeView";
import { ProjectsView } from "./components/ProjectsView";
import { ContactModal } from "./components/ContactModal";
import { EvaluationWizard } from "./components/EvaluationWizard";
import { LegalModal, type LegalSection } from "./components/LegalModal";
import { companyData } from "./data/companyData";
import { validateCompanyData } from "./utils/validateCompanyData";

export default function App() {
  const data = useMemo(() => validateCompanyData(companyData), []);
  const [selectedAreaId, setSelectedAreaId] = useState<string | undefined>();
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSummary, setContactSummary] = useState<string | undefined>();
  const [wizardOpen, setWizardOpen] = useState(false);
  const [legalSection, setLegalSection] = useState<LegalSection | null>(null);
  const selectedArea = data.areas.find((area) => area.id === selectedAreaId);
  const isProjectsPage = /\/proyectos\/?$/.test(window.location.pathname);

  useEffect(() => {
    document.body.classList.toggle("portfolio-route", isProjectsPage);
    return () => document.body.classList.remove("portfolio-route");
  }, [isProjectsPage]);

  function openContact(summary?: string) {
    setContactSummary(summary);
    setContactOpen(true);
  }

  return (
    <div className={`page-shell ${isProjectsPage ? "portfolio-shell" : ""}`}>
      <div className="app-card">
        <Header companyName={data.companyName} contact={data.contact} currentPage={isProjectsPage ? "projects" : "home"} />
        {isProjectsPage ? (
          <ProjectsView />
        ) : (
          <HomeView
            areas={data.areas}
            kpis={data.kpis}
            selectedArea={selectedArea}
            onSelectArea={setSelectedAreaId}
            onStartEvaluation={() => setWizardOpen(true)}
          />
        )}
        <AppFooter onOpenLegal={setLegalSection} />
      </div>
      <EvaluationWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onRequestContact={(summary) => openContact(summary)}
      />
      <ContactModal
        open={contactOpen}
        contact={data.contact}
        summary={contactSummary}
        onClose={() => setContactOpen(false)}
      />
      <LegalModal
        open={legalSection !== null}
        section={legalSection ?? "privacy"}
        onClose={() => setLegalSection(null)}
      />
      <FloatingChatbot
        onRequestContact={openContact}
        onOpenLegal={(section) => setLegalSection(section)}
      />
    </div>
  );
}
