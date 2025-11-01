import { Trophy, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { achievementsData } from '@/lib/data';
import { MotionWrapper } from '@/components/motion-wrapper';
import { Button } from '@/components/ui/button';

export function Achievements() {
  const featuredAchievements = achievementsData.slice(0, 4);

  return (
    <section id="achievements" className="bg-secondary/30 py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <MotionWrapper amount={0.2} className="mb-20 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Our Achievements</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
            Celebrating the milestones and successes of our talented members.
          </p>
        </MotionWrapper>

        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 transform bg-border" aria-hidden="true"></div>

          <div className="space-y-16">
            {featuredAchievements.map((item, index) => (
              <MotionWrapper key={index} amount={0.5} variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}>
                <div className="relative flex items-center">
                   <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    {index % 2 === 0 && (
                      <div className="relative rounded-xl border bg-card p-6 text-right shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                        <p className="text-sm font-semibold text-primary">{item.year}</p>
                        <h3 className="mt-1 text-xl font-bold text-foreground">{item.title}</h3>
                        <p className="mt-2 text-foreground/70">{item.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="absolute left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-background bg-primary">
                    <Trophy className="h-4 w-4 text-primary-foreground"/>
                  </div>
                  
                   <div className={`w-1/2 ${index % 2 !== 0 ? 'pr-8' : 'pl-8'}`}>
                    {index % 2 !== 0 && (
                      <div className="relative rounded-xl border bg-card p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                        <p className="text-sm font-semibold text-primary">{item.year}</p>
                        <h3 className="mt-1 text-xl font-bold text-foreground">{item.title}</h3>
                        <p className="mt-2 text-foreground/70">{item.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
        <MotionWrapper className="mt-20 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="/achievements">
              View All Achievements
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </MotionWrapper>
      </div>
    </section>
  );
}
