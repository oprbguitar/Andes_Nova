import { companyData } from "../data/companyData";

export function getLocalChatResponse(input: string, selectedAreaId?: string) {
  const question = input.toLowerCase();
  const selected = companyData.areas.find((area) => area.id === selectedAreaId);

  if (question.includes("primero") || question.includes("siguiente")) {
    return "Revisa primero Riesgos: hay 2 puntos en revisión y pueden afectar la decisión ejecutiva.";
  }

  if (question.includes("riesgo")) {
    const area = companyData.areas.find((item) => item.id === "risks");
    return `${area?.title}: ${area?.description} Acción sugerida: ${area?.actions[0]}.`;
  }

  if (question.includes("document")) {
    const area = companyData.areas.find((item) => item.id === "documentation");
    return `${area?.title} está ${area?.status.toLowerCase()}. Mantén vigencias y anexos ordenados.`;
  }

  if (question.includes("estado") || question.includes("progreso")) {
    return `El progreso general es ${companyData.kpis[0].value}, con ${companyData.kpis[0].detail}.`;
  }

  if (selected && (question.includes("área") || question.includes("area"))) {
    return selected.guidance;
  }

  return companyData.chatFallback;
}
