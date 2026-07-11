import { Check, Copy, Mail, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

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

export function ContactModal({ open, contact, summary, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) {
      setCopied(false);
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
            className="contact-modal"
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
            <span className="contact-icon" aria-hidden="true">
              <Mail size={26} />
            </span>
            <h2>Inicia tu evaluación</h2>
            <p>Escríbenos y coordinamos tu evaluación empresarial:</p>
            <a className="contact-email" href={buildMailto(contact.email, summary)}>
              {contact.email}
            </a>
            {summary ? (
              <p className="contact-summary-note">Se incluirá el resumen de tu consulta del chat en el correo.</p>
            ) : null}
            <div className="contact-actions">
              <a className="primary-action contact-send" href={buildMailto(contact.email, summary)}>
                Escribir correo <Mail size={19} />
              </a>
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
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
