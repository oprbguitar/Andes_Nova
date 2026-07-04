import { ArrowRight, ChevronRight, CirclePlus, FileText, ShieldCheck, Settings } from "lucide-react";
import type { EvaluationArea } from "../data/companyData";
import { ChatDrawer } from "./ChatDrawer";

type AssistantPanelProps = {
  className?: string;
  mode: "home" | "route";
  title: string;
  subtitle: string;
  status: string;
  suggestions: { id: string; label: string; detail: string; areaId: string }[];
  prompts: string[];
  selectedArea?: EvaluationArea;
  routePriorities?: EvaluationArea[];
  onSuggestion: (areaId: string) => void;
  onPrimary: () => void;
};

const suggestionIcons = [ShieldCheck, FileText, CirclePlus];
const priorityIcons = [ShieldCheck, Settings, FileText];

export function AssistantPanel({
  className = "",
  mode,
  title,
  subtitle,
  status,
  suggestions,
  prompts,
  selectedArea,
  routePriorities = [],
  onSuggestion,
  onPrimary,
}: AssistantPanelProps) {
  const priorities = routePriorities.length ? routePriorities : [];

  return (
    <aside className={`assistant-panel ${className}`}>
      <div className="mascot-wrap" aria-hidden="true">
        <div className="mascot">
          <span className="helmet" />
          <span className="face">
            <i />
            <i />
          </span>
          <span className="ear left" />
          <span className="ear right" />
        </div>
      </div>
      <h2>{selectedArea ? selectedArea.title : title}</h2>
      <p>{selectedArea ? selectedArea.guidance : subtitle}</p>

      <div className="assistant-divider" />

      {mode === "home" ? (
        <>
          <h3>Sugerencias</h3>
          <div className="suggestion-list">
            {suggestions.map((item, index) => {
              const Icon = suggestionIcons[index] ?? CirclePlus;
              return (
                <button key={item.id} type="button" onClick={() => onSuggestion(item.areaId)}>
                  <span className={`suggestion-icon icon-${index}`}>
                    <Icon size={22} />
                  </span>
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.detail}</small>
                  </span>
                  <ChevronRight size={18} />
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <h3>Prioridades</h3>
          <div className="suggestion-list priorities">
            {priorities.map((item, index) => {
              const Icon = priorityIcons[index] ?? FileText;
              return (
                <button key={item.id} type="button" onClick={() => onSuggestion(item.id)}>
                  <span className={`suggestion-icon icon-${index}`}>
                    <Icon size={22} />
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.status}</small>
                  </span>
                  <ChevronRight size={18} />
                </button>
              );
            })}
          </div>
        </>
      )}

      <button className="assistant-cta" type="button" onClick={onPrimary}>
        {mode === "home" ? "Iniciar evaluación" : "Siguiente paso"}
        <ArrowRight size={22} />
      </button>
      {mode === "route" ? (
        <button className="assistant-secondary" type="button">
          Ver detalles
          <FileText size={18} />
        </button>
      ) : null}

      <ChatDrawer prompts={prompts} selectedAreaId={selectedArea?.id} />

      <div className="assistant-status">
        <span />
        {status}
      </div>
    </aside>
  );
}
