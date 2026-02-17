'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection, Badge, Button } from '@/components/ui';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefon',
    content: '+49 (0) 123 456 789',
    description: 'Mo-Fr 8:00-17:00 Uhr',
  },
  {
    icon: Mail,
    title: 'E-Mail',
    content: 'info@dehs-heizung.de',
    description: 'Wir antworten innerhalb 24h',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    content: 'Musterstraße 123',
    description: '12345 Musterstadt',
  },
  {
    icon: Clock,
    title: 'Öffnungszeiten',
    content: 'Mo-Fr 8:00-17:00',
    description: 'Sa 9:00-12:00',
  },
];

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    alert('Vielen Dank für Ihre Nachricht! Wir melden uns in Kürze bei Ihnen.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="container relative z-10">
          <AnimatedSection animation="slide-up">
            <div className="max-w-3xl">
              <Badge variant="accent">Kontakt</Badge>
              <h1 className="font-display text-display-lg mb-6 text-white mt-4">
                Wir sind für Sie da
              </h1>
              <p className="text-xl text-neutral-200">
                Haben Sie Fragen zu unserem Sortiment oder benötigen Sie eine Beratung? 
                Unser Team steht Ihnen gerne zur Verfügung.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-neutral-50">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <AnimatedSection key={index} delay={index * 0.1} animation="slide-up">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 h-full"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                      <Icon size={24} className="text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-2">{info.title}</h3>
                    <p className="text-primary-600 font-medium mb-1">{info.content}</p>
                    <p className="text-sm text-neutral-600">{info.description}</p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection animation="slide-up">
              <div className="max-w-xl">
                <h2 className="font-display text-display-sm text-neutral-900 mb-4">
                  Schreiben Sie uns
                </h2>
                <p className="text-neutral-600 mb-8">
                  Füllen Sie einfach das Formular aus und wir melden uns schnellstmöglich bei Ihnen.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
                        Firma
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      Nachricht *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all resize-none"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" icon={Send} className="w-full md:w-auto">
                    Nachricht senden
                  </Button>
                </form>
              </div>
            </AnimatedSection>

            {/* Map Placeholder */}
            <AnimatedSection animation="slide-up" delay={0.2}>
              <div className="h-full min-h-[500px] bg-neutral-100 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin size={48} className="text-neutral-400 mx-auto mb-4" />
                    <p className="text-neutral-600 font-medium mb-2">DEHS GmbH</p>
                    <p className="text-neutral-500 text-sm">Musterstraße 123</p>
                    <p className="text-neutral-500 text-sm">12345 Musterstadt</p>
                  </div>
                </div>
                {/* In production, integrate Google Maps or similar */}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
