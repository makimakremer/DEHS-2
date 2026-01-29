import Link from "next/link";

const categories = [
  {
    name: "Wärmepumpen",
    slug: "waermepumpen",
    description: "Effiziente Luft-, Sole- und Wasser-Wärmepumpen",
    icon: "🌡️",
  },
  {
    name: "Gasheizungen",
    slug: "gasheizungen",
    description: "Moderne Gas-Brennwertkessel und Kombithermen",
    icon: "🔥",
  },
  {
    name: "Solarthermie",
    slug: "solarthermie",
    description: "Flach- und Röhrenkollektoren für Warmwasser",
    icon: "☀️",
  },
  {
    name: "Pelletheizungen",
    slug: "pelletheizungen",
    description: "Umweltfreundliche Pellet- und Holzkessel",
    icon: "🪵",
  },
  {
    name: "Speicher",
    slug: "speicher",
    description: "Warmwasser-, Puffer- und Kombispeicher",
    icon: "🛢️",
  },
  {
    name: "Zubehör",
    slug: "zubehoer",
    description: "Pumpen, Regelung und Installationsmaterial",
    icon: "🔧",
  },
];

const benefits = [
  {
    title: "Schnelle Lieferung",
    description: "Bestellungen bis 14 Uhr werden noch am selben Tag versendet",
  },
  {
    title: "Fachberatung",
    description: "Kompetente Beratung durch unsere Heizungsexperten",
  },
  {
    title: "Großhandelspreise",
    description: "Attraktive Konditionen für registrierte Fachbetriebe",
  },
  {
    title: "Breites Sortiment",
    description: "Über 10.000 Artikel von führenden Herstellern",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-secondary-200 bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            DEHS
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/produkte"
              className="text-sm font-medium text-secondary-600 hover:text-primary-600"
            >
              Produkte
            </Link>
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20 text-white">
        <div className="container text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            Ihr Großhandel für Heizungsanlagen
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-100">
            Qualitätsprodukte von führenden Herstellern für Fachbetriebe.
            Wärmepumpen, Gasheizungen, Solarthermie und mehr.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/produkte" className="btn bg-white text-primary-600 hover:bg-primary-50">
              Produkte entdecken
            </Link>
            <Link href="/registrieren" className="btn border border-white/30 hover:bg-white/10">
              Konto erstellen
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold text-secondary-900">
            Unsere Produktkategorien
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/produkte/${category.slug}`}
                className="card group p-6 transition-shadow hover:shadow-md"
              >
                <span className="mb-3 block text-4xl">{category.icon}</span>
                <h3 className="mb-2 text-lg font-semibold text-secondary-900 group-hover:text-primary-600">
                  {category.name}
                </h3>
                <p className="text-sm text-secondary-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-secondary-50 py-16">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold text-secondary-900">
            Ihre Vorteile
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-secondary-900">
                  {benefit.title}
                </h3>
                <p className="text-sm text-secondary-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold text-secondary-900">
            Noch kein Konto?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-secondary-600">
            Registrieren Sie sich als Fachbetrieb und erhalten Sie Zugang zu
            unseren Großhandelspreisen und exklusiven Angeboten.
          </p>
          <Link href="/registrieren" className="btn-primary">
            Jetzt registrieren
          </Link>
        </div>
      </section>

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
                <li>
                  <Link href="/produkte/waermepumpen" className="hover:text-white">
                    Wärmepumpen
                  </Link>
                </li>
                <li>
                  <Link href="/produkte/gasheizungen" className="hover:text-white">
                    Gasheizungen
                  </Link>
                </li>
                <li>
                  <Link href="/produkte/solarthermie" className="hover:text-white">
                    Solarthermie
                  </Link>
                </li>
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
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
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
