# DEHS - Heizungsanlagen Großhandel Webseite

Moderne B2B-Webseite für Heizungsanlagen-Großhandel mit Next.js 14 und Strapi 4 CMS.

## Projekt-Übersicht

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend/CMS:** Strapi 4 Headless CMS
- **Datenbank:** SQLite (Entwicklung) / PostgreSQL (Produktion)
- **Monorepo:** Turborepo + pnpm

## Projektstruktur

```
DEHS/
├── apps/
│   ├── web/                    # Next.js Frontend
│   │   ├── src/
│   │   │   ├── app/            # App Router Seiten
│   │   │   │   └── (marketing)/
│   │   │   │       ├── page.tsx              # Startseite
│   │   │   │       └── produkte/
│   │   │   │           ├── page.tsx          # Produktübersicht
│   │   │   │           └── [kategorie]/
│   │   │   │               ├── page.tsx      # Kategorie-Seite
│   │   │   │               └── [slug]/
│   │   │   │                   └── page.tsx  # Produktdetail
│   │   │   ├── components/
│   │   │   │   └── products/
│   │   │   │       ├── ProductCard.tsx
│   │   │   │       └── ProductGrid.tsx
│   │   │   └── lib/
│   │   │       └── strapi/
│   │   │           └── client.ts    # Strapi API Client
│   │   └── package.json
│   │
│   └── cms/                    # Strapi CMS
│       ├── config/             # Strapi Konfiguration
│       ├── src/
│       │   ├── api/
│       │   │   ├── product/           # Produkt Content-Type
│       │   │   ├── kategorie/         # Kategorie Content-Type
│       │   │   ├── hersteller/        # Hersteller Content-Type
│       │   │   ├── anfrage/           # Anfrage Content-Type
│       │   │   └── kundengruppe/      # Kundengruppe Content-Type
│       │   └── components/
│       │       ├── produkt/           # Technische Daten
│       │       └── adresse/           # Adress-Component
│       └── package.json
│
└── packages/
    └── shared/                 # Gemeinsame TypeScript-Typen
        └── src/index.ts
```

## Quick Start

### 1. Installation

```bash
# Abhängigkeiten installieren
pnpm install
```

### 2. Server starten

**Terminal 1 - Strapi CMS:**
```bash
pnpm dev:cms
```
Strapi läuft auf: http://localhost:1337/admin

**Terminal 2 - Next.js Frontend:**
```bash
pnpm dev:web
```
Frontend läuft auf: http://localhost:3000

### 3. Strapi Admin einrichten

1. Öffne http://localhost:1337/admin
2. Erstelle deinen Admin-Account
3. Du siehst folgende Content-Types:
   - **Produkt** - Heizungsprodukte
   - **Kategorie** - Produktkategorien (hierarchisch)
   - **Hersteller** - Produkthersteller
   - **Anfrage** - Kundenanfragen
   - **Kundengruppe** - Für Preisgruppen

## Testdaten anlegen

### 1. Kategorien erstellen

Gehe zu **Content Manager → Kategorie** und erstelle:

**Wärmepumpen:**
- Name: `Wärmepumpen`
- Icon: `🌡️`
- Sortierung: `10`
- Aktiv: ✅
- In Navigation: ✅

**Gasheizungen:**
- Name: `Gasheizungen`
- Icon: `🔥`
- Sortierung: `20`
- Aktiv: ✅
- In Navigation: ✅

**Solarthermie:**
- Name: `Solarthermie`
- Icon: `☀️`
- Sortierung: `30`
- Aktiv: ✅
- In Navigation: ✅

### 2. Hersteller erstellen

Gehe zu **Content Manager → Hersteller**:

**Viessmann:**
- Name: `Viessmann`
- Website: `https://www.viessmann.de`
- Aktiv: ✅

**Vaillant:**
- Name: `Vaillant`
- Website: `https://www.vaillant.de`
- Aktiv: ✅

### 3. Produkte erstellen

Gehe zu **Content Manager → Produkt**:

**Beispiel Wärmepumpe:**
- Name: `Vitocal 200-S Luft-Wasser-Wärmepumpe`
- Artikelnummer: `VIT-200S-12`
- Kurzbeschreibung: `Hocheffiziente Luft-Wasser-Wärmepumpe für Einfamilienhäuser`
- Listenpreis: `12500`
- Leistung kW: `12`
- Energieeffizienzklasse: `A_PLUS_PLUS_PLUS`
- Produkttyp: `waermepumpe`
- Verfügbar: ✅
- Neuheit: ✅
- Kategorie: Wärmepumpen
- Hersteller: Viessmann

Vergiss nicht: **Save** und **Publish** klicken!

### 4. API-Berechtigungen setzen

1. Gehe zu **Settings → Users & Permissions Plugin → Roles → Public**
2. Aktiviere folgende Berechtigungen:

**Product:**
- ✅ find
- ✅ findOne

**Kategorie:**
- ✅ find
- ✅ findOne

**Hersteller:**
- ✅ find
- ✅ findOne

3. **Save** klicken

## Features

### Aktuell implementiert

✅ Responsive Design mit Tailwind CSS
✅ Produktkatalog mit Filterung
✅ Kategoriebasierte Navigation
✅ Produktdetailseiten
✅ Hersteller-Filter
✅ Pagination
✅ SEO-optimiert (Metadata, Structured Data)
✅ Bildoptimierung mit Next.js Image
✅ Server-Side Rendering (SSR)

### Geplant (nächste Schritte)

- Suchfunktion mit Autocomplete
- Erweiterte Filter (Preis, Leistung)
- Authentifizierung (NextAuth.js)
- Kundenbereich mit individuellen Preisen
- Merkliste
- Produktanfragen
- Kontaktformular
- Multi-Language Support

## Entwicklung

### Befehle

```bash
# Alle Apps im Dev-Modus
pnpm dev

# Nur Frontend
pnpm dev:web

# Nur CMS
pnpm dev:cms

# Build
pnpm build

# Linting
pnpm lint
```

### Umgebungsvariablen

**apps/web/.env.local:**
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-change-in-production
```

**apps/cms/.env:**
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=toBeModified1,toBeModified2
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

## Deployment

### Strapi

1. Wechsle zu PostgreSQL in Produktion
2. Setze sichere `APP_KEYS` und `JWT_SECRET`
3. Deploy zu Railway, Render oder Heroku
4. Uploads zu S3 oder Cloudinary konfigurieren

### Next.js

1. Deploy zu Vercel (empfohlen)
2. Setze Umgebungsvariablen
3. Domain konfigurieren

## Support

Bei Fragen oder Problemen:
- Strapi Docs: https://docs.strapi.io
- Next.js Docs: https://nextjs.org/docs

## Lizenz

Proprietary - DEHS GmbH
