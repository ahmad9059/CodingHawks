'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import type React from 'react';

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  amount?: number;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function MotionWrapper({
  children,
  className,
  variants = defaultVariants,
  amount = 0.3,
}: MotionWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
