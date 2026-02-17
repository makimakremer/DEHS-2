'use client';

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestimonialProps {
  name: string;
  company: string;
  text: string;
  rating: number;
  delay?: number;
}

export function Testimonial({ name, company, text, rating, delay = 0 }: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-2xl p-8 border border-white/20 h-full flex flex-col"
    >
      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < rating ? 'fill-accent-400 text-accent-400' : 'text-neutral-300'}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-white mb-6 flex-grow italic">
        &ldquo;{text}&rdquo;
      </p>

      {/* Author */}
      <div className="pt-4 border-t border-white/20">
        <p className="font-semibold text-white">{name}</p>
        <p className="text-sm text-neutral-200">{company}</p>
      </div>
    </motion.div>
  );
}
