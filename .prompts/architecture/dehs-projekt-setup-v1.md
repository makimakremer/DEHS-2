# DEHS Projekt-Setup Prompt

**Created:** 2026-02-01
**Category:** architecture
**Complexity:** Medium-Complex
**For:** Intermediate to Advanced Developers

---

## Quick Summary

Wiederverwendbarer Prompt fuer das Einrichten neuer Features im DEHS B2B-Heizungsanlagen-Projekt. Unterstuetzt Content-Types, Frontend-Routen, Komponenten, API-Funktionen und Shared Types im Turborepo Monorepo.

---

## Quick Version

Verwende diese Version fuer einfache, einzelne Setup-Aufgaben.

```markdown
Du arbeitest im DEHS-Projekt (B2B-Heizungsanlagen-Grosshandel).

**Monorepo-Struktur:**
- apps/web/ - Next.js 14 (App Router)
- apps/cms/ - Strapi 4 Headless CMS
- packages/shared/ - Gemeinsame TypeScript-Typen

**Meine Aufgabe:**
[HIER AUFGABE EINFUEGEN - z.B. "Erstelle einen neuen Content-Type 'Zubehoer'"]

**Anforderungen:**
1. Folge der bestehenden Projektstruktur
2. TypeScript-Typen in packages/shared/ synchronisieren
3. Deutsche Bezeichnungen fuer Content und UI
4. Server Components fuer Data Fetching verwenden

Erstelle die notwendigen Dateien mit vollstaendigem Code.
```

---

## Detailed Version (Empfohlen)

Verwende diese Version fuer komplexere Features oder wenn du detaillierte Anleitungen benotigst.

```markdown
# DEHS Projekt-Setup: [FEATURE-NAME]

## Projekt-Kontext

Du arbeitest im DEHS-Projekt, einer B2B-Webseite fuer Heizungsanlagen-Grosshandel.

**Tech-Stack:**
- Turborepo Monorepo
- Next.js 14 mit App Router (apps/web/)
- Strapi 4 Headless CMS (apps/cms/)
- TypeScript durchgehend
- SQLite (Dev) / PostgreSQL (Prod)
- pnpm als Package Manager

**Monorepo-Struktur:**
```
apps/
  web/                    # Next.js 14 Frontend
    src/
      app/(marketing)/    # Oeffentliche Seiten
      components/         # React Components
      lib/strapi/         # API Client (client.ts)
  cms/                    # Strapi 4 Backend
    src/api/              # Content-Types
packages/
  shared/                 # Gemeinsame Typen
    src/index.ts          # Typ-Definitionen
```

## Meine Aufgabe

[BESCHREIBE HIER DETAILLIERT WAS DU ERSTELLEN MOECHTEST]

Beispiele:
- Neuer Strapi Content-Type "Zubehoer" mit Relation zu Produkten
- Neue Frontend-Seite "/hersteller/[slug]" mit dynamischer Route
- Neue Komponente "ProductCard" fuer Produktuebersichten
- API-Funktion "getProductsByCategory" im Strapi Client

## Bestehende Patterns (WICHTIG - FOLGE DIESEN)

### Strapi Content-Type Pattern
Pfad: `apps/cms/src/api/{name}/content-types/{name}/schema.json`

```json
{
  "kind": "collectionType",
  "collectionName": "{plural_name}",
  "info": {
    "singularName": "{name}",
    "pluralName": "{plural_name}",
    "displayName": "{Display Name}"
  },
  "options": { "draftAndPublish": true },
  "attributes": {
    "name": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "name" }
  }
}
```

### Shared Types Pattern
Pfad: `packages/shared/src/index.ts`

```typescript
export interface NewType {
  id: number;
  attributes: {
    name: string;
    slug: string;
    // ... weitere Felder
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
  };
}
```

### API Client Pattern
Pfad: `apps/web/src/lib/strapi/client.ts`

```typescript
export async function getNewItems(params?: {
  filters?: NewItemFilters;
  pagination?: PaginationParams;
}): Promise<StrapiResponse<NewItem[]> | StrapiError> {
  const queryParams = new URLSearchParams();
  // ... Query-Aufbau
  return fetchAPI<NewItem[]>(`/api/new-items?${queryParams}`);
}
```

### Frontend Route Pattern
Pfad: `apps/web/src/app/(marketing)/{route}/page.tsx`

```typescript
import type { Metadata } from "next";
import { getItems } from "@/lib/strapi/client";
import type { Item } from "@shared/types";

export const metadata: Metadata = {
  title: "Seitentitel | DEHS",
  description: "Beschreibung",
};

export default async function PageName() {
  const response = await getItems();
  // ... Render-Logik
}
```

## Wichtige Projekt-Regeln

1. **Enumeration-Werte:** Verwende `A_PLUS_PLUS_PLUS` statt `A+++` (Strapi-Normalisierung)
2. **Hersteller Plural:** `pluralName: "herstellers"` (deutsche Grammatik-Workaround)
3. **TypeScript in CMS:** `strict: false` in apps/cms/tsconfig.json
4. **API Permissions:** Public Role braucht `find` und `findOne` Rechte
5. **Image URLs:** Relativ `/uploads/...` - nutze `getStrapiImageUrl()` Helper
6. **ISR:** Verwende `revalidate: 60` fuer Incremental Static Regeneration
7. **Deutsche Sprache:** Durchgehend fuer Content, UI, Fehlermeldungen

## Erwartete Ausgabe

Erstelle alle notwendigen Dateien mit vollstaendigem, produktionsreifem Code:

1. **Strapi Content-Type** (falls benoetigt)
   - schema.json mit allen Attributen
   - Hinweis auf API Permissions

2. **Shared Types** (falls benoetigt)
   - Interface-Definition
   - Export in index.ts

3. **API Client Funktion** (falls benoetigt)
   - Funktion mit TypeScript-Typen
   - Error Handling

4. **Frontend-Dateien** (falls benoetigt)
   - page.tsx mit Server Component
   - Komponenten mit Props-Interface
   - Metadata fuer SEO

5. **Checkliste** am Ende mit:
   - [ ] Strapi neu starten
   - [ ] API Permissions setzen
   - [ ] Testdaten erstellen
   - [ ] Frontend testen

## Was du NICHT tun sollst

- KEINE Pages Router Syntax (nur App Router)
- KEINE Client Components fuer Data Fetching
- KEINE englischen Bezeichnungen fuer deutschen Content
- KEINE `throw` fuer API-Errors (return StrapiError stattdessen)
- KEINE relativen Imports zwischen apps/ und packages/
- KEINE hardcodierten URLs (nutze NEXT_PUBLIC_STRAPI_URL)
```

---

## Varianten fuer spezifische Aufgaben

### Variante A: Nur Strapi Content-Type

```markdown
Erstelle einen neuen Strapi Content-Type im DEHS-Projekt.

**Content-Type:** [NAME]
**Felder:** [LISTE DER FELDER]
**Relationen:** [RELATIONEN ZU ANDEREN CONTENT-TYPES]

**Projekt-Kontext:**
- Pfad: apps/cms/src/api/{name}/content-types/{name}/schema.json
- Shared Types aktualisieren: packages/shared/src/index.ts
- Deutsche Bezeichnungen verwenden
- Enumeration-Werte mit Unterstrichen (A_PLUS statt A+)

Erstelle:
1. schema.json mit vollstaendigem Schema
2. TypeScript Interface fuer packages/shared/
3. Hinweise zu API Permissions
```

### Variante B: Nur Frontend-Seite

```markdown
Erstelle eine neue Frontend-Seite im DEHS-Projekt.

**Route:** [ROUTE-PFAD z.B. /hersteller/[slug]]
**Typ:** [Statisch / Dynamisch]
**Datenquelle:** [Welcher Content-Type]

**Projekt-Kontext:**
- Pfad: apps/web/src/app/(marketing)/
- Server Component mit async/await
- Import Typen von @shared/types
- API Client aus @/lib/strapi/client
- ISR mit revalidate: 60

Erstelle:
1. page.tsx mit Metadata und Data Fetching
2. API Client Funktion (falls nicht vorhanden)
3. Komponenten (falls noetig)
```

### Variante C: Nur Komponente

```markdown
Erstelle eine neue React-Komponente im DEHS-Projekt.

**Komponente:** [NAME]
**Verwendung:** [WO WIRD SIE VERWENDET]
**Props:** [ERWARTETE PROPS]

**Projekt-Kontext:**
- Pfad: apps/web/src/components/
- TypeScript mit Props-Interface
- Server oder Client Component (je nach Bedarf)
- Tailwind CSS fuer Styling

Erstelle:
1. Komponenten-Datei mit vollstaendigem Code
2. Props-Interface
3. Beispiel-Verwendung
```

---

## Usage Notes

- **Best used with:** Code-Architect Agent, Frontend-Engineer Agent, Backend-Engineer Agent
- **Estimated time:** 15-45 Minuten je nach Komplexitaet
- **Prerequisites:**
  - DEHS-Projekt lokal eingerichtet
  - Strapi und Next.js laufen
  - Grundverstaendnis von Turborepo, Next.js App Router, Strapi 4

---

## Checkliste nach Verwendung

- [ ] Strapi neu gestartet (Content-Type wird erkannt)
- [ ] API Permissions in Strapi Admin gesetzt
- [ ] TypeScript-Typen kompilieren fehlerfrei
- [ ] pnpm build laeuft ohne Fehler
- [ ] Testdaten in Strapi erstellt
- [ ] Frontend zeigt Daten korrekt an

---

## Related Prompts

- frontend/neue-seite-erstellen-v1.md (geplant)
- backend/strapi-content-type-v1.md (geplant)
- architecture/api-erweiterung-v1.md (geplant)

---

## Changelog

- **v1 (2026-02-01):** Initiale Version mit Quick/Detailed Varianten
