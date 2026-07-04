import { companyData, type EvaluationArea } from "../data/companyData";

const fallbackArea: EvaluationArea = {
  id: "fallback",
  title: "Área por completar",
  status: "Pendiente",
  statusKey: "pending",
  color: "#73839a",
  icon: companyData.areas[4].icon,
  description: "Esta área necesita completar información antes de mostrarse con detalle.",
  actions: ["Completar título", "Agregar estado", "Definir acciones"],
  guidance: "Hay información incompleta. Completa la data para mejorar la guía.",
};

export function validateCompanyData(data = companyData) {
  const warnings: string[] = [];

  const areas = data.areas.map((area, index) => {
    const missing = ["id", "title", "status", "color", "icon", "description", "actions"].filter(
      (key) => !area[key as keyof EvaluationArea],
    );

    if (!area.title?.trim()) {
      missing.push("non-empty title");
    }

    if (!Array.isArray(area.actions) || area.actions.length === 0) {
      missing.push("actions");
    }

    if (missing.length) {
      warnings.push(`Area ${index + 1} has incomplete fields: ${missing.join(", ")}`);
      return { ...fallbackArea, ...area, title: area.title?.trim() || fallbackArea.title };
    }

    return area;
  });

  if (!data.assistant.suggestions?.length) {
    warnings.push("Assistant suggestions are missing.");
  }

  if (!data.kpis?.length) {
    warnings.push("KPI cards are missing.");
  }

  if (warnings.length) {
    console.warn("[AndesNova] La data está incompleta; se usará contenido de respaldo.", warnings);
  }

  return {
    ...data,
    areas,
    assistant: {
      ...data.assistant,
      suggestions: data.assistant.suggestions?.length
        ? data.assistant.suggestions
        : [{ id: "fallback", label: "Completar data", detail: "Pendiente", areaId: "fallback" }],
    },
    kpis: data.kpis?.length ? data.kpis : [],
  };
}
