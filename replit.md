# Rodrigo Freitas Portfolio

## Overview

A personal portfolio website for Rodrigo Freitas, a graphic designer specializing in digital marketing and UI/UX. The application showcases client work through an interactive gallery with project details, supporting multiple languages (Portuguese, English, Spanish) and light/dark themes.

## Recent Changes (December 2025)

- **Restructured portfolio display**: Home page now shows client cover cards instead of all projects
- **Added client detail pages**: Each client has a dedicated page at `/client/:id` showing all their artworks
- **Mobile responsive carousel**: On mobile devices, client covers display in a swipeable carousel with navigation buttons
- **New data structure**: Centralized client data in `client/src/data/clients.ts`

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state, React Context for theme and language
- **Styling**: Tailwind CSS v4 with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for page transitions and interactive elements
- **Layout**: Masonry grid using react-masonry-css for project galleries

### Backend Architecture
- **Runtime**: Node.js with Express
- **Build Tool**: Vite for development and esbuild for production bundling
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Static Serving**: Express serves built client assets in production

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for shared types between client and server
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Current Storage**: In-memory storage implementation (`MemStorage`) with interface for future database migration

### Key Design Patterns
- **Monorepo Structure**: Client code in `client/`, server in `server/`, shared types in `shared/`
- **Path Aliases**: `@/` for client source, `@shared/` for shared code, `@assets/` for attached assets
- **Component Organization**: UI primitives in `components/ui/`, feature components in `components/layout/` and `components/portfolio/`
- **Internationalization**: Context-based language provider with translation key lookups

### Build Configuration
- Development: Vite dev server with HMR, proxied through Express
- Production: Vite builds client to `dist/public/`, esbuild bundles server to `dist/index.cjs`
- Database migrations output to `./migrations` directory

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **Drizzle Kit**: Database migration tooling with `db:push` command

### UI Components
- **Radix UI**: Headless component primitives (dialog, dropdown, tabs, etc.)
- **Embla Carousel**: Carousel functionality
- **cmdk**: Command palette component

### Session Management
- **connect-pg-simple**: PostgreSQL session store (available but not yet implemented)

### Development Tools
- **Replit Plugins**: Cartographer, dev banner, and runtime error overlay for Replit environment
- **Custom Vite Plugin**: `vite-plugin-meta-images` for OpenGraph image URL injection