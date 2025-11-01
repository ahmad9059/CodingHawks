'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function JoinUs() {
  const googleFormUrl = "https://docs.google.com/forms"; // Placeholder URL

  return (
    <section id="join-us" className="relative overflow-hidden bg-background py-20 lg:py-32">
       <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-t from-background via-background to-secondary/10"></div>
       </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        className="container relative z-10 mx-auto px-4 text-center md:px-6"
      >
        <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Ready to Code the Future?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl">
          Become a part of our growing community of innovators and problem-solvers. Enhance your skills, work on exciting projects, and connect with like-minded peers.
        </p>
        <motion.div
          className="mt-10"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/30">
            <Link href={googleFormUrl} target="_blank" rel="noopener noreferrer">
              Apply to Join
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
