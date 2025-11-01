'use client';

import { useEffect, useState } from 'react';
import { getAnnouncements } from '@/lib/data';
import type { Announcement } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { MotionWrapper } from '@/components/motion-wrapper';
import { AnnouncementCard } from '@/components/announcement-card';

function AnnouncementSkeleton() {
  return (
    <div className="flex flex-col space-y-4 rounded-xl border bg-card p-4 shadow">
      <Skeleton className="h-40 w-full rounded-lg" />
      <div className="flex-1 space-y-3 px-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex items-center gap-2 pt-2">
            <Skeleton className="h-6 w-24" />
        </div>
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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnnouncementSkeleton />
        <AnnouncementSkeleton />
        <AnnouncementSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {announcements.map((item, index) => (
        <MotionWrapper
          key={item.id}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } },
          }}
        >
          <AnnouncementCard announcement={item} />
        </MotionWrapper>
      ))}
    </div>
  );
}
