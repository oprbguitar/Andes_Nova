import { Bot, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const inviteMessages = [
  "¿Qué haces por aquí? Sé que estás buscando algo. Consúltame.",
  "Puedo orientarte sobre documentos, contratos, SST o procesos.",
  "¿Quieres ordenar tu empresa? Empieza con una consulta rápida.",
  "Pregúntame qué servicio se adapta mejor a tu caso.",
  "Estoy aquí para ayudarte a elegir una solución.",
];

export function FloatingChatInvite() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % inviteMessages.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const goToChat = () => {
    document.getElementById("ia")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <button
      type="button"
      onClick={goToChat}
      className="chat-invite group fixed bottom-5 right-4 z-[70] flex max-w-[310px] items-end gap-3 text-left sm:bottom-7 sm:right-7"
      aria-label="Abrir asistente AndesNova IA"
    >
      <span className="hidden rounded-2xl border border-white/20 bg-navy/95 px-4 py-3 text-sm font-semibold leading-5 text-white shadow-premium backdrop-blur-md transition group-hover:-translate-y-1 group-hover:bg-navyDark sm:block">
        {inviteMessages[messageIndex]}
        <span className="mt-2 flex gap-1" aria-hidden="true">
          <span className="chat-dot" />
          <span className="chat-dot chat-dot-delay-1" />
          <span className="chat-dot chat-dot-delay-2" />
        </span>
      </span>

      <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-teal text-white shadow-premium transition group-hover:-translate-y-1 group-hover:bg-tealDark sm:h-16 sm:w-16">
        <span className="absolute inset-0 rounded-full bg-teal/40 blur-xl" />
        <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-gold text-[10px] font-black text-white">
          IA
        </span>
        <Bot className="animate-chat-bounce relative h-7 w-7 sm:h-8 sm:w-8" />
        <MessageCircle className="absolute -bottom-1 -left-1 h-5 w-5 rounded-full bg-white p-1 text-teal" />
      </span>
    </button>
  );
}
