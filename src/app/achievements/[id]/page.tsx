'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { getAchievementById } from '@/lib/data';
import type { Achievement } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { MotionWrapper } from '@/components/motion-wrapper';

function AchievementDetailSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
      <div className="space-y-4 pt-8">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export default function AchievementDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      const data = await getAchievementById(id);
      setAchievement(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <AchievementDetailSkeleton />;
  }

  if (!achievement) {
    notFound();
  }

  return (
    <MotionWrapper>
      <article className="prose prose-lg mx-auto dark:prose-invert prose-headings:font-headline prose-p:text-foreground/80">
        <div className="space-y-2 not-prose">
           <p className="text-lg font-semibold text-primary">{achievement.year}</p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {achievement.title}
          </h1>
        </div>
        <div className="mt-8" dangerouslySetInnerHTML={{ __html: achievement.content }} />
      </article>
    </MotionWrapper>
  );
}
