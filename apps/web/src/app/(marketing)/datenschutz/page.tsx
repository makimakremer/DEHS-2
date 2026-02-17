'use client';

import { AnimatedSection, Badge } from '@/components/ui';
import { Shield, Lock, Eye, Cookie } from 'lucide-react';

export default function DatenschutzPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="container relative z-10">
          <AnimatedSection animation="slide-up">
            <div className="max-w-3xl">
              <Badge variant="accent">Rechtliches</Badge>
              <h1 className="font-display text-display-lg mb-6 text-white mt-4">
                Datenschutzerklärung
              </h1>
              <p className="text-xl text-neutral-200">
                Informationen zur Verarbeitung Ihrer personenbezogenen Daten
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-neutral-50 border-b border-neutral-200">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Sicherheit', desc: 'Ihre Daten sind geschützt' },
              { icon: Lock, title: 'Verschlüsselt', desc: 'SSL/TLS-Verschlüsselung' },
              { icon: Eye, title: 'Transparent', desc: 'Klare Informationen' },
              { icon: Cookie, title: 'Cookies', desc: 'Nur notwendige Cookies' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={index} delay={index * 0.1} animation="scale">
                  <div className="bg-white rounded-xl p-6 border border-neutral-200 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-3">
                      <Icon className="text-primary-600" size={24} />
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-neutral-600">{item.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white">
        <div className="container max-w-4xl">
          <div className="prose prose-neutral max-w-none">
            <AnimatedSection animation="slide-up">
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl text-neutral-900 mb-4">1. Datenschutz auf einen Blick</h2>
                  
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">Allgemeine Hinweise</h3>
                  <p className="text-neutral-600">
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                    personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten 
                    sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                  </p>

                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">Datenerfassung auf dieser Website</h3>
                  <p className="text-neutral-600 mb-2">
                    <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
                  </p>
                  <p className="text-neutral-600">
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen 
                    Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                  </p>

                  <p className="text-neutral-600 mb-2 mt-4">
                    <strong>Wie erfassen wir Ihre Daten?</strong>
                  </p>
                  <p className="text-neutral-600">
                    Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann 
                    es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                  </p>
                  <p className="text-neutral-600 mt-2">
                    Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch 
                    unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, 
                    Betriebssystem oder Uhrzeit des Seitenaufrufs).
                  </p>

                  <p className="text-neutral-600 mb-2 mt-4">
                    <strong>Wofür nutzen wir Ihre Daten?</strong>
                  </p>
                  <p className="text-neutral-600">
                    Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu 
                    gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                  </p>

                  <p className="text-neutral-600 mb-2 mt-4">
                    <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>
                  </p>
                  <p className="text-neutral-600">
                    Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck 
                    Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die 
                    Berichtigung oder Löschung dieser Daten zu verlangen.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl text-neutral-900 mb-4">2. Hosting</h2>
                  <p className="text-neutral-600">
                    Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
                  </p>
                  
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">Externes Hosting</h3>
                  <p className="text-neutral-600">
                    Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website 
                    erfasst werden, werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann 
                    es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, 
                    Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert 
                    werden, handeln.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl text-neutral-900 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
                  
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">Datenschutz</h3>
                  <p className="text-neutral-600">
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir 
                    behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen 
                    Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                  </p>

                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">Hinweis zur verantwortlichen Stelle</h3>
                  <p className="text-neutral-600">
                    Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                  </p>
                  <p className="text-neutral-600 mt-2">
                    DEHS GmbH<br />
                    Musterstraße 123<br />
                    12345 Musterstadt<br />
                    <br />
                    Telefon: +49 (0) 123 456 789<br />
                    E-Mail: info@dehs-heizung.de
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl text-neutral-900 mb-4">4. Datenerfassung auf dieser Website</h2>
                  
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">Cookies</h3>
                  <p className="text-neutral-600">
                    Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien und 
                    richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die 
                    Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem 
                    Endgerät gespeichert.
                  </p>

                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">Server-Log-Dateien</h3>
                  <p className="text-neutral-600">
                    Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten 
                    Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                  </p>
                  <ul className="list-disc pl-6 mt-2 text-neutral-600 space-y-1">
                    <li>Browsertyp und Browserversion</li>
                    <li>Verwendetes Betriebssystem</li>
                    <li>Referrer URL</li>
                    <li>Hostname des zugreifenden Rechners</li>
                    <li>Uhrzeit der Serveranfrage</li>
                    <li>IP-Adresse</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">Kontaktformular</h3>
                  <p className="text-neutral-600">
                    Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
                    Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung 
                    der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-2xl text-neutral-900 mb-4">5. Ihre Rechte</h2>
                  <p className="text-neutral-600">
                    Sie haben folgende Rechte:
                  </p>
                  <ul className="list-disc pl-6 mt-2 text-neutral-600 space-y-2">
                    <li>Recht auf Auskunft über Ihre gespeicherten Daten</li>
                    <li>Recht auf Berichtigung unrichtiger Daten</li>
                    <li>Recht auf Löschung Ihrer Daten</li>
                    <li>Recht auf Einschränkung der Datenverarbeitung</li>
                    <li>Recht auf Datenübertragbarkeit</li>
                    <li>Widerspruchsrecht gegen die Datenverarbeitung</li>
                    <li>Beschwerderecht bei der zuständigen Aufsichtsbehörde</li>
                  </ul>
                </div>

                <div className="mt-12 pt-8 border-t border-neutral-200">
                  <p className="text-sm text-neutral-500">
                    Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })}
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
