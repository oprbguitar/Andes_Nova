import { BriefcaseBusiness, Mail } from "lucide-react";

type HeaderProps = {
  companyName: string;
  contact: { email: string };
  currentPage?: "home" | "projects";
};

export function Header({ companyName, contact, currentPage = "home" }: HeaderProps) {
  const baseUrl = import.meta.env.BASE_URL;
  const homeHref = baseUrl;
  const projectsHref = `${baseUrl}proyectos/`;

  return (
    <header className="app-header">
      <a className="brand" href={currentPage === "home" ? "#inicio" : homeHref} aria-label="Ir a la página de inicio">
        <span className="brand-mark" aria-hidden="true">
          <span />
        </span>
        <span className="brand-copy">
          <strong>{companyName}</strong>
          <span aria-hidden="true">|</span>
          <em>Soluciones de gestión e inteligencia documental</em>
        </span>
      </a>

      <div className="header-actions">
        <a
          className={`header-projects ${currentPage === "projects" ? "active" : ""}`}
          href={projectsHref}
          aria-current={currentPage === "projects" ? "page" : undefined}
        >
          <BriefcaseBusiness size={19} aria-hidden="true" />
          <span>Proyectos</span>
        </a>

        <a className="header-contact" href={`mailto:${contact.email}`}>
          <span className="header-contact-icon" aria-hidden="true">
            <Mail size={18} />
          </span>
          <span className="header-contact-copy">
            <strong>Consultas</strong>
            <small>{contact.email}</small>
          </span>
        </a>
      </div>
    </header>
  );
}
