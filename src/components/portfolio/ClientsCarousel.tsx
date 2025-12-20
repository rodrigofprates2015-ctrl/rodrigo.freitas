import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { CarouselApi } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollReveal, staggerContainer, fadeInUpVariant } from "@/hooks/useScrollReveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import logoGetnet from "@assets/Getnet_1766125097695.png";
import logoNestle from "@assets/Nestle_1766125097695.png";
import logoSantander from "@assets/Santander_1766125097696.png";
import logoAudi from "@assets/audi_1766125097696.png";
import logoAvon from "@assets/avon_1766125097696.png";
import logoBetmgm from "@assets/Ativo_1logo__1766196603379.png";
import logoCea from "@assets/image_1766196591499.png";
import logoBancoDoBrasil from "@assets/image_1766125138397.png";

interface ClientsCarouselProps {
  title: string;
  subtitle?: string;
}

interface ClientLogo {
  name: string;
  logo: string;
}

const CLIENTS: ClientLogo[] = [
  { name: "BetMGM", logo: logoBetmgm },
  { name: "Avon", logo: logoAvon },
  { name: "GetNet", logo: logoGetnet },
  { name: "Audi", logo: logoAudi },
  { name: "Banco do Brasil", logo: logoBancoDoBrasil },
  { name: "Nestlé", logo: logoNestle },
  { name: "Santander", logo: logoSantander },
  { name: "C&A", logo: logoCea },
];

function ClientGrid({ startIndex, itemsPerSlide }: { startIndex: number; itemsPerSlide: number }) {
  const clientsInSlide = CLIENTS.slice(startIndex, startIndex + itemsPerSlide);
  const isMobile = itemsPerSlide === 4;
  
  return (
    <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} ${isMobile ? 'gap-2' : 'gap-3'} w-full`}>
      {clientsInSlide.map((client, idx) => {
        return (
          <motion.div
            key={`${client.name}-${idx}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className={`${isMobile ? 'p-2' : 'p-4'} rounded-lg bg-background border border-border hover-elevate transition-all duration-300 flex items-center justify-center ${isMobile ? 'aspect-square' : 'h-32'} cursor-pointer`}
            data-testid={`client-logo-${client.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <img 
              src={client.logo} 
              alt={client.name}
              className={`object-contain brightness-0 dark:brightness-0 dark:invert ${
                !isMobile && client.name === "Banco do Brasil" 
                  ? "max-w-[230px] max-h-[168px]"
                  : !isMobile && client.name === "BetMGM"
                  ? "max-w-[176px] max-h-[129px]"
                  : !isMobile
                  ? "max-w-[135px] max-h-[99px]"
                  : "max-w-[80%] max-h-[80%]"
              }`}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export function ClientsCarousel({ title, subtitle }: ClientsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile();

  const itemsPerSlide = isMobile ? 4 : 8;
  const totalSlides = Math.ceil(CLIENTS.length / itemsPerSlide);

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
    <section className="px-4 md:px-8 py-16 border-t border-border">
      <motion.div 
        className="mb-8"
        {...staggerContainer(0.1, 0)}
      >
        <motion.h2 
          className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2"
          variants={fadeInUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p 
            className="text-muted-foreground font-mono text-sm"
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>

      <div className="relative">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {Array.from({ length: totalSlides }).map((_, slideIdx) => (
              <CarouselItem key={slideIdx} className="pl-2 md:pl-4 basis-full">
                <ClientGrid startIndex={slideIdx * itemsPerSlide} itemsPerSlide={itemsPerSlide} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6 gap-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full"
              data-testid="button-clients-carousel-prev"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full"
              data-testid="button-clients-carousel-next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Indicators */}
          <div className="flex gap-2 items-center">
            <span className="text-xs font-mono text-muted-foreground">
              {current + 1} / {totalSlides}
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-colors ${
                    index === current
                      ? "bg-foreground w-6"
                      : "bg-muted-foreground/30 w-1.5"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
