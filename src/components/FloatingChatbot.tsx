import { Bot, MessageCircle, Send, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { chatbotResponses, genericResponse, quickPrompts } from "../data/chatbotResponses";

type Message = {
  from: "bot" | "user";
  text: string;
};

const floatingMessages = [
  "¿Qué haces por aquí? Sé que estás buscando algo.",
  "Consúltame sobre documentos, contratos o procesos.",
  "Puedo ayudarte a elegir el servicio adecuado.",
  "Ordena tu empresa con una consulta rápida.",
];

const botAnimations = ["bot-bounce", "bot-glow", "bot-wiggle", "bot-float", "bot-pulse"];

const initialMessage =
  "Hola, soy AndesNova IA. Puedo orientarte sobre gestión documental, contratos, procesos, SST, logística, reportes o soluciones con IA. ¿Qué necesitas resolver?";

export function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [botAnimation, setBotAnimation] = useState(botAnimations[0]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ from: "bot", text: initialMessage }]);

  useEffect(() => {
    const messageTimer = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % floatingMessages.length);
    }, 4500);
    const animationTimer = window.setInterval(() => {
      const next = botAnimations[Math.floor(Math.random() * botAnimations.length)];
      setBotAnimation(next);
    }, 3200);

    return () => {
      window.clearInterval(messageTimer);
      window.clearInterval(animationTimer);
    };
  }, []);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#ia") {
        setOpen(true);
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

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
    <div id="ia" className="fixed bottom-5 right-4 z-[90] sm:bottom-7 sm:right-7">
      {open && (
        <section className="mb-4 w-[min(calc(100vw-2rem),390px)] overflow-hidden rounded-2xl border border-white/15 bg-[#0b233d] shadow-premium">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-teal">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-bold text-white">AndesNova IA+</h2>
                <p className="text-xs text-white/65">Asistente empresarial</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-white/75 transition hover:bg-white/10 hover:text-white"
              aria-label="Cerrar asistente"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-[430px] space-y-3 overflow-auto bg-softWhite p-3">
            {messages.map((message, index) => (
              <div
                key={`${message.from}-${index}`}
                className={`rounded-xl p-3 text-sm leading-6 ${
                  message.from === "bot" ? "mr-8 bg-white text-navy shadow-sm" : "ml-8 bg-teal text-white"
                }`}
              >
                {message.text}
              </div>
            ))}

            <div className="grid gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => ask(prompt)}
                  className="rounded-full border border-teal/40 bg-white px-3 py-2 text-xs font-bold text-tealDark transition hover:bg-teal hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="flex gap-2 border-t border-white/10 bg-[#0b233d] p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white px-4 py-3 text-sm text-navy outline-none focus:ring-2 focus:ring-teal"
              placeholder="Escriba su consulta..."
              aria-label="Escriba su consulta"
            />
            <button
              type="submit"
              className="grid h-12 w-12 place-items-center rounded-full bg-teal text-white transition hover:bg-tealDark"
              aria-label="Enviar consulta"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>

          <p className="bg-[#0b233d] px-4 pb-3 text-xs text-white/55">
            Consulta inicial orientativa. Servicio sujeto a evaluación.
          </p>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="chat-invite group flex items-end gap-3 text-left"
        aria-label={open ? "Ocultar asistente AndesNova IA" : "Abrir asistente AndesNova IA"}
      >
        {!open && (
          <span className="hidden max-w-[280px] rounded-2xl border border-white/20 bg-navyDark/95 px-4 py-3 text-sm font-semibold leading-5 text-white shadow-premium backdrop-blur-md transition group-hover:-translate-y-1 sm:block">
            {floatingMessages[messageIndex]}
          </span>
        )}

        <span
          className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-teal text-white shadow-premium transition group-hover:-translate-y-1 group-hover:bg-tealDark sm:h-16 sm:w-16 ${botAnimation}`}
        >
          <span className="bot-ring absolute inset-0 rounded-full bg-teal/30" />
          <span className="bot-ring-delay absolute inset-0 rounded-full bg-gold/25" />
          <span className="absolute inset-0 rounded-full bg-teal/40 blur-xl" />
          <span className="absolute -right-1 -top-1 z-20 grid h-6 w-6 place-items-center rounded-full bg-gold text-[10px] font-black text-white">
            IA
          </span>
          {open ? <X className="relative z-10 h-7 w-7" /> : <Bot className="relative z-10 h-7 w-7 sm:h-8 sm:w-8" />}
          {!open && <MessageCircle className="absolute -bottom-1 -left-1 z-20 h-5 w-5 rounded-full bg-white p-1 text-teal" />}
        </span>
      </button>
    </div>
  );
}
