'use client';

import { Trophy } from 'lucide-react';
import { achievementsData } from '@/lib/data';
import { MotionWrapper } from '@/components/motion-wrapper';

export default function AchievementsPage() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 transform bg-border" aria-hidden="true"></div>

      <div className="space-y-16">
        {achievementsData.map((item, index) => (
          <MotionWrapper key={index} amount={0.5} variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}>
            <div className="relative flex items-center">
              {/* Content on the left */}
              <div className={`w-1/2 pr-8 ${index % 2 !== 0 ? 'order-last pl-8' : ''}`}>
                <div className="relative rounded-xl border bg-card p-6 text-left shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <p className="text-sm font-semibold text-primary">{item.year}</p>
                  <h3 className="mt-1 text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-foreground/70">{item.description}</p>
                </div>
              </div>

              {/* Icon in the middle */}
              <div className="absolute left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-background bg-primary">
                <Trophy className="h-4 w-4 text-primary-foreground" />
              </div>

              {/* Spacer on the right/left */}
              <div className="w-1/2"></div>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </div>
  );
}
