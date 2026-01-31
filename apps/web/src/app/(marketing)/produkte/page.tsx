import { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts, getCategories, getManufacturers } from "@/lib/strapi/client";
import { ProductGrid } from "@/components/products/ProductGrid";

export const metadata: Metadata = {
  title: "Alle Produkte",
  description:
    "Entdecken Sie unser umfangreiches Sortiment an Heizungsprodukten. Wärmepumpen, Gasheizungen, Solarthermie und mehr.",
};

interface PageProps {
  searchParams: {
    kategorie?: string;
    hersteller?: string;
    page?: string;
  };
}

export default async function ProduktePage({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page || "1");

  // Produkte laden
  const productsResponse = await getProducts(
    {
      kategorie: searchParams.kategorie,
      hersteller: searchParams.hersteller,
    },
    { page, pageSize: 12 }
  );

  const products =
    "data" in productsResponse && Array.isArray(productsResponse.data)
      ? productsResponse.data
      : [];

  const pagination =
    "meta" in productsResponse ? productsResponse.meta.pagination : null;

  // Kategorien und Hersteller für Filter laden
  const [categoriesResponse, manufacturersResponse] = await Promise.all([
    getCategories(true),
    getManufacturers(true),
  ]);

  const categories =
    "data" in categoriesResponse && Array.isArray(categoriesResponse.data)
      ? categoriesResponse.data
      : [];

  const manufacturers =
    "data" in manufacturersResponse &&
    Array.isArray(manufacturersResponse.data)
      ? manufacturersResponse.data
      : [];

  return (
    <div className="py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-secondary-900">
            Alle Produkte
          </h1>
          <p className="text-secondary-600">
            {pagination
              ? `${pagination.total} Produkte gefunden`
              : "Produkte werden geladen..."}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          {/* Sidebar Filter */}
          <aside className="space-y-6">
            {/* Kategorien Filter */}
            {categories.length > 0 && (
              <div className="card p-4">
                <h3 className="mb-4 font-semibold text-secondary-900">
                  Kategorien
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/produkte"
                      className={`block rounded px-3 py-2 text-sm ${
                        !searchParams.kategorie
                          ? "bg-primary-50 font-medium text-primary-600"
                          : "text-secondary-700 hover:bg-secondary-50"
                      }`}
                    >
                      Alle Kategorien
                    </a>
                  </li>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <a
                        href={`/produkte?kategorie=${category.attributes.slug}`}
                        className={`block rounded px-3 py-2 text-sm ${
                          searchParams.kategorie === category.attributes.slug
                            ? "bg-primary-50 font-medium text-primary-600"
                            : "text-secondary-700 hover:bg-secondary-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {category.attributes.icon && (
                            <span>{category.attributes.icon}</span>
                          )}
                          {category.attributes.name}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hersteller Filter */}
            {manufacturers.length > 0 && (
              <div className="card p-4">
                <h3 className="mb-4 font-semibold text-secondary-900">
                  Hersteller
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/produkte"
                      className={`block rounded px-3 py-2 text-sm ${
                        !searchParams.hersteller
                          ? "bg-primary-50 font-medium text-primary-600"
                          : "text-secondary-700 hover:bg-secondary-50"
                      }`}
                    >
                      Alle Hersteller
                    </a>
                  </li>
                  {manufacturers.map((manufacturer) => (
                    <li key={manufacturer.id}>
                      <a
                        href={`/produkte?hersteller=${manufacturer.attributes.slug}`}
                        className={`block rounded px-3 py-2 text-sm ${
                          searchParams.hersteller ===
                          manufacturer.attributes.slug
                            ? "bg-primary-50 font-medium text-primary-600"
                            : "text-secondary-700 hover:bg-secondary-50"
                        }`}
                      >
                        {manufacturer.attributes.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          {/* Produktliste */}
          <div>
            <Suspense
              fallback={
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="card h-96 animate-pulse bg-secondary-100"
                    />
                  ))}
                </div>
              }
            >
              <ProductGrid products={products} />
            </Suspense>

            {/* Pagination */}
            {pagination && pagination.pageCount > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {page > 1 && (
                  <a
                    href={`/produkte?page=${page - 1}${
                      searchParams.kategorie
                        ? `&kategorie=${searchParams.kategorie}`
                        : ""
                    }${
                      searchParams.hersteller
                        ? `&hersteller=${searchParams.hersteller}`
                        : ""
                    }`}
                    className="btn-outline"
                  >
                    Zurück
                  </a>
                )}

                <span className="flex items-center px-4 text-sm text-secondary-600">
                  Seite {page} von {pagination.pageCount}
                </span>

                {page < pagination.pageCount && (
                  <a
                    href={`/produkte?page=${page + 1}${
                      searchParams.kategorie
                        ? `&kategorie=${searchParams.kategorie}`
                        : ""
                    }${
                      searchParams.hersteller
                        ? `&hersteller=${searchParams.hersteller}`
                        : ""
                    }`}
                    className="btn-outline"
                  >
                    Weiter
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
