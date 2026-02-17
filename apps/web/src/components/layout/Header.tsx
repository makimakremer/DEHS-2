'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'Produkte', href: '/produkte' },
  { name: 'Über uns', href: '/ueber-uns' },
  { name: 'Kontakt', href: '/kontakt' },
];

const categories = [
  { name: 'Wärmepumpen', href: '/produkte/waermepumpen' },
  { name: 'Gasheizungen', href: '/produkte/gasheizungen' },
  { name: 'Solarthermie', href: '/produkte/solarthermie' },
  { name: 'Pelletheizungen', href: '/produkte/pelletheizungen' },
  { name: 'Speicher', href: '/produkte/speicher' },
  { name: 'Zubehör', href: '/produkte/zubehoer' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md border-b border-neutral-200'
          : 'bg-transparent border-b border-white/20'
      }`}
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`text-2xl font-bold font-display transition-colors ${
              isScrolled ? 'text-primary-600' : 'text-white'
            }`}
          >
            DEHS
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href as any}
                className={`text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'text-neutral-700 hover:text-primary-600'
                    : 'text-white hover:text-accent-300'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'text-neutral-700 hover:text-primary-600'
                    : 'text-white hover:text-accent-300'
                }`}
              >
                Kategorien
                <ChevronDown size={16} className={isCategoriesOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </button>

              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-neutral-200 bg-white py-2 shadow-lg"
                  >
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href as any}
                        onClick={() => setIsCategoriesOpen(false)}
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href={"/anmelden" as any}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isScrolled
                  ? 'border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
                  : 'border border-white text-white hover:bg-white hover:text-primary-600'
              }`}
            >
              Anmelden
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? 'text-neutral-700' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl md:hidden z-50"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                <span className="text-2xl font-bold text-primary-600 font-display">DEHS</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-neutral-700"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href as any}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}

                  {/* Mobile Categories */}
                  <div className="pt-4 mt-4 border-t border-neutral-200">
                    <p className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                      Kategorien
                    </p>
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href as any}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 rounded-lg text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="p-4 border-t border-neutral-200">
                <Link
                  href={"/anmelden" as any}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 text-center rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
                >
                  Anmelden
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
