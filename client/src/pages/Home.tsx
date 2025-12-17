import { Navbar } from "@/components/layout/Navbar";
import { MosaicGrid } from "@/components/portfolio/MosaicGrid";
import { Project } from "@/components/portfolio/ProjectCard";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/language";

// Avon Real Assets
import avonJojoba from "@assets/avon_extracted/Avon_Jojoba_1000x1500.png";
import avonPotinhos from "@assets/avon_extracted/Avon_potinhos_1000x1500.png";
import avonSeruns from "@assets/avon_extracted/Avon_seruns_1000x1500.png";
import avonPotinhosSq from "@assets/avon_extracted/Avon_potinhos_1080x1080.png";
import avon2 from "@assets/avon_extracted/2.png";

// Audi Real Assets
import audiBehance1 from "@assets/audi_extracted/Audi_Behance_01.png";
import audiBehance2 from "@assets/audi_extracted/Audi_Behance_02.png";
import audiBehance3 from "@assets/audi_extracted/Audi_Behance_03.png";
import audiBehance4 from "@assets/audi_extracted/Audi_Behance_04.png";

const AVON_PROJECTS: Project[] = [
  {
    id: "avon-1",
    title: "Jojoba Campaign",
    category: "Product Launch",
    year: "2024",
    image: avonJojoba,
    size: "tall"
  },
  {
    id: "avon-2",
    title: "Beauty Jars",
    category: "Packaging",
    year: "2024",
    image: avonPotinhos,
    size: "tall"
  },
  {
    id: "avon-3",
    title: "Serums Range",
    category: "Campaign",
    year: "2024",
    image: avonSeruns,
    size: "tall"
  },
  {
    id: "avon-4",
    title: "Product Social",
    category: "Social Media",
    year: "2024",
    image: avonPotinhosSq,
    size: "normal"
  },
  {
    id: "avon-5",
    title: "Campaign Asset",
    category: "Digital",
    year: "2024",
    image: avon2,
    size: "wide"
  }
];

const AUDI_PROJECTS: Project[] = [
  {
    id: "audi-1",
    title: "Brand Asset",
    category: "Key Visual",
    year: "2024",
    image: audiBehance1,
    size: "wide"
  },
  {
    id: "audi-2",
    title: "Campaign Detail",
    category: "Case Study",
    year: "2024",
    image: audiBehance2,
    size: "wide"
  },
  {
    id: "audi-3",
    title: "Digital Experience",
    category: "Key Visual",
    year: "2024",
    image: audiBehance3,
    size: "wide"
  },
  {
    id: "audi-4",
    title: "Mobile App",
    category: "Case Study",
    year: "2024",
    image: audiBehance4,
    size: "wide"
  }
];

interface ClientSectionProps {
  client: string;
  projects: Project[];
  descriptionKey: string;
  isFirst?: boolean;
}

function ClientSection({ client, projects, descriptionKey, isFirst }: ClientSectionProps) {
  const { t } = useLanguage();
  
  return (
    <section className={isFirst ? "px-6 md:px-12 pb-16 pt-12" : "px-6 md:px-12 py-24 border-t border-border"}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter">
            {client}
          </h2>
          <p className="mt-4 text-muted-foreground font-mono text-sm max-w-lg leading-relaxed">
            {t(descriptionKey)}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-widest px-3 py-1 border border-border rounded-full">
            {projects.length} {t("projects.count")}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground hidden md:block">
            2023 — 2024
          </span>
        </div>
      </div>
      <MosaicGrid projects={projects} />
    </section>
  );
}

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-start justify-center px-6 md:px-12 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl z-10"
        >
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
            RODRIGO
            <br />
            FREITAS
            <br />
            <span className="text-muted-foreground text-4xl md:text-6xl lg:text-7xl block mt-2">
              {t("hero.role")}
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-sans font-light max-w-2xl leading-relaxed text-muted-foreground">
            {t("hero.description")}
          </p>
        </motion.div>

        <motion.div 
          className="absolute bottom-12 right-12 hidden md:flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-sm font-mono uppercase tracking-widest">{t("hero.scroll")}</span>
          <ArrowDown className="animate-bounce" />
        </motion.div>
      </section>

      {/* Client Sections */}
      <div id="work" className="bg-background">
        <ClientSection 
          client="Avon" 
          projects={AVON_PROJECTS} 
          descriptionKey="client.avon"
          isFirst
        />
        
        <ClientSection 
          client="Audi" 
          projects={AUDI_PROJECTS} 
          descriptionKey="client.audi"
        />
      </div>

      {/* About Section */}
      <section id="about" className="px-6 md:px-12 py-24 border-t border-border bg-secondary/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-4xl font-bold uppercase tracking-tight mb-8">
              {t("section.about")}
            </h2>
            <div className="prose prose-lg dark:prose-invert font-sans font-light">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
            </div>

            <div className="mt-12">
               <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-4">{t("section.education")}</h3>
               <ul className="space-y-4 font-mono text-sm">
                 <li>
                    <span className="block font-bold">{t("edu.pos")}</span>
                    <span className="text-muted-foreground">{t("edu.pos.school")}</span>
                 </li>
                 <li>
                    <span className="block font-bold">{t("edu.grad")}</span>
                    <span className="text-muted-foreground">{t("edu.grad.school")}</span>
                 </li>
               </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-mono text-sm">
            <div>
              <h3 className="uppercase tracking-widest text-muted-foreground mb-4">{t("section.experience")}</h3>
              <ul className="space-y-4">
                <li>
                  <span className="block font-bold">{t("exp.art_director")}</span>
                  <span className="text-muted-foreground">Point Media, 2025</span>
                </li>
                <li>
                  <span className="block font-bold">{t("exp.teacher")}</span>
                  <span className="text-muted-foreground">ETEC de Poá, 2025</span>
                </li>
                <li>
                  <span className="block font-bold">{t("exp.senior")}</span>
                  <span className="text-muted-foreground">Truther, 2025</span>
                </li>
                <li>
                  <span className="block font-bold">{t("exp.art_director")}</span>
                  <span className="text-muted-foreground">Norte Marketing, 2023-2024</span>
                </li>
                 <li>
                  <span className="block font-bold">{t("exp.graphic")}</span>
                  <span className="text-muted-foreground">Agência Bloomin, 2022-2023</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="uppercase tracking-widest text-muted-foreground mb-4">{t("section.clients")}</h3>
              <ul className="space-y-2">
                <li>BetMGM</li>
                <li>Avon</li>
                <li>GetNet</li>
                <li>Audi</li>
                <li>Banco do Brasil</li>
                <li>Nestlé</li>
                <li>Santander</li>
                <li>C&A</li>
                <li>Tim</li>
                <li>Amil</li>
                <li>Marisa</li>
              </ul>

              <h3 className="uppercase tracking-widest text-muted-foreground mb-4 mt-8">{t("section.software")}</h3>
              <ul className="space-y-2">
                <li>Photoshop, Illustrator</li>
                <li>After Effects, InDesign</li>
                <li>Figma</li>
                <li>Midjourney AI, ChatGPT AI</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col">
            <span className="font-display font-bold uppercase tracking-tight text-xl">Rodrigo.Freitas</span>
            <span className="font-mono text-xs text-muted-foreground mt-1">rodrigo.f.prates2023@gmail.com</span>
            <span className="font-mono text-xs text-muted-foreground">+55 (11) 95775-0903</span>
        </div>
        <div className="flex gap-4">
             <a href="https://www.behance.net/rodrigofreitas" target="_blank" className="font-mono text-xs uppercase hover:underline">Behance</a>
             <a href="mailto:rodrigo.f.prates2023@gmail.com" className="font-mono text-xs uppercase hover:underline">Email</a>
        </div>
        <span className="font-mono text-xs text-muted-foreground">{t("footer.rights")}</span>
      </footer>
    </div>
  );
}
