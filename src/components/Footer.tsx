import { Logo } from "./Logo";

const services = ["Gestión documental", "Procesos", "SST", "Logística", "Cumplimiento legal", "Tecnología e IA", "Dashboards", "Capacitación"];

export function Footer() {
  return (
    <footer className="bg-[#020b15] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-6 text-white/62">Consultoría documental, administrativa y digital.</p>
        </div>
        <div>
          <h3 className="font-extrabold">Servicios</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/62">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-extrabold">Contacto</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/62">
            <li>
              <a href="mailto:peru.labs.pe@gmail.com" className="hover:text-white">
                peru.labs.pe@gmail.com
              </a>
            </li>
            <li>Lima, Perú</li>
            <li>Atención previa coordinación</li>
          </ul>
        </div>
        <div>
          <h3 className="font-extrabold">Legal</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/62">
            <li>Empresa ficticia para demo</li>
            <li>Política de privacidad</li>
            <li>Términos de uso</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
