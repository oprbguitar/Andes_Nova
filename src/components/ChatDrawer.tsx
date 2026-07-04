import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { getLocalChatResponse } from "../services/chatService";

type Message = {
  id: number;
  from: "user" | "andes";
  text: string;
};

export function ChatDrawer({
  prompts,
  selectedAreaId,
}: {
  prompts: string[];
  selectedAreaId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: "andes", text: "Puedo guiarte con la data visible de AndesNova." },
  ]);

  function ask(text: string) {
    const clean = text.trim();
    if (!clean) return;
    setMessages((current) => [
      ...current,
      { id: Date.now(), from: "user", text: clean },
      { id: Date.now() + 1, from: "andes", text: getLocalChatResponse(clean, selectedAreaId) },
    ]);
    setInput("");
    setOpen(true);
  }

  return (
    <div className={`chat-drawer ${open ? "open" : ""}`}>
      <button className="chat-toggle" type="button" onClick={() => setOpen((value) => !value)}>
        {open ? "Cerrar guía" : "Abrir guía"}
      </button>
      <div className="prompt-list">
        {prompts.map((prompt) => (
          <button key={prompt} type="button" onClick={() => ask(prompt)}>
            {prompt}
          </button>
        ))}
      </div>
      {open ? (
        <div className="chat-body">
          <div className="messages">
            {messages.map((message) => (
              <p className={message.from} key={message.id}>
                {message.text}
              </p>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              ask(input);
            }}
          >
            <input
              aria-label="Pregunta para Andes"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Pregunta breve..."
            />
            <button type="submit" aria-label="Enviar pregunta">
              <SendHorizontal size={17} />
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
