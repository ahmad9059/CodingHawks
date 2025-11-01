'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { fieldsData } from '@/lib/data';
import type { Field } from '@/lib/types';
import { MotionWrapper } from '@/components/motion-wrapper';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

function FieldCard({ field }: { field: Field }) {
  return (
    <motion.div variants={itemVariants} className="h-full">
      <Card className="flex h-full transform-gpu flex-col items-start rounded-xl border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-primary/10 hover:-translate-y-1">
        <div className="mb-5 rounded-lg bg-primary/10 p-4">
          <field.icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-headline text-2xl font-semibold text-foreground">{field.title}</h3>
        <p className="mt-2 text-base text-foreground/70">
          {field.description}
        </p>
      </Card>
    </motion.div>
  );
}

export function Fields() {
  return (
    <section id="fields" className="bg-background py-20 lg:py-32">
       <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-secondary/50 to-transparent"></div>
      <div className="container mx-auto px-4 md:px-6">
        <MotionWrapper
            className="mb-16 text-center"
        >
          <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Our Fields of Expertise</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
            We offer specialized tracks to help our members grow in the most in-demand areas of technology.
          </p>
        </MotionWrapper>
        
        <motion.div 
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {fieldsData.map((field) => (
            <FieldCard key={field.title} field={field} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
