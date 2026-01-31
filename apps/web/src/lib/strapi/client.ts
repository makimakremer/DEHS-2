import type {
  Product,
  Category,
  Manufacturer,
  StrapiResponse,
  StrapiError,
  ProductFilters,
  PaginationParams,
  SortParams,
} from "@shared/types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_API_TOKEN;

interface FetchOptions extends RequestInit {
  params?: Record<string, any>;
}

async function fetchAPI<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T | StrapiError> {
  const { params, ...fetchOptions } = options;

  // Build query string
  const queryString = params
    ? "?" + new URLSearchParams(buildQueryString(params)).toString()
    : "";

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers || {}),
  };

  if (API_TOKEN) {
    headers.Authorization = `Bearer ${API_TOKEN}`;
  }

  try {
    const res = await fetch(`${STRAPI_URL}/api${path}${queryString}`, {
      ...fetchOptions,
      headers,
      next: {
        revalidate: fetchOptions.next?.revalidate ?? 60, // Default: 60 Sekunden Cache
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: {
          status: res.status,
          name: "API Error",
          message: data?.error?.message || "An error occurred",
          details: data?.error?.details,
        },
      } as StrapiError;
    }

    return data as T;
  } catch (error) {
    console.error("Strapi API Error:", error);
    return {
      data: null,
      error: {
        status: 500,
        name: "Network Error",
        message: error instanceof Error ? error.message : "Network error occurred",
      },
    } as StrapiError;
  }
}

// Helper zum Bauen von Query Strings für Strapi
function buildQueryString(params: Record<string, any>): Record<string, string> {
  const query: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === "object" && !Array.isArray(value)) {
        // Nested objects (z.B. populate, filters)
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          query[`${key}[${nestedKey}]`] = String(nestedValue);
        });
      } else if (Array.isArray(value)) {
        // Arrays
        value.forEach((item, index) => {
          query[`${key}[${index}]`] = String(item);
        });
      } else {
        query[key] = String(value);
      }
    }
  });

  return query;
}

// Produkte abrufen
export async function getProducts(
  filters?: ProductFilters,
  pagination?: PaginationParams,
  sort?: SortParams
): Promise<StrapiResponse<Product[]> | StrapiError> {
  const params: Record<string, any> = {
    populate: {
      hauptbild: true,
      kategorie: true,
      hersteller: true,
    },
    pagination: {
      page: pagination?.page || 1,
      pageSize: pagination?.pageSize || 25,
    },
  };

  // Filters hinzufügen
  if (filters) {
    const strapiFilters: Record<string, any> = {};

    if (filters.kategorie) {
      strapiFilters["kategorie[slug][$eq]"] = filters.kategorie;
    }

    if (filters.hersteller) {
      strapiFilters["hersteller[slug][$eq]"] = filters.hersteller;
    }

    if (filters.produktTyp) {
      strapiFilters["produktTyp[$eq]"] = filters.produktTyp;
    }

    if (filters.verfuegbar !== undefined) {
      strapiFilters["verfuegbar[$eq]"] = filters.verfuegbar;
    }

    if (filters.neuheit !== undefined) {
      strapiFilters["neuheit[$eq]"] = filters.neuheit;
    }

    if (filters.minPreis !== undefined) {
      strapiFilters["listenpreis[$gte]"] = filters.minPreis;
    }

    if (filters.maxPreis !== undefined) {
      strapiFilters["listenpreis[$lte]"] = filters.maxPreis;
    }

    if (filters.minLeistung !== undefined) {
      strapiFilters["leistungKw[$gte]"] = filters.minLeistung;
    }

    if (filters.maxLeistung !== undefined) {
      strapiFilters["leistungKw[$lte]"] = filters.maxLeistung;
    }

    if (filters.search) {
      strapiFilters["$or"] = [
        { name: { $containsi: filters.search } },
        { artikelnummer: { $containsi: filters.search } },
        { kurzbeschreibung: { $containsi: filters.search } },
      ];
    }

    params.filters = strapiFilters;
  }

  // Sortierung
  if (sort) {
    params.sort = `${sort.field}:${sort.order}`;
  }

  return fetchAPI<StrapiResponse<Product[]>>("/products", { params });
}

// Einzelnes Produkt abrufen
export async function getProduct(
  slug: string
): Promise<StrapiResponse<Product[]> | StrapiError> {
  return fetchAPI<StrapiResponse<Product[]>>("/products", {
    params: {
      filters: { slug: { $eq: slug } },
      populate: {
        hauptbild: true,
        galerie: true,
        dokumente: true,
        kategorie: true,
        hersteller: true,
        technischeDaten: true,
        zubehoer: {
          populate: ["hauptbild"],
        },
        ersatzteile: {
          populate: ["hauptbild"],
        },
      },
    },
  });
}

// Kategorien abrufen
export async function getCategories(
  activeOnly = true
): Promise<StrapiResponse<Category[]> | StrapiError> {
  const params: Record<string, any> = {
    populate: {
      bild: true,
      parent: true,
    },
    sort: "sortierung:asc",
  };

  if (activeOnly) {
    params.filters = {
      aktiv: { $eq: true },
    };
  }

  return fetchAPI<StrapiResponse<Category[]>>("/kategoriens", { params });
}

// Einzelne Kategorie abrufen
export async function getCategory(
  slug: string
): Promise<StrapiResponse<Category[]> | StrapiError> {
  return fetchAPI<StrapiResponse<Category[]>>("/kategoriens", {
    params: {
      filters: { slug: { $eq: slug } },
      populate: {
        bild: true,
        parent: true,
        children: true,
      },
    },
  });
}

// Hersteller abrufen
export async function getManufacturers(
  activeOnly = true
): Promise<StrapiResponse<Manufacturer[]> | StrapiError> {
  const params: Record<string, any> = {
    populate: {
      logo: true,
    },
    sort: "name:asc",
  };

  if (activeOnly) {
    params.filters = {
      aktiv: { $eq: true },
    };
  }

  return fetchAPI<StrapiResponse<Manufacturer[]>>("/herstellers", { params });
}

// Helper: Bild-URL generieren
export function getStrapiImageUrl(url?: string): string {
  if (!url) return "/images/placeholder-product.jpg";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

// Helper: Preis formatieren
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

// Helper: Datum formatieren
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}
