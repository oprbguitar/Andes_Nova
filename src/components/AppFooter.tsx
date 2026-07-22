import type { LegalSection } from "./LegalModal";

type AppFooterProps = {
  onOpenLegal: (section: LegalSection) => void;
};

export function AppFooter({ onOpenLegal }: AppFooterProps) {
  return (
    <footer className="app-footer">
      <span>
        Atención de proyectos previa evaluación. Los servicios especializados pueden desarrollarse mediante profesionales y empresas colaboradoras.
      </span>
      <nav className="footer-legal" aria-label="Información legal">
        <button type="button" onClick={() => onOpenLegal("privacy")}>
          Política de privacidad
        </button>
        <button type="button" onClick={() => onOpenLegal("terms")}>
          Términos de uso
        </button>
        <button type="button" onClick={() => onOpenLegal("data")}>
          Tratamiento de datos
        </button>
      </nav>
    </footer>
  );
}
