'use client';
import Link from 'next/link';
import { Trophy } from 'lucide-react';
import { achievementsData } from '@/lib/data';
import { MotionWrapper } from '@/components/motion-wrapper';

export default function AchievementsPage() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 transform bg-border" aria-hidden="true"></div>

      <div className="space-y-16">
        {achievementsData.map((item, index) => (
          <MotionWrapper key={item.id} amount={0.5} variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}>
            <div className="relative flex items-center">
              {/* Content */}
              <div className={`flex w-1/2 ${index % 2 === 0 ? 'justify-end pr-8' : 'pl-8'}`}>
                 <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <Link href={`/achievements/${item.id}`} className="block">
                        <div className="relative inline-block w-full max-w-md rounded-xl border bg-card p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                          <p className="text-sm font-semibold text-primary">{item.year}</p>
                          <h3 className="mt-1 text-xl font-bold text-foreground">{item.title}</h3>
                          <p className="mt-2 text-foreground/70">{item.description}</p>
                        </div>
                    </Link>
                 </div>
              </div>

              {/* Icon in the middle */}
              <div className="absolute left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-background bg-primary">
                <Trophy className="h-4 w-4 text-primary-foreground" />
              </div>

              {/* Spacer on the other side */}
              <div className="w-1/2"></div>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </div>
  );
}
