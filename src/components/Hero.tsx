import { ArrowRight, BarChart3, CheckCircle2, FileText, Layers3 } from "lucide-react";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-navyDark text-white">
      <div className="absolute inset-0 mountain-bg opacity-90" aria-hidden="true" />
      <div className="absolute right-0 top-0 h-96 w-3/5 dot-grid opacity-50" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-[1fr_0.7fr] lg:items-center lg:px-8 lg:pb-12 lg:pt-14">
        <div className="max-w-xl">
          <span className="inline-flex rounded-md bg-teal px-3 py-1 text-xs font-extrabold uppercase text-white shadow-lg shadow-teal/20">
            Consultoría inteligente
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-[3.15rem]">
            Soluciones documentales, administrativas y digitales para su organización.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-white/82">
            Transformamos la gestión de su empresa con metodología, tecnología y acompañamiento experto.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contacto" className="btn-primary">
              Solicitar evaluación inicial
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#servicios" className="btn-secondary">
              Ver servicios
            </a>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="rounded-xl border border-white/15 bg-[#0b233d]/80 p-5 shadow-premium backdrop-blur">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-teal">
                <Layers3 className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-white">Solución integral</p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Consultoría, documentación y tecnología coordinadas para ordenar operaciones empresariales.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {[
                { icon: FileText, value: "8", label: "líneas de servicio" },
                { icon: CheckCircle2, value: "4", label: "fases de trabajo" },
                { icon: BarChart3, value: "1", label: "solución integral" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/8 p-3">
                    <Icon className="h-5 w-5 text-gold" />
                    <span className="text-2xl font-black text-white">{item.value}</span>
                    <span className="text-sm font-semibold text-white/70">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
