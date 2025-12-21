import { Trophy, ArrowRight, Award, Star, Medal, Crown } from "lucide-react";
import Link from "next/link";
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

export function Achievements({
  achievements,
}: {
  achievements: Achievement[];
}) {
  const activeAchievements = achievements.filter(
    (achievement) => achievement.isActive
  );
  const featuredAchievements = activeAchievements.slice(0, 4);

  const icons = [Trophy, Award, Star, Medal, Crown];

  const gradients = [
    "from-yellow-500/20 to-orange-500/20",
    "from-purple-500/20 to-pink-500/20",
    "from-blue-500/20 to-cyan-500/20",
    "from-green-500/20 to-emerald-500/20",
  ];

  const iconColors = [
    "text-yellow-600 dark:text-yellow-400",
    "text-purple-600 dark:text-purple-400",
    "text-blue-600 dark:text-blue-400",
    "text-green-600 dark:text-green-400",
  ];

  const borderColors = [
    "border-yellow-500/30 hover:border-yellow-500/60 hover:shadow-yellow-500/20",
    "border-purple-500/30 hover:border-purple-500/60 hover:shadow-purple-500/20",
    "border-blue-500/30 hover:border-blue-500/60 hover:shadow-blue-500/20",
    "border-green-500/30 hover:border-green-500/60 hover:shadow-green-500/20",
  ];

  return (
    <section
      id="achievements"
      className="relative bg-gradient-to-b from-background to-secondary/20 py-20 lg:py-32 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/3 to-green-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <MotionWrapper amount={0.2} className="mb-20 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-600 dark:text-yellow-400 mb-4">
              <Trophy className="h-4 w-4" />
              Hall of Fame
            </div>

            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Our{" "}
              <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Achievements
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/80 md:text-xl leading-relaxed">
              Celebrating the milestones and successes of our talented members
              who continue to push boundaries and achieve excellence in
              technology.
            </p>
          </div>
        </MotionWrapper>

        <div className="relative">
          {/* Enhanced timeline line with gradient */}
          <div
            className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 transform bg-gradient-to-b from-yellow-500/50 via-purple-500/50 to-blue-500/50 rounded-full"
            aria-hidden="true"
          ></div>

          <div className="space-y-20">
            {featuredAchievements.map((item, index) => {
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
                          <div className="block group">
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

                              <div className="relative z-20">
                                <div className="flex items-center justify-end gap-2 mb-3">
                                  <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                    {item.year}
                                  </span>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                                  {item.title}
                                </h3>
                                <p className="text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                                  {item.description}
                                </p>

                                {/* Bottom accent line */}
                                <div className="mt-4 h-1 w-0 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-500 rounded-full ml-auto"></div>
                              </div>
                            </div>
                          </div>
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
                          <div className="block group">
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

                              <div className="relative z-20">
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                    {item.year}
                                  </span>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                                  {item.title}
                                </h3>
                                <p className="text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                                  {item.description}
                                </p>

                                {/* Bottom accent line */}
                                <div className="mt-4 h-1 w-0 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-500 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </MotionWrapper>
              );
            })}
          </div>
        </div>

        <MotionWrapper className="mt-24 text-center">
          <div className="transform transition-all duration-300 hover:scale-105">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 shadow-xl shadow-yellow-500/25"
            >
              <Link href="/achievements" className="flex items-center gap-2">
                View All Achievements
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
