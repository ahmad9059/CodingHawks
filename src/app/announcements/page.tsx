'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { getAnnouncements } from '@/lib/data';
import type { Announcement } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { MotionWrapper } from '@/components/motion-wrapper';

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
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnnouncementSkeleton />
        <AnnouncementSkeleton />
        <AnnouncementSkeleton />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 transform bg-border" aria-hidden="true"></div>

      <div className="space-y-16">
        {announcements.map((item, index) => (
          <MotionWrapper key={item.id} amount={0.5} variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}>
            <div className="relative flex items-center">
              {/* Content */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                 <Link href={`/announcements/${item.id}`} className="block">
                    <div className="relative inline-block w-full max-w-md rounded-xl border bg-card p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                      <p className="text-sm font-semibold text-primary">
                        {format(new Date(item.date), 'MMMM d, yyyy')}
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-foreground/70">{item.description}</p>
                    </div>
                  </Link>
              </div>

              {/* Icon in the middle */}
              <div className="absolute left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-background bg-primary">
                <Calendar className="h-4 w-4 text-primary-foreground" />
              </div>

              {/* Spacer */}
              <div className="w-1/2"></div>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </div>
  );
}
