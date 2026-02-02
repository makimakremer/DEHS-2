# Phase 4: SEO-Optimierung & Finalisierung

## Context

Arbeite an der DEHS B2B-Webseite (Next.js 14, Strapi 4, Tailwind CSS).
Lies zuerst CLAUDE.md fuer Projekt-Details.

**Voraussetzung:** Phase 1, 2 & 3 sind abgeschlossen.

**Bereits vorhanden:**
- Alle Basis-Seiten (Home, Produkte, Produktdetails, Kontakt, Vergleich)
- `generateMetadata` auf Produktdetailseite
- Keine Sitemap, keine strukturierten Daten

## Ziel

Vollstaendige SEO-Optimierung und Finalisierung:
1. Sitemap und robots.txt
2. Strukturierte Daten (JSON-LD)
3. Meta-Tags vervollstaendigen
4. Open Graph / Twitter Cards
5. Performance-Optimierungen
6. Finale UI-Polishes

**Success Criteria:**
- [ ] /sitemap.xml listet alle Seiten und Produkte
- [ ] /robots.txt mit korrekten Regeln
- [ ] JSON-LD auf allen relevanten Seiten
- [ ] Lighthouse SEO Score > 90
- [ ] Lighthouse Performance Score > 80
- [ ] Alle Bilder mit alt-Text
- [ ] Canonical URLs gesetzt

## Requirements

### 1. Sitemap

**Datei:** `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dehs.de';

  // Statische Seiten
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/produkte`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/kontakt`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Kategorien aus Strapi
  const categories = await getCategories();
  const categoryPages = categories.map(cat => ({
    url: `${baseUrl}/produkte/${cat.attributes.slug}`,
    lastModified: new Date(cat.attributes.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Produkte aus Strapi
  const products = await getAllProductSlugs(); // Neue Funktion
  const productPages = products.map(product => ({
    url: `${baseUrl}/produkte/${product.kategorie}/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
```

**Neue API Funktion:** `lib/strapi/client.ts`
```typescript
export async function getAllProductSlugs(): Promise<{
  slug: string;
  kategorie: string;
  updatedAt: string;
}[]>
```

### 2. Robots.txt

**Datei:** `app/robots.ts`

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dehs.de';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

### 3. Strukturierte Daten (JSON-LD)

**Komponente:** `components/seo/JsonLd.tsx`

```typescript
interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

**Presets:**

```typescript
// components/seo/OrganizationJsonLd.tsx
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DEHS GmbH",
    "url": "https://dehs.de",
    "logo": "https://dehs.de/logo.png",
    "description": "Grosshandel fuer Heizungsanlagen",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Musterstrasse 1",
      "addressLocality": "Musterstadt",
      "postalCode": "12345",
      "addressCountry": "DE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+49-xxx-xxxxxx",
      "contactType": "sales"
    }
  };
  return <JsonLd data={data} />;
}

// components/seo/ProductJsonLd.tsx
export function ProductJsonLd({ product }: { product: Product }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.attributes.name,
    "description": product.attributes.kurzbeschreibung,
    "sku": product.attributes.artikelnummer,
    "image": getStrapiImageUrl(product.attributes.hauptbild?.data?.attributes?.url),
    "brand": {
      "@type": "Brand",
      "name": product.attributes.hersteller?.data?.attributes.name
    },
    "offers": {
      "@type": "Offer",
      "price": product.attributes.listenpreis,
      "priceCurrency": "EUR",
      "availability": product.attributes.verfuegbar
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock"
    }
  };
  return <JsonLd data={data} />;
}

// components/seo/BreadcrumbJsonLd.tsx
export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
  return <JsonLd data={data} />;
}
```

### 4. Meta-Tags (generateMetadata)

**Update alle Seiten:**

```typescript
// app/(marketing)/page.tsx (Startseite)
export const metadata: Metadata = {
  title: 'DEHS | Grosshandel fuer Heizungsanlagen',
  description: 'Ihr B2B-Partner fuer Waermepumpen, Gasheizungen, Solarthermie und mehr. Qualitaetsprodukte von fuehrenden Herstellern fuer Fachbetriebe.',
  openGraph: {
    title: 'DEHS | Grosshandel fuer Heizungsanlagen',
    description: 'Ihr B2B-Partner fuer Heizungstechnik',
    type: 'website',
    locale: 'de_DE',
    url: 'https://dehs.de',
    siteName: 'DEHS',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DEHS | Grosshandel fuer Heizungsanlagen',
    description: 'Ihr B2B-Partner fuer Heizungstechnik',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://dehs.de',
  },
};
```

**Dynamische Metadata (Produkte):** Bereits vorhanden, erweitern mit OG/Twitter

### 5. Performance-Optimierungen

**Bilder:**
- Alle `<Image>` mit `sizes` Attribut
- `priority` nur fuer above-the-fold Bilder
- Placeholder blur (optional)

**Fonts:**
- next/font/google fuer Google Fonts (falls verwendet)
- Font-Display: swap

**Komponenten:**
- `loading.tsx` fuer Suspense Boundaries
- Prefetch fuer wichtige Links

### 6. Layout Metadata

**app/layout.tsx:**

```typescript
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dehs.de'),
  title: {
    default: 'DEHS | Grosshandel fuer Heizungsanlagen',
    template: '%s | DEHS',
  },
  description: 'B2B-Grosshandel fuer Heizungstechnik',
  keywords: ['Heizung', 'Waermepumpe', 'Grosshandel', 'B2B', 'SHK'],
  authors: [{ name: 'DEHS GmbH' }],
  creator: 'DEHS GmbH',
  publisher: 'DEHS GmbH',
  formatDetection: {
    email: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e40af', // Primary Color
};
```

## Implementation

1. Erstelle `app/sitemap.ts`
2. Erstelle `app/robots.ts`
3. Erstelle `components/seo/JsonLd.tsx` und Presets
4. Update `app/layout.tsx` mit vollstaendiger Metadata
5. Update Startseite mit OrganizationJsonLd
6. Update Produktdetailseite mit ProductJsonLd und BreadcrumbJsonLd
7. Update alle Seiten mit generateMetadata
8. Erweitere `lib/strapi/client.ts` mit `getAllProductSlugs()`
9. Lighthouse Audit und Fixes

## Environment Variables (neu)

```env
NEXT_PUBLIC_SITE_URL=https://dehs.de
```

## Constraints

- Keine externen SEO-Tools (kein next-seo Package)
- Nur native Next.js Metadata API
- JSON-LD manuell (kein Schema-Generator)
- Deutsche Texte fuer alle Meta-Descriptions

## Was NICHT tun

- Keine Google Analytics Integration (spaeter, mit Cookie-Consent)
- Keine Social Media Links/Widgets
- Keine Third-Party Scripts
- Keine Blog/News-Sektion
