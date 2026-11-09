import React from 'react';
import { motion } from 'framer-motion';

/* Gentle fade-up when a block scrolls into view. */
export default function Reveal({ children, delay = 0, className = '', as = 'div', y = 26 }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </M>
  );
}
