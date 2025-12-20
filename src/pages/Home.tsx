import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { CLIENTS } from "@/data/clients";
import { ClientsCarousel } from "@/components/portfolio/ClientsCarousel";
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
  const isMobile = useIsMobile();
  const coverImage = isMobile && client.coverImageMobile ? client.coverImageMobile : client.coverImage;

  return (
    <Link href={`/client/${client.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative overflow-hidden rounded-md cursor-pointer aspect-[4/1] w-full"
        data-testid={`card-client-${client.id}`}
      >
        <img
          src={coverImage}
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
                    src={client.coverImageMobile || client.coverImage}
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
      <div className="grid grid-cols-2 gap-6">
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

      <section id="about" className="px-4 md:px-8 py-20 border-t border-border bg-secondary/30">
        {/* About Section - Full Width Hero */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-8 h-8" />
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">
              {t("section.about")}
            </h2>
          </div>
          <div className="max-w-4xl space-y-6 text-lg md:text-xl font-sans font-light leading-relaxed text-foreground">
            <p className="text-base md:text-lg">{t("about.p1")}</p>
            <p className="text-base md:text-lg">{t("about.p2")}</p>
            <p className="text-base md:text-lg">Com mais de 5 anos de experiência, desenvolvo soluções visuais estratégicas que conectam marca e audiência. Meu trabalho combina pesquisa, criatividade e rigor técnico para entregar resultados mensuráveis.</p>
          </div>
        </div>

        {/* Experience & Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Experience Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-7 h-7" />
              <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">{t("section.experience")}</h3>
            </div>
            <div className="space-y-4">
              <a href="https://www.pointmedia.com.br/" target="_blank" rel="noopener noreferrer" className="p-6 rounded-lg bg-background border border-border hover-elevate transition-all block">
                <span className="block font-bold text-base md:text-lg mb-1">{t("exp.art_director")}</span>
                <span className="text-muted-foreground font-mono text-sm">Point Media, 2025</span>
              </a>
              <a href="https://www.cps.sp.gov.br/etecs/etec-de-poa/" target="_blank" rel="noopener noreferrer" className="p-6 rounded-lg bg-background border border-border hover-elevate transition-all block">
                <span className="block font-bold text-base md:text-lg mb-1">{t("exp.teacher")}</span>
                <span className="text-muted-foreground font-mono text-sm">ETEC de Poá, 2025</span>
              </a>
              <a href="https://truther.to/" target="_blank" rel="noopener noreferrer" className="p-6 rounded-lg bg-background border border-border hover-elevate transition-all block">
                <span className="block font-bold text-base md:text-lg mb-1">{t("exp.senior")}</span>
                <span className="text-muted-foreground font-mono text-sm">Truther, 2025</span>
              </a>
              <a href="https://www.nortemkt.com/" target="_blank" rel="noopener noreferrer" className="p-6 rounded-lg bg-background border border-border hover-elevate transition-all block">
                <span className="block font-bold text-base md:text-lg mb-1">{t("exp.art_director")}</span>
                <span className="text-muted-foreground font-mono text-sm">Norte Marketing, 2023-2024</span>
              </a>
              <a href="https://www.bloomin.com.br/" target="_blank" rel="noopener noreferrer" className="p-6 rounded-lg bg-background border border-border hover-elevate transition-all block">
                <span className="block font-bold text-base md:text-lg mb-1">{t("exp.graphic")}</span>
                <span className="text-muted-foreground font-mono text-sm">Agência Bloomin, 2022-2023</span>
              </a>
            </div>
          </div>

          {/* Education & Languages */}
          <div className="space-y-16">
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="w-7 h-7" />
                <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">{t("section.education")}</h3>
              </div>
              <div className="space-y-4">
                <div className="p-6 rounded-lg bg-background border border-border">
                  <span className="block font-bold text-base md:text-lg mb-1">{t("edu.pos")}</span>
                  <span className="text-muted-foreground font-mono text-sm">{t("edu.pos.school")}</span>
                </div>
                <div className="p-6 rounded-lg bg-background border border-border">
                  <span className="block font-bold text-base md:text-lg mb-1">{t("edu.grad")}</span>
                  <span className="text-muted-foreground font-mono text-sm">{t("edu.grad.school")}</span>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Globe className="w-7 h-7" />
                <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">{t("section.languages")}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border">
                  <span className="inline-block w-3 h-3 rounded-full bg-foreground"></span>
                  <span className="font-mono text-base">{t("lang.portuguese")}</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border">
                  <span className="inline-block w-3 h-3 rounded-full bg-foreground"></span>
                  <span className="font-mono text-base">{t("lang.english")}</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border">
                  <span className="inline-block w-3 h-3 rounded-full bg-foreground"></span>
                  <span className="font-mono text-base">{t("lang.spanish")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Software Section */}
        <div className="pt-12 border-t border-border">
          <div className="flex items-center gap-3 mb-8">
            <Code2 className="w-8 h-8" />
            <h3 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight">{t("section.software")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg bg-background border border-border">
              <p className="font-bold text-base mb-4">Design</p>
              <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h9v9H2V2zm11 0h9v9h-9V2zM2 13h9v9H2v-9zm11 0h9v9h-9v-9z"/>
                  </svg>
                  Photoshop
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h18v18H3V3zm2 2v14h14V5H5z"/>
                  </svg>
                  Illustrator
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z"/>
                  </svg>
                  InDesign
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-lg bg-background border border-border">
              <p className="font-bold text-base mb-4">Motion</p>
              <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7L8 5z"/>
                  </svg>
                  After Effects
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-lg bg-background border border-border">
              <p className="font-bold text-base mb-4">UI/UX</p>
              <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h18v18H3V3zm2 2v14h14V5H5z"/>
                  </svg>
                  Figma
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-lg bg-background border border-border">
              <p className="font-bold text-base mb-4">AI</p>
              <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                  </svg>
                  Midjourney
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
                  </svg>
                  ChatGPT
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ClientsCarousel title={t("section.clients")} subtitle="Empresas e marcas com as quais colaborei" />

      <section className="px-4 md:px-8 py-16 border-t border-border bg-secondary/30 flex flex-col items-center justify-center text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
          Gostou do trabalho?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Baixe meu currículo completo e entre em contato para discutir seus próximos projetos
        </p>
        <a 
          href="/Curriculo2026-compactado_1766200235837.pdf" 
          download="Rodrigo_Freitas_Curriculo.pdf"
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-bold rounded-md hover-elevate transition-all"
          data-testid="button-download-resume"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Baixar Currículo
        </a>
      </section>

      <footer className="px-4 md:px-8 py-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col">
            <span className="font-display font-bold uppercase tracking-tight text-lg">Rodrigo.Freitas</span>
            <span className="font-mono text-xs text-muted-foreground mt-1">rodrigo.f.prates2023@gmail.com</span>
            <span className="font-mono text-xs text-muted-foreground">+55 (11) 95775-0903</span>
        </div>
        <div className="flex gap-4">
             <a href="https://www.behance.net/rodrigofreitas27" target="_blank" className="font-mono text-xs uppercase hover:underline">Behance</a>
             <a href="mailto:rodrigo.f.prates2023@gmail.com" className="font-mono text-xs uppercase hover:underline">Email</a>
        </div>
        <span className="font-mono text-xs text-muted-foreground">{t("footer.rights")}</span>
      </footer>
    </div>
  );
}
