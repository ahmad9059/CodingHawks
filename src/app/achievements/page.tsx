import Link from "next/link";
import Image from "next/image";
import { Trophy, Award, Star, Medal, Crown } from "lucide-react";
import { MotionWrapper } from "@/components/motion-wrapper";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering
export const dynamic = "force-dynamic";

async function getAchievements() {
  return await prisma.achievement.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  const icons = [Trophy, Award, Star, Medal, Crown];
  const gradients = [
    "from-yellow-500/20 to-orange-500/20",
    "from-purple-500/20 to-pink-500/20",
    "from-blue-500/20 to-cyan-500/20",
    "from-green-500/20 to-emerald-500/20",
    "from-red-500/20 to-rose-500/20",
  ];
  const iconColors = [
    "text-yellow-600 dark:text-yellow-400",
    "text-purple-600 dark:text-purple-400",
    "text-blue-600 dark:text-blue-400",
    "text-green-600 dark:text-green-400",
    "text-red-600 dark:text-red-400",
  ];
  const borderColors = [
    "border-yellow-500/30 hover:border-yellow-500/60 hover:shadow-yellow-500/20",
    "border-purple-500/30 hover:border-purple-500/60 hover:shadow-purple-500/20",
    "border-blue-500/30 hover:border-blue-500/60 hover:shadow-blue-500/20",
    "border-green-500/30 hover:border-green-500/60 hover:shadow-green-500/20",
    "border-red-500/30 hover:border-red-500/60 hover:shadow-red-500/20",
  ];

  return (
    <div className="relative">
      {/* Enhanced timeline line with gradient */}
      <div
        className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 transform bg-gradient-to-b from-yellow-500/50 via-purple-500/50 to-blue-500/50 rounded-full"
        aria-hidden="true"
      ></div>

      <div className="space-y-20">
        {achievements.map((item, index) => {
          const IconComponent = icons[index % icons.length];
          const gradient = gradients[index % gradients.length];
          const iconColor = iconColors[index % iconColors.length];
          const borderColor = borderColors[index % borderColors.length];

          return (
            <MotionWrapper
              key={item.id}
              amount={0.3}
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
                },
              }}
            >
              <div className="relative flex items-center">
                {/* Left Side */}
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-12 text-right" : ""
                  }`}
                >
                  {index % 2 === 0 && (
                    <div className="transform transition-all duration-300 hover:scale-105 hover:-translate-x-2">
                      <Link
                        href={`/achievements/${item.id}`}
                        className="block group cursor-pointer"
                      >
                        <div
                          className={`relative ml-auto w-full max-w-md rounded-2xl border-2 ${borderColor} bg-card p-8 shadow-xl transition-all duration-500 hover:shadow-2xl overflow-hidden`}
                        >
                          {/* Background gradient effect */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                          ></div>

                          {/* Floating icon - positioned behind content */}
                          <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500 z-0">
                            <IconComponent className="h-16 w-16 text-primary/30" />
                          </div>

                          {/* Image if available */}
                          {item.imageUrl && (
                            <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg">
                              <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          )}

                          <div className="relative z-20">
                            <div className="flex items-center justify-end gap-2 mb-3">
                              <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                {item.year}
                              </span>
                            </div>

                            <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                              {item.title}
                            </h3>

                            <p className="text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300 mb-4">
                              {item.description}
                            </p>

                            {/* Bottom accent line */}
                            <div className="h-1 w-0 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-500 rounded-full ml-auto"></div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Enhanced Icon in the middle */}
                <div className="absolute left-1/2 z-20 -translate-x-1/2 transform group">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br ${gradient} shadow-xl transition-all duration-500 hover:scale-110 hover:rotate-12`}
                  >
                    <IconComponent className={`h-8 w-8 ${iconColor}`} />
                  </div>
                  {/* Pulsing ring effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse"></div>
                </div>

                {/* Right Side */}
                <div
                  className={`w-1/2 ${
                    index % 2 !== 0 ? "pl-12 text-left" : ""
                  }`}
                >
                  {index % 2 !== 0 && (
                    <div className="transform transition-all duration-300 hover:scale-105 hover:translate-x-2">
                      <Link
                        href={`/achievements/${item.id}`}
                        className="block group cursor-pointer"
                      >
                        <div
                          className={`relative mr-auto w-full max-w-md rounded-2xl border-2 ${borderColor} bg-card p-8 shadow-xl transition-all duration-500 hover:shadow-2xl overflow-hidden`}
                        >
                          {/* Background gradient effect */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                          ></div>

                          {/* Floating icon - positioned behind content */}
                          <div className="absolute top-4 left-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500 z-0">
                            <IconComponent className="h-16 w-16 text-primary/30" />
                          </div>

                          {/* Image if available */}
                          {item.imageUrl && (
                            <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg">
                              <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          )}

                          <div className="relative z-20">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                {item.year}
                              </span>
                            </div>

                            <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                              {item.title}
                            </h3>

                            <p className="text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300 mb-4">
                              {item.description}
                            </p>

                            {/* Bottom accent line */}
                            <div className="h-1 w-0 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-500 rounded-full"></div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </MotionWrapper>
          );
        })}
      </div>

      {/* Empty state */}
      {achievements.length === 0 && (
        <MotionWrapper className="text-center py-20">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center">
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              No Achievements Yet
            </h3>
            <p className="text-foreground/70 max-w-md mx-auto">
              Great achievements are on the way! Check back soon to see our
              milestones.
            </p>
          </div>
        </MotionWrapper>
      )}
    </div>
  );
}
