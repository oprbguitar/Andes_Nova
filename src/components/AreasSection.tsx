import { Network } from "lucide-react";
import { areas } from "../data/areas";

export function AreasSection() {
  return (
    <section id="areas" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <Network className="h-12 w-12 text-gold" />
            <h2 className="mt-4 font-display text-3xl font-bold text-navy">Coordinación interna para soluciones integrales</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Cada servicio se ejecuta mediante la coordinación de áreas especializadas, permitiendo que el cliente reciba una solución ordenada, trazable y orientada a resultados.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {areas.map((area) => (
              <article key={area.name} className="rounded-lg border border-line bg-softWhite p-4 transition hover:border-teal/50 hover:bg-white hover:shadow-card">
                <h3 className="font-extrabold text-navy">{area.name}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-tealDark">{area.responsible}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{area.role}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
