import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { CLIENTS } from "@/data/clients";
import { motion } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight, BookOpen, Briefcase, Code2, Globe, Award } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState, useCallback, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

interface ClientCoverProps {
  client: typeof CLIENTS[0];
  index: number;
}

function ClientCover({ client, index }: ClientCoverProps) {
  const { t } = useLanguage();

  return (
    <Link href={`/client/${client.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative overflow-hidden rounded-md cursor-pointer aspect-[4/5]"
        data-testid={`card-client-${client.id}`}
      >
        <img
          src={client.coverImage}
          alt={client.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <h3 
            className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight"
            data-testid={`text-client-title-${client.id}`}
          >
            {client.name}
          </h3>
          <p className="text-white/70 font-mono text-xs mt-2 line-clamp-2">
            {t(client.descriptionKey)}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="font-mono text-xs text-white/60 uppercase tracking-widest">
              {client.projects.length} {t("projects.count")}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function MobileCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    onSelect();
    api.on("select", onSelect);
    
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="relative px-4 py-6">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {CLIENTS.map((client, index) => (
            <CarouselItem key={client.id} className="pl-2 basis-[85%]">
              <Link href={`/client/${client.id}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-md cursor-pointer aspect-[3/4]"
                  data-testid={`card-mobile-client-${client.id}`}
                >
                  <img
                    src={client.coverImage}
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
                      {client.name}
                    </h3>
                    <p className="text-white/70 font-mono text-xs mt-2 line-clamp-2">
                      {t(client.descriptionKey)}
                    </p>
                    <span className="font-mono text-xs text-white/60 mt-2 block">
                      {client.projects.length} {t("projects.count")}
                    </span>
                  </div>
                </motion.div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex items-center justify-center gap-4 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          className="rounded-full"
          data-testid="button-carousel-prev"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-1.5">
          {CLIENTS.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === current ? "bg-foreground" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          className="rounded-full"
          data-testid="button-carousel-next"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

function DesktopGrid() {
  return (
    <div className="px-4 md:px-8 py-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {CLIENTS.map((client, index) => (
          <ClientCover key={client.id} client={client} index={index} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

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

      <section id="work" className="bg-background">
        <div className="px-4 md:px-8 pb-4 pt-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">
            {t("section.projects")}
          </h2>
          <p className="text-muted-foreground font-mono text-xs mt-1">
            {t("section.projects.subtitle")}
          </p>
        </div>
        
        {isMobile ? <MobileCarousel /> : <DesktopGrid />}
      </section>

      <section id="about" className="px-4 md:px-8 py-16 border-t border-border bg-secondary/30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6" />
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight">
                {t("section.about")}
              </h2>
            </div>
            <div className="prose prose-sm dark:prose-invert font-sans font-light space-y-4 text-base leading-relaxed">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>Com mais de 5 anos de experiência, desenvolvo soluções visuais estratégicas que conectam marca e audiência. Meu trabalho combina pesquisa, criatividade e rigor técnico para entregar resultados mensuráveis.</p>
            </div>

            {/* Education */}
            <div className="mt-8 pt-8 border-t border-border">
               <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5" />
                <h3 className="font-display text-xl font-bold uppercase tracking-tight">{t("section.education")}</h3>
               </div>
               <ul className="space-y-4 font-mono text-sm">
                 <li className="pl-7 border-l-2 border-border">
                    <span className="block font-bold text-base">{t("edu.pos")}</span>
                    <span className="text-muted-foreground">{t("edu.pos.school")}</span>
                 </li>
                 <li className="pl-7 border-l-2 border-border">
                    <span className="block font-bold text-base">{t("edu.grad")}</span>
                    <span className="text-muted-foreground">{t("edu.grad.school")}</span>
                 </li>
               </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Experience */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-5 h-5" />
                <h3 className="font-display text-lg font-bold uppercase tracking-tight">{t("section.experience")}</h3>
              </div>
              <ul className="space-y-3 font-mono text-xs">
                <li className="p-3 rounded-md bg-background/50 border border-border">
                  <span className="block font-bold text-sm">{t("exp.art_director")}</span>
                  <span className="text-muted-foreground">Point Media, 2025</span>
                </li>
                <li className="p-3 rounded-md bg-background/50 border border-border">
                  <span className="block font-bold text-sm">{t("exp.teacher")}</span>
                  <span className="text-muted-foreground">ETEC de Poá, 2025</span>
                </li>
                <li className="p-3 rounded-md bg-background/50 border border-border">
                  <span className="block font-bold text-sm">{t("exp.senior")}</span>
                  <span className="text-muted-foreground">Truther, 2025</span>
                </li>
                <li className="p-3 rounded-md bg-background/50 border border-border">
                  <span className="block font-bold text-sm">{t("exp.art_director")}</span>
                  <span className="text-muted-foreground">Norte Marketing, 2023-2024</span>
                </li>
                 <li className="p-3 rounded-md bg-background/50 border border-border">
                  <span className="block font-bold text-sm">{t("exp.graphic")}</span>
                  <span className="text-muted-foreground">Agência Bloomin, 2022-2023</span>
                </li>
              </ul>
            </div>

            {/* Languages */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5" />
                <h3 className="font-display text-lg font-bold uppercase tracking-tight">{t("section.languages")}</h3>
              </div>
              <ul className="space-y-2 font-mono text-xs">
                <li className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-foreground"></span>
                  {t("lang.portuguese")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-foreground"></span>
                  {t("lang.english")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-foreground"></span>
                  {t("lang.spanish")}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row: Clients & Software */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 pt-8 border-t border-border">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5" />
              <h3 className="font-display text-lg font-bold uppercase tracking-tight">{t("section.clients")}</h3>
            </div>
            <ul className="grid grid-cols-2 gap-2 font-mono text-xs">
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
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="w-5 h-5" />
              <h3 className="font-display text-lg font-bold uppercase tracking-tight">{t("section.software")}</h3>
            </div>
            <ul className="space-y-2 font-mono text-xs">
              <li>Photoshop, Illustrator</li>
              <li>After Effects, InDesign</li>
              <li>Figma</li>
              <li>Midjourney AI, ChatGPT AI</li>
            </ul>
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
