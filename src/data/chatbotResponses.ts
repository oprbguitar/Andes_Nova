export const quickPrompts = [
  "¿Qué servicio necesita mi empresa?",
  "Quiero ordenar mis contratos",
  "Necesito un chatbot documental",
  "Deseo mejorar mis procesos",
  "Necesito una matriz IPERC",
];

export const chatbotResponses: Record<string, string> = {
  "¿Qué servicio necesita mi empresa?":
    "Puedo orientarle según su necesidad. Si tiene documentos dispersos, corresponde Gestión documental. Si necesita controlar contratos, corresponde Cumplimiento legal. Si desea automatizar consultas internas, corresponde Tecnología e IA documental.",
  "Quiero ordenar mis contratos":
    "Le recomendamos el servicio de Cumplimiento legal y control contractual. Incluye matriz de contratos, control de vencimientos, obligaciones, adendas, cláusulas críticas y reporte de riesgos.",
  "Necesito un chatbot documental":
    "Le recomendamos el paquete Empresa Digital con IA. Incluye repositorio documental, carga de documentos, chatbot, búsqueda asistida por IA, respuestas con fuentes y manual de uso.",
  "Deseo mejorar mis procesos":
    "Le recomendamos Consultoría administrativa y mejora de procesos. Incluye levantamiento de procesos, mapa actual, mapa propuesto, matriz de responsables, indicadores y plan de mejora.",
  "Necesito una matriz IPERC":
    "Le recomendamos el servicio de Seguridad y Salud en el Trabajo. Incluye diagnóstico SST, identificación de peligros, evaluación de riesgos, matriz IPERC, controles preventivos y formatos de inspección.",
};

export const genericResponse =
  "Gracias por su consulta. AndesNova puede evaluar su caso mediante un diagnóstico inicial y recomendar el servicio más adecuado según sus documentos, procesos, riesgos y objetivos.";
