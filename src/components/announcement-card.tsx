'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import type { Announcement } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden rounded-xl border bg-card shadow-lg transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/20">
        <div className="overflow-hidden">
          <Image
            src={announcement.imageUrl}
            alt={announcement.title}
            width={600}
            height={400}
            className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-bold">{announcement.title}</CardTitle>
          <div className="flex items-center pt-2 text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <time dateTime={announcement.date}>
              {format(new Date(announcement.date), 'MMMM d, yyyy')}
            </time>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80">{announcement.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
