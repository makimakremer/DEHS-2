'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedSection, Badge, Button } from "@/components/ui";
import {
  Thermometer,
  Flame,
  Sun,
  TreeDeciduous,
  Database,
  Wrench,
  Truck,
  Users,
  TrendingDown,
  LayoutGrid,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    name: "Wärmepumpen",
    slug: "waermepumpen",
    description: "Effiziente Luft-, Sole- und Wasser-Wärmepumpen",
    icon: Thermometer,
  },
  {
    name: "Gasheizungen",
    slug: "gasheizungen",
    description: "Moderne Gas-Brennwertkessel und Kombithermen",
    icon: Flame,
  },
  {
    name: "Solarthermie",
    slug: "solarthermie",
    description: "Flach- und Röhrenkollektoren für Warmwasser",
    icon: Sun,
  },
  {
    name: "Pelletheizungen",
    slug: "pelletheizungen",
    description: "Umweltfreundliche Pellet- und Holzkessel",
    icon: TreeDeciduous,
  },
  {
    name: "Speicher",
    slug: "speicher",
    description: "Warmwasser-, Puffer- und Kombispeicher",
    icon: Database,
  },
  {
    name: "Zubehör",
    slug: "zubehoer",
    description: "Pumpen, Regelung und Installationsmaterial",
    icon: Wrench,
  },
];

const benefits = [
  {
    title: "Schnelle Lieferung",
    description: "Bestellungen bis 14 Uhr werden noch am selben Tag versendet",
    icon: Truck,
  },
  {
    title: "Fachberatung",
    description: "Kompetente Beratung durch unsere Heizungsexperten",
    icon: Users,
  },
  {
    title: "Großhandelspreise",
    description: "Attraktive Konditionen für registrierte Fachbetriebe",
    icon: TrendingDown,
  },
  {
    title: "Breites Sortiment",
    description: "Über 10.000 Artikel von führenden Herstellern",
    icon: LayoutGrid,
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-mesh min-h-[90vh] flex items-center">
        {/* Animated background elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-400/20 rounded-full blur-3xl"
        />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slide-up">
              <Badge variant="accent">B2B Heizungstechnik</Badge>
              <h1 className="font-display text-display-lg mb-6 text-white mt-4">
                Innovative Heizungslösungen für Profis
              </h1>
              <p className="text-xl text-neutral-200 mb-8 max-w-xl">
                Führende Technologie, kompetente Beratung, attraktive Konditionen.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" icon={ArrowRight} href="/produkte">
                  Produkte entdecken
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Mehr erfahren
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-neutral-50">
        <div className="container">
          <AnimatedSection animation="slide-up">
            <div className="text-center mb-16">
              <Badge variant="primary">Sortiment</Badge>
              <h2 className="font-display text-display-md mt-4 mb-4 text-neutral-900">
                Unsere Produktkategorien
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Von Wärmepumpen bis Solarthermie – alles aus einer Hand
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <AnimatedSection key={category.slug} delay={index * 0.1} animation="slide-up">
                  <Link href={`/produkte/${category.slug}`}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="card group p-8 h-full transition-all hover:shadow-lg"
                    >
                      <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                        <Icon size={28} className="text-primary-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-neutral-600">{category.description}</p>
                    </motion.div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />

        <div className="container relative z-10">
          <AnimatedSection animation="slide-up">
            <div className="text-center mb-16">
              <h2 className="font-display text-display-md mb-4 text-white">
                Ihre Vorteile
              </h2>
              <p className="text-xl text-neutral-200 max-w-2xl mx-auto">
                Warum über 500 Fachbetriebe auf uns vertrauen
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <AnimatedSection key={index} delay={index * 0.1} animation="scale">
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="glass rounded-2xl p-8 border border-white/20"
                  >
                    <div className="w-14 h-14 rounded-full bg-accent-400 flex items-center justify-center mb-6">
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="font-display text-xl mb-3 text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-200">
                      {benefit.description}
                    </p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <AnimatedSection animation="slide-up">
            <h2 className="font-display text-display-sm text-neutral-900 mb-4">
              Noch kein Konto?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-neutral-600 text-lg">
              Registrieren Sie sich als Fachbetrieb und erhalten Sie Zugang zu
              unseren Großhandelspreisen und exklusiven Angeboten.
            </p>
            <Button variant="primary" size="lg" href="/registrieren">
              Jetzt registrieren
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
