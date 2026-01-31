import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProduct, getStrapiImageUrl, formatPrice } from "@/lib/strapi/client";
import { ProductGrid } from "@/components/products/ProductGrid";

interface PageProps {
  params: {
    kategorie: string;
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const productResponse = await getProduct(params.slug);

  if ("error" in productResponse || productResponse.data.length === 0) {
    return {
      title: "Produkt nicht gefunden",
    };
  }

  const product = productResponse.data[0];
  const { attributes } = product;

  return {
    title: attributes.seoTitle || `${attributes.name} | DEHS`,
    description:
      attributes.seoDescription ||
      attributes.kurzbeschreibung ||
      `${attributes.name} - Art.-Nr. ${attributes.artikelnummer}`,
    openGraph: {
      images: attributes.hauptbild?.data
        ? [getStrapiImageUrl(attributes.hauptbild.data.attributes.url)]
        : [],
    },
  };
}

export default async function ProduktdetailPage({ params }: PageProps) {
  const productResponse = await getProduct(params.slug);

  if ("error" in productResponse || productResponse.data.length === 0) {
    notFound();
  }

  const product = productResponse.data[0];
  const { attributes } = product;

  const images = [
    attributes.hauptbild?.data,
    ...(attributes.galerie?.data || []),
  ].filter(Boolean);

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
          {attributes.kategorie?.data && (
            <>
              <span>/</span>
              <a
                href={`/produkte/${attributes.kategorie.data.attributes.slug}`}
                className="hover:text-primary-600"
              >
                {attributes.kategorie.data.attributes.name}
              </a>
            </>
          )}
          <span>/</span>
          <span className="text-secondary-900">{attributes.name}</span>
        </nav>

        {/* Produktdetails */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Bilder */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary-100">
              <Image
                src={getStrapiImageUrl(
                  attributes.hauptbild?.data?.attributes?.url
                )}
                alt={attributes.name}
                fill
                className="object-cover"
                priority
              />

              {/* Badges */}
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {attributes.neuheit && (
                  <span className="rounded bg-accent-500 px-3 py-1 text-sm font-semibold text-white">
                    Neuheit
                  </span>
                )}
                {!attributes.verfuegbar && (
                  <span className="rounded bg-secondary-500 px-3 py-1 text-sm font-semibold text-white">
                    Nicht verfügbar
                  </span>
                )}
              </div>
            </div>

            {/* Galerie */}
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded bg-secondary-100"
                  >
                    <Image
                      src={getStrapiImageUrl(image.attributes.url)}
                      alt={`${attributes.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Produktinformationen */}
          <div>
            {/* Hersteller */}
            {attributes.hersteller?.data && (
              <p className="mb-2 text-sm text-secondary-600">
                {attributes.hersteller.data.attributes.name}
              </p>
            )}

            {/* Produktname */}
            <h1 className="mb-4 text-3xl font-bold text-secondary-900">
              {attributes.name}
            </h1>

            {/* Artikelnummer & EAN */}
            <div className="mb-6 space-y-1 text-sm text-secondary-600">
              <p>Artikelnummer: {attributes.artikelnummer}</p>
              {attributes.ean && <p>EAN: {attributes.ean}</p>}
            </div>

            {/* Kurzbeschreibung */}
            {attributes.kurzbeschreibung && (
              <p className="mb-6 text-lg text-secondary-700">
                {attributes.kurzbeschreibung}
              </p>
            )}

            {/* Wichtige Specs */}
            <div className="mb-6 space-y-3 rounded-lg bg-secondary-50 p-4">
              {attributes.leistungKw && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-secondary-700">
                    Nennleistung
                  </span>
                  <span className="font-semibold text-secondary-900">
                    {attributes.leistungKw} kW
                  </span>
                </div>
              )}

              {attributes.energieeffizienzklasse && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-secondary-700">
                    Energieeffizienz
                  </span>
                  <span className="rounded bg-green-600 px-2 py-1 text-sm font-bold text-white">
                    {attributes.energieeffizienzklasse.replace(/_/g, "")}
                  </span>
                </div>
              )}

              {attributes.produktTyp && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-secondary-700">
                    Produkttyp
                  </span>
                  <span className="font-semibold text-secondary-900">
                    {attributes.produktTyp
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                </div>
              )}
            </div>

            {/* Preis */}
            <div className="mb-6 rounded-lg border-2 border-primary-100 bg-primary-50 p-6">
              <p className="mb-2 text-sm text-secondary-600">Listenpreis</p>
              <p className="text-3xl font-bold text-primary-600">
                {formatPrice(attributes.listenpreis)}
              </p>
              <p className="mt-2 text-sm text-secondary-600">
                Für Großhandelskunden gelten Sonderkonditionen.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <a href="/kontakt" className="btn-primary flex-1">
                Anfrage senden
              </a>
              <a href="/anmelden" className="btn-outline">
                Anmelden für Preise
              </a>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="border-b border-secondary-200">
            <nav className="-mb-px flex gap-8">
              <button className="border-b-2 border-primary-600 px-1 py-4 text-sm font-medium text-primary-600">
                Beschreibung
              </button>
              {attributes.technischeDaten &&
                attributes.technischeDaten.length > 0 && (
                  <button className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-secondary-600 hover:border-secondary-300 hover:text-secondary-900">
                    Technische Daten
                  </button>
                )}
              {attributes.dokumente?.data &&
                attributes.dokumente.data.length > 0 && (
                  <button className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-secondary-600 hover:border-secondary-300 hover:text-secondary-900">
                    Dokumente
                  </button>
                )}
            </nav>
          </div>

          {/* Tab Content: Beschreibung */}
          <div className="py-8">
            {attributes.beschreibung ? (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: attributes.beschreibung }}
              />
            ) : (
              <p className="text-secondary-600">
                Keine ausführliche Beschreibung verfügbar.
              </p>
            )}
          </div>

          {/* Technische Daten */}
          {attributes.technischeDaten &&
            attributes.technischeDaten.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-2xl font-bold text-secondary-900">
                  Technische Daten
                </h2>
                <div className="divide-y divide-secondary-200 rounded-lg border border-secondary-200">
                  {attributes.technischeDaten.map((spec, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 gap-4 px-4 py-3"
                    >
                      <div className="font-medium text-secondary-700">
                        {spec.bezeichnung}
                      </div>
                      <div className="text-secondary-900">
                        {spec.wert} {spec.einheit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Zubehör */}
        {attributes.zubehoer?.data && attributes.zubehoer.data.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-secondary-900">
              Passendes Zubehör
            </h2>
            <ProductGrid products={attributes.zubehoer.data.slice(0, 4)} />
          </div>
        )}

        {/* Ersatzteile */}
        {attributes.ersatzteile?.data &&
          attributes.ersatzteile.data.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-secondary-900">
                Ersatzteile
              </h2>
              <ProductGrid products={attributes.ersatzteile.data.slice(0, 4)} />
            </div>
          )}
      </div>
    </div>
  );
}
