'use client';

import { motion } from 'framer-motion';
import { AnimatedSection, Badge } from '@/components/ui';
import { Target, Heart, TrendingUp, Users, Award, Handshake, Shield, Zap } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Qualität',
    description: 'Wir führen nur Produkte von renommierten Herstellern, die höchste Qualitätsstandards erfüllen.',
  },
  {
    icon: Heart,
    title: 'Kundenorientierung',
    description: 'Die Zufriedenheit unserer Kunden steht bei uns an erster Stelle – heute und in Zukunft.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'Wir bleiben am Puls der Zeit und bieten stets die neuesten Technologien und Lösungen.',
  },
  {
    icon: Handshake,
    title: 'Partnerschaft',
    description: 'Langfristige, vertrauensvolle Beziehungen zu Kunden und Lieferanten sind uns wichtig.',
  },
];

const milestones = [
  { year: '1985', title: 'Gründung', description: 'Start als regionaler Heizungsfachhandel' },
  { year: '1995', title: 'Expansion', description: 'Eröffnung zweiter Standort und Logistikzentrum' },
  { year: '2005', title: 'Digitalisierung', description: 'Launch des ersten Online-Shops für Fachkunden' },
  { year: '2015', title: 'Wachstum', description: 'Über 300 Partner-Fachbetriebe deutschlandweit' },
  { year: 'Heute', title: '500+ Partner', description: 'Führender B2B-Großhandel für Heizungstechnik' },
];

const team = [
  { name: 'Max Mustermann', role: 'Geschäftsführer', image: '' },
  { name: 'Erika Musterfrau', role: 'Vertriebsleiterin', image: '' },
  { name: 'Hans Beispiel', role: 'Technischer Leiter', image: '' },
  { name: 'Anna Schmidt', role: 'Einkaufsleiterin', image: '' },
];

const stats = [
  { icon: Users, value: '500+', label: 'Partner-Fachbetriebe' },
  { icon: Award, value: '35+', label: 'Jahre Erfahrung' },
  { icon: Shield, value: '10.000+', label: 'Artikel im Sortiment' },
  { icon: Zap, value: '24h', label: 'Express-Lieferung' },
];

export default function UeberUnsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="container relative z-10">
          <AnimatedSection animation="slide-up">
            <div className="max-w-3xl">
              <Badge variant="accent">Über uns</Badge>
              <h1 className="font-display text-display-lg mb-6 text-white mt-4">
                Seit 1985 Ihr Partner für Heizungstechnik
              </h1>
              <p className="text-xl text-neutral-200">
                Erfahrung, Kompetenz und Service – seit über 35 Jahren vertrauen Fachbetriebe 
                auf unsere Expertise im Bereich Heizungstechnik.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-neutral-200">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <AnimatedSection key={index} delay={index * 0.1} animation="scale">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
                      <Icon size={28} className="text-primary-600" />
                    </div>
                    <div className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                    <p className="text-neutral-600">{stat.label}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-neutral-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slide-up">
              <Badge variant="primary">Unsere Geschichte</Badge>
              <h2 className="font-display text-display-md mt-4 mb-6 text-neutral-900">
                Tradition trifft Innovation
              </h2>
              <div className="space-y-4 text-neutral-600">
                <p>
                  Was 1985 als kleiner Fachhandel für Heizungstechnik begann, ist heute einer der 
                  führenden B2B-Großhändler in Deutschland. Mit Leidenschaft und Expertise haben wir 
                  uns kontinuierlich weiterentwickelt und sind mit unseren Kunden gewachsen.
                </p>
                <p>
                  Unser Erfolgsgeheimnis? Die Kombination aus jahrzehntelanger Erfahrung, einem 
                  umfassenden Sortiment führender Hersteller und einem Service, der keine Wünsche 
                  offen lässt. Dabei bleiben wir stets am Puls der Zeit und bieten unseren Partnern 
                  innovative Lösungen für die Herausforderungen von morgen.
                </p>
                <p>
                  Heute vertrauen über 500 Fachbetriebe deutschlandweit auf unsere Kompetenz. 
                  Und das ist für uns Ansporn und Verpflichtung zugleich, auch in Zukunft der 
                  verlässliche Partner an Ihrer Seite zu sein.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={0.2}>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-20 text-right">
                      <span className="text-2xl font-bold text-primary-600">{milestone.year}</span>
                    </div>
                    <div className="flex-grow pb-6 border-l-2 border-primary-200 pl-6 relative">
                      <div className="absolute left-0 top-2 w-3 h-3 bg-primary-600 rounded-full -translate-x-[7px]" />
                      <h3 className="font-semibold text-neutral-900 mb-1">{milestone.title}</h3>
                      <p className="text-sm text-neutral-600">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <AnimatedSection animation="slide-up">
            <div className="text-center mb-16">
              <Badge variant="accent">Unsere Werte</Badge>
              <h2 className="font-display text-display-md mt-4 mb-4 text-neutral-900">
                Wofür wir stehen
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Diese Werte leiten uns in allem, was wir tun
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={index} delay={index * 0.1} animation="slide-up">
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="text-center p-8 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all h-full"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
                      <Icon size={28} className="text-primary-600" />
                    </div>
                    <h3 className="font-display text-xl mb-3 text-neutral-900">{value.title}</h3>
                    <p className="text-sm text-neutral-600">{value.description}</p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-neutral-50">
        <div className="container">
          <AnimatedSection animation="slide-up">
            <div className="text-center mb-16">
              <Badge variant="primary">Unser Team</Badge>
              <h2 className="font-display text-display-md mt-4 mb-4 text-neutral-900">
                Die Köpfe hinter DEHS
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Ein engagiertes Team mit Leidenschaft für Heizungstechnik
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <AnimatedSection key={index} delay={index * 0.1} animation="scale">
                <motion.div
                  whileHover={{ y: -8 }}
                  className="text-center"
                >
                  <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-neutral-200 overflow-hidden">
                    {/* Placeholder for team member photo */}
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                      <Users size={48} />
                    </div>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1">{member.name}</h3>
                  <p className="text-sm text-neutral-600">{member.role}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="container relative z-10">
          <AnimatedSection animation="slide-up">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-display-md mb-6 text-white">
                Unsere Mission
              </h2>
              <p className="text-xl text-neutral-200 mb-8">
                Wir wollen der erste Ansprechpartner für Fachbetriebe sein, wenn es um 
                Heizungstechnik geht. Mit erstklassigem Service, innovativen Produkten und 
                fairen Konditionen schaffen wir die Grundlage für den Erfolg unserer Partner.
              </p>
              <p className="text-lg text-neutral-300">
                Gemeinsam gestalten wir die Zukunft der Heiztechnik – nachhaltig, effizient 
                und zukunftsorientiert.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
