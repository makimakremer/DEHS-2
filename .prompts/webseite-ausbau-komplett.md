# DEHS B2B-Webseite - Verbesserung und Ausbau

## Context

**Projekt:** B2B-Webseite fuer Heizungsanlagen-Grosshandel (DEHS - Deutsche Heizungssysteme)
**Tech Stack:**
- Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS
- Backend: Strapi 4 Headless CMS (SQLite dev, PostgreSQL prod)
- Monorepo: Turborepo mit pnpm
- Shared Types: @shared/types Package

**Aktueller Stand:**
- Basis-Produktkatalog funktioniert (Kategorien, Produkte, Produktdetails)
- Strapi API-Client vorhanden (`lib/strapi/client.ts`)
- Marketing-Layout mit Header/Footer existiert
- Produktfilter nach Kategorie/Hersteller implementiert
- Keine Authentifizierung, kein Warenkorb

**Zielgruppe:**
- Primaer: B2B-Fachbetriebe (Heizungsinstallateure, SHK-Betriebe)
- Sekundaer: B2C-Besucher die Marken/Produkte ansehen (keine Preise/Bestellung)

**Geschaeftslogik:**
- Kein echter Login/Registrierung - "Anmelden" fuehrt zu Fehlermeldung
- Registrierung erfolgt manuell ueber Kontaktformular
- Viele Platzhalter-Produkte werden eingepflegt
- Preisanzeige fuer alle (Listenpreise), Grosshandelspreise nur nach Kontakt

## Ziel

Vollstaendiger Ausbau der Webseite zu einer professionellen B2B-Praesentationsplattform mit:
1. Modernem, responsivem Design
2. Funktionierender Mobile-Navigation
3. Produktsuche und Produktvergleich
4. Pseudo-Registrierung (Verweis auf Kontaktformular)
5. Anfrage-System fuer Produkte
6. Vollstaendigem SEO-Setup
7. Content-Seiten (dynamisch aus Strapi)

**Success Criteria:**
- [ ] Mobile Navigation funktioniert vollstaendig
- [ ] Produktsuche findet Produkte nach Name, Artikelnummer, Beschreibung
- [ ] Produktvergleich ermoeglicht Gegenueberstellung von 2-4 Produkten
- [ ] "Anmelden" zeigt Hinweis mit Link zum Kontaktformular
- [ ] Kontaktformular sendet E-Mail UND speichert in Strapi
- [ ] Sitemap.xml und robots.txt sind generiert
- [ ] Strukturierte Daten (JSON-LD) fuer Produkte vorhanden
- [ ] Lighthouse SEO Score > 90
- [ ] Skeleton Loader bei allen Daten-Fetches

## Requirements

### Must-Have

#### 1. Mobile Navigation
- Hamburger-Menu funktioniert (aktuell nur Button ohne Funktion)
- Slide-in Menu von rechts mit Animation
- Kategorien aufklappbar (Accordion)
- Schliessen bei Klick ausserhalb oder auf Link

#### 2. Produktsuche
- Suchfeld im Header (Desktop: expandierbar, Mobile: volle Breite)
- Suche ueber Strapi API mit `$containsi` auf name, artikelnummer, kurzbeschreibung
- Debounced Input (300ms)
- Such-Ergebnisse als Dropdown mit max. 5 Vorschlaegen
- "Alle Ergebnisse anzeigen" Link zu `/produkte?search=...`
- Leerer Zustand und "Keine Ergebnisse" Handling

#### 3. Produktvergleich
- "Zum Vergleich hinzufuegen" Checkbox/Button auf ProductCard
- Vergleichsleiste am unteren Bildschirmrand (sticky)
- Max. 4 Produkte gleichzeitig
- LocalStorage Persistenz
- Vergleichsseite `/produkte/vergleich` mit Tabelle:
  - Produktbilder nebeneinander
  - Alle technischen Daten als Zeilen
  - Unterschiede hervorheben
  - "Anfrage fuer alle" Button

#### 4. Pseudo-Authentifizierung
- "Anmelden" Button oeffnet Modal
- Modal zeigt: "Registrierung nur fuer Fachbetriebe"
- Erklaerungstext: "Bitte registrieren Sie sich ueber unser Kontaktformular..."
- Button "Zum Kontaktformular" -> `/kontakt?ref=registrierung`
- Kein echtes Login-Formular

#### 5. Kontaktformular & Anfragen
- `/kontakt` Seite mit Formular
- Felder: Firma, Ansprechpartner, E-Mail, Telefon, Betreff (Dropdown), Nachricht
- Betreff-Optionen: "Registrierungsanfrage", "Produktanfrage", "Allgemeine Anfrage"
- Bei `?ref=registrierung`: Betreff vorausgewaehlt, zusaetzliche Felder (USt-IdNr, Handelsregisternummer)
- Server Action: Speichert in Strapi (anfrage Content-Type) UND sendet E-Mail
- E-Mail via Resend oder Nodemailer (konfigurierbar via ENV)

#### 6. Produkt-Anfrage
- "Anfrage senden" Button auf Produktdetailseite
- Oeffnet Kontaktformular mit Produkt-Referenz
- Produkt-Info (Name, Artikelnummer) automatisch im Formular
- Optional: Mengenfeld

#### 7. SEO-Optimierung
- `generateMetadata` fuer alle Seiten mit dynamischen Daten
- `sitemap.ts` generiert Sitemap mit allen:
  - Statischen Seiten
  - Kategorie-Seiten
  - Produkt-Seiten
- `robots.ts` mit korrekten Regeln
- JSON-LD strukturierte Daten:
  - Organization auf Startseite
  - BreadcrumbList auf allen Seiten
  - Product auf Produktdetailseiten
- Canonical URLs
- Open Graph und Twitter Cards

#### 8. UI/UX Verbesserungen
- Skeleton Loader Komponente (wiederverwendbar)
- Loading States fuer:
  - Produktliste
  - Produktdetails
  - Kategorien im Header
- Smooth Scroll Verhalten
- Micro-Animations (hover states, transitions)
- Toast-Benachrichtigungen (Formular gesendet, zum Vergleich hinzugefuegt)

### Nice-to-Have

1. **Dark Mode Toggle** - Fuer spaeter vorbereiten (CSS Variables)
2. **Produkt-PDF generieren** - Datenblatt als PDF Download
3. **Zurueck-nach-oben Button** - Bei langem Scrollen
4. **Cookie-Banner** - DSGVO-konform mit Consent Management
5. **Newsletter-Anmeldung** - Im Footer, speichert in Strapi

### Constraints

- **Keine echte Authentifizierung**: Kein NextAuth, kein JWT, keine Sessions
- **Strapi bleibt Headless**: Keine Strapi-Plugins fuer E-Mail (wird im Frontend gehandhabt)
- **Deutsche Sprache**: Alle UI-Texte, Fehlermeldungen, Meta-Descriptions auf Deutsch
- **Barrierefreiheit**: Grundlegende a11y (ARIA Labels, Keyboard Navigation, Focus States)
- **Performance**: Lighthouse Performance Score > 80

## Was NICHT gemacht werden soll

- **Kein echtes User-Management** - Keine User-Tabelle, keine Passwort-Logik
- **Kein Checkout/Bezahlung** - Nur Anfragen, keine Bestellungen
- **Keine externe Such-Engine** - Strapi-Suche reicht aus
- **Kein SSG fuer Produkte** - ISR mit revalidate: 60 beibehalten (Produkte aendern sich)
- **Keine Tests schreiben** - Fokus auf Features (Tests kommen spaeter)
- **Kein Refactoring bestehender Komponenten** - Ausser wenn direkt benoetigt

## Technische Spezifikationen

### Neue Strapi Content-Types

**anfrage** (bereits im Schema vorhanden):
```
- firma: string
- ansprechpartner: string
- email: string (required)
- telefon: string
- betreff: enum [registrierung, produkt, allgemein]
- nachricht: text (required)
- status: enum [neu, inBearbeitung, erledigt]
- produkte: relation (manyToMany -> product)
- ustIdNr: string (optional, fuer Registrierung)
- handelsregister: string (optional)
```

**seite** (fuer dynamische Content-Seiten):
```
- title: string
- slug: string (UID)
- inhalt: richtext
- seoTitle: string
- seoDescription: text
- bild: media
```

### Neue Frontend-Komponenten

```
components/
  ui/
    Skeleton.tsx
    Toast.tsx
    Modal.tsx
    SearchInput.tsx
  navigation/
    MobileMenu.tsx
    SearchDropdown.tsx
  products/
    CompareBar.tsx
    CompareButton.tsx
    ProductCompareTable.tsx
  forms/
    ContactForm.tsx
    InquiryModal.tsx
```

### Neue Routen

```
app/
  (marketing)/
    kontakt/
      page.tsx
    produkte/
      vergleich/
        page.tsx
    [slug]/              # Dynamische Seiten (ueber-uns, faq, etc.)
      page.tsx
  api/
    contact/
      route.ts           # POST: E-Mail senden
  sitemap.ts
  robots.ts
```

### Environment Variables (neu)

```env
# E-Mail (Resend)
RESEND_API_KEY=re_xxxxx
CONTACT_EMAIL_TO=anfragen@dehs.de
CONTACT_EMAIL_FROM=noreply@dehs.de

# Oder Nodemailer
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user
SMTP_PASS=pass
```

## Implementation Approach

### Phase 1: UI Foundation
1. Skeleton Komponente erstellen
2. Toast/Notification System
3. Modal Komponente
4. Mobile Navigation implementieren

### Phase 2: Suche & Vergleich
1. SearchInput mit Debounce
2. Such-API erweitern (bereits vorhanden, nur UI)
3. Vergleichs-Context/Store (LocalStorage)
4. CompareBar und CompareButton
5. Vergleichsseite

### Phase 3: Kontakt & Anfragen
1. Strapi Content-Type pruefen/erweitern
2. ContactForm Komponente
3. Server Action fuer Formular
4. E-Mail Integration (Resend)
5. Produkt-Anfrage Flow

### Phase 4: SEO & Polish
1. Sitemap generieren
2. JSON-LD Komponenten
3. Meta-Tags vervollstaendigen
4. Performance Optimierung
5. Finale UI Polishes

## Testing & Validation

### Manuelles Testing

- [ ] Mobile Menu oeffnet/schliesst korrekt
- [ ] Suche findet Produkte und zeigt Dropdown
- [ ] Vergleich: Hinzufuegen, Entfernen, Leiste erscheint
- [ ] Vergleichsseite zeigt alle Daten korrekt
- [ ] Kontaktformular validiert und sendet
- [ ] E-Mail kommt an
- [ ] Strapi-Eintrag wird erstellt
- [ ] Sitemap unter /sitemap.xml erreichbar
- [ ] Lighthouse SEO > 90

### Browser Testing

- Chrome (Desktop + Mobile)
- Safari (Desktop + iOS)
- Firefox

## Resources & References

- [Next.js 14 App Router Docs](https://nextjs.org/docs/app)
- [Strapi 4 REST API](https://docs.strapi.io/dev-docs/api/rest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Resend Email API](https://resend.com/docs)
- [JSON-LD Schema.org](https://schema.org/Product)
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

## Notes

- Strapi Admin: http://localhost:1337/admin
- Frontend Dev: http://localhost:3000
- Kategorien-Endpoint: `/api/kategoriens` (nicht `/api/categories` wegen Strapi-Plural-Bug)
- Hersteller-Endpoint: `/api/herstellers` (gleiches Problem)
- Energieeffizienzklassen: `A_PLUS_PLUS_PLUS` statt `A+++` (Strapi Enum-Normalisierung)

---

## Usage Tips

1. **Beginne mit Phase 1** - Die UI-Komponenten werden in allen anderen Phasen gebraucht
2. **Teste Mobile zuerst** - Mobile-First Development
3. **E-Mail lokal testen** - Resend hat einen Test-Modus, oder nutze Mailtrap
4. **Sitemap nach Content** - Erst wenn alle Seiten existieren, Sitemap finalisieren
5. **Lighthouse regelmaessig pruefen** - Nach jedem groesseren Feature

---

## Iteration

Falls der Prompt nicht alle Anforderungen abdeckt oder sich Requirements aendern:
- Fehlende Details ergaenzen
- Constraints anpassen
- Neue Features hinzufuegen
- Phasen neu priorisieren

Dieser Prompt kann als Grundlage fuer einzelne Feature-Prompts aufgeteilt werden.
