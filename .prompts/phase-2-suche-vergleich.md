# Phase 2: Produktsuche & Produktvergleich

## Context

Arbeite an der DEHS B2B-Webseite (Next.js 14, Strapi 4, Tailwind CSS).
Lies zuerst CLAUDE.md fuer Projekt-Details.

**Voraussetzung:** Phase 1 (UI Foundation) ist abgeschlossen.

**Bereits vorhanden:**
- Strapi Client mit `getProducts()` Funktion (unterstuetzt `search` Filter)
- ProductCard und ProductGrid Komponenten
- Toast-System aus Phase 1
- Modal-Komponente aus Phase 1

## Ziel

Implementiere Produktsuche und Produktvergleich:
1. Such-Input im Header mit Live-Dropdown
2. Vergleichs-Funktion mit Sticky-Bar
3. Vergleichsseite mit Produkt-Tabelle

**Success Criteria:**
- [ ] Suchfeld im Header (Desktop: expandierbar, Mobile: volle Breite)
- [ ] Debounced Suche (300ms) mit Dropdown-Ergebnissen
- [ ] "Zum Vergleich" Button auf jeder ProductCard
- [ ] Vergleichsleiste am unteren Rand (zeigt 1-4 Produkte)
- [ ] Vergleichsseite unter `/produkte/vergleich`
- [ ] LocalStorage Persistenz fuer Vergleich

## Requirements

### 1. Produktsuche

**Datei:** `components/navigation/SearchInput.tsx`

```typescript
interface SearchInputProps {
  className?: string;
  variant?: 'header' | 'mobile' | 'page';
}
```

Features:
- Debounce: 300ms nach Tippen
- API Call: `getProducts({ search: query }, { pageSize: 5 })`
- Dropdown mit max. 5 Produkten
- Produkt-Item zeigt: Bild (mini), Name, Artikelnummer
- "Alle X Ergebnisse anzeigen" Link
- Leerer Zustand: "Suchbegriff eingeben..."
- Keine Ergebnisse: "Keine Produkte gefunden"
- Loading State mit Skeleton
- Klick ausserhalb schliesst Dropdown
- Enter-Taste: Navigiert zu `/produkte?search=...`

**Such-Ergebnisseite:** `/produkte?search=...`
- Bereits vorhanden, `searchParams.search` hinzufuegen zum API-Call

### 2. Produktvergleich Context

**Datei:** `contexts/CompareContext.tsx`

```typescript
interface CompareContextValue {
  compareItems: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: number) => void;
  clearCompare: () => void;
  isInCompare: (productId: number) => boolean;
  canAddMore: boolean; // Max 4
}
```

- LocalStorage Key: `dehs-compare`
- Max 4 Produkte
- Toast bei Hinzufuegen/Entfernen
- Toast-Warnung wenn Max erreicht

### 3. Compare Button

**Datei:** `components/products/CompareButton.tsx`

```typescript
interface CompareButtonProps {
  product: Product;
  variant?: 'icon' | 'full'; // icon = nur Icon, full = mit Text
}
```

- Checkbox-Style oder Toggle-Button
- Visueller Zustand: aktiv/inaktiv
- Nutzt `useCompare()` Hook

**Update:** `components/products/ProductCard.tsx`
- CompareButton in der Card integrieren (oben rechts oder im Footer)

### 4. Compare Bar (Sticky Footer)

**Datei:** `components/products/CompareBar.tsx`

- Nur sichtbar wenn >= 1 Produkt im Vergleich
- Sticky am unteren Rand
- Zeigt Mini-Thumbnails der Produkte
- X-Button zum Entfernen einzelner Produkte
- "Vergleichen" Button -> `/produkte/vergleich`
- "Alle entfernen" Link
- Slide-Up Animation beim Erscheinen

### 5. Vergleichsseite

**Datei:** `app/(marketing)/produkte/vergleich/page.tsx`

Layout:
```
| Merkmal        | Produkt 1    | Produkt 2    | Produkt 3    |
|----------------|--------------|--------------|--------------|
| Bild           | [img]        | [img]        | [img]        |
| Name           | Vitocal 300  | Logatherm    | CHA-Monoblock|
| Artikelnummer  | VIT-300-A    | LOG-250-B    | CHA-200-C    |
| Hersteller     | Viessmann    | Buderus      | Wolf         |
| Preis          | 12.500 EUR   | 11.800 EUR   | 13.200 EUR   |
| Leistung       | 12 kW        | 10 kW        | 14 kW        |
| Effizienz      | A+++         | A++          | A+++         |
| Technische...  | ...          | ...          | ...          |
```

Features:
- Responsive (horizontal scrollbar auf Mobile)
- Unterschiede hervorheben (optional: beste Werte gruen)
- "Anfrage fuer alle" Button oben
- Einzelne Produkte entfernbar (X in Header-Zeile)
- Link zurueck zur Produktliste
- Leerer Zustand wenn keine Produkte im Vergleich

**Technische Daten Gruppierung:**
- Gemeinsame Specs aller Produkte ermitteln
- Als Zeilen darstellen
- Fehlende Werte: "-"

## Implementation

1. Erstelle `contexts/CompareContext.tsx` mit Provider
2. Wickle App in CompareProvider (`app/layout.tsx` oder `providers.tsx`)
3. Erstelle `components/products/CompareButton.tsx`
4. Update `ProductCard.tsx` mit CompareButton
5. Erstelle `components/products/CompareBar.tsx`
6. Fuege CompareBar zum Layout hinzu
7. Erstelle `components/navigation/SearchInput.tsx`
8. Integriere SearchInput in Header (layout.tsx)
9. Erstelle `/produkte/vergleich/page.tsx`
10. Update `/produkte/page.tsx` fuer search Parameter

## Constraints

- Suche nur ueber Strapi API (kein Client-Filter)
- LocalStorage fuer Vergleich (keine DB)
- Max 4 Produkte im Vergleich
- Keine externen Libraries (ausser evtl. lodash.debounce)

## Was NICHT tun

- Keine Filter-Verbesserungen (kommt spaeter)
- Keine Sortierung implementieren
- Keine Authentifizierung
- Keine neuen Strapi Content-Types
