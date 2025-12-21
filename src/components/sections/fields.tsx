"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MotionWrapper } from "@/components/motion-wrapper";
import { Sparkles } from "lucide-react";
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
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

function FieldCard({ field, index }: { field: Field; index: number }) {
  const gradients = [
    "from-purple-500/10 to-indigo-500/10",
    "from-blue-500/10 to-cyan-500/10",
    "from-green-500/10 to-emerald-500/10",
    "from-orange-500/10 to-red-500/10",
    "from-pink-500/10 to-rose-500/10",
    "from-violet-500/10 to-purple-500/10",
  ];

  const iconColors = [
    "text-purple-600 dark:text-purple-400",
    "text-blue-600 dark:text-blue-400",
    "text-green-600 dark:text-green-400",
    "text-orange-600 dark:text-orange-400",
    "text-pink-600 dark:text-pink-400",
    "text-violet-600 dark:text-violet-400",
  ];

  const borderColors = [
    "hover:border-purple-500/50 hover:shadow-purple-500/20",
    "hover:border-blue-500/50 hover:shadow-blue-500/20",
    "hover:border-green-500/50 hover:shadow-green-500/20",
    "hover:border-orange-500/50 hover:shadow-orange-500/20",
    "hover:border-pink-500/50 hover:shadow-pink-500/20",
    "hover:border-violet-500/50 hover:shadow-violet-500/20",
  ];

  const gradient = gradients[index % gradients.length];
  const iconColor = iconColors[index % iconColors.length];
  const borderColor = borderColors[index % borderColors.length];

  // Get the icon component from Lucide
  const IconComponent = (LucideIcons as any)[field.icon] || LucideIcons.Code;

  return (
    <motion.div
      variants={itemVariants}
      className="h-full group"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card
        className={`relative flex h-full transform-gpu flex-col items-start rounded-2xl border-2 bg-card p-8 shadow-lg transition-all duration-500 ${borderColor} hover:shadow-2xl overflow-hidden`}
      >
        {/* Background gradient effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        ></div>

        {/* Floating sparkle effect */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Sparkles className="h-5 w-5 text-primary/60" />
        </div>

        <div className="relative z-10 w-full">
          <div
            className={`mb-6 rounded-2xl bg-gradient-to-br ${gradient} p-4 w-fit group-hover:scale-110 transition-transform duration-300`}
          >
            <IconComponent
              className={`h-10 w-10 ${iconColor} group-hover:animate-pulse`}
            />
          </div>

          <h3 className="font-headline text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {field.title}
          </h3>

          <p className="text-base text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
            {field.description}
          </p>

          {/* Bottom accent line */}
          <div className="mt-6 h-1 w-0 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-500 rounded-full"></div>
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
      className="relative bg-background py-20 lg:py-32 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/3 to-blue-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <MotionWrapper className="mb-20 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              Expertise Areas
            </div>

            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Our Fields of{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/80 md:text-xl leading-relaxed">
              We offer specialized tracks to help our members grow in the most
              in-demand areas of technology, with hands-on projects and
              industry-focused learning paths.
            </p>
          </div>
        </MotionWrapper>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
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
