import Link from "next/link";
import Image from "next/image";
import type { Product } from "@shared/types";
import { getStrapiImageUrl, formatPrice } from "@/lib/strapi/client";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { attributes } = product;
  const imageUrl = getStrapiImageUrl(
    attributes.hauptbild?.data?.attributes?.url
  );
  const categorySlug = attributes.kategorie?.data?.attributes?.slug || "alle";

  return (
    <Link
      href={`/produkte/${categorySlug}/${attributes.slug}`}
      className="card group overflow-hidden transition-shadow hover:shadow-lg"
    >
      {/* Produktbild */}
      <div className="relative aspect-square overflow-hidden bg-secondary-100">
        <Image
          src={imageUrl}
          alt={attributes.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-2">
          {attributes.neuheit && (
            <span className="rounded bg-accent-500 px-2 py-1 text-xs font-semibold text-white">
              Neuheit
            </span>
          )}
          {!attributes.verfuegbar && (
            <span className="rounded bg-secondary-500 px-2 py-1 text-xs font-semibold text-white">
              Nicht verfügbar
            </span>
          )}
          {attributes.auslaufmodell && (
            <span className="rounded bg-amber-500 px-2 py-1 text-xs font-semibold text-white">
              Auslauf
            </span>
          )}
        </div>

        {/* Energieeffizienzklasse */}
        {attributes.energieeffizienzklasse && (
          <div className="absolute bottom-2 right-2">
            <span className="rounded bg-green-600 px-2 py-1 text-xs font-bold text-white">
              {attributes.energieeffizienzklasse.replace(/_/g, "")}
            </span>
          </div>
        )}
      </div>

      {/* Produktinformationen */}
      <div className="p-4">
        {/* Hersteller */}
        {attributes.hersteller?.data && (
          <p className="mb-1 text-xs text-secondary-500">
            {attributes.hersteller.data.attributes.name}
          </p>
        )}

        {/* Produktname */}
        <h3 className="mb-2 line-clamp-2 font-semibold text-secondary-900 group-hover:text-primary-600">
          {attributes.name}
        </h3>

        {/* Artikelnummer */}
        <p className="mb-2 text-xs text-secondary-600">
          Art.-Nr.: {attributes.artikelnummer}
        </p>

        {/* Kurzbeschreibung */}
        {attributes.kurzbeschreibung && (
          <p className="mb-3 line-clamp-2 text-sm text-secondary-600">
            {attributes.kurzbeschreibung}
          </p>
        )}

        {/* Leistung */}
        {attributes.leistungKw && (
          <div className="mb-3 flex items-center gap-2 text-sm">
            <svg
              className="h-4 w-4 text-secondary-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-secondary-700">
              {attributes.leistungKw} kW
            </span>
          </div>
        )}

        {/* Preis */}
        <div className="mt-auto border-t border-secondary-100 pt-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-secondary-600">Listenpreis</span>
            <span className="text-lg font-bold text-primary-600">
              {formatPrice(attributes.listenpreis)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
