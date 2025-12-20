import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { CarouselApi } from "@/components/ui/carousel";
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

function ClientGrid({ startIndex }: { startIndex: number }) {
  const clientsInSlide = CLIENTS.slice(startIndex, startIndex + 8);
  
  return (
    <div className="grid grid-cols-4 gap-3 w-full">
      {clientsInSlide.map((client, idx) => {
        return (
          <motion.div
            key={`${client.name}-${idx}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="p-4 rounded-lg bg-background border border-border hover-elevate transition-all duration-300 flex items-center justify-center h-32 cursor-pointer"
            data-testid={`client-logo-${client.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <img 
              src={client.logo} 
              alt={client.name}
              className="max-w-[75px] max-h-[55px] object-contain brightness-0 dark:brightness-0 dark:invert"
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

  const totalSlides = Math.ceil(CLIENTS.length / 8);

  return (
    <section className="px-4 md:px-8 py-16 border-t border-border">
      <div className="mb-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground font-mono text-sm">
            {subtitle}
          </p>
        )}
      </div>

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
                <ClientGrid startIndex={slideIdx * 8} />
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
