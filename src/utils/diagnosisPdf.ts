import type { jsPDF } from "jspdf";
import type { AreaResult, GeneralData } from "../data/evaluation";

export const REPORT_VERSION = "1.0";

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 20;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const FOOTER_LIMIT = PAGE_HEIGHT - 24;

const NAVY: [number, number, number] = [7, 20, 61];
const DEEP: [number, number, number] = [16, 32, 66];
const BLUE: [number, number, number] = [11, 92, 255];
const MUTED: [number, number, number] = [96, 112, 148];
const LINE: [number, number, number] = [221, 230, 242];
const WHITE: [number, number, number] = [255, 255, 255];

export function generateDiagnosisCode(): string {
  const now = new Date();
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `AN-${stamp}-${suffix}`;
}

function formatDate(): string {
  return new Date().toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" });
}

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

function slugify(value: string): string {
  return (
    value
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "empresa"
  );
}

type Cursor = { doc: jsPDF; y: number };

function ensureSpace(cursor: Cursor, needed: number) {
  if (cursor.y + needed > FOOTER_LIMIT) {
    cursor.doc.addPage();
    cursor.y = MARGIN + 6;
  }
}

function drawBrandMark(doc: jsPDF, x: number, y: number, size: number) {
  doc.setFillColor(...BLUE);
  doc.roundedRect(x, y, size, size, size * 0.28, size * 0.28, "F");
  doc.setFillColor(...WHITE);
  doc.triangle(
    x + size * 0.5,
    y + size * 0.22,
    x + size * 0.22,
    y + size * 0.78,
    x + size * 0.78,
    y + size * 0.78,
    "F",
  );
}

function sectionTitle(cursor: Cursor, title: string) {
  ensureSpace(cursor, 18);
  const { doc } = cursor;
  doc.setFillColor(...BLUE);
  doc.rect(MARGIN, cursor.y, 1.6, 6, "F");
  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(title, MARGIN + 5, cursor.y + 4.8);
  cursor.y += 12;
}

function paragraph(cursor: Cursor, text: string, options?: { indent?: number; color?: [number, number, number]; size?: number; gap?: number }) {
  const { doc } = cursor;
  const indent = options?.indent ?? 0;
  const size = options?.size ?? 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(size);
  doc.setTextColor(...(options?.color ?? NAVY));
  const lines = doc.splitTextToSize(text, CONTENT_WIDTH - indent) as string[];
  const height = lines.length * size * 0.46;
  ensureSpace(cursor, height + 2);
  doc.text(lines, MARGIN + indent, cursor.y);
  cursor.y += height + (options?.gap ?? 3);
}

function listItem(cursor: Cursor, marker: string, text: string) {
  const { doc } = cursor;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  const lines = doc.splitTextToSize(text, CONTENT_WIDTH - 8) as string[];
  const height = lines.length * 4.6;
  ensureSpace(cursor, height + 2);
  doc.setTextColor(...BLUE);
  doc.text(marker, MARGIN, cursor.y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...NAVY);
  doc.text(lines, MARGIN + 8, cursor.y);
  cursor.y += height + 2.5;
}

function drawFooters(doc: jsPDF, code: string, date: string) {
  const total = doc.getNumberOfPages();
  for (let page = 2; page <= total; page += 1) {
    doc.setPage(page);
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, PAGE_HEIGHT - 16, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 16);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(`AndesNova · Código ${code} · ${date} · Versión ${REPORT_VERSION}`, MARGIN, PAGE_HEIGHT - 11);
    doc.text(`Página ${page} de ${total}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 11, { align: "right" });
  }
}

function drawCover(doc: jsPDF, subtitle: string, general: GeneralData | undefined, code: string, date: string) {
  doc.setFillColor(...DEEP);
  doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, "F");
  doc.setFillColor(26, 55, 94);
  doc.circle(PAGE_WIDTH - 18, 22, 46, "F");
  doc.setFillColor(...DEEP);
  doc.circle(PAGE_WIDTH - 30, 34, 40, "F");

  drawBrandMark(doc, MARGIN, 34, 14);
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("AndesNova", MARGIN + 19, 44);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(190, 205, 230);
  doc.text("Soluciones de gestión e inteligencia documental", MARGIN + 19, 50);

  doc.setDrawColor(60, 85, 130);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, 66, PAGE_WIDTH - MARGIN, 66);

  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.text(doc.splitTextToSize(subtitle, CONTENT_WIDTH) as string[], MARGIN, 100);

  if (general) {
    const cardY = 130;
    doc.setFillColor(26, 44, 82);
    doc.roundedRect(MARGIN, cardY, CONTENT_WIDTH, 46, 4, 4, "F");
    const rows: Array<[string, string]> = [
      ["Empresa", general.company || "No indicada"],
      ["Sector", general.sector || "No indicado"],
      ["Tamaño", general.size || "No indicado"],
    ];
    rows.forEach(([label, value], index) => {
      const rowY = cardY + 13 + index * 12;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(150, 170, 205);
      doc.text(label.toUpperCase(), MARGIN + 10, rowY);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...WHITE);
      doc.text(value, MARGIN + 45, rowY);
    });
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(190, 205, 230);
  doc.text(`Código único: ${code}`, MARGIN, 246);
  doc.text(`Fecha de emisión: ${date}`, MARGIN, 253);
  doc.text(`Versión del informe: ${REPORT_VERSION}`, MARGIN, 260);

  doc.setFontSize(8.5);
  doc.setTextColor(150, 170, 205);
  doc.text(
    doc.splitTextToSize(
      "Documento generado automáticamente en el portal AndesNova. Diagnóstico preliminar de orientación: no constituye una conclusión legal ni financiera definitiva.",
      CONTENT_WIDTH,
    ) as string[],
    MARGIN,
    276,
  );
}

export type DiagnosisPdfInput = {
  general: GeneralData;
  results: AreaResult[];
  risks: string[];
  recommendations: string[];
  nextSteps: string[];
};

export async function downloadDiagnosisPdf(input: DiagnosisPdfInput): Promise<string> {
  const { general, results, risks, recommendations, nextSteps } = input;
  const { jsPDF: JsPdf } = await import("jspdf");
  const doc = new JsPdf({ unit: "mm", format: "a4" });
  const code = generateDiagnosisCode();
  const date = formatDate();

  drawCover(doc, "Informe de diagnóstico preliminar", general, code, date);

  doc.addPage();
  const cursor: Cursor = { doc, y: MARGIN + 6 };

  sectionTitle(cursor, "Datos de la empresa");
  paragraph(
    cursor,
    `Empresa: ${general.company || "No indicada"}   ·   Sector: ${general.sector || "No indicado"}   ·   Tamaño: ${general.size || "No indicado"}`,
  );
  paragraph(cursor, `Código único del diagnóstico: ${code}`, { color: MUTED, size: 9 });
  cursor.y += 4;

  sectionTitle(cursor, "Nivel por área");
  results.forEach((result) => {
    ensureSpace(cursor, 16);
    const ratio = result.maxScore > 0 ? result.score / result.maxScore : 0;
    const barX = MARGIN + 52;
    const barWidth = CONTENT_WIDTH - 52 - 34;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...NAVY);
    doc.text(result.title, MARGIN, cursor.y + 3.6);
    doc.setFillColor(...LINE);
    doc.roundedRect(barX, cursor.y, barWidth, 5, 2.5, 2.5, "F");
    if (ratio > 0) {
      doc.setFillColor(...hexToRgb(result.levelColor));
      doc.roundedRect(barX, cursor.y, Math.max(barWidth * ratio, 5), 5, 2.5, 2.5, "F");
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...hexToRgb(result.levelColor));
    doc.text(`${result.score}/${result.maxScore} · ${result.level}`, barX + barWidth + 4, cursor.y + 3.8);
    cursor.y += 11;
  });
  cursor.y += 4;

  sectionTitle(cursor, "Riesgos prioritarios");
  if (risks.length) {
    risks.forEach((risk, index) => listItem(cursor, `${index + 1}.`, risk));
  } else {
    paragraph(
      cursor,
      "El cuestionario no identificó alertas prioritarias con las respuestas proporcionadas. El resultado debe validarse mediante revisión documental y entrevistas.",
    );
  }
  cursor.y += 4;

  sectionTitle(cursor, "Recomendaciones");
  recommendations.forEach((item) => listItem(cursor, "•", item));
  cursor.y += 4;

  sectionTitle(cursor, "Próximos pasos");
  nextSteps.forEach((item, index) => listItem(cursor, `${index + 1}.`, item));
  cursor.y += 4;

  sectionTitle(cursor, "Metodología y advertencias");
  paragraph(
    cursor,
    "Este diagnóstico se elabora a partir de un cuestionario de autoevaluación de 12 preguntas distribuidas en cuatro áreas: documentación, procesos y operación, riesgos, y clientes y objetivos. Cada respuesta se puntúa de 0 a 2 puntos («No / no se hace», «Parcialmente», «Sí, está controlado») y el puntaje por área determina el nivel: Crítico (0-2), En proceso (3-4) o Sólido (5-6).",
  );
  paragraph(
    cursor,
    "Los riesgos prioritarios se ordenan según las respuestas con menor puntaje y se limitan a los tres más relevantes. Las recomendaciones corresponden a las áreas con puntaje igual o menor a 4.",
  );
  paragraph(
    cursor,
    "Advertencias: el resultado se basa exclusivamente en las respuestas proporcionadas por la persona que completó el cuestionario, sin verificación documental. Debe validarse mediante revisión documental y entrevistas antes de tomar decisiones. Este informe es un diagnóstico preliminar de orientación y no constituye una conclusión legal, financiera ni de auditoría.",
  );

  drawFooters(doc, code, date);
  doc.save(`diagnostico-andesnova-${slugify(general.company)}-${code}.pdf`);
  return code;
}

export type AnswerPdfInput = {
  text: string;
  sources?: Array<{ title: string; id?: string }>;
};

export async function downloadAnswerPdf(input: AnswerPdfInput): Promise<string> {
  const { jsPDF: JsPdf } = await import("jspdf");
  const doc = new JsPdf({ unit: "mm", format: "a4" });
  const code = generateDiagnosisCode();
  const date = formatDate();

  doc.setFillColor(...DEEP);
  doc.rect(0, 0, PAGE_WIDTH, 40, "F");
  drawBrandMark(doc, MARGIN, 12, 11);
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("AndesNova IA+", MARGIN + 15, 20);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(190, 205, 230);
  doc.text("Recomendación del asistente documental", MARGIN + 15, 26);
  doc.setFontSize(8);
  doc.text(`Código ${code} · ${date} · Versión ${REPORT_VERSION}`, PAGE_WIDTH - MARGIN, 20, { align: "right" });

  const cursor: Cursor = { doc, y: 54 };
  sectionTitle(cursor, "Recomendación");
  paragraph(cursor, input.text);

  if (input.sources?.length) {
    cursor.y += 4;
    sectionTitle(cursor, "Evidencia documental utilizada");
    input.sources.forEach((source) =>
      listItem(cursor, "•", `${source.title}${source.id ? ` [${source.id}]` : ""}`),
    );
  }

  cursor.y += 4;
  paragraph(
    cursor,
    "Respuesta generada con apoyo de inteligencia artificial y documentación interna de AndesNova. Es orientación preliminar: valida la información con un especialista antes de tomar decisiones.",
    { color: MUTED, size: 8.5 },
  );

  drawFooters(doc, code, date);
  doc.save(`recomendacion-andesnova-${code}.pdf`);
  return code;
}
