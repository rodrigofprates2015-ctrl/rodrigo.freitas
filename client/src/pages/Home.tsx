import { Navbar } from "@/components/layout/Navbar";
import { MosaicGrid } from "@/components/portfolio/MosaicGrid";
import { Project } from "@/components/portfolio/ProjectCard";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/language";

// BetMGM Assets
import betmgm1 from "@assets/betmgm_extracted/1.png";
import betmgmBanner from "@assets/betmgm_extracted/970X250.png";
import betmgmLibertadores1 from "@assets/betmgm_extracted/FINAL LIBERTADORES_KV1_1080x1920.png";
import betmgmLibertadores2 from "@assets/betmgm_extracted/FINAL LIBERTADORES_KV2_800x800.png";
import betmgmFortune from "@assets/betmgm_extracted/FortuneTiger_390x390.png";
import betmgmOlympus from "@assets/betmgm_extracted/Gates of Olympus_KV 2_1280x720.png";
import betmgmGoldBlitz from "@assets/betmgm_extracted/Gold Blitz Fortunes_KV1_160x600.png";
import betmgmKv1 from "@assets/betmgm_extracted/KV1_1080x1920.png";
import betmgmKv2 from "@assets/betmgm_extracted/KV2_1080x1920.png";
import betmgmVegas from "@assets/betmgm_extracted/KV_BF_Vegas Friday.png";
import betmgmViraLata from "@assets/betmgm_extracted/Vira lata caramelo_KV2_160x600.png";

// Avon Assets
import avonJojoba from "@assets/avon_extracted/Avon_Jojoba_1000x1500.png";
import avonPotinhos from "@assets/avon_extracted/Avon_potinhos_1000x1500.png";
import avonSeruns from "@assets/avon_extracted/Avon_seruns_1000x1500.png";
import avonPotinhosSq from "@assets/avon_extracted/Avon_potinhos_1080x1080.png";
import avon2 from "@assets/avon_extracted/2.png";

// GetNet Assets
import getnetInst1Sq from "@assets/getnet_extracted/_institucional kv 1_1080x1080.png";
import getnetInst1Tall from "@assets/getnet_extracted/_institucional kv 1_1080x1920.png";
import getnetInst1Wide from "@assets/getnet_extracted/_institucional kv 1_1920x1080.png";
import getnetInst2Sq from "@assets/getnet_extracted/_institucional kv 2_1080x1080.png";
import getnetInst2Tall from "@assets/getnet_extracted/_institucional kv 2_1080x1920.png";
import getnetKv1Sq from "@assets/getnet_extracted/KV1_1080x1080.png";
import getnetKv1Wide from "@assets/getnet_extracted/KV1_1920x1080.png";
import getnetKv2Sq from "@assets/getnet_extracted/KV2_1080x1080.png";
import getnetPoster from "@assets/getnet_extracted/Poster trem.png";

// Audi Assets
import audiBehance2 from "@assets/audi_extracted/Audi_Behance_02.png";
import audiBehance3 from "@assets/audi_extracted/Audi_Behance_03.png";
import audiQ8Wide from "@assets/audi_extracted/AUDI_Q8_Consideracao_1920×320.png";
import audiQ8Medium from "@assets/audi_extracted/AUDI_Q8_Consideracao_1200×628.png";
import audiQ8Tall from "@assets/audi_extracted/AUDI_Q8_Consideracao_160x600.png";

const BETMGM_PROJECTS: Project[] = [
  { id: "betmgm-1", title: "Libertadores KV", category: "Key Visual", year: "2024", image: betmgmLibertadores1 },
  { id: "betmgm-2", title: "Gates of Olympus", category: "Game Promotion", year: "2024", image: betmgmOlympus },
  { id: "betmgm-3", title: "Campaign KV 1", category: "Social Media", year: "2024", image: betmgmKv1 },
  { id: "betmgm-4", title: "Libertadores Social", category: "Social Media", year: "2024", image: betmgmLibertadores2 },
  { id: "betmgm-5", title: "Fortune Tiger", category: "Game Asset", year: "2024", image: betmgmFortune },
  { id: "betmgm-6", title: "Vegas Friday", category: "Campaign", year: "2024", image: betmgmVegas },
  { id: "betmgm-7", title: "Campaign KV 2", category: "Social Media", year: "2024", image: betmgmKv2 },
  { id: "betmgm-8", title: "Vira Lata Caramelo", category: "Banner Ads", year: "2024", image: betmgmViraLata },
  { id: "betmgm-9", title: "Gold Blitz", category: "Banner Ads", year: "2024", image: betmgmGoldBlitz },
  { id: "betmgm-10", title: "Banner 970x250", category: "Digital Ads", year: "2024", image: betmgmBanner },
  { id: "betmgm-11", title: "Campaign Asset", category: "Digital", year: "2024", image: betmgm1 },
];

const AVON_PROJECTS: Project[] = [
  { id: "avon-1", title: "Jojoba Campaign", category: "Product Launch", year: "2024", image: avonJojoba },
  { id: "avon-2", title: "Beauty Jars", category: "Packaging", year: "2024", image: avonPotinhos },
  { id: "avon-3", title: "Serums Range", category: "Campaign", year: "2024", image: avonSeruns },
  { id: "avon-4", title: "Product Social", category: "Social Media", year: "2024", image: avonPotinhosSq },
  { id: "avon-5", title: "Campaign Asset", category: "Digital", year: "2024", image: avon2 },
];

const GETNET_PROJECTS: Project[] = [
  { id: "getnet-1", title: "Institucional KV 1", category: "Key Visual", year: "2023", image: getnetInst1Tall },
  { id: "getnet-2", title: "Institucional Wide", category: "Key Visual", year: "2023", image: getnetInst1Wide },
  { id: "getnet-3", title: "Institucional Social", category: "Social Media", year: "2023", image: getnetInst1Sq },
  { id: "getnet-4", title: "Institucional KV 2", category: "Key Visual", year: "2023", image: getnetInst2Tall },
  { id: "getnet-5", title: "KV2 Social", category: "Social Media", year: "2023", image: getnetInst2Sq },
  { id: "getnet-6", title: "Campaign KV 1", category: "Campaign", year: "2023", image: getnetKv1Sq },
  { id: "getnet-7", title: "Campaign Wide", category: "Campaign", year: "2023", image: getnetKv1Wide },
  { id: "getnet-8", title: "KV2 Square", category: "Social Media", year: "2023", image: getnetKv2Sq },
  { id: "getnet-9", title: "Subway Poster", category: "OOH", year: "2023", image: getnetPoster },
];

const AUDI_PROJECTS: Project[] = [
  { id: "audi-1", title: "Behance Case 1", category: "Case Study", year: "2024", image: audiBehance2 },
  { id: "audi-2", title: "Behance Case 2", category: "Case Study", year: "2024", image: audiBehance3 },
  { id: "audi-3", title: "Q8 Banner Wide", category: "Digital Ads", year: "2024", image: audiQ8Wide },
  { id: "audi-4", title: "Q8 Campaign", category: "Digital Ads", year: "2024", image: audiQ8Medium },
  { id: "audi-5", title: "Q8 Tower", category: "Digital Ads", year: "2024", image: audiQ8Tall },
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
    <section className={isFirst ? "px-4 md:px-8 pb-8 pt-6" : "px-4 md:px-8 py-12 border-t border-border"}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tighter">
            {client}
          </h2>
          <p className="mt-2 text-muted-foreground font-mono text-xs max-w-md leading-relaxed">
            {t(descriptionKey)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest px-2 py-1 border border-border rounded-full">
            {projects.length} {t("projects.count")}
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

      <section className="relative h-[50vh] flex flex-col items-start justify-center px-4 md:px-8 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl z-10"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-4">
            RODRIGO
            <br />
            FREITAS
            <br />
            <span className="text-muted-foreground text-2xl md:text-4xl lg:text-5xl block mt-1">
              {t("hero.role")}
            </span>
          </h1>
          <p className="text-lg md:text-xl font-sans font-light max-w-xl leading-relaxed text-muted-foreground">
            {t("hero.description")}
          </p>
        </motion.div>

        <motion.div 
          className="absolute bottom-8 right-8 hidden md:flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <span className="text-xs font-mono uppercase tracking-widest">{t("hero.scroll")}</span>
          <ArrowDown className="animate-bounce w-4 h-4" />
        </motion.div>
      </section>

      <div id="work" className="bg-background">
        <ClientSection 
          client="BetMGM" 
          projects={BETMGM_PROJECTS}
          descriptionKey="client.betmgm"
          isFirst
        />
        
        <ClientSection 
          client="Avon" 
          projects={AVON_PROJECTS} 
          descriptionKey="client.avon"
        />
        
        <ClientSection 
          client="GetNet" 
          projects={GETNET_PROJECTS} 
          descriptionKey="client.getnet"
        />
        
        <ClientSection 
          client="Audi" 
          projects={AUDI_PROJECTS} 
          descriptionKey="client.audi"
        />
      </div>

      <section id="about" className="px-4 md:px-8 py-12 border-t border-border bg-secondary/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight mb-4">
              {t("section.about")}
            </h2>
            <div className="prose prose-sm dark:prose-invert font-sans font-light">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
            </div>

            <div className="mt-6">
               <h3 className="font-display text-lg font-bold uppercase tracking-tight mb-2">{t("section.education")}</h3>
               <ul className="space-y-2 font-mono text-xs">
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
          
          <div className="grid grid-cols-2 gap-6 font-mono text-xs">
            <div>
              <h3 className="uppercase tracking-widest text-muted-foreground mb-3">{t("section.experience")}</h3>
              <ul className="space-y-2">
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
              <h3 className="uppercase tracking-widest text-muted-foreground mb-3">{t("section.clients")}</h3>
              <ul className="space-y-1">
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

              <h3 className="uppercase tracking-widest text-muted-foreground mb-3 mt-6">{t("section.software")}</h3>
              <ul className="space-y-1">
                <li>Photoshop, Illustrator</li>
                <li>After Effects, InDesign</li>
                <li>Figma</li>
                <li>Midjourney AI, ChatGPT AI</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-4 md:px-8 py-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col">
            <span className="font-display font-bold uppercase tracking-tight text-lg">Rodrigo.Freitas</span>
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
