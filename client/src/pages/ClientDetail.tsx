import { useRoute, Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { MosaicGrid } from "@/components/portfolio/MosaicGrid";
import { getClientById } from "@/data/clients";
import { useLanguage } from "@/lib/language";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClientDetail() {
  const [, params] = useRoute("/client/:id");
  const { t } = useLanguage();
  
  const client = params?.id ? getClientById(params.id) : undefined;
  
  if (!client) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[60vh] px-4">
          <h1 className="font-display text-3xl font-bold mb-4">{t("client.notfound") || "Cliente não encontrado"}</h1>
          <Link href="/">
            <Button variant="outline" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("nav.back") || "Voltar"}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background transition-colors duration-300">
      <Navbar />

      <section className="px-4 md:px-8 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <Button 
              variant="ghost" 
              className="mb-6 -ml-2"
              data-testid="button-back-clients"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("nav.back") || "Voltar"}
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <h1 
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter"
                data-testid={`text-client-name-${client.id}`}
              >
                {client.name}
              </h1>
              <p className="mt-3 text-muted-foreground font-mono text-sm max-w-lg leading-relaxed">
                {t(client.descriptionKey)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span 
                className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 border border-border rounded-full"
                data-testid={`text-project-count-${client.id}`}
              >
                {client.projects.length} {t("projects.count")}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MosaicGrid projects={client.projects} clientName={client.name} />
        </motion.div>
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
