import { CheckCircle, PieChart, Search, Settings } from "lucide-react";

const steps = [
  {
    title: "Diagnóstico",
    text: "Entendemos la situación actual, los documentos, procesos, riesgos y objetivos del cliente.",
    icon: Search,
  },
  {
    title: "Análisis",
    text: "Evaluamos brechas, duplicidades, tiempos, personas a cargo, vencimientos y oportunidades de mejora.",
    icon: PieChart,
  },
  {
    title: "Implementación",
    text: "Diseñamos procedimientos, matrices, reportes, repositorios o soluciones digitales según el caso.",
    icon: Settings,
  },
  {
    title: "Entrega",
    text: "Presentamos resultados, entregables, recomendaciones y acompañamiento para su aplicación.",
    icon: CheckCircle,
  },
];

export function WorkProcess() {
  return (
    <section className="bg-softWhite px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-3xl font-bold text-navy">Cómo trabajamos</h2>
        <div className="mt-6 grid gap-4 rounded-xl bg-white p-4 shadow-card md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative rounded-lg p-4 text-center">
                {index < steps.length - 1 && (
                  <span className="absolute right-[-18px] top-10 hidden text-2xl text-slate-300 md:block">→</span>
                )}
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-teal/40 bg-white text-teal">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="mx-auto mt-3 grid h-6 w-6 place-items-center rounded-full bg-teal text-xs font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-extrabold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
