import { ArrowRight, Bot } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="contacto" className="bg-navyDark px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-display text-4xl font-bold leading-tight">
          Ordene su gestión empresarial con una solución técnica, documental y digital.
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/75">
          Solicite una evaluación inicial y descubra qué servicio se adapta mejor a sus documentos, procesos, contratos, proveedores y objetivos.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="mailto:consultas@andesnova.solutions" className="btn-primary">
            Solicitar evaluación inicial
            <ArrowRight className="h-5 w-5" />
          </a>
          <a href="#ia" className="btn-secondary">
            <Bot className="h-5 w-5" />
            Hablar con AndesNova IA
          </a>
        </div>
      </div>
    </section>
  );
}
