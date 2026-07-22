import {
  ArrowRight,
  BarChart3,
  CheckSquare2,
  ClipboardCheck,
  FileText,
  FolderArchive,
  FolderOpen,
  Landmark,
  Map,
  MapPinned,
  PackageCheck,
  Radar,
  Scale,
  ShieldCheck,
  Sparkles,
  Telescope,
} from "lucide-react";
import { motion } from "framer-motion";
import type { ComponentType } from "react";

type ProjectTone = "blue" | "green" | "orange" | "violet" | "cyan" | "gold" | "coral";

type Project = {
  number: string;
  name: string;
  category: string;
  tone: ProjectTone;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  detailIcon: ComponentType<{ size?: number; strokeWidth?: number }>;
  url?: string;
};

const projects: Project[] = [
  { number: "01", name: "Archiv-IA", category: "Clasificación", tone: "blue", icon: FolderArchive, detailIcon: FileText },
  { number: "02", name: "JustiPenal", category: "Gestión Legal", tone: "green", icon: Scale, detailIcon: Landmark, url: "https://justipenal.andesnova.solutions/" },
  { number: "03", name: "Radar SUNAT", category: "Riesgos", tone: "orange", icon: Radar, detailIcon: BarChart3 },
  { number: "04", name: "IPERC Matriz", category: "Seguridad Laboral", tone: "violet", icon: ClipboardCheck, detailIcon: CheckSquare2 },
  { number: "05", name: "Visor Presupuesto Peru", category: "Presupuesto Público", tone: "cyan", icon: BarChart3, detailIcon: Landmark, url: "https://oprbguitar.github.io/presupuesto/" },
  { number: "06", name: "EvidenciaPro", category: "Evidencias", tone: "gold", icon: ShieldCheck, detailIcon: PackageCheck },
  { number: "07", name: "Observatorio IA", category: "Tendencias", tone: "coral", icon: Telescope, detailIcon: BarChart3, url: "https://oprbguitar.github.io/amaru/" },
  { number: "08", name: "Gestor Docs", category: "Documentos", tone: "blue", icon: FolderOpen, detailIcon: FileText },
  { number: "09", name: "Atlas Territorial", category: "Geoespacial", tone: "green", icon: Map, detailIcon: MapPinned },
];

function ProjectArtwork({ project }: { project: Project }) {
  const Icon = project.icon;
  const DetailIcon = project.detailIcon;

  return (
    <span className="project-artwork" aria-hidden="true">
      <span className="project-artwork-halo" />
      <DetailIcon size={54} strokeWidth={1.4} />
      <Icon size={88} strokeWidth={1.65} />
      <Sparkles className="project-artwork-spark" size={22} strokeWidth={1.8} />
    </span>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const content = (
    <>
      <ProjectArtwork project={project} />
      <span className="project-card-copy">
        <strong className="project-number">{project.number}</strong>
        <span className={`project-name ${project.name.length > 18 ? "project-name-long" : ""}`}>{project.name}</span>
        <span className="project-meta">
          <span className="project-category">{project.category}</span>
          {!project.url ? <span className="project-coming">Próximamente</span> : null}
        </span>
      </span>
      <span className="project-arrow" aria-hidden="true">
        <ArrowRight size={24} strokeWidth={2.6} />
      </span>
    </>
  );

  return (
    <motion.div
      className="project-card-wrap"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.34, delay: index * 0.035 }}
    >
      {project.url ? (
        <a
          className={`project-card tone-${project.tone}`}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Abrir ${project.name} en una nueva pestaña`}
        >
          {content}
        </a>
      ) : (
        <article className={`project-card project-card-disabled tone-${project.tone}`} aria-label={`${project.name}, próximamente`}>
          {content}
        </article>
      )}
    </motion.div>
  );
}

export function ProjectsView() {
  return (
    <motion.main
      className="projects-screen"
      id="portafolio"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.24 }}
    >
      <header className="projects-intro">
        <h1><span>Portafolio</span> de proyectos</h1>
        <p>Explora nuestras soluciones en un vistazo.</p>
      </header>

      <section className="projects-grid" aria-label="Proyectos de AndesNova">
        {projects.map((project, index) => (
          <ProjectCard key={project.number} project={project} index={index} />
        ))}
      </section>
    </motion.main>
  );
}
