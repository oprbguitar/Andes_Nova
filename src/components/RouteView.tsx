import { motion } from "framer-motion";
import type { EvaluationArea, companyData } from "../data/companyData";
import { AssistantPanel } from "./AssistantPanel";
import { BuildingIllustration } from "./BuildingIllustration";
import { EvaluationNode } from "./EvaluationNode";
import { RoutePath } from "./RoutePath";

type RouteViewProps = {
  areas: EvaluationArea[];
  routeSteps: string[];
  assistant: typeof companyData.assistant;
  selectedArea?: EvaluationArea;
  onSelectArea: (id: string) => void;
};

const routePositions = ["route-one", "route-two", "route-three", "route-four", "route-five"];

export function RouteView({ areas, routeSteps, assistant, selectedArea, onSelectArea }: RouteViewProps) {
  const ordered = routeSteps
    .map((id) => areas.find((area) => area.id === id))
    .filter(Boolean) as EvaluationArea[];

  return (
    <motion.section
      className="screen route-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.32 }}
    >
      <div className="route-canvas">
        <RoutePath />
        <svg className="route-connectors" viewBox="0 0 980 550" aria-hidden="true">
          <path className="connector green" d="M150 250 C300 310 335 350 420 390" />
          <path className="connector green" d="M335 175 C400 260 425 310 455 383" />
          <path className="connector blue" d="M520 120 C510 230 495 300 490 380" />
          <path className="connector orange" d="M700 130 C650 235 585 300 525 380" />
          <path className="connector gray" d="M870 150 C820 280 680 340 540 385" />
        </svg>
        {ordered.map((area, index) => (
          <EvaluationNode
            compact
            area={area}
            active={selectedArea?.id === area.id}
            className={routePositions[index]}
            key={area.id}
            number={index + 1}
            onSelect={onSelectArea}
          />
        ))}
        <div className="route-building">
          <BuildingIllustration />
        </div>
      </div>
      <AssistantPanel
        mode="route"
        title={assistant.routeTitle}
        subtitle={assistant.routeSubtitle}
        status={assistant.status}
        suggestions={assistant.suggestions}
        prompts={assistant.prompts}
        selectedArea={selectedArea}
        routePriorities={["risks", "operation", "documentation"]
          .map((id) => areas.find((area) => area.id === id))
          .filter(Boolean) as EvaluationArea[]}
        onSuggestion={onSelectArea}
        onPrimary={() => onSelectArea("risks")}
      />
    </motion.section>
  );
}
