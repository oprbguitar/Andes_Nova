import { Bot, ChevronRight, Send, ShieldCheck } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { chatbotResponses, genericResponse, quickPrompts } from "../data/chatbotResponses";

type Message = {
  from: "bot" | "user";
  text: string;
};

export function ChatbotPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hola, soy AndesNova IA. ¿En qué puedo ayudarle hoy?" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const ask = (prompt: string) => {
    setMessages((current) => [
      ...current,
      { from: "user", text: prompt },
      { from: "bot", text: chatbotResponses[prompt] ?? genericResponse },
    ]);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((current) => [...current, { from: "user", text }, { from: "bot", text: genericResponse }]);
  };

  return (
    <section id="ia" className="bg-navyDark px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6 text-white shadow-premium">
          <div className="grid gap-6 md:grid-cols-[1fr_0.9fr] md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold">Un equipo experto a su lado</h2>
              <p className="mt-4 max-w-2xl leading-7 text-white/76">
                Más de 15 años ayudando a empresas a ordenar documentación, procesos, contratos, proveedores y reportes con criterio técnico.
              </p>
              <a href="#areas" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold">
                Conozca cómo coordinamos
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {["Documentos", "Procesos", "IA"].map((item, index) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/8 p-4">
                  <p className="text-2xl font-black text-white">{index === 0 ? "8" : index === 1 ? "4" : "1"}</p>
                  <p className="mt-1 text-xs font-semibold text-white/62">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/12 bg-[#0b233d] p-4 shadow-premium" aria-label="Panel AndesNova IA+">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-teal">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-bold text-white">AndesNova IA+</h2>
                <p className="text-xs text-white/62">Asistente inteligente</p>
              </div>
            </div>
            <span className="flex items-center gap-2 text-xs font-semibold text-white/76">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              En línea
            </span>
          </div>

          <div className="mt-4 max-h-[380px] space-y-3 overflow-auto rounded-lg bg-softWhite p-3">
            {messages.map((message, index) => (
              <div
                key={`${message.from}-${index}`}
                className={`rounded-lg p-3 text-sm leading-6 ${
                  message.from === "bot" ? "bg-white text-navy shadow-sm" : "ml-auto bg-teal text-white"
                }`}
              >
                {message.text}
              </div>
            ))}
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => ask(prompt)}
                  className="rounded-full border border-teal/50 bg-white px-3 py-2 text-xs font-bold text-tealDark transition hover:bg-teal hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="mt-3 flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white px-4 py-3 text-sm text-navy outline-none focus:ring-2 focus:ring-teal"
              placeholder="Escriba su consulta..."
              aria-label="Escriba su consulta"
            />
            <button className="grid h-12 w-12 place-items-center rounded-full bg-teal text-white transition hover:bg-tealDark" aria-label="Enviar consulta">
              <Send className="h-5 w-5" />
            </button>
          </form>
          <p className="mt-3 flex items-center gap-2 text-xs text-white/58">
            <ShieldCheck className="h-4 w-4" />
            IA entrenada con conocimiento de AndesNova Consultores S.A.C.
          </p>
        </div>
      </div>
    </section>
  );
}
