import { Plus, UserRound } from "lucide-react";

type HeaderProps = {
  activeView: "Inicio" | "Ruta";
  onNavigate: (view: "Inicio" | "Ruta") => void;
  companyName: string;
  navigation: string[];
};

export function Header({ activeView, onNavigate, companyName, navigation }: HeaderProps) {
  return (
    <header className="app-header">
      <button className="brand" type="button" onClick={() => onNavigate("Inicio")} aria-label="Ir a inicio">
        <span className="brand-mark" aria-hidden="true">
          <span />
        </span>
        <span>{companyName}</span>
      </button>

      <nav className="main-nav" aria-label="Principal">
        {navigation.map((item) => (
          <button
            className={activeView === item ? "active" : ""}
            key={item}
            type="button"
            onClick={() => onNavigate(item as "Inicio" | "Ruta")}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <button className="new-evaluation" type="button">
          <Plus size={19} />
          Nueva evaluación
        </button>
        <button className="avatar" type="button" aria-label="Perfil">
          <UserRound size={22} />
        </button>
      </div>
    </header>
  );
}
