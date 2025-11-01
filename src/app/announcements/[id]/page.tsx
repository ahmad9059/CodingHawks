'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { getAnnouncementById } from '@/lib/data';
import type { Announcement } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { MotionWrapper } from '@/components/motion-wrapper';

function AnnouncementDetailSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-[400px] w-full rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export default function AnnouncementDetailPage({ params }: { params: { id: string } }) {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getAnnouncementById(params.id);
      setAnnouncement(data);
      setLoading(false);
    }
    fetchData();
  }, [params.id]);

  if (loading) {
    return <AnnouncementDetailSkeleton />;
  }

  if (!announcement) {
    notFound();
  }

  return (
    <MotionWrapper>
      <article className="prose prose-lg mx-auto dark:prose-invert prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80">
        <div className="space-y-4 not-prose">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {announcement.title}
          </h1>

          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-2 h-5 w-5" />
            <time dateTime={announcement.date}>
              {format(new Date(announcement.date), 'MMMM d, yyyy')}
            </time>
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-xl">
          <Image
            src={announcement.imageUrl}
            alt={announcement.title}
            width={1200}
            height={675}
            className="w-full object-cover"
          />
        </div>

        <div className="mt-8" dangerouslySetInnerHTML={{ __html: announcement.content }} />
      </article>
    </MotionWrapper>
  );
}