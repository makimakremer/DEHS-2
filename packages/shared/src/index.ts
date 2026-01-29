// Product Types
export interface Product {
  id: number;
  attributes: ProductAttributes;
}

export interface ProductAttributes {
  name: string;
  slug: string;
  artikelnummer: string;
  ean?: string;
  kurzbeschreibung?: string;
  beschreibung?: string;
  listenpreis: number;
  leistungKw?: number;
  energieeffizienzklasse?: EnergyClass;
  produktTyp?: ProductType;
  verfuegbar: boolean;
  neuheit: boolean;
  auslaufmodell: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  hauptbild?: StrapiMedia;
  galerie?: StrapiMedia[];
  dokumente?: StrapiMedia[];
  kategorie?: { data: Category | null };
  hersteller?: { data: Manufacturer | null };
  technischeDaten?: TechnicalSpec[];
  zubehoer?: { data: Product[] };
  ersatzteile?: { data: Product[] };
}

export type EnergyClass = "A+++" | "A++" | "A+" | "A" | "B" | "C" | "D";

export type ProductType =
  | "waermepumpe"
  | "gasheizung"
  | "oelheizung"
  | "pelletheizung"
  | "solarthermie"
  | "warmwasserspeicher"
  | "pufferspeicher"
  | "regelungstechnik"
  | "zubehoer"
  | "ersatzteile";

export interface TechnicalSpec {
  id: number;
  bezeichnung: string;
  wert: string;
  einheit?: string;
  gruppe?: string;
}

// Category Types
export interface Category {
  id: number;
  attributes: CategoryAttributes;
}

export interface CategoryAttributes {
  name: string;
  slug: string;
  beschreibung?: string;
  icon?: string;
  sortierung: number;
  aktiv: boolean;
  inNavigation: boolean;
  seoTitle?: string;
  seoDescription?: string;
  bild?: StrapiMedia;
  parent?: { data: Category | null };
  children?: { data: Category[] };
  produkte?: { data: Product[] };
}

// Manufacturer Types
export interface Manufacturer {
  id: number;
  attributes: ManufacturerAttributes;
}

export interface ManufacturerAttributes {
  name: string;
  slug: string;
  beschreibung?: string;
  website?: string;
  aktiv: boolean;
  logo?: StrapiMedia;
  produkte?: { data: Product[] };
}

// User Types
export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  firma: string;
  anrede?: "Herr" | "Frau" | "Divers";
  vorname: string;
  nachname: string;
  telefon?: string;
  ustIdNr?: string;
  kundennummer?: string;
  freigeschaltet: boolean;
  rechnungsadresse?: Address;
  lieferadressen?: Address[];
  kundengruppe?: { data: CustomerGroup | null };
}

export interface CustomerGroup {
  id: number;
  attributes: {
    name: string;
    rabattProzent: number;
    beschreibung?: string;
  };
}

// Address Type
export interface Address {
  id?: number;
  firma?: string;
  ansprechpartner?: string;
  strasse: string;
  hausnummer?: string;
  plz: string;
  ort: string;
  land: string;
  zusatz?: string;
}

// Inquiry Types
export interface Inquiry {
  id: number;
  attributes: InquiryAttributes;
}

export interface InquiryAttributes {
  firma?: string;
  ansprechpartner?: string;
  email: string;
  telefon?: string;
  betreff: string;
  nachricht: string;
  status: InquiryStatus;
  mengen?: Record<string, number>;
  createdAt: string;
  updatedAt: string;
  produkte?: { data: Product[] };
  kunde?: { data: User | null };
  interneNotizen?: string;
}

export type InquiryStatus =
  | "neu"
  | "inBearbeitung"
  | "angebotErstellt"
  | "abgeschlossen";

// Order Types
export interface Order {
  id: number;
  attributes: OrderAttributes;
}

export interface OrderAttributes {
  bestellnummer: string;
  zwischensumme: number;
  versandkosten: number;
  mwstBetrag: number;
  gesamtbetrag: number;
  status: OrderStatus;
  versanddienstleister?: string;
  trackingnummer?: string;
  kundenNotiz?: string;
  interneNotiz?: string;
  createdAt: string;
  updatedAt: string;
  lieferadresse: Address;
  rechnungsadresse: Address;
  positionen: OrderPosition[];
  kunde?: { data: User | null };
}

export type OrderStatus =
  | "eingegangen"
  | "bestaetigt"
  | "inLieferung"
  | "geliefert"
  | "storniert";

export interface OrderPosition {
  id: number;
  artikelnummer: string;
  bezeichnung: string;
  menge: number;
  einzelpreis: number;
  gesamtpreis: number;
  produkt?: { data: Product | null };
}

// Strapi Types
export interface StrapiMedia {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText?: string;
      caption?: string;
      width?: number;
      height?: number;
      formats?: {
        thumbnail?: StrapiImageFormat;
        small?: StrapiImageFormat;
        medium?: StrapiImageFormat;
        large?: StrapiImageFormat;
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl?: string;
    };
  } | null;
}

export interface StrapiImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

// API Query Types
export interface ProductFilters {
  kategorie?: string;
  hersteller?: string;
  produktTyp?: ProductType;
  minPreis?: number;
  maxPreis?: number;
  minLeistung?: number;
  maxLeistung?: number;
  verfuegbar?: boolean;
  neuheit?: boolean;
  search?: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface SortParams {
  field: string;
  order: "asc" | "desc";
}
