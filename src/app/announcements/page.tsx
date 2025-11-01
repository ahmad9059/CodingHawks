'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { getAnnouncements } from '@/lib/data';
import type { Announcement } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { MotionWrapper } from '@/components/motion-wrapper';
import { Card } from '@/components/ui/card';

function AnnouncementSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[250px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getAnnouncements();
      setAnnouncements(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl space-y-8">
        <AnnouncementSkeleton />
        <AnnouncementSkeleton />
        <AnnouncementSkeleton />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-12">
        {announcements.map((item, index) => (
          <MotionWrapper 
            key={item.id} 
            amount={0.3} 
            variants={{ 
              hidden: { opacity: 0, y: 50 }, 
              visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } } 
            }}
          >
            <Link href={`/announcements/${item.id}`} className="block">
              <Card className="transform-gpu p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <p className="text-sm font-semibold text-primary">
                    {format(new Date(item.date), 'MMMM d, yyyy')}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-lg text-foreground/70">{item.description}</p>
              </Card>
            </Link>
          </MotionWrapper>
        ))}
      </div>
    </div>
  );
}
