'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAnnouncements } from '@/lib/data';
import type { Announcement } from '@/lib/types';
import { AnnouncementCard } from '@/components/announcement-card';
import { Skeleton } from '@/components/ui/skeleton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

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
    <motion.div
      className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {announcements.map((announcement) => (
        <motion.div key={announcement.id} variants={itemVariants}>
          <AnnouncementCard announcement={announcement} />
        </motion.div>
      ))}
    </motion.div>
  );
}
