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

interface ClientsCarouselProps {
  title: string;
  subtitle?: string;
}

const CLIENTS = [
  "BetMGM",
  "Avon",
  "GetNet",
  "Audi",
  "Banco do Brasil",
  "Nestlé",
  "Santander",
  "C&A",
];

function ClientGrid({ startIndex }: { startIndex: number }) {
  const clientsInSlide = CLIENTS.slice(startIndex, startIndex + 8);
  
  return (
    <div className="grid grid-cols-4 gap-3 w-full">
      {clientsInSlide.map((client, idx) => {
        return (
          <motion.div
            key={`${client}-${idx}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="p-4 rounded-lg bg-background border border-border hover-elevate transition-all duration-300 flex items-center justify-center h-32 cursor-pointer"
          >
            <span className="text-center font-display font-bold text-lg md:text-xl uppercase tracking-tight line-clamp-2">
              {client}
            </span>
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
