import { Mail } from "lucide-react";

type HeaderProps = {
  companyName: string;
  contact: { email: string };
};

export function Header({ companyName, contact }: HeaderProps) {
  return (
    <header className="app-header">
      <a className="brand" href="#inicio" aria-label="Ir a inicio">
        <span className="brand-mark" aria-hidden="true">
          <span />
        </span>
        <span className="brand-copy">
          <strong>{companyName}</strong>
          <span aria-hidden="true">|</span>
          <em>Soluciones de gestión e inteligencia documental</em>
        </span>
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
    </header>
  );
}
