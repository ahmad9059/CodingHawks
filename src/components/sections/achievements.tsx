"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Calendar,
  Award,
  Star,
  Medal,
  Crown,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MotionWrapper } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";

type Achievement = {
  id: string;
  title: string;
  description: string;
  year: string;
  imageUrl: string | null;
  order: number;
  isActive: boolean;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function TimelineItem({
  achievement,
  index,
}: {
  achievement: Achievement;
  index: number;
}) {
  const icons = [Trophy, Award, Star, Medal, Crown];
  const IconComponent = icons[index % icons.length];
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      variants={itemVariants}
      className="relative flex items-center w-full"
    >
      {/* Timeline content */}
      <div
        className={`w-1/2 ${
          isLeft ? "pr-8 text-right" : "pl-8 text-left order-2"
        }`}
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
          {/* Image */}
          {achievement.imageUrl && (
            <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
              <Image
                src={achievement.imageUrl}
                alt={achievement.title}
                width={400}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Year badge */}
          <div
            className={`inline-flex items-center gap-2 bg-[#5D1A75]/10 text-[#5D1A75] px-3 py-1 rounded-full text-sm font-medium mb-3 ${
              isLeft ? "ml-auto" : ""
            }`}
          >
            <Calendar className="w-3 h-3" />
            {achievement.year}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {achievement.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {achievement.description}
          </p>
        </div>
      </div>

      {/* Timeline icon */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-12 h-12 bg-[#5D1A75] rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-900">
          <IconComponent className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Empty space for alternating layout */}
      <div className={`w-1/2 ${isLeft ? "order-2" : ""}`}></div>
    </motion.div>
  );
}

export function Achievements({
  achievements,
}: {
  achievements: Achievement[];
}) {
  const activeAchievements = achievements.filter(
    (achievement) => achievement.isActive
  );
  const featuredAchievements = activeAchievements.slice(0, 6);

  return (
    <section
      id="achievements"
      className="py-16 lg:py-24 bg-gray-50/50 dark:bg-gray-900/50"
    >
      <div className="container mx-auto px-4 md:px-6">
        <MotionWrapper className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#5D1A75]/10 text-[#5D1A75] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Trophy className="w-4 h-4" />
            Hall of Fame
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-headline text-gray-900 dark:text-white mb-6"
            style={{ fontWeight: 700 }}
          >
            Our <span className="text-[#5D1A75]">Achievements</span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Celebrating the milestones and successes of our talented members who
            continue to push boundaries and achieve excellence in technology.
          </p>
        </MotionWrapper>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#5D1A75]/20 via-[#5D1A75]/50 to-[#5D1A75]/20"></div>

          <motion.div
            className="space-y-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {featuredAchievements.map((achievement, index) => (
              <TimelineItem
                key={achievement.id}
                achievement={achievement}
                index={index}
              />
            ))}
          </motion.div>
        </div>

        <MotionWrapper className="text-center mt-16">
          <Button
            asChild
            size="lg"
            className="bg-[#5D1A75] hover:bg-[#5D1A75]/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <Link href="/achievements" className="flex items-center gap-2">
              View All Achievements
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </MotionWrapper>
      </div>
    </section>
  );
}
