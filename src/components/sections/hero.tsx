"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackgroundSlider } from "@/components/ui/background-slider";
import { ArrowRight, Code, Users, Trophy, Star } from "lucide-react";
import { useEffect, useState } from "react";

type SliderImage = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  order: number;
  isActive: boolean;
};

export function Hero({ sliderImages }: { sliderImages: SliderImage[] }) {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use slider images from database, fallback to local images if none available
  const backgroundImages =
    sliderImages.length > 0
      ? sliderImages.map((img) => img.imageUrl)
      : [
          "/ch/ch-1.webp",
          "/ch/ch-2.webp",
          "/ch/ch-3.webp",
          "/ch/ch-4.webp",
          "/ch/ch-5.webp",
          "/ch/ch-6.webp",
          "/ch/ch-7.webp",
          "/ch/ch-8.webp",
        ];

  const features = [
    { icon: Code, text: "Learn to Code" },
    { icon: Users, text: "Join Community" },
    { icon: Trophy, text: "Win Competitions" },
  ];

  return (
    <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden bg-background -mt-20 pt-20 py-16 text-center">
      {/* Background Image Slider */}
      <BackgroundSlider
        images={backgroundImages}
        interval={6000}
        className="z-0"
      />

      {/* Animated particles */}
      {isClient && (
        <div className="absolute inset-0 z-[2]">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
              }}
              animate={{
                y: [null, -100, dimensions.height + 100],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center p-4 max-w-5xl mx-auto">
        {/* Badge with sparkle animation */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 relative"
        >
          <div className="rounded-full border border-white/30 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md px-6 py-2 text-sm font-medium text-white shadow-xl">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-purple-300 fill-purple-300" />
              Fueling Creativity, Collaboration, and Coding Excellence
              <Star className="h-4 w-4 text-purple-300 fill-purple-300" />
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl -z-10" />
        </motion.div>

        {/* Main title with enhanced styling */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-headline text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6"
        >
          <span className="bg-gradient-to-r from-white via-purple-200 to-zinc-100 bg-clip-text text-transparent drop-shadow-2xl">
            Coding Hawks
          </span>
          <br />
          <span className="text-white/90 drop-shadow-2xl">Society</span>
        </motion.h1>

        {/* Subtitle with typewriter effect */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-4 max-w-3xl text-xl md:text-2xl text-white/95 drop-shadow-lg font-light leading-relaxed"
        >
          Empowering the next generation of{" "}
          <span className="font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            innovative coders
          </span>{" "}
          at MNS-University of Agriculture, Multan.
        </motion.p>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-8 flex flex-wrap justify-center gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-white/90 border border-white/20"
            >
              <feature.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="mt-12 flex flex-col sm:flex-row gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            <Button
              asChild
              size="lg"
              className="relative rounded-xl px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-500/25 border-0 overflow-hidden"
            >
              <Link href="/#join-us">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl px-8 py-4 text-lg font-semibold bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 shadow-xl"
            >
              <Link href="/#about" className="flex items-center gap-2">
                Learn More
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <div className="h-6 w-4 rounded-full border-2 border-white/40 flex justify-center">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-2 bg-white/60 rounded-full mt-1"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
