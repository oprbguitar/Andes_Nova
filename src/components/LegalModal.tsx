import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export type LegalSection = "privacy" | "terms" | "data";

type LegalModalProps = {
  open: boolean;
  section: LegalSection;
  onClose: () => void;
};

const tabs: Array<{ id: LegalSection; label: string }> = [
  { id: "privacy", label: "Política de privacidad" },
  { id: "terms", label: "Términos de uso" },
  { id: "data", label: "Tratamiento de datos" },
];

const lastUpdated = "11 de julio de 2026";
const contactEmail = "consultas@andesnova.solutions";

function PrivacyContent() {
  return (
    <>
      <h3>Qué datos se procesan</h3>
      <p>
        El portal AndesNova puede procesar los datos que tú decides ingresar de forma voluntaria: nombre de la
        empresa, sector, tamaño, respuestas del cuestionario de evaluación preliminar y el contenido de las
        consultas escritas al asistente (que puede incluir descripciones de problemas documentales, procesos o
        información contractual). No solicitamos datos personales sensibles y te recomendamos no incluir nombres
        de personas, montos, números de contrato u otra información confidencial en el chat.
      </p>
      <h3>Para qué se utilizan</h3>
      <p>
        Los datos se utilizan únicamente para generar el diagnóstico preliminar, responder tus consultas en el
        asistente y, si lo solicitas, preparar el contacto con un especialista. Para entregar los formularios de
        contacto podemos utilizar FormSubmit como proveedor técnico de correo. No vendemos ni compartimos tus
        datos con terceros con fines publicitarios.
      </p>
      <h3>Cuánto tiempo se conservan</h3>
      <p>
        El cuestionario de evaluación se procesa íntegramente en tu navegador y no se envía a nuestros
        servidores: se descarta al cerrar la ventana. La conversación del chat se guarda temporalmente en tu
        navegador (sessionStorage, hasta 30 mensajes) y se elimina automáticamente al cerrar la pestaña. Si nos
        escribes por correo, conservamos esa comunicación mientras dure la relación comercial o hasta que
        solicites su eliminación.
      </p>
      <h3>Cómo solicitar eliminación</h3>
      <p>
        Puedes borrar la conversación del chat en cualquier momento con el botón «Borrar conversación» o cerrando
        la pestaña. Para solicitar la eliminación de datos enviados por correo u otros canales, escribe a{" "}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Atenderemos tu solicitud conforme a la Ley
        N.º 29733, Ley de Protección de Datos Personales del Perú, y su reglamento.
      </p>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <h3>Naturaleza del servicio</h3>
      <p>
        El cuestionario de evaluación y el asistente AndesNova IA+ ofrecen orientación preliminar de carácter
        informativo. Sus resultados se basan exclusivamente en la información que tú proporcionas, sin
        verificación documental, y deben validarse mediante revisión documental y entrevistas. No constituyen
        asesoría legal, financiera, tributaria ni de auditoría, ni una conclusión definitiva sobre la situación
        de tu empresa.
      </p>
      <h3>Uso adecuado</h3>
      <p>
        Te comprometes a usar el portal de buena fe, a no intentar vulnerar sus mecanismos de seguridad y a no
        ingresar contenido ilícito, difamatorio o que infrinja derechos de terceros. El asistente puede limitar
        temporalmente las consultas para proteger el servicio.
      </p>
      <h3>Responsabilidad</h3>
      <p>
        Las decisiones que tomes a partir del diagnóstico o de las respuestas del asistente son de tu exclusiva
        responsabilidad. AndesNova atiende proyectos previa evaluación y los servicios especializados pueden
        desarrollarse mediante profesionales y empresas colaboradoras.
      </p>
      <h3>Contacto</h3>
      <p>
        Para consultas sobre estos términos escribe a <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </p>
    </>
  );
}

function DataContent() {
  return (
    <>
      <h3>Dónde se procesa cada dato</h3>
      <p>
        Cuestionario de evaluación: se procesa completamente en tu navegador. Las respuestas, los resultados y el
        informe PDF se generan localmente y no se transmiten a nuestros servidores.
      </p>
      <p>
        Asistente (chat): cada consulta se envía a nuestro servicio alojado en Vercel junto con los últimos 6
        mensajes de la conversación para mantener el contexto. Ese servicio consulta documentación interna de
        AndesNova y genera la respuesta con un proveedor externo de inteligencia artificial.
      </p>
      <h3>Proveedor de IA</h3>
      <p>
        Las respuestas del asistente se generan mediante la API de Google Gemini (Google LLC). El contenido de tu
        consulta y el contexto reciente de la conversación se envían a Google para producir la respuesta, y ese
        tratamiento se rige además por las condiciones y políticas de privacidad de Google. Por ello te
        recomendamos no incluir datos personales ni información confidencial en el chat.
      </p>
      <h3>Almacenamiento de la conversación</h3>
      <p>
        La conversación se guarda únicamente en tu navegador (sessionStorage, hasta 30 mensajes) para que no se
        pierda al navegar por la página; se elimina automáticamente al cerrar la pestaña y puedes borrarla en
        cualquier momento con el botón «Borrar conversación». AndesNova no mantiene una base de datos con tus
        conversaciones; los registros técnicos del servicio (necesarios para operarlo y prevenir abusos) se
        conservan por un periodo limitado en la infraestructura de Vercel.
      </p>
      <h3>Tus derechos</h3>
      <p>
        Conforme a la Ley N.º 29733 puedes ejercer los derechos de acceso, rectificación, cancelación y oposición
        escribiendo a <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </p>
    </>
  );
}

export function LegalModal({ open, section, onClose }: LegalModalProps) {
  const [active, setActive] = useState<LegalSection>(section);

  useEffect(() => {
    if (open) {
      setActive(section);
    }
  }, [open, section]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

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
            className="contact-modal legal-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Información legal AndesNova"
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.24 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="contact-close" type="button" aria-label="Cerrar" onClick={onClose}>
              <X size={20} />
            </button>

            <header className="legal-header">
              <span className="wizard-eyebrow">Información legal</span>
              <h2>{tabs.find((tab) => tab.id === active)?.label}</h2>
              <div className="legal-tabs" role="tablist">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active === tab.id}
                    className={`legal-tab ${active === tab.id ? "active" : ""}`}
                    onClick={() => setActive(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </header>

            <div className="legal-body">
              {active === "privacy" ? <PrivacyContent /> : null}
              {active === "terms" ? <TermsContent /> : null}
              {active === "data" ? <DataContent /> : null}
              <p className="legal-updated">Última actualización: {lastUpdated}.</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
