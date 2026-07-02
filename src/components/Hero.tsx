import { ArrowRight, Bot, Send } from "lucide-react";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-navyDark text-white">
      <div className="absolute inset-0 mountain-bg opacity-90" aria-hidden="true" />
      <div className="absolute right-0 top-0 h-96 w-3/5 dot-grid opacity-50" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-[0.9fr_360px] lg:px-8 lg:pb-12 lg:pt-14">
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
          <div className="rounded-xl border border-white/15 bg-[#0b233d]/95 p-4 shadow-premium backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-teal">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-white">AndesNova IA+</p>
                  <p className="text-xs text-white/62">Asistente inteligente</p>
                </div>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <div className="mt-4 rounded-lg bg-softWhite p-3">
              <div className="rounded-lg bg-white p-3 text-sm leading-6 text-navy shadow-sm">
                ¿Qué haces por aquí? Sé que estás buscando algo. Consúltame y te oriento.
              </div>
              <div className="mt-3 grid gap-2">
                {["¿Qué servicio necesita mi empresa?", "Quiero ordenar mis contratos", "Necesito un chatbot documental"].map((item) => (
                  <a
                    key={item}
                    href="#ia"
                    className="rounded-full border border-teal/50 bg-white px-3 py-2 text-center text-xs font-bold text-tealDark transition hover:bg-teal hover:text-white"
                  >
                    {item}
                  </a>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs text-slate-400">
                Escriba su consulta...
                <span className="ml-auto grid h-8 w-8 place-items-center rounded-full bg-teal text-white">
                  <Send className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
