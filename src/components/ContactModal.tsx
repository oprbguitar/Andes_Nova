import { Check, Copy, Mail, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";

const leadEndpoint = "https://andesnova-chat-api.vercel.app/api/lead";

function buildMailto(email: string, summary?: string) {
  const subject = summary ? "Solicitud de evaluación - AndesNova" : "Consulta AndesNova";
  const body = summary ? `&body=${encodeURIComponent(summary)}` : "";
  return `mailto:${email}?subject=${encodeURIComponent(subject)}${body}`;
}

type ContactModalProps = {
  open: boolean;
  contact: { email: string };
  summary?: string;
  onClose: () => void;
};

type LeadForm = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
};

type SendState = "idle" | "sending" | "sent" | "fallback";

const emptyForm: LeadForm = { name: "", company: "", email: "", phone: "", message: "", consent: false };

export function ContactModal({ open, contact, summary, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<LeadForm>(emptyForm);
  const [sendState, setSendState] = useState<SendState>("idle");

  useEffect(() => {
    if (!open) {
      setCopied(false);
      setSendState("idle");
      setForm(emptyForm);
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  const formValid =
    form.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) &&
    (form.message.trim().length >= 5 || Boolean(summary)) &&
    form.consent;

  async function submitLead(event: FormEvent) {
    event.preventDefault();
    if (!formValid || sendState === "sending") return;

    setSendState("sending");
    try {
      const response = await fetch(leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
          summary: summary || "",
          consent: form.consent,
        }),
      });

      if (!response.ok) {
        throw new Error(`Lead request failed with ${response.status}`);
      }

      setSendState("sent");
    } catch {
      // Servicio de correo no disponible: se ofrece el flujo por correo directo.
      setSendState("fallback");
    }
  }

  const setField = (field: keyof LeadForm) => (value: string | boolean) =>
    setForm((current) => ({ ...current, [field]: value }));

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="contact-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="contact-modal lead-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Contacto para iniciar evaluación"
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.24 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="contact-close" type="button" aria-label="Cerrar" onClick={onClose}>
              <X size={20} />
            </button>

            {sendState === "sent" ? (
              <div className="lead-success" role="status">
                <span className="contact-icon" aria-hidden="true">
                  <Check size={26} />
                </span>
                <h2>¡Solicitud enviada!</h2>
                <p>
                  Gracias, {form.name.trim().split(" ")[0]}. Revisaremos tu caso y te responderemos a{" "}
                  <strong>{form.email.trim()}</strong> a la brevedad.
                </p>
                <button className="primary-action contact-send" type="button" onClick={onClose}>
                  Entendido
                </button>
              </div>
            ) : (
              <>
                <span className="contact-icon" aria-hidden="true">
                  <Mail size={26} />
                </span>
                <h2>Inicia tu evaluación</h2>
                <p>Déjanos tus datos y coordinamos tu evaluación empresarial:</p>

                <form className="lead-form" onSubmit={submitLead}>
                  <div className="lead-form-row">
                    <label className="wizard-field">
                      <span>Nombre *</span>
                      <input
                        value={form.name}
                        onChange={(event) => setField("name")(event.target.value)}
                        placeholder="Tu nombre"
                        autoComplete="name"
                        maxLength={120}
                      />
                    </label>
                    <label className="wizard-field">
                      <span>Empresa</span>
                      <input
                        value={form.company}
                        onChange={(event) => setField("company")(event.target.value)}
                        placeholder="Nombre de tu empresa"
                        autoComplete="organization"
                        maxLength={160}
                      />
                    </label>
                  </div>
                  <div className="lead-form-row">
                    <label className="wizard-field">
                      <span>Correo *</span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(event) => setField("email")(event.target.value)}
                        placeholder="tucorreo@empresa.com"
                        autoComplete="email"
                        maxLength={254}
                      />
                    </label>
                    <label className="wizard-field">
                      <span>Teléfono</span>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(event) => setField("phone")(event.target.value)}
                        placeholder="+51 ..."
                        autoComplete="tel"
                        maxLength={30}
                      />
                    </label>
                  </div>
                  <label className="wizard-field">
                    <span>{summary ? "Mensaje (opcional)" : "Mensaje *"}</span>
                    <textarea
                      value={form.message}
                      onChange={(event) => setField("message")(event.target.value)}
                      placeholder="Cuéntanos brevemente qué necesitas resolver"
                      rows={3}
                      maxLength={2000}
                    />
                  </label>

                  {summary ? (
                    <p className="contact-summary-note">Se adjuntará el resumen de tu diagnóstico o consulta.</p>
                  ) : null}

                  <label className="lead-consent">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(event) => setField("consent")(event.target.checked)}
                    />
                    <span>
                      Acepto que AndesNova use estos datos para responder mi solicitud, según su política de
                      privacidad. *
                    </span>
                  </label>

                  {sendState === "fallback" ? (
                    <p className="lead-error" role="alert">
                      No pudimos enviar el formulario en este momento. Escríbenos directamente por correo:
                    </p>
                  ) : null}

                  <div className="contact-actions">
                    {sendState === "fallback" ? (
                      <a className="primary-action contact-send" href={buildMailto(contact.email, summary)}>
                        Escribir correo <Mail size={19} />
                      </a>
                    ) : (
                      <button className="primary-action contact-send" type="submit" disabled={!formValid || sendState === "sending"}>
                        {sendState === "sending" ? "Enviando..." : "Enviar solicitud"} <Send size={18} />
                      </button>
                    )}
                    <button className="contact-copy" type="button" onClick={copyEmail}>
                      {copied ? (
                        <>
                          Copiado <Check size={17} />
                        </>
                      ) : (
                        <>
                          Copiar correo <Copy size={17} />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <p className="lead-alt">
                  ¿Prefieres escribirnos tú? <a href={buildMailto(contact.email, summary)}>{contact.email}</a>
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
