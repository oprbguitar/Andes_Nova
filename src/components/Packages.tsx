import { Building2, Check, Gem, Send } from "lucide-react";
import { packages } from "../data/packages";

const icons = [Send, Gem, Building2];

export function Packages() {
  return (
    <section id="paquetes" className="bg-softWhite px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-3xl font-bold text-navy">Paquetes y soluciones integrales</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Cada solución se adapta al volumen documental, nivel de complejidad, riesgos y objetivos del cliente. Solicite una evaluación para recibir una propuesta ajustada a su caso.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {packages.map((pack, index) => {
            const Icon = icons[index];
            return (
              <article
                key={pack.name}
                className={`relative rounded-xl border bg-white p-6 text-center shadow-card transition hover:-translate-y-1 hover:shadow-premium ${
                  pack.featured ? "border-teal ring-1 ring-teal" : "border-line"
                }`}
              >
                {pack.badge && (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal px-3 py-1 text-[10px] font-black text-white">
                    {pack.badge}
                  </span>
                )}
                <Icon className="mx-auto h-10 w-10 text-blue-600" />
                <h3 className="mt-4 text-xl font-extrabold text-navy">{pack.name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{pack.subtitle}</p>
                <ul className="mt-4 space-y-2 text-left text-sm text-slate-700">
                  {pack.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contacto"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-teal px-4 py-3 text-sm font-extrabold text-white transition hover:bg-tealDark"
                >
                  {pack.cta}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
