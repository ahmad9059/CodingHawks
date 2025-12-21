"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Users, Sparkles } from "lucide-react";

export function JoinUs() {
  const googleFormUrl = "https://docs.google.com/forms"; // Placeholder URL

  return (
    <section
      id="join-us"
      className="relative overflow-hidden py-20 lg:py-32"
      style={{ backgroundColor: "#5D1A75" }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-purple-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/10 to-transparent"></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-500"></div>

        {/* Code-like pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-20 text-white/20 font-mono text-sm">
            {'{ coding: "future" }'}
          </div>
          <div className="absolute bottom-32 right-32 text-white/20 font-mono text-sm">
            {'console.log("innovation");'}
          </div>
          <div className="absolute top-1/3 right-20 text-white/20 font-mono text-sm">
            {"function() { return success; }"}
          </div>
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0 },
        }}
        className="container relative z-10 mx-auto px-4 text-center md:px-6"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-white border border-white/20">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            Join Our Community
            <Sparkles className="h-4 w-4 text-yellow-300" />
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h2
          className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Ready to{" "}
          <span className="bg-gradient-to-r from-zinc-300 via-c-300 to-cyan-300 bg-clip-text text-transparent">
            Code the Future?
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="mx-auto max-w-3xl text-lg text-white/90 md:text-xl leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Become a part of our growing community of innovators and
          problem-solvers. Enhance your skills, work on exciting projects, and
          connect with like-minded peers who share your passion for technology
          and innovation.
        </motion.p>

        {/* Feature highlights */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            { icon: Code, text: "Hands-on Projects" },
            { icon: Users, text: "Collaborative Learning" },
            { icon: Sparkles, text: "Innovation Focus" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-white/90 border border-white/20"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.15)",
              }}
              transition={{ duration: 0.2 }}
            >
              <feature.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <Button
              asChild
              size="lg"
              className="relative rounded-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-2xl shadow-yellow-500/25 border-0 overflow-hidden"
            >
              <Link
                href={googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span className="relative z-10">Apply to Join</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500/50 to-orange-500/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-110"></div>
          </motion.div>
        </motion.div>

        {/* Bottom decorative text */}
        <motion.p
          className="mt-8 text-sm text-white/60 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Join 500+ passionate developers already building the future
        </motion.p>
      </motion.div>
    </section>
  );
}
