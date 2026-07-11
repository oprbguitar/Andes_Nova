import { useMemo, useState } from "react";
import { Header } from "./components/Header";
import { FloatingChatbot } from "./components/FloatingChatbot";
import { HomeView } from "./components/HomeView";
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

  function openContact(summary?: string) {
    setContactSummary(summary);
    setContactOpen(true);
  }

  return (
    <main className="page-shell">
      <div className="app-card">
        <Header companyName={data.companyName} contact={data.contact} />
        <HomeView
          areas={data.areas}
          kpis={data.kpis}
          selectedArea={selectedArea}
          onSelectArea={setSelectedAreaId}
          onStartEvaluation={() => setWizardOpen(true)}
        />
        <footer className="app-footer">
          <span>
            Atención de proyectos previa evaluación. Los servicios especializados pueden desarrollarse mediante profesionales y empresas colaboradoras.
          </span>
          <nav className="footer-legal" aria-label="Información legal">
            <button type="button" onClick={() => setLegalSection("privacy")}>
              Política de privacidad
            </button>
            <button type="button" onClick={() => setLegalSection("terms")}>
              Términos de uso
            </button>
            <button type="button" onClick={() => setLegalSection("data")}>
              Tratamiento de datos
            </button>
          </nav>
        </footer>
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
    </main>
  );
}
