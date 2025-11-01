import { Trophy } from 'lucide-react';
import { achievementsData } from '@/lib/data';
import { MotionWrapper } from '@/components/motion-wrapper';

export function Achievements() {
  return (
    <section id="achievements" className="bg-secondary/50 py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <MotionWrapper amount={0.2} className="mb-20 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Our Achievements</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80 md:text-xl">
            Celebrating the milestones and successes of our talented members.
          </p>
        </MotionWrapper>

        <div className="relative">
          <div className="absolute left-4 h-full w-1 bg-border md:left-1/2 md:-translate-x-1/2" aria-hidden="true"></div>

          <div className="space-y-16">
            {achievementsData.map((item, index) => (
              <MotionWrapper key={index} amount={0.5} variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}>
                <div className="relative flex items-center md:justify-center">
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-10 md:pl-0`}>
                    <div className={`relative rounded-xl border bg-card p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl ${index % 2 === 0 ? 'md:text-right' : 'text-left'}`}>
                       <p className="text-sm font-semibold text-primary">{item.year}</p>
                      <h3 className="mt-1 text-xl font-bold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-foreground/70">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-4 top-1/2 z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-background bg-primary flex items-center justify-center md:left-1/2">
                    <Trophy className="h-4 w-4 text-primary-foreground"/>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
