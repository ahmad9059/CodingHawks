import { Trophy } from 'lucide-react';
import { achievementsData } from '@/lib/data';
import { MotionWrapper } from '@/components/motion-wrapper';

export function Achievements() {
  return (
    <section id="achievements" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <MotionWrapper amount={0.2} className="mb-16 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">Our Achievements</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
            Celebrating the milestones and successes of our talented members.
          </p>
        </MotionWrapper>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border" aria-hidden="true"></div>

          <div className="space-y-16">
            {achievementsData.map((item, index) => (
              <MotionWrapper key={index} amount={0.5}>
                <div className="relative flex items-center">
                  <div className={`flex w-1/2 ${index % 2 === 0 ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
                    <div className={`w-full max-w-sm rounded-lg bg-card p-6 shadow-lg ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <p className="text-sm font-semibold text-primary">{item.year}</p>
                      <h3 className="mt-1 text-xl font-bold">{item.title}</h3>
                      <p className="mt-2 text-foreground/70">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 top-1/2 z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-background bg-primary flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-primary-foreground"/>
                  </div>

                  {/* Empty div for spacing on the other side */}
                  <div className="w-1/2"></div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
