'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { fieldsData } from '@/lib/data';
import type { Field } from '@/lib/types';

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
};

function FieldCard({ field }: { field: Field }) {
  return (
    <motion.div variants={itemVariants} className="h-full">
      <Card className="flex h-full flex-col items-start rounded-xl border-2 border-transparent bg-card p-6 shadow-lg transition-all duration-300 hover:border-primary hover:shadow-primary/20 hover:-translate-y-2">
        <div className="mb-4 rounded-full bg-primary/10 p-3">
          <field.icon className="h-8 w-8 text-primary" />
        </div>
        <CardHeader className="p-0">
          <CardTitle className="font-headline text-xl font-semibold">{field.title}</CardTitle>
        </CardHeader>
        <CardDescription className="mt-2 text-base text-foreground/70">
          {field.description}
        </CardDescription>
      </Card>
    </motion.div>
  );
}

export function Fields() {
  return (
    <section id="fields" className="bg-background/50 py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            className="mb-16 text-center"
        >
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">Our Fields of Expertise</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
            We offer specialized tracks to help our members grow in the most in-demand areas of technology.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
