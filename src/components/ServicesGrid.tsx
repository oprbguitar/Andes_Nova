import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { services, type Service } from "../data/services";

export function ServicesGrid() {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <section id="servicios" className="relative -mt-2 bg-navyDark px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => setSelected(service)}
                className="group min-h-36 rounded-lg border border-line bg-white p-4 text-left shadow-card transition duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-premium sm:min-h-44 sm:p-5"
              >
                <Icon className={`h-9 w-9 sm:h-10 sm:w-10 ${service.accent}`} strokeWidth={2.4} />
                <h3 className="mt-4 min-h-10 text-sm font-extrabold leading-tight text-navy sm:mt-5 sm:min-h-12 sm:text-base">{service.title}</h3>
                <p className="mt-2 hidden text-sm leading-6 text-slate-600 sm:line-clamp-2">{service.description}</p>
                <span className="mt-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-navy transition group-hover:bg-teal group-hover:text-white sm:mt-4">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-navyDark/75 px-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-premium">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal">{selected.leadArea}</p>
                <h3 className="mt-2 font-display text-3xl font-bold text-navy">{selected.title}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Cerrar detalle">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 leading-7 text-slate-700">{selected.description}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="font-bold text-navy">Entregables</h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {selected.deliverables.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-navy">Áreas de soporte</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selected.supportAreas.map((area) => (
                    <span key={area} className="rounded-full border border-line px-3 py-1 text-sm font-semibold text-slate-700">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
