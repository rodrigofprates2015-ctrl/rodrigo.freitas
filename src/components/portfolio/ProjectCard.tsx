import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  preserveSize?: boolean;
}

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      layoutId={`project-${project.id}`}
      className="group relative w-full cursor-pointer overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-4 rounded-sm"
      onClick={() => onClick(project)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex items-center justify-center">
        <motion.img
          src={project.image}
          alt={project.title}
          className={`transition-all duration-500 ease-out group-hover:scale-[1.02] ${
            project.preserveSize 
              ? "h-auto max-w-full" 
              : "w-full h-auto"
          }`}
        />
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white text-black rounded-full p-2">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-white">
            <h3 className="font-display text-sm font-bold uppercase tracking-tight leading-none">
              {project.title}
            </h3>
            <p className="text-xs text-white/80 uppercase tracking-wider mt-1">
              {project.category} — {project.year}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
