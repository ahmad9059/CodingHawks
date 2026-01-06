"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MotionWrapper } from "@/components/motion-wrapper";
import { ArrowRight, Sparkles } from "lucide-react";
import * as LucideIcons from "lucide-react";

type Field = {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
};

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

function FieldCard({ field, index }: { field: Field; index: number }) {
  // Modern color schemes
  const colorSchemes = [
    {
      bg: "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/50 dark:to-purple-950/50",
      icon: "bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400",
      border: "border-violet-200/50 dark:border-violet-800/50",
      hover:
        "hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-violet-500/10",
    },
    {
      bg: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50",
      icon: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
      border: "border-blue-200/50 dark:border-blue-800/50",
      hover:
        "hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-blue-500/10",
    },
    {
      bg: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50",
      icon: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-200/50 dark:border-emerald-800/50",
      hover:
        "hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-emerald-500/10",
    },
    {
      bg: "bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/50 dark:to-amber-950/50",
      icon: "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400",
      border: "border-orange-200/50 dark:border-orange-800/50",
      hover:
        "hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-orange-500/10",
    },
    {
      bg: "bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/50 dark:to-rose-950/50",
      icon: "bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400",
      border: "border-pink-200/50 dark:border-pink-800/50",
      hover:
        "hover:border-pink-300 dark:hover:border-pink-700 hover:shadow-pink-500/10",
    },
    {
      bg: "bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50",
      icon: "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-200/50 dark:border-indigo-800/50",
      hover:
        "hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-indigo-500/10",
    },
  ];

  const scheme = colorSchemes[index % colorSchemes.length];
  const IconComponent = (LucideIcons as any)[field.icon] || LucideIcons.Code;

  return (
    <motion.div variants={itemVariants} className="group">
      <Card
        className={`relative h-full p-6 border-2 ${scheme.border} ${scheme.hover} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden`}
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 ${scheme.bg} opacity-60`}></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-xl ${scheme.icon} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
          >
            <IconComponent className="w-6 h-6" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#5D1A75] transition-colors duration-300">
            {field.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow">
            {field.description}
          </p>

          {/* Arrow indicator */}
          <div className="mt-4 flex items-center text-gray-400 group-hover:text-[#5D1A75] transition-colors duration-300">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function Fields({ fields }: { fields: Field[] }) {
  const activeFields = fields.filter((field) => field.isActive);

  return (
    <section
      id="fields"
      className="py-12 sm:py-16 lg:py-24 bg-gray-50/50 dark:bg-gray-900/50"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <MotionWrapper className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#5D1A75]/10 text-[#5D1A75] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            What We Offer
          </div>

          <h2
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-headline text-gray-900 dark:text-white mb-4 sm:mb-6"
            style={{ fontWeight: 700 }}
          >
            Our Fields of <span className="text-[#5D1A75]">Expertise</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
            We offer specialized tracks to help our members grow in the most
            in-demand areas of technology, with hands-on projects and
            industry-focused learning paths.
          </p>
        </MotionWrapper>

        <motion.div
          className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {activeFields.map((field, index) => (
            <FieldCard key={field.id} field={field} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
