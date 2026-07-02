import { Bell, ChevronDown, Menu, UserCircle, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Soluciones", href: "#paquetes" },
  { label: "Recursos", href: "#areas" },
  { label: "Nosotros", href: "#clientes" },
  { label: "Contacto", href: "#contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navyDark/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-2" aria-label="Ir al inicio">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold text-white/80 transition hover:text-white ${
                index === 0 ? "border-b-2 border-gold pb-2 text-white" : ""
              }`}
            >
              {item.label}
            </a>
          ))}
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
              <span className="block text-sm font-bold text-white">Hola, Carlos</span>
              <span className="block text-xs text-white/60">Administrador</span>
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
        <div className="border-t border-white/10 bg-navy px-4 py-4 lg:hidden">
          <nav className="grid gap-2" aria-label="Navegación móvil">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-semibold text-white/80 hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
