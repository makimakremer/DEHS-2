# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

B2B-Webseite für Heizungsanlagen-Großhandel mit Next.js 14 (App Router) und Strapi 4 Headless CMS in einem Turborepo Monorepo.

## Development Commands

```bash
# Installation
pnpm install

# Development (beide Server parallel)
pnpm dev              # Startet Frontend + CMS
pnpm dev:web          # Nur Next.js Frontend (Port 3000)
pnpm dev:cms          # Nur Strapi CMS (Port 1337)

# Build
pnpm build            # Baut alle Apps
pnpm build:web        # Nur Frontend
pnpm build:cms        # Nur CMS

# Linting
pnpm lint
```

**Wichtig:** Frontend und CMS müssen in separaten Terminals laufen:
- Terminal 1: `pnpm dev:cms` (http://localhost:1337/admin)
- Terminal 2: `pnpm dev:web` (http://localhost:3000)

## Architecture

### Monorepo Structure

- **apps/web/** - Next.js 14 Frontend mit App Router
- **apps/cms/** - Strapi 4 Backend/CMS
- **packages/shared/** - Gemeinsame TypeScript-Typen zwischen Frontend und Backend

### Data Flow

```
Next.js (SSR) → Strapi REST API → SQLite/PostgreSQL
     ↓
  @shared/types (gemeinsame TypeScript-Typen)
```

### Frontend Architecture (apps/web/)

**Route Groups:**
- `(marketing)/` - Öffentliche Seiten mit Marketing-Layout (Header/Footer)
  - Startseite, Produktübersicht, Kategorie-Seiten, Produktdetails

**API Client Pattern:**
- `lib/strapi/client.ts` ist der zentrale API-Client
- Alle Strapi-Anfragen gehen durch `fetchAPI()` Helper
- Verwendet Next.js `fetch` mit `revalidate: 60` für ISR (Incremental Static Regeneration)
- Error Handling gibt `StrapiError` zurück statt zu werfen

**Key Files:**
- `lib/strapi/client.ts` - Strapi API Client mit Helpers
- `components/products/` - Wiederverwendbare Produktkomponenten
- `app/(marketing)/produkte/` - Dynamische Routen für Produkte

### Backend Architecture (apps/cms/)

**Content-Types:**
- **product** - Heizungsprodukte (Hauptentität)
- **kategorie** - Hierarchische Kategorien (self-referential: parent/children)
- **hersteller** (plural: herstellers) - Produkthersteller
- **anfrage** - Kundenanfragen
- **kundengruppe** - Für Preisgruppen (B2B)

**Components (Reusable Strapi Components):**
- `produkt/technische-daten` - Repeatable Component für technische Spezifikationen
- `adresse/adresse` - Adressdaten für Rechnungs-/Lieferadressen

**Important Strapi-Specific Details:**

1. **Energieeffizienzklassen** werden als `A_PLUS_PLUS_PLUS`, `A_PLUS_PLUS`, etc. gespeichert (nicht `A+++`), weil Strapi Enumeration-Werte normalisiert und `A+++` würde mit `A++` kollidieren.

2. **Hersteller Collection** hat `pluralName: "herstellers"` statt `"hersteller"`, weil Strapi Singular und Plural unterschiedlich benötigt (deutsche Grammatik-Workaround).

3. **TypeScript Strictness:** `apps/cms/tsconfig.json` hat `strict: false` und `noImplicitAny: false`, weil Strapi 4 Config-Dateien `({ env }) => {}` Pattern nutzen.

4. **API Permissions:** Public Role muss für `product`, `kategorie`, `hersteller` die Berechtigungen `find` und `findOne` haben (Settings → Users & Permissions → Public).

### Shared Types (packages/shared/)

Zentrale TypeScript-Typen in `src/index.ts`:
- `Product`, `Category`, `Manufacturer` - Spiegeln Strapi Content-Types
- `StrapiResponse<T>`, `StrapiError` - API Response-Wrapper
- `ProductFilters`, `PaginationParams`, `SortParams` - API Query-Typen

**Import im Frontend:**
```typescript
import type { Product, Category } from "@shared/types";
```

## Strapi Content Structure

### Product Schema

- `slug` - Auto-generiert aus `name` (UID-Feld)
- `artikelnummer` - Unique, wird in Suche verwendet
- `kategorie` - ManyToOne Relation
- `hersteller` - ManyToOne Relation
- `hauptbild` - Single Media
- `galerie` - Multiple Media
- `technischeDaten` - Repeatable Component mit `bezeichnung`, `wert`, `einheit`, `gruppe`
- `zubehoer` - ManyToMany Self-Relation (verwandte Produkte)
- `ersatzteile` - OneToMany Self-Relation

### Category Schema (Hierarchisch)

- `parent` - ManyToOne Self-Relation (für Hierarchie)
- `children` - OneToMany Self-Relation (Unterkategorien)
- `sortierung` - Integer für manuelle Sortierung
- `inNavigation` - Boolean (zeigt in Header-Navigation)

## Environment Variables

**apps/web/.env.local:**
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-change-in-production
```

**apps/cms/.env:**
```env
DATABASE_CLIENT=sqlite                    # Entwicklung
DATABASE_FILENAME=.tmp/data.db           # SQLite-Datei
APP_KEYS=toBeModified1,toBeModified2     # Für Produktion ändern
ADMIN_JWT_SECRET=tobemodified            # Für Produktion ändern
```

## Common Issues & Solutions

### Strapi TypeScript Errors

Wenn Strapi beim Build mit TypeScript-Errors abbricht (z.B. `Binding element 'env' implicitly has an 'any' type`):
- Prüfe `apps/cms/tsconfig.json`: `strict` und `noImplicitAny` müssen auf `false` stehen
- Lösche `.cache` Ordner: `rm -rf apps/cms/.cache`

### Frontend zeigt keine Daten

1. Prüfe ob Strapi läuft: `curl http://localhost:1337/_health`
2. Prüfe API Permissions in Strapi Admin (Public Role)
3. Prüfe ob Content published ist (nicht nur Draft)

### Enumeration Collision Errors

Strapi normalisiert Enumeration-Werte. `A+++`, `A++`, `A+` würden alle zu `A` normalisiert.
Lösung: Verwende `A_PLUS_PLUS_PLUS`, `A_PLUS_PLUS`, `A_PLUS` (siehe `product/schema.json`).

## Development Workflow

### Adding New Strapi Content-Type

1. Create folder: `apps/cms/src/api/{content-type-name}/content-types/{content-type-name}/`
2. Create `schema.json` mit Strapi Schema
3. Restart Strapi: Content-Type wird automatisch erkannt
4. Add TypeScript types in `packages/shared/src/index.ts`
5. Add API functions in `apps/web/src/lib/strapi/client.ts`

### Adding New Frontend Page

1. Create in `apps/web/src/app/(marketing)/`
2. Use Server Components für Data Fetching (async/await)
3. Import types from `@shared/types`
4. Use Strapi Client: `import { getProducts } from "@/lib/strapi/client"`

### Image Handling

- Strapi Media URLs sind relativ: `/uploads/...`
- Use `getStrapiImageUrl()` Helper aus `lib/strapi/client.ts`
- Next.js Image Component mit `fill` für responsive images
- Allowed domains in `next.config.js` konfiguriert

## Testing Setup

Nach frischer Installation:

1. Start Strapi, create admin account
2. Erstelle Testdaten (siehe README.md):
   - 3-5 Kategorien (Wärmepumpen, Gasheizungen, etc.)
   - 2-3 Hersteller (Viessmann, Vaillant)
   - 5-10 Beispielprodukte
3. **Wichtig:** Public API Permissions aktivieren
4. Frontend sollte nun Daten anzeigen

## Notes

- Next.js verwendet App Router (nicht Pages Router)
- Strapi 4 nutzt SQLite in Development, PostgreSQL für Production
- Deutsche Sprache durchgehend (Content, UI, Fehlermeldungen)
- B2B-Fokus: Preise nur für eingeloggte Kunden (geplant)
