"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-background -mt-20 pt-20 py-16 text-center md:min-h-[95vh]">
      {/* Dotted Grid Pattern Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          opacity: 0.15,
        }}
      />

      <div className="absolute inset-0 z-0 bg-gradient-to-t from-transparent via-transparent to-primary/10 dark:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] dark:from-transparent dark:via-background dark:to-primary/20"></div>

      <div className="relative z-10 flex flex-col items-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 rounded-full border border-border/60 bg-secondary/50 px-4 py-1.5 text-sm font-medium text-secondary-foreground shadow-sm"
        >
          Fueling Creativity, Collaboration, and Coding Excellence
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl"
        >
          Coding Hawks Society
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-lg text-foreground/70 md:text-xl"
        >
          Empowering the next generation of coders at MNS-University of
          Agriculture, Multan.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="rounded-lg shadow-lg shadow-primary/30"
            >
              <Link href="/#join-us">Get Started</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" variant="ghost" className="rounded-lg">
              <Link href="/#about">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
