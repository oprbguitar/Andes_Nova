import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { KeyboardEvent } from "react";
import type { EvaluationArea } from "../data/companyData";

type EvaluationNodeProps = {
  area: EvaluationArea;
  className?: string;
  active: boolean;
  compact?: boolean;
  number?: number;
  onSelect: (id: string) => void;
};

export function EvaluationNode({ area, className = "", active, compact, number, onSelect }: EvaluationNodeProps) {
  const Icon = area.icon;

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(area.id);
    }
  }

  return (
    <motion.button
      className={`evaluation-node tone-${area.statusKey} ${compact ? "compact" : ""} ${active ? "selected" : ""} ${className}`}
      type="button"
      aria-label={`${area.title}: ${area.status}`}
      aria-expanded={active}
      onClick={() => onSelect(area.id)}
      onKeyDown={onKeyDown}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ "--node-color": area.color } as CSSProperties}
    >
      {number ? <span className="node-number">{number}</span> : null}
      <span className="node-icon">
        <Icon size={compact ? 30 : 26} strokeWidth={1.9} />
      </span>
      <span className="node-card">
        <strong>{area.title}</strong>
        <span className="status-pill">{area.status}</span>
      </span>
      <span className="node-popover" role="tooltip">
        <strong>{area.title}</strong>
        <span>{area.status}</span>
        <p>{area.description}</p>
        <ul>
          {area.actions.slice(0, 3).map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
      </span>
    </motion.button>
  );
}
