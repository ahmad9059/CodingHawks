import { Trophy } from "lucide-react";
import { MotionWrapper } from "@/components/motion-wrapper";

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative bg-gradient-to-b from-background to-secondary/20 py-20 lg:py-32 overflow-hidden">
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
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Our{" "}
              <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Achievements
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/80 md:text-xl leading-relaxed">
              Celebrating the milestones and successes of our talented members
              who continue to push boundaries and achieve excellence in
              technology.
            </p>
          </div>
        </MotionWrapper>
        {children}
      </div>
    </section>
  );
}
