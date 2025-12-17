import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  size?: "normal" | "wide" | "tall" | "big";
}

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      layoutId={`project-${project.id}`}
      className={cn(
        "group relative w-full h-full cursor-pointer overflow-hidden bg-black", // bg-black to ensure darkness behind
        project.size === "wide" && "md:col-span-2",
        project.size === "tall" && "md:row-span-2",
        project.size === "big" && "md:col-span-2 md:row-span-2"
      )}
      onClick={() => onClick(project)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 ease-out opacity-40 group-hover:opacity-100 group-hover:scale-105 grayscale group-hover:grayscale-0"
        />
        
        {/* Overlay - now simpler since image opacity handles the darkness */}
        {/* <div className="absolute inset-0 bg-black/60 group-hover:bg-black/0 transition-colors duration-500" /> */}
        
        {/* Hover Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="self-end">
            <div className="bg-white text-black rounded-full p-2">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="flex justify-between items-end text-white">
          <div>
            <h3 className="font-display text-lg font-bold uppercase tracking-tight leading-none">
              {project.title}
            </h3>
            <p className="text-xs text-white/80 uppercase tracking-wider mt-1">
              {project.category}
            </p>
          </div>
          <span className="text-xs font-mono text-white/80">{project.year}</span>
        </div>
      </div>
    </motion.div>
  );
}
