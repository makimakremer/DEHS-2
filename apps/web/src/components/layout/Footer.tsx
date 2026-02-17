'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Linkedin, Instagram, Youtube, Mail } from 'lucide-react';

const productLinks = [
  { name: 'Wärmepumpen', href: '/produkte/waermepumpen' },
  { name: 'Gasheizungen', href: '/produkte/gasheizungen' },
  { name: 'Solarthermie', href: '/produkte/solarthermie' },
  { name: 'Pelletheizungen', href: '/produkte/pelletheizungen' },
];

const serviceLinks = [
  { name: 'Kontakt', href: '/kontakt' },
  { name: 'Über uns', href: '/ueber-uns' },
  { name: 'Support', href: '/kontakt' },
];

const legalLinks = [
  { name: 'Impressum', href: '/impressum' },
  { name: 'Datenschutz', href: '/datenschutz' },
  { name: 'AGB', href: '/agb' },
];

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export function Footer() {
  const [email, setEmail] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-900 text-white relative">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 right-8 md:right-16 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors group"
        aria-label="Zurück nach oben"
      >
        <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
      </button>

      <div className="container py-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold font-display mb-4">DEHS</h3>
            <p className="text-sm text-neutral-400 mb-6">
              Ihr zuverlässiger Partner für Heizungstechnik seit 1985. Innovative Lösungen für Fachbetriebe.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-white">Newsletter</h4>
              <p className="text-sm text-neutral-400 mb-3">
                Bleiben Sie auf dem Laufenden über neue Produkte und Angebote.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ihre E-Mail"
                  className="flex-1 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
                <button className="px-6 py-2 bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center gap-2">
                  <Mail size={18} />
                  <span className="hidden sm:inline">Anmelden</span>
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-3 text-white">Folgen Sie uns</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                      aria-label={social.name}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Produkte</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href as any}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Service</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href as any}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Rechtliches</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href as any}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-800 text-center">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} DEHS GmbH. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
