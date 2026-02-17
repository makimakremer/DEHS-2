'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedSection, Badge, Button, CountUp, Accordion, Testimonial } from "@/components/ui";
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
  ChevronDown,
  Award,
  Clock,
  Package,
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

const partners = [
  { name: "Bosch", logo: "BOSCH" },
  { name: "Viessmann", logo: "VIESSMANN" },
  { name: "Vaillant", logo: "VAILLANT" },
  { name: "Buderus", logo: "BUDERUS" },
  { name: "Wolf", logo: "WOLF" },
  { name: "Junkers", logo: "JUNKERS" },
];

const stats = [
  { value: 500, suffix: "+", label: "Fachbetriebe vertrauen uns", icon: Users },
  { value: 10000, suffix: "+", label: "Artikel im Sortiment", icon: Package },
  { value: 35, suffix: "+", label: "Jahre Erfahrung", icon: Award },
  { value: 24, suffix: "h", label: "Express-Lieferung", icon: Clock },
];

const testimonials = [
  {
    name: "Michael Schmidt",
    company: "Schmidt Haustechnik GmbH",
    text: "DEHS ist seit Jahren unser zuverlässiger Partner. Schnelle Lieferung, faire Preise und kompetente Beratung – was will man mehr?",
    rating: 5,
  },
  {
    name: "Sandra Müller",
    company: "Müller Sanitär & Heizung",
    text: "Die Produktauswahl ist hervorragend und die technische Beratung top. Besonders die schnelle Verfügbarkeit schätzen wir sehr.",
    rating: 5,
  },
  {
    name: "Thomas Weber",
    company: "Weber Energietechnik",
    text: "Als Fachbetrieb sind wir auf schnelle und zuverlässige Lieferungen angewiesen. DEHS liefert immer pünktlich und in bester Qualität.",
    rating: 5,
  },
];

const faqs = [
  {
    question: "Wie kann ich mich als Fachbetrieb registrieren?",
    answer: "Die Registrierung ist ganz einfach: Füllen Sie unser Online-Formular aus und laden Sie Ihren Handelsregisterauszug oder Gewerbeschein hoch. Nach Prüfung Ihrer Unterlagen erhalten Sie innerhalb von 24 Stunden Ihre Zugangsdaten.",
  },
  {
    question: "Welche Zahlungsmöglichkeiten bieten Sie an?",
    answer: "Wir bieten verschiedene Zahlungsoptionen für Geschäftskunden: Rechnung (nach Bonitätsprüfung), Vorkasse, Lastschrift und PayPal. Für Stammkunden können wir auch individuelle Zahlungsziele vereinbaren.",
  },
  {
    question: "Wie schnell erfolgt die Lieferung?",
    answer: "Bestellungen, die bis 14 Uhr bei uns eingehen, werden noch am selben Tag versendet. Je nach Lieferadresse erfolgt die Zustellung innerhalb von 1-2 Werktagen. Express-Lieferung am nächsten Tag ist ebenfalls möglich.",
  },
  {
    question: "Bieten Sie auch technische Beratung an?",
    answer: "Ja, unser Expertenteam steht Ihnen bei allen technischen Fragen zur Verfügung. Sie erreichen uns telefonisch, per E-Mail oder über unseren Live-Chat. Auch vor-Ort-Beratungen sind nach Vereinbarung möglich.",
  },
  {
    question: "Kann ich Produkte zurückgeben?",
    answer: "Selbstverständlich. Ungeöffnete Ware kann innerhalb von 14 Tagen zurückgegeben werden. Bei beschädigter oder fehlerhafter Ware gelten die gesetzlichen Gewährleistungsrechte.",
  },
  {
    question: "Gibt es Mengenrabatte?",
    answer: "Ja, wir bieten attraktive Staffelpreise bei größeren Abnahmemengen. Sprechen Sie uns einfach an – wir erstellen Ihnen gerne ein individuelles Angebot.",
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
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-10 w-20 h-20 border-4 border-white/20"
        />
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-20 w-32 h-32 rounded-full border-4 border-accent-300/30"
        />
        <motion.div
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary-400/20 backdrop-blur-sm"
          style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
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

              {/* Hero Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    <CountUp end={500} suffix="+" />
                  </div>
                  <div className="text-sm text-neutral-200">Fachbetriebe</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    <CountUp end={10000} suffix="+" />
                  </div>
                  <div className="text-sm text-neutral-200">Artikel</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    <CountUp end={35} suffix="+" />
                  </div>
                  <div className="text-sm text-neutral-200">Jahre</div>
                </div>
              </div>

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

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 cursor-pointer"
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>
      </section>

      {/* Trusted By / Partner Section */}
      <section className="py-16 bg-white border-b border-neutral-200">
        <div className="container">
          <AnimatedSection animation="slide-up">
            <p className="text-center text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-8">
              Führende Hersteller im Sortiment
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <AnimatedSection key={partner.name} delay={index * 0.1} animation="scale">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center font-bold text-2xl text-neutral-400 hover:text-primary-600 transition-colors cursor-pointer grayscale hover:grayscale-0"
                >
                  {partner.logo}
                </motion.div>
              </AnimatedSection>
            ))}
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

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <AnimatedSection animation="slide-up">
            <div className="text-center mb-16">
              <Badge variant="accent">In Zahlen</Badge>
              <h2 className="font-display text-display-md mt-4 mb-4 text-neutral-900">
                Warum DEHS?
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <AnimatedSection key={index} delay={index * 0.1} animation="scale">
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="text-center p-8 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
                      <Icon size={28} className="text-primary-600" />
                    </div>
                    <div className="text-4xl font-bold text-primary-600 mb-2">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-neutral-600">{stat.label}</p>
                  </motion.div>
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

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-mesh relative overflow-hidden">
        <div className="container relative z-10">
          <AnimatedSection animation="slide-up">
            <div className="text-center mb-16">
              <Badge variant="accent">Referenzen</Badge>
              <h2 className="font-display text-display-md mt-4 mb-4 text-white">
                Das sagen unsere Kunden
              </h2>
              <p className="text-xl text-neutral-200 max-w-2xl mx-auto">
                Erfahrungen von Fachbetrieben, die bereits auf uns vertrauen
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                name={testimonial.name}
                company={testimonial.company}
                text={testimonial.text}
                rating={testimonial.rating}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-neutral-50">
        <div className="container max-w-4xl">
          <AnimatedSection animation="slide-up">
            <div className="text-center mb-16">
              <Badge variant="primary">FAQ</Badge>
              <h2 className="font-display text-display-md mt-4 mb-4 text-neutral-900">
                Häufig gestellte Fragen
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Hier finden Sie Antworten auf die wichtigsten Fragen
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-up" delay={0.2}>
            <Accordion items={faqs} />
          </AnimatedSection>
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
