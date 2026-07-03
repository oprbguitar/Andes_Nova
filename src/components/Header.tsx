import { Bell, ChevronDown, Menu, UserCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const navItems = [
  { label: "Inicio", href: "#inicio", id: "inicio" },
  { label: "Servicios", href: "#servicios", id: "servicios" },
  { label: "Soluciones", href: "#paquetes", id: "paquetes" },
  { label: "Recursos", href: "#areas", id: "areas" },
  { label: "Nosotros", href: "#clientes", id: "clientes" },
  { label: "Contacto", href: "#contacto", id: "contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.12, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navyDark shadow-premium">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-2" aria-label="Ir al inicio">
          <Logo />
        </a>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Navegación principal">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  isActive ? "bg-gold text-navyDark shadow-md shadow-gold/25" : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <button className="relative rounded-full p-2 text-white/80 transition hover:bg-white/10" aria-label="Notificaciones">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-0 grid h-4 w-4 place-items-center rounded-full bg-gold text-[10px] font-bold text-white">
              3
            </span>
          </button>
          <button className="flex items-center gap-3 rounded-full py-1 pl-1 pr-2 text-left transition hover:bg-white/10">
            <UserCircle className="h-10 w-10 text-white" />
            <span>
              <span className="block text-sm font-bold text-white">Área cliente</span>
              <span className="block text-xs text-white/60">Consulta empresarial</span>
            </span>
            <ChevronDown className="h-4 w-4 text-white/70" />
          </button>
        </div>

        <button
          className="rounded-md border border-white/15 p-2 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navyDark px-4 py-4 shadow-premium lg:hidden">
          <nav className="grid gap-2" aria-label="Navegación móvil">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                    isActive ? "bg-gold text-navyDark" : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
