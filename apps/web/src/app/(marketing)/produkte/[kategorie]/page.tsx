import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProducts, getCategory } from "@/lib/strapi/client";
import { ProductGrid } from "@/components/products/ProductGrid";
import Image from "next/image";
import { getStrapiImageUrl } from "@/lib/strapi/client";

interface PageProps {
  params: {
    kategorie: string;
  };
  searchParams: {
    page?: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const categoryResponse = await getCategory(params.kategorie);

  if ("error" in categoryResponse || categoryResponse.data.length === 0) {
    return {
      title: "Kategorie nicht gefunden",
    };
  }

  const category = categoryResponse.data[0];

  return {
    title: category.attributes.seoTitle || category.attributes.name,
    description:
      category.attributes.seoDescription ||
      category.attributes.beschreibung ||
      `Alle ${category.attributes.name} Produkte im Überblick`,
  };
}

export default async function KategoriePage({
  params,
  searchParams,
}: PageProps) {
  const page = parseInt(searchParams.page || "1");

  // Kategorie laden
  const categoryResponse = await getCategory(params.kategorie);

  if ("error" in categoryResponse || categoryResponse.data.length === 0) {
    notFound();
  }

  const category = categoryResponse.data[0];

  // Produkte dieser Kategorie laden
  const productsResponse = await getProducts(
    { kategorie: params.kategorie },
    { page, pageSize: 12 }
  );

  const products =
    "data" in productsResponse && Array.isArray(productsResponse.data)
      ? productsResponse.data
      : [];

  const pagination =
    "meta" in productsResponse ? productsResponse.meta.pagination : null;

  const hasImage = category.attributes.bild?.data?.attributes?.url;

  return (
    <div className="py-8">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-secondary-600">
          <a href="/" className="hover:text-primary-600">
            Home
          </a>
          <span>/</span>
          <a href="/produkte" className="hover:text-primary-600">
            Produkte
          </a>
          <span>/</span>
          <span className="text-secondary-900">{category.attributes.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          {hasImage && (
            <div className="relative mb-6 h-48 overflow-hidden rounded-lg">
              <Image
                src={getStrapiImageUrl(
                  category.attributes.bild.data.attributes.url
                )}
                alt={category.attributes.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h1 className="text-4xl font-bold">
                  {category.attributes.name}
                </h1>
              </div>
            </div>
          )}

          {!hasImage && (
            <h1 className="mb-4 text-4xl font-bold text-secondary-900">
              {category.attributes.name}
            </h1>
          )}

          {category.attributes.beschreibung && (
            <div
              className="prose max-w-none text-secondary-600"
              dangerouslySetInnerHTML={{
                __html: category.attributes.beschreibung,
              }}
            />
          )}

          <p className="mt-4 text-sm text-secondary-600">
            {pagination
              ? `${pagination.total} Produkte in dieser Kategorie`
              : "Produkte werden geladen..."}
          </p>
        </div>

        {/* Unterkategorien */}
        {category.attributes.children?.data &&
          category.attributes.children.data.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-secondary-900">
                Unterkategorien
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {category.attributes.children.data.map((subCategory) => (
                  <a
                    key={subCategory.id}
                    href={`/produkte/${subCategory.attributes.slug}`}
                    className="card flex items-center gap-3 p-4 transition-shadow hover:shadow-md"
                  >
                    {subCategory.attributes.icon && (
                      <span className="text-2xl">{subCategory.attributes.icon}</span>
                    )}
                    <span className="font-medium text-secondary-900">
                      {subCategory.attributes.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

        {/* Produktliste */}
        <div>
          <Suspense
            fallback={
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
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
                  href={`/produkte/${params.kategorie}?page=${page - 1}`}
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
                  href={`/produkte/${params.kategorie}?page=${page + 1}`}
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
  );
}
