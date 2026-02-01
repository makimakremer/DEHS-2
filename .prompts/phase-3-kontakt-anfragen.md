# Phase 3: Kontaktformular & Anfrage-System

## Context

Arbeite an der DEHS B2B-Webseite (Next.js 14, Strapi 4, Tailwind CSS).
Lies zuerst CLAUDE.md fuer Projekt-Details.

**Voraussetzung:** Phase 1 & 2 sind abgeschlossen.

**Bereits vorhanden:**
- Toast-System fuer Benachrichtigungen
- Modal-Komponente
- `anfrage` Content-Type in Strapi (siehe shared/types)

**Geschaeftslogik:**
- Kein echter Login moeglich
- "Anmelden" zeigt Info-Modal mit Verweis auf Kontaktformular
- Kontaktformular sendet E-Mail UND speichert in Strapi
- Produkt-Anfragen verlinken auf Kontaktformular mit Produkt-Referenz

## Ziel

Implementiere das Kontakt- und Anfrage-System:
1. Pseudo-Login Modal ("Registrierung ueber Kontaktformular")
2. Vollstaendiges Kontaktformular
3. E-Mail-Versand via Resend
4. Speicherung in Strapi
5. Produkt-Anfrage Integration

**Success Criteria:**
- [ ] "Anmelden" Button oeffnet Info-Modal (kein Login-Formular)
- [ ] Modal verweist auf Kontaktformular
- [ ] Kontaktseite mit vollstaendigem Formular
- [ ] Formular validiert alle Felder client- und serverseitig
- [ ] E-Mail wird an konfigurierte Adresse gesendet
- [ ] Anfrage wird in Strapi gespeichert
- [ ] Produktdetailseite: "Anfrage senden" oeffnet Formular mit Produkt-Infos

## Requirements

### 1. Login-Info Modal

**Datei:** `components/auth/LoginInfoModal.tsx`

```typescript
interface LoginInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}
```

Inhalt:
```
Titel: "Anmeldung fuer Fachbetriebe"

Text: "Der Zugang zu unserem B2B-Portal ist ausschliesslich fuer
registrierte Fachbetriebe verfuegbar.

Um sich als Fachbetrieb zu registrieren, senden Sie uns bitte
eine Anfrage ueber unser Kontaktformular. Wir pruefen Ihre
Angaben und schalten Ihr Konto innerhalb von 24 Stunden frei."

Buttons:
- [Zum Kontaktformular] -> /kontakt?ref=registrierung
- [Abbrechen] -> schliesst Modal
```

**Update:** `app/(marketing)/layout.tsx`
- "Anmelden" Button oeffnet dieses Modal statt Link zu /anmelden

### 2. Kontaktformular

**Datei:** `app/(marketing)/kontakt/page.tsx`

URL-Parameter:
- `?ref=registrierung` - Betreff vorausgewaehlt, extra Felder
- `?produkt=SLUG` - Produkt-Referenz mitgeben

**Formular-Felder (Standard):**
```typescript
interface ContactFormData {
  firma: string;           // Required
  ansprechpartner: string; // Required
  email: string;           // Required, Email-Format
  telefon?: string;        // Optional
  betreff: 'registrierung' | 'produkt' | 'allgemein'; // Required, Dropdown
  nachricht: string;       // Required, min 20 Zeichen
}
```

**Zusaetzliche Felder bei ref=registrierung:**
```typescript
interface RegistrationFields {
  ustIdNr?: string;
  handelsregister?: string;
  strasse: string;
  plz: string;
  ort: string;
}
```

**Zusaetzliche Felder bei produkt=SLUG:**
```typescript
interface ProductInquiryFields {
  produktSlug: string;      // Hidden, aus URL
  produktName: string;      // Readonly, angezeigt
  produktArtNr: string;     // Readonly, angezeigt
  menge?: number;           // Optional
}
```

**Komponente:** `components/forms/ContactForm.tsx`

Features:
- Client-side Validation (Zod oder native)
- Server Action fuer Submit
- Loading State waehrend Submit
- Success: Toast + Formular zuruecksetzen
- Error: Toast mit Fehlermeldung
- Honeypot-Feld gegen Spam

### 3. Server Action

**Datei:** `app/(marketing)/kontakt/actions.ts`

```typescript
'use server'

export async function submitContactForm(formData: FormData): Promise<{
  success: boolean;
  message: string;
}> {
  // 1. Honeypot pruefen
  // 2. Daten validieren (Zod)
  // 3. In Strapi speichern
  // 4. E-Mail senden
  // 5. Response zurueckgeben
}
```

### 4. E-Mail mit Resend

**Datei:** `lib/email/send.ts`

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  await resend.emails.send({
    from: process.env.CONTACT_EMAIL_FROM!,
    to: process.env.CONTACT_EMAIL_TO!,
    subject: `Neue Anfrage: ${data.betreff}`,
    html: generateEmailHtml(data),
  });
}
```

**E-Mail Template:**
- Schlicht, professionell
- Alle Formulardaten aufgelistet
- Bei Produkt-Anfrage: Produkt-Details inkludieren
- Reply-To: Absender-Email

### 5. Strapi Speicherung

**Datei:** `lib/strapi/client.ts` (erweitern)

```typescript
export async function createInquiry(data: {
  firma?: string;
  ansprechpartner?: string;
  email: string;
  telefon?: string;
  betreff: string;
  nachricht: string;
  produkte?: number[]; // Produkt-IDs
  // ... weitere Felder
}): Promise<StrapiResponse<Inquiry> | StrapiError> {
  return fetchAPI('/anfragen', {
    method: 'POST',
    body: JSON.stringify({ data }),
  });
}
```

**Strapi Permissions:**
- Public Role: `create` fuer `anfrage` erlauben
- Oder: API Token mit Write-Rechten verwenden

### 6. Produkt-Anfrage Button

**Update:** `app/(marketing)/produkte/[kategorie]/[slug]/page.tsx`

- "Anfrage senden" Button wird Link zu `/kontakt?produkt=SLUG`
- Kontaktformular laedt Produkt-Infos basierend auf Slug
- Zeigt Produkt-Vorschau im Formular

### 7. Environment Variables

**apps/web/.env.local:**
```env
# Resend
RESEND_API_KEY=re_xxxxx
CONTACT_EMAIL_TO=anfragen@dehs.de
CONTACT_EMAIL_FROM=DEHS Anfragen <noreply@dehs.de>

# Strapi (fuer Write-Zugriff)
STRAPI_API_TOKEN=your-api-token-with-write-access
```

## Implementation

1. Erstelle `components/auth/LoginInfoModal.tsx`
2. Update Layout mit Modal-State und LoginInfoModal
3. Erstelle `lib/email/send.ts` (Resend Setup)
4. Erstelle `components/forms/ContactForm.tsx`
5. Erstelle `app/(marketing)/kontakt/page.tsx`
6. Erstelle `app/(marketing)/kontakt/actions.ts`
7. Erweitere `lib/strapi/client.ts` mit `createInquiry`
8. Update Produktdetailseite mit Anfrage-Link

## Constraints

- E-Mail nur mit Resend (keine anderen Provider)
- Strapi Public API fuer Anfragen erlauben ODER API Token
- Validation sowohl Client als auch Server
- Deutsche Fehlermeldungen
- DSGVO: Hinweis auf Datenschutz im Formular

## Was NICHT tun

- Keinen echten Login implementieren
- Keine User-Registrierung in Strapi
- Keine Datei-Uploads im Formular
- Keine Newsletter-Integration (spaeter)
- Keine Captcha (Honeypot reicht erstmal)
