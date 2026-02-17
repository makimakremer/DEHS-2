'use client';

import { AnimatedSection, Badge } from '@/components/ui';
import { Building2, Mail, Phone, Scale } from 'lucide-react';

export default function ImpressumPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="container relative z-10">
          <AnimatedSection animation="slide-up">
            <div className="max-w-3xl">
              <Badge variant="accent">Rechtliches</Badge>
              <h1 className="font-display text-display-lg mb-6 text-white mt-4">
                Impressum
              </h1>
              <p className="text-xl text-neutral-200">
                Angaben gemäß § 5 TMG
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white">
        <div className="container max-w-4xl">
          <div className="prose prose-neutral max-w-none">
            <AnimatedSection animation="slide-up">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Building2 className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2">Firmenanschrift</h3>
                      <p className="text-neutral-600 mb-0">
                        DEHS GmbH<br />
                        Musterstraße 123<br />
                        12345 Musterstadt<br />
                        Deutschland
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Phone className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2">Kontakt</h3>
                      <p className="text-neutral-600 mb-0">
                        Tel: +49 (0) 123 456 789<br />
                        Fax: +49 (0) 123 456 790<br />
                        E-Mail: info@dehs-heizung.de
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={0.1}>
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl text-neutral-900 mb-4">Vertreten durch</h2>
                  <p className="text-neutral-600">
                    Geschäftsführer: Max Mustermann, Erika Musterfrau
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl text-neutral-900 mb-4">Registereintrag</h2>
                  <p className="text-neutral-600">
                    Eintragung im Handelsregister<br />
                    Registergericht: Amtsgericht Musterstadt<br />
                    Registernummer: HRB 12345
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl text-neutral-900 mb-4">Umsatzsteuer-ID</h2>
                  <p className="text-neutral-600">
                    Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                    DE123456789
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl text-neutral-900 mb-4">Zuständige Aufsichtsbehörde</h2>
                  <p className="text-neutral-600">
                    Gewerbeaufsichtsamt Musterstadt<br />
                    Behördenstraße 1<br />
                    12345 Musterstadt
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl text-neutral-900 mb-4">Verantwortlich für den Inhalt</h2>
                  <p className="text-neutral-600">
                    nach § 55 Abs. 2 RStV:<br />
                    Max Mustermann<br />
                    Musterstraße 123<br />
                    12345 Musterstadt
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl text-neutral-900 mb-4">EU-Streitschlichtung</h2>
                  <p className="text-neutral-600">
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                    <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                      https://ec.europa.eu/consumers/odr
                    </a>
                    <br />
                    Unsere E-Mail-Adresse finden Sie oben im Impressum.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl text-neutral-900 mb-4">Verbraucherstreitbeilegung</h2>
                  <p className="text-neutral-600">
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                    Verbraucherschlichtungsstelle teilzunehmen.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl text-neutral-900 mb-4">Haftung für Inhalte</h2>
                  <p className="text-neutral-600">
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                    nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                    Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                    Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                    Tätigkeit hinweisen.
                  </p>
                  <p className="text-neutral-600 mt-4">
                    Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
                    allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch 
                    erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei 
                    Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend 
                    entfernen.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl text-neutral-900 mb-4">Haftung für Links</h2>
                  <p className="text-neutral-600">
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                    Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                    Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                    Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf 
                    mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der 
                    Verlinkung nicht erkennbar.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl text-neutral-900 mb-4">Urheberrecht</h2>
                  <p className="text-neutral-600">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                    dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                    der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                    Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind 
                    nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
