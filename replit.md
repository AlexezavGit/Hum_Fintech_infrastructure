# Feel Again - Humanitarian Aid Transparency Platform

## Overview

Feel Again is a humanitarian aid transparency and donation management platform designed to provide dignified access to psychological support services. The system enables transparent tracking of donations, projects, beneficiaries, and transactions with blockchain verification capabilities. It features AI-powered analytics, real-time operations monitoring, and compliance reporting aligned with humanitarian standards like Grand Bargain and IATI.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives with custom styling)
- **Build Tool**: Vite with hot module replacement

The frontend follows a pages-based architecture with shared layout components (Header, Sidebar). Each page handles its own authentication checks and data fetching via React Query hooks.

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints under `/api/` prefix
- **Authentication**: Replit Auth via OpenID Connect with session-based auth
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple

The server uses a modular structure with routes defined in `server/routes.ts` and database operations abstracted in `server/storage.ts`. The storage layer implements an interface pattern for clean separation between business logic and data access.

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: Neon serverless PostgreSQL
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Migrations**: Drizzle Kit for schema push operations

Key tables include: users, sessions, projects, donations, transactions, beneficiaries, and activity_log. The schema uses Zod for validation via drizzle-zod integration.

### Key Design Patterns
1. **Shared Schema**: TypeScript types and Zod schemas defined once in `shared/` directory, consumed by both frontend and backend
2. **Query-based Data Fetching**: All API calls use React Query with consistent error handling
3. **Component Composition**: UI built from atomic shadcn/ui components composed into dashboard widgets and page layouts
4. **Path Aliases**: `@/` for client sources, `@shared/` for shared code, `@assets/` for static assets

## External Dependencies

### Database
- **Neon Serverless PostgreSQL**: Primary database via `@neondatabase/serverless` package
- **Connection**: Requires `DATABASE_URL` environment variable

### Authentication
- **Replit Auth**: OpenID Connect authentication via Replit's identity service
- **Requirements**: `REPLIT_DOMAINS` and `REPL_ID` environment variables
- **Session Secret**: `SESSION_SECRET` environment variable (falls back to development default)

### AI Integration
- **Anthropic SDK**: `@anthropic-ai/sdk` for AI-powered analytics features

### Third-Party UI Libraries
- Radix UI primitives for accessible component foundations
- Embla Carousel for carousel functionality
- React Day Picker for calendar components
- Recharts for data visualization
- Vaul for drawer components

### Development Tools
- Vite with React plugin and Replit-specific plugins for development
- ESBuild for production server bundling
- TypeScript for type checking across the entire codebase