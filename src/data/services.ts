import {
  BarChart3,
  BrainCircuit,
  FolderSearch,
  GraduationCap,
  HardHat,
  Scale,
  TrendingUp,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  leadArea: string;
  supportAreas: string[];
  deliverables: string[];
};

export const services: Service[] = [
  {
    id: "gestion-documental",
    title: "Gestión documental",
    description:
      "Ordenamos, clasificamos y estructuramos documentos físicos y digitales para que la información sea consultable, trazable y útil.",
    icon: FolderSearch,
    accent: "text-teal",
    leadArea: "Tecnología y Gestión Documental",
    supportAreas: ["Legal", "Operaciones", "Administración"],
    deliverables: [
      "Informe de diagnóstico documental",
      "Inventario documental",
      "Matriz de clasificación",
      "Procedimiento de archivo",
    ],
  },
  {
    id: "mejora-procesos",
    title: "Mejora de procesos",
    description:
      "Analizamos flujos de trabajo, detectamos brechas y diseñamos procedimientos más claros, medibles y eficientes.",
    icon: TrendingUp,
    accent: "text-teal",
    leadArea: "Operaciones y Proyectos",
    supportAreas: ["Gerencia General", "Tecnología", "Recursos Humanos"],
    deliverables: ["Mapa de procesos", "Matriz de responsables", "Indicadores", "Plan de mejora"],
  },
  {
    id: "sst",
    title: "Seguridad y Salud en el Trabajo",
    description:
      "Apoyamos en matrices IPERC, registros SST, capacitaciones, inspecciones y documentación preventiva.",
    icon: HardHat,
    accent: "text-gold",
    leadArea: "Seguridad y Salud en el Trabajo",
    supportAreas: ["Operaciones", "Recursos Humanos", "Legal"],
    deliverables: ["Matriz IPERC", "Formatos SST", "Registro de capacitaciones", "Plan preventivo"],
  },
  {
    id: "logistica-contrataciones",
    title: "Logística y contrataciones",
    description:
      "Organizamos proveedores, requerimientos, cotizaciones, órdenes de servicio, conformidades y trazabilidad de compras.",
    icon: Truck,
    accent: "text-blue-700",
    leadArea: "Logística y Contrataciones",
    supportAreas: ["Administración", "Legal", "Operaciones"],
    deliverables: ["Registro de proveedores", "Matriz de compras", "Flujo de contratación", "Reporte de trazabilidad"],
  },
  {
    id: "cumplimiento-legal",
    title: "Cumplimiento legal",
    description:
      "Controlamos contratos, vencimientos, obligaciones, adendas, cláusulas críticas y riesgos documentales.",
    icon: Scale,
    accent: "text-goldDark",
    leadArea: "Legal y Cumplimiento",
    supportAreas: ["Gerencia General", "Administración", "Logística"],
    deliverables: ["Matriz contractual", "Control de vencimientos", "Alertas de obligación", "Reporte de riesgos"],
  },
  {
    id: "tecnologia-ia",
    title: "Tecnología e IA documental",
    description:
      "Diseñamos repositorios, automatizaciones, prototipos web y chatbots documentales con respuestas basadas en fuentes.",
    icon: BrainCircuit,
    accent: "text-indigo-500",
    leadArea: "Tecnología y Gestión Documental",
    supportAreas: ["Operaciones", "Legal", "Administración"],
    deliverables: ["Repositorio documental", "Automatizaciones", "Chatbot documental", "Manual de uso"],
  },
  {
    id: "dashboards",
    title: "Reportes y dashboards",
    description:
      "Convertimos datos dispersos en indicadores, reportes ejecutivos, tableros visuales y alertas de gestión.",
    icon: BarChart3,
    accent: "text-blue-500",
    leadArea: "Tecnología y Gestión Documental",
    supportAreas: ["Gerencia General", "Administración", "Operaciones"],
    deliverables: ["Modelo de indicadores", "Dashboard ejecutivo", "Alertas", "Reporte mensual"],
  },
  {
    id: "capacitacion",
    title: "Capacitación empresarial",
    description:
      "Preparamos capacitaciones prácticas en procesos, SST, documentación, tecnología, logística y control administrativo.",
    icon: GraduationCap,
    accent: "text-orange-500",
    leadArea: "Recursos Humanos",
    supportAreas: ["SST", "Operaciones", "Tecnología"],
    deliverables: ["Plan de capacitación", "Materiales", "Registro de asistencia", "Evaluación"],
  },
];
