import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "pt" | "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  pt: {
    "nav.work": "TRABALHOS",
    "nav.profile": "PERFIL",
    "nav.contact": "CONTATO",
    "nav.back": "Voltar",
    "client.notfound": "Cliente não encontrado",
    "hero.role": "DESIGNER GRÁFICO PLENO",
    "hero.description": "Mais de 5 anos criando narrativas visuais para o mercado digital. Especialista em identidades consistentes e materiais promocionais de alto impacto.",
    "hero.scroll": "Scroll para explorar",
    "section.projects": "Projetos Selecionados",
    "section.projects.subtitle": "(2018 — PRESENTE)",
    "section.about": "Sobre Mim",
    "about.p1": "Olá, meu nome é Rodrigo. Sou um Designer Gráfico com foco especializado no mercado digital e marketing. Reconhecido por desenvolver materiais promocionais diversificados, adaptáveis para diferentes plataformas, garantindo consistência visual e impacto.",
    "about.p2": "Atuo criando interfaces intuitivas (UI/UX) e identidades visuais que refletem a essência do produto. Colaboro de perto com times de desenvolvimento para alinhar estética e funcionalidade.",
    "section.education": "Educação",
    "edu.pos": "Pós-Graduação Lato Sensu UX Design",
    "edu.pos.school": "Centro Universitário Senac (Cursando)",
    "edu.grad": "Superior Design Gráfico",
    "edu.grad.school": "Universidade Cruzeiro do Sul (2021-2023)",
    "section.experience": "Experiência",
    "exp.art_director": "Diretor de Arte",
    "exp.teacher": "Professor IAM",
    "exp.senior": "UX/UI Designer / Dir. Arte Senior",
    "exp.graphic": "Designer Gráfico",
    "section.languages": "Idiomas",
    "lang.portuguese": "Português Nativo",
    "lang.english": "Inglês Intermediário",
    "lang.spanish": "Espanhol Avançado",
    "section.clients": "Grandes Clientes",
    "section.software": "Software",
    "client.betmgm": "Desenvolvimento completo de Key Visuals (KVs) para campanhas de apostas esportivas, materiais promocionais para redes sociais e desdobramentos de identidade visual para grandes eventos.",
    "client.getnet": "Criação de identidade visual institucional, materiais para campanhas B2B e peças promocionais focadas em soluções de pagamento.",
    "client.audi": "Desenvolvimento de peças digitais premium para lançamentos automotivos, seguindo rigorosos guidelines globais da marca com foco em performance e luxo.",
    "client.avon": "Design editorial para catálogos digitais, motion graphics para stories e reels, e identidade visual para campanhas de beleza focadas em diversidade.",
    "projects.count": "Projetos",
    "footer.rights": "© 2025 Rodrigo Freitas. Todos os direitos reservados."
  },
  en: {
    "nav.work": "WORK",
    "nav.profile": "PROFILE",
    "nav.contact": "CONTACT",
    "nav.back": "Back",
    "client.notfound": "Client not found",
    "hero.role": "SENIOR GRAPHIC DESIGNER",
    "hero.description": "Over 5 years creating visual narratives for the digital market. Specialist in consistent identities and high-impact promotional materials.",
    "hero.scroll": "Scroll to explore",
    "section.projects": "Selected Work",
    "section.projects.subtitle": "(2018 — PRESENT)",
    "section.about": "About Me",
    "about.p1": "Hello, my name is Rodrigo. I am a Graphic Designer focused on the digital market and marketing. Recognized for developing diverse promotional materials, adaptable to different platforms, ensuring visual consistency and impact.",
    "about.p2": "I create intuitive interfaces (UI/UX) and visual identities that reflect the product's essence. I collaborate closely with development teams to align aesthetics and functionality.",
    "section.education": "Education",
    "edu.pos": "Postgraduate UX Design",
    "edu.pos.school": "Senac University Center (In Progress)",
    "edu.grad": "Graphic Design Degree",
    "edu.grad.school": "Cruzeiro do Sul University (2021-2023)",
    "section.experience": "Experience",
    "exp.art_director": "Art Director",
    "exp.teacher": "IAM Professor",
    "exp.senior": "UX/UI Designer / Senior Art Dir.",
    "exp.graphic": "Graphic Designer",
    "section.languages": "Languages",
    "lang.portuguese": "Native Portuguese",
    "lang.english": "Intermediate English",
    "lang.spanish": "Advanced Spanish",
    "section.clients": "Major Clients",
    "section.software": "Software",
    "client.betmgm": "Complete development of Key Visuals (KVs) for sports betting campaigns, promotional materials for social media, and visual identity rollout for major events.",
    "client.getnet": "Creation of institutional visual identity, materials for B2B campaigns, and promotional pieces focused on payment solutions.",
    "client.audi": "Development of premium digital pieces for automotive launches, following strict global brand guidelines with a focus on performance and luxury.",
    "client.avon": "Editorial design for digital catalogs, motion graphics for stories and reels, and visual identity for beauty campaigns focused on diversity.",
    "projects.count": "Projects",
    "footer.rights": "© 2025 Rodrigo Freitas. All rights reserved."
  },
  es: {
    "nav.work": "TRABAJOS",
    "nav.profile": "PERFIL",
    "nav.contact": "CONTACTO",
    "nav.back": "Volver",
    "client.notfound": "Cliente no encontrado",
    "hero.role": "DISEÑADOR GRÁFICO SENIOR",
    "hero.description": "Más de 5 años creando narrativas visuales para el mercado digital. Especialista en identidades consistentes y materiales promocionales de alto impacto.",
    "hero.scroll": "Desplazarse para explorar",
    "section.projects": "Trabajos Seleccionados",
    "section.projects.subtitle": "(2018 — PRESENTE)",
    "section.about": "Sobre Mí",
    "about.p1": "Hola, mi nombre es Rodrigo. Soy un Diseñador Gráfico enfocado en el mercado digital y marketing. Reconocido por desarrollar materiales promocionales diversos, adaptables a diferentes plataformas, garantizando consistencia visual e impacto.",
    "about.p2": "Creo interfaces intuitivas (UI/UX) e identidades visuales que reflejan la esencia del producto. Colaboro estrechamente con equipos de desarrollo para alinear estética y funcionalidad.",
    "section.education": "Educación",
    "edu.pos": "Posgrado en Diseño UX",
    "edu.pos.school": "Centro Universitario Senac (En Curso)",
    "edu.grad": "Grado en Diseño Gráfico",
    "edu.grad.school": "Universidad Cruzeiro do Sul (2021-2023)",
    "section.experience": "Experiencia",
    "exp.art_director": "Director de Arte",
    "exp.teacher": "Profesor IAM",
    "exp.senior": "Diseñador UX/UI / Dir. Arte Senior",
    "exp.graphic": "Diseñador Gráfico",
    "section.languages": "Idiomas",
    "lang.portuguese": "Portugués Nativo",
    "lang.english": "Inglés Intermedio",
    "lang.spanish": "Español Avanzado",
    "section.clients": "Grandes Clientes",
    "section.software": "Software",
    "client.betmgm": "Desarrollo completo de Key Visuals (KVs) para campañas de apuestas deportivas, materiales promocionales para redes sociales y despliegue de identidad visual para grandes eventos.",
    "client.getnet": "Creación de identidad visual institucional, materiales para campañas B2B y piezas promocionales enfocadas en soluciones de pago.",
    "client.audi": "Desarrollo de piezas digitales premium para lanzamientos automotrices, siguiendo rigurosas pautas globales de la marca con enfoque en rendimiento y lujo.",
    "client.avon": "Diseño editorial para catálogos digitales, gráficos en movimiento para historias y reels, e identidad visual para campañas de belleza enfocadas en la diversidad.",
    "projects.count": "Proyectos",
    "footer.rights": "© 2025 Rodrigo Freitas. Todos los derechos reservados."
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
