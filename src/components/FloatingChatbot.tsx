import { Check, Copy, Download, RotateCcw, Send, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

type SourceInfo = {
  title: string;
  category?: string;
  updated?: string;
  description?: string;
};

type MessageStatus = "offline" | "limit" | "error";

type Message = {
  from: "bot" | "user";
  text: string;
  kind?: "answer";
  sources?: SourceInfo[];
  status?: MessageStatus;
  retryText?: string;
  feedback?: "up" | "down";
  loading?: boolean;
};

type ApiMessage = {
  role: "assistant" | "user";
  content: string;
};

type SuggestionChip = {
  label: string;
  message: string;
};

type ServiceStatus = "checking" | "available" | "fallback" | "unavailable";

const floatingMessages = [
  "Hola 👋",
  "¿Qué necesitas?",
  "¿Te ayudo con algo?",
  "Consulta gratis aquí 💬",
  "¿Buscas una ruta clara?",
  "Tu evaluación puede empezar hoy 🚀",
  "¿Dudas? Escríbeme",
  "Pregúntame por documentación, riesgos u operaciones.",
  "¿Quieres ordenar tu empresa?",
];

const chatEndpoint = "https://andesnova-chat-api.vercel.app/api/chat";
const healthEndpoint = "https://andesnova-chat-api.vercel.app/api/health";

const serviceStatusLabels: Record<ServiceStatus, string> = {
  checking: "Comprobando servicio",
  available: "Servicio disponible",
  fallback: "Respuesta local de respaldo",
  unavailable: "Temporalmente no disponible",
};

const primarySuggestions: SuggestionChip[] = [
  {
    label: "Chatbot documental",
    message: "Quiero un chatbot documental para consultar archivos internos. ¿Qué pasos recomienda?",
  },
  {
    label: "Capacitación",
    message: "Necesito capacitación para mi equipo en procesos, documentación o SST. ¿Qué enfoque recomienda?",
  },
  {
    label: "Mejorar procesos",
    message: "Mi empresa tiene demoras y procesos poco claros. ¿Qué pasos iniciales debería tomar?",
  },
];

const moreSuggestions: SuggestionChip[] = [
  {
    label: "Ordenar documentos",
    message: "Quiero ordenar los documentos de mi empresa. ¿Por dónde debería empezar?",
  },
  {
    label: "Revisar contratos",
    message: "Tengo contratos desordenados y quiero controlar vencimientos y obligaciones. ¿Qué me recomienda?",
  },
  {
    label: "SST",
    message: "Necesito apoyo en SST para ordenar documentación, controles e IPERC. ¿Cómo debería empezar?",
  },
  {
    label: "Logística",
    message: "Quiero ordenar proveedores, compras y contrataciones. ¿Qué recomienda AndesNova?",
  },
  {
    label: "Dashboards",
    message: "Necesito reportes o dashboards para controlar mejor la gestión. ¿Qué información debería preparar?",
  },
];

const initialMessage =
  "Hola, soy AndesNova IA+. Puedo orientarte sobre documentos, contratos, procesos, SST, logística, reportes o soluciones con IA. Cuéntame brevemente qué necesitas resolver.";

const loadingMessage = "Procesando consulta";

const errorMessage =
  "Ahora mismo no puedo procesar la consulta. Puedes reintentarlo o solicitar una evaluación inicial.";

const offlineMessage =
  "Parece que no hay conexión a internet. Revisa tu red y vuelve a intentarlo.";

const rateLimitMessage =
  "Has enviado varias consultas seguidas. Espera un minuto e inténtalo de nuevo; mientras tanto puedo orientarte con los temas sugeridos.";

const statusLabels: Record<MessageStatus, string> = {
  offline: "Sin conexión",
  limit: "Límite alcanzado",
  error: "No disponible",
};

const chatStorageKey = "andesnova-chat-messages";
const maxStoredMessages = 30;

function normalizeSources(raw: unknown): SourceInfo[] | undefined {
  if (!Array.isArray(raw)) {
    return undefined;
  }

  const sources = raw
    .map((item): SourceInfo | null => {
      if (typeof item === "string") {
        return { title: item };
      }

      if (item && typeof item === "object" && typeof (item as SourceInfo).title === "string") {
        const source = item as SourceInfo;
        return {
          title: source.title,
          category: typeof source.category === "string" ? source.category : undefined,
          updated: typeof source.updated === "string" ? source.updated : undefined,
          description: typeof source.description === "string" ? source.description : undefined,
        };
      }

      return null;
    })
    .filter((item): item is SourceInfo => item !== null)
    .slice(0, 3);

  return sources.length ? sources : undefined;
}

function loadStoredMessages(): Message[] {
  try {
    const raw = sessionStorage.getItem(chatStorageKey);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        parsed.every(
          (item) =>
            item &&
            typeof item === "object" &&
            ((item as Message).from === "bot" || (item as Message).from === "user") &&
            typeof (item as Message).text === "string",
        )
      ) {
        return (parsed as Message[]).map(({ from, text, kind, sources, feedback }) => ({
          from,
          text,
          kind: kind === "answer" ? kind : undefined,
          sources: normalizeSources(sources),
          feedback: feedback === "up" || feedback === "down" ? feedback : undefined,
        }));
      }
    }
  } catch {
    // sessionStorage unavailable or corrupted: start fresh
  }

  return [{ from: "bot", text: initialMessage }];
}

function storeMessages(messages: Message[]) {
  try {
    const persistable = messages
      .filter((message) => !message.loading && !message.status)
      .slice(-maxStoredMessages)
      .map(({ from, text, kind, sources, feedback }) => ({ from, text, kind, sources, feedback }));
    sessionStorage.setItem(chatStorageKey, JSON.stringify(persistable));
  } catch {
    // storage full or unavailable: keep the chat working without persistence
  }
}

const toApiHistory = (messages: Message[]): ApiMessage[] =>
  messages
    .filter((message) => !message.loading && !message.status)
    .map((message) => ({
      role: message.from === "bot" ? ("assistant" as const) : ("user" as const),
      content: message.text,
    }))
    .slice(-6);

function TypingIndicator() {
  return (
    <div className="floating-chat-typing">
      <span>{loadingMessage}</span>
      <span className="floating-chat-typing-dots" aria-hidden="true">
        <span className="chat-dot" />
        <span className="chat-dot chat-dot-delay-1" />
        <span className="chat-dot chat-dot-delay-2" />
      </span>
    </div>
  );
}

type FloatingChatbotProps = {
  onRequestContact: (summary?: string) => void;
};

export function FloatingChatbot({ onRequestContact }: FloatingChatbotProps) {
  const [open, setOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMoreTopics, setShowMoreTopics] = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadStoredMessages);
  const [orbEffect, setOrbEffect] = useState<"jump" | "glow" | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>("checking");
  const messagesBoxRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    setServiceStatus("checking");

    void fetch(healthEndpoint, { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Health check failed");
        const data = (await response.json()) as { status?: unknown };
        setServiceStatus(
          data.status === "available" ? "available" : data.status === "fallback" ? "fallback" : "unavailable",
        );
      })
      .catch(() => setServiceStatus("unavailable"))
      .finally(() => window.clearTimeout(timeout));

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [open]);

  useEffect(() => {
    let messageTimer: number;

    const scheduleNext = () => {
      messageTimer = window.setTimeout(() => {
        setMessageIndex((current) => {
          let next = Math.floor(Math.random() * floatingMessages.length);
          if (next === current) {
            next = (next + 1) % floatingMessages.length;
          }
          return next;
        });
        scheduleNext();
      }, 4200 + Math.random() * 3600);
    };

    scheduleNext();
    return () => window.clearTimeout(messageTimer);
  }, []);

  useEffect(() => {
    let startTimer: number;
    let stopTimer: number;

    const scheduleEffect = () => {
      startTimer = window.setTimeout(() => {
        setOrbEffect(Math.random() < 0.5 ? "jump" : "glow");
        stopTimer = window.setTimeout(() => {
          setOrbEffect(null);
          scheduleEffect();
        }, 1400);
      }, 2400 + Math.random() * 4200);
    };

    scheduleEffect();
    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(stopTimer);
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

  useEffect(() => {
    if (!open) {
      return;
    }

    const box = messagesBoxRef.current;
    const last = messages[messages.length - 1];

    if (last?.from === "bot" && !last.loading && lastMessageRef.current && box) {
      box.scrollTo({ top: Math.max(lastMessageRef.current.offsetTop - 10, 0), behavior: "smooth" });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, open, showMoreTopics]);

  useEffect(() => {
    storeMessages(messages);
  }, [messages]);

  const sendMessage = async (userMessage: string, options?: { isRetry?: boolean }) => {
    if (loading) return;

    setLoading(true);

    const waitingEntry: Message = { from: "bot", text: loadingMessage, loading: true };
    let history: ApiMessage[] = [];

    setMessages((current) => {
      history = toApiHistory(current);
      const next = options?.isRetry ? [...current] : [...current, { from: "user", text: userMessage } as Message];
      return [...next, waitingEntry];
    });

    const replaceLoading = (entry: Message) => {
      setMessages((current) => current.map((message) => (message.loading ? entry : message)));
    };

    try {
      const response = await fetch(chatEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history,
        }),
      });

      if (response.status === 429) {
        replaceLoading({ from: "bot", text: rateLimitMessage, status: "limit", retryText: userMessage });
        return;
      }

      if (!response.ok) {
        throw new Error(`Chat request failed with ${response.status}`);
      }

      const data = (await response.json()) as { answer?: unknown; sources?: unknown };
      const answer = typeof data.answer === "string" && data.answer.trim() ? data.answer : errorMessage;

      replaceLoading({ from: "bot", text: answer, kind: "answer", sources: normalizeSources(data.sources) });
    } catch (error) {
      const offline =
        (typeof navigator !== "undefined" && !navigator.onLine) || error instanceof TypeError;

      replaceLoading({
        from: "bot",
        text: offline ? offlineMessage : errorMessage,
        status: offline ? "offline" : "error",
        retryText: userMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const retryMessage = (failed: Message) => {
    if (!failed.retryText || loading) return;
    const retryText = failed.retryText;
    setMessages((current) => current.filter((message) => message !== failed));
    void sendMessage(retryText, { isRetry: true });
  };

  const setFeedback = (target: Message, feedback: "up" | "down") => {
    setMessages((current) =>
      current.map((message) => (message === target ? { ...message, feedback } : message)),
    );
  };

  const copyAnswer = async (target: Message, index: number) => {
    try {
      await navigator.clipboard.writeText(target.text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      setCopiedIndex(null);
    }
  };

  const downloadAnswer = (target: Message) => {
    const sourceLines = target.sources?.length
      ? `\n\nBasado en: ${target.sources.map((source) => source.title).join(", ")}`
      : "";
    const blob = new Blob([`Recomendación AndesNova IA+\n\n${target.text}${sourceLines}\n`], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "recomendacion-andesnova.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const buildCaseSummary = () => {
    const userTexts = messages
      .filter((message) => message.from === "user")
      .slice(-4)
      .map((message) => `- ${message.text}`);
    const lastAnswer = [...messages].reverse().find((message) => message.kind === "answer");

    if (!userTexts.length && !lastAnswer) {
      return undefined;
    }

    return [
      "Resumen del caso (chat AndesNova):",
      userTexts.length ? `Consultas:\n${userTexts.join("\n")}` : "",
      lastAnswer ? `Recomendación del asistente:\n${lastAnswer.text}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const chooseSuggestion = (suggestion: SuggestionChip) => {
    void sendMessage(suggestion.message);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    void sendMessage(text);
  };

  const hasUserMessage = messages.some((message) => message.from === "user");
  const visibleSuggestions = showMoreTopics ? [...primarySuggestions, ...moreSuggestions] : primarySuggestions;

  return (
    <div id="ia" className={`chatbot-floating ${open ? "chatbot-open" : ""}`}>
      {open && (
        <section className="floating-chat-panel" aria-label="Chatbot AndesNova IA">
          <div className="floating-chat-header">
            <div className="floating-chat-title">
              <div className="floating-chat-avatar" aria-hidden="true">
                <BotHelmetFace compact />
              </div>
              <div>
                <h2>AndesNova IA+</h2>
                <p className={`chat-service-status status-${serviceStatus}`}>
                  <span aria-hidden="true" /> {serviceStatusLabels[serviceStatus]}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="floating-chat-close"
              aria-label="Cerrar asistente"
            >
              <X size={20} />
            </button>
          </div>

          <div className="floating-chat-messages" ref={messagesBoxRef}>
            {messages.map((message, index) => {
              if (message.loading) {
                return <TypingIndicator key={`${message.from}-${index}`} />;
              }

              const isLast = index === messages.length - 1;

              return (
                <div
                  key={`${message.from}-${index}`}
                  ref={isLast ? lastMessageRef : undefined}
                  className={`floating-chat-message ${message.from === "bot" ? "bot" : "user"} ${
                    message.status ? `status-${message.status}` : ""
                  }`}
                >
                  {message.status ? (
                    <span className={`floating-chat-status-tag tag-${message.status}`}>
                      {statusLabels[message.status]}
                    </span>
                  ) : null}
                  {message.text}
                  {message.status && message.retryText && message.status !== "limit" ? (
                    <button
                      type="button"
                      className="floating-chat-retry"
                      onClick={() => retryMessage(message)}
                      disabled={loading}
                    >
                      <RotateCcw size={14} /> Reintentar
                    </button>
                  ) : null}
                  {message.from === "bot" && message.sources?.length ? (
                    <span className="floating-chat-sources">
                      <span className="floating-chat-sources-label">Basado en:</span>
                      {message.sources.map((source) => (
                        <details className="floating-chat-source" key={source.title}>
                          <summary>
                            {source.title}
                            {source.updated ? <small>{source.updated}</small> : null}
                          </summary>
                          {source.category ? <em>{source.category}</em> : null}
                          {source.description ? <p>{source.description}</p> : null}
                        </details>
                      ))}
                    </span>
                  ) : null}
                  {message.kind === "answer" ? (
                    <span className="floating-chat-tools">
                      <span className="floating-chat-feedback">
                        {message.feedback ? (
                          "¡Gracias por tu opinión!"
                        ) : (
                          <>
                            ¿Te resultó útil?
                            <button
                              type="button"
                              aria-label="Sí, fue útil"
                              onClick={() => setFeedback(message, "up")}
                            >
                              <ThumbsUp size={14} />
                            </button>
                            <button
                              type="button"
                              aria-label="No fue útil"
                              onClick={() => setFeedback(message, "down")}
                            >
                              <ThumbsDown size={14} />
                            </button>
                          </>
                        )}
                      </span>
                      <span className="floating-chat-tool-buttons">
                        <button
                          type="button"
                          aria-label="Copiar recomendación"
                          title="Copiar"
                          onClick={() => void copyAnswer(message, index)}
                        >
                          {copiedIndex === index ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                        <button
                          type="button"
                          aria-label="Descargar recomendación"
                          title="Descargar"
                          onClick={() => downloadAnswer(message)}
                        >
                          <Download size={14} />
                        </button>
                      </span>
                    </span>
                  ) : null}
                </div>
              );
            })}

            {!hasUserMessage && (
              <div className="floating-chat-suggestions">
                <div className="floating-chat-chip-row">
                  {visibleSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.label}
                      type="button"
                      onClick={() => chooseSuggestion(suggestion)}
                      disabled={loading}
                      className="floating-chat-chip"
                    >
                      {suggestion.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowMoreTopics((value) => !value)}
                  className="floating-chat-more"
                >
                  {showMoreTopics ? "Ver menos temas" : "Ver más temas"}
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="floating-chat-composer">
            <div className="floating-chat-actions">
              <button
                type="button"
                onClick={() => onRequestContact(buildCaseSummary())}
                className="floating-chat-action"
              >
                Solicitar evaluación
              </button>
              <button type="button" onClick={() => onRequestContact()} className="floating-chat-action">
                Contactar especialista
              </button>
            </div>

            <form onSubmit={submit} className="floating-chat-form">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="floating-chat-input"
                placeholder="Describe tu caso o consulta..."
                aria-label="Describe tu caso o consulta"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="floating-chat-send"
                aria-label={loading ? "Esperando respuesta" : "Enviar consulta"}
              >
                <Send size={19} />
              </button>
            </form>

            <p>Orientado con documentación interna de AndesNova.</p>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="chatbot-floating-launcher"
        aria-label={open ? "Ocultar asistente AndesNova IA" : "Abrir asistente AndesNova IA"}
      >
        {!open && (
          <span className="chatbot-floating-hint" key={messageIndex}>
            {floatingMessages[messageIndex]}
          </span>
        )}

        <span className={`chatbot-floating-orb ${!open && orbEffect ? `orb-${orbEffect}` : ""}`}>
          {open ? <X className="chatbot-orb-close" size={28} /> : <BotHelmetFace />}
          {!open && <span className={`chatbot-online-dot status-${serviceStatus}`} aria-hidden="true" />}
        </span>
      </button>
    </div>
  );
}

function BotHelmetFace({ compact = false }: { compact?: boolean }) {
  return (
    <svg className={compact ? "bot-helmet-face compact" : "bot-helmet-face"} viewBox="0 0 96 96" aria-hidden="true">
      <defs>
        <linearGradient id="orbFace" x1="24" x2="72" y1="34" y2="74">
          <stop offset="0" stopColor="#17467a" />
          <stop offset="1" stopColor="#061642" />
        </linearGradient>
      </defs>
      <path className="bot-helmet-shell" d="M18 49c0-18 13-32 30-32s30 14 30 32v9H18z" />
      <path className="bot-helmet-brim" d="M16 54c7 4 18 6 32 6s25-2 32-6v8c-8 5-19 7-32 7s-24-2-32-7z" />
      <path className="bot-helmet-ridge" d="M48 17v39" />
      <rect className="bot-face-panel" x="23" y="37" width="50" height="35" rx="18" />
      <path className="bot-eye left" d="M38 53c0-5 3-8 7-8s7 3 7 8" />
      <path className="bot-eye right" d="M55 53c0-5 3-8 7-8s7 3 7 8" />
      <path className="bot-smile" d="M40 62c5 4 11 4 16 0" />
      <path className="bot-ear left" d="M18 48h-5c-3 0-5 3-5 8s2 8 5 8h5" />
      <path className="bot-ear right" d="M78 48h5c3 0 5 3 5 8s-2 8-5 8h-5" />
    </svg>
  );
}
