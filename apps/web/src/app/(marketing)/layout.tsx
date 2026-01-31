import Link from "next/link";
import { getCategories } from "@/lib/strapi/client";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Kategorien für Navigation laden
  const categoriesResponse = await getCategories(true);
  const categories =
    "data" in categoriesResponse && Array.isArray(categoriesResponse.data)
      ? categoriesResponse.data.slice(0, 6) // Top 6 Kategorien
      : [];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-secondary-200 bg-white shadow-sm">
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-primary-600">
              DEHS
            </Link>

            {/* Navigation */}
            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href="/produkte"
                className="text-sm font-medium text-secondary-600 hover:text-primary-600"
              >
                Alle Produkte
              </Link>

              {/* Kategorien Dropdown */}
              <div className="group relative">
                <button className="flex items-center gap-1 text-sm font-medium text-secondary-600 hover:text-primary-600">
                  Kategorien
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className="invisible absolute left-0 top-full mt-2 w-64 rounded-lg border border-secondary-200 bg-white py-2 shadow-lg opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/produkte/${category.attributes.slug}`}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50 hover:text-primary-600"
                    >
                      {category.attributes.icon && (
                        <span className="text-lg">{category.attributes.icon}</span>
                      )}
                      {category.attributes.name}
                    </Link>
                  ))}
                  <div className="my-2 border-t border-secondary-100" />
                  <Link
                    href="/produkte"
                    className="block px-4 py-2 text-sm font-medium text-primary-600 hover:bg-secondary-50"
                  >
                    Alle Kategorien →
                  </Link>
                </div>
              </div>

              <Link
                href="/kontakt"
                className="text-sm font-medium text-secondary-600 hover:text-primary-600"
              >
                Kontakt
              </Link>

              <Link href="/anmelden" className="btn-outline text-sm">
                Anmelden
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden">
              <svg
                className="h-6 w-6 text-secondary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="mt-auto border-t border-secondary-200 bg-secondary-900 py-12 text-white">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h4 className="mb-4 text-lg font-bold">DEHS</h4>
              <p className="text-sm text-secondary-400">
                Ihr zuverlässiger Partner für Heizungstechnik seit 1985.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Produkte</h4>
              <ul className="space-y-2 text-sm text-secondary-400">
                {categories.slice(0, 4).map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/produkte/${category.attributes.slug}`}
                      className="hover:text-white"
                    >
                      {category.attributes.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Service</h4>
              <ul className="space-y-2 text-sm text-secondary-400">
                <li>
                  <Link href="/kontakt" className="hover:text-white">
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link href="/ueber-uns" className="hover:text-white">
                    Über uns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Rechtliches</h4>
              <ul className="space-y-2 text-sm text-secondary-400">
                <li>
                  <Link href="/impressum" className="hover:text-white">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link href="/datenschutz" className="hover:text-white">
                    Datenschutz
                  </Link>
                </li>
                <li>
                  <Link href="/agb" className="hover:text-white">
                    AGB
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-secondary-800 pt-8 text-center text-sm text-secondary-400">
            © {new Date().getFullYear()} DEHS GmbH. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  );
}
