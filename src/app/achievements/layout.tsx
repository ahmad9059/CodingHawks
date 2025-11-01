import { MotionWrapper } from "@/components/motion-wrapper";

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <MotionWrapper>
          <div className="mb-12 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Our Achievements
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80 md:text-xl">
              Celebrating the milestones and successes of our talented members.
            </p>
          </div>
        </MotionWrapper>
        {children}
      </div>
    </div>
  );
}
