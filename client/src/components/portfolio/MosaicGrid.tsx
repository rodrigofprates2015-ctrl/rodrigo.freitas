import { Project, ProjectCard } from "./ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { X } from "lucide-react";
import Masonry from "react-masonry-css";

interface MosaicGridProps {
  projects: Project[];
}

export function MosaicGrid({ projects }: MosaicGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const breakpointColumns = {
    default: 4,
    1280: 3,
    768: 2,
    640: 1
  };

  return (
    <>
      <div className="w-full">
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-4 w-auto"
          columnClassName="pl-4 bg-clip-padding">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </Masonry>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-6xl p-0 overflow-hidden bg-background border-none gap-0 outline-none" aria-describedby={undefined}>
          <DialogTitle className="sr-only">{selectedProject?.title || "Project"}</DialogTitle>
          <AnimatePresence>
            {selectedProject && (
              <div className="flex flex-col md:flex-row h-[90vh] md:h-[85vh]">
                <div className="relative w-full md:w-2/3 h-1/2 md:h-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                   <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="max-w-full max-h-full object-contain"
                   />
                </div>
                
                <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-between bg-white dark:bg-zinc-950 overflow-y-auto">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter leading-none mb-4">
                      {selectedProject.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm font-mono uppercase text-muted-foreground mb-8">
                      <span>{selectedProject.category}</span>
                      <span>—</span>
                      <span>{selectedProject.year}</span>
                    </div>
                    
                    <div className="prose prose-sm dark:prose-invert">
                      <p>
                        A comprehensive exploration of visual identity and structural design. 
                        This project challenges conventional boundaries through a rigorous application of grid systems and typographic hierarchy.
                      </p>
                      <p className="mt-4">
                        The solution focuses on clarity, impact, and timeless aesthetics suitable for a modern context.
                      </p>
                    </div>

                    <div className="mt-12 space-y-4">
                      <div className="border-t border-black/10 dark:border-white/10 pt-4">
                        <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Client</span>
                        <span className="font-medium">Studio {selectedProject.title}</span>
                      </div>
                      <div className="border-t border-black/10 dark:border-white/10 pt-4">
                        <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Role</span>
                        <span className="font-medium">Art Direction, UI/UX</span>
                      </div>
                    </div>
                  </div>

                  <button className="mt-12 w-full py-4 bg-black text-white dark:bg-white dark:text-black font-medium uppercase tracking-wider hover:opacity-90 transition-opacity">
                    View Case Study
                  </button>
                </div>

                <DialogClose className="absolute top-4 right-4 md:left-4 md:right-auto z-50 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors text-black mix-blend-difference cursor-pointer">
                  <X className="w-5 h-5 text-white mix-blend-difference" />
                </DialogClose>
              </div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
