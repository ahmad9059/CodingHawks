'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function JoinUs() {
  const googleFormUrl = "https://docs.google.com/forms"; // Placeholder URL

  return (
    <section id="join-us" className="bg-gradient-to-br from-primary to-accent py-20 lg:py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        className="container mx-auto px-4 text-center text-primary-foreground md:px-6"
      >
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Ready to Code the Future?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90 md:text-xl">
          Become a part of our growing community of innovators and problem-solvers. Enhance your skills, work on exciting projects, and connect with like-minded peers.
        </p>
        <motion.div
          className="mt-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link href={googleFormUrl} target="_blank" rel="noopener noreferrer">
              Apply to Join
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
