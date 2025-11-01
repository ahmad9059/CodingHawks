"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

export function Loader() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5, delay: 0.5 } },
  };

  const iconVariants: Variants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
  };

  const textVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <motion.div
        variants={iconVariants}
        initial="initial"
        animate="animate"
        className="rounded-lg bg-transparent p-0 mb-6"
      >
        <Image
          src="/trans-2.png"
          alt="Loading"
          width={80}
          height={80}
          loading="eager"
          priority
          className="object-contain block"
        />
      </motion.div>
      <motion.div
        variants={textVariants}
        initial="initial"
        animate="animate"
        className="flex items-baseline"
      >
        <h1 className="text-3xl font-bold font-headline text-foreground">
          CodingHawks
        </h1>
        <div className="ml-2 flex gap-1">
          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ delay: 1, duration: 0.5, repeat: Infinity }}
            className="h-2 w-2 bg-primary rounded-full"
          />
          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ delay: 1.15, duration: 0.5, repeat: Infinity }}
            className="h-2 w-2 bg-primary rounded-full"
          />
          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ delay: 1.3, duration: 0.5, repeat: Infinity }}
            className="h-2 w-2 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
