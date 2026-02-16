'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

type Animation = 'fade' | 'slide-up' | 'slide-left' | 'scale';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  className?: string;
}

const animations = {
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  'slide-up': { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
  'slide-left': { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } },
};

export function AnimatedSection({
  children,
  animation = 'slide-up',
  delay = 0,
  className = '',
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={animations[animation].initial}
      animate={isInView ? animations[animation].animate : animations[animation].initial}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
