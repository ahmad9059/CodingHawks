'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, Sparkles, Loader2 } from 'lucide-react';
import type { Announcement } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { generateAnnouncementSummary } from '@/ai/flows/generate-announcement-summary';

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [summary, setSummary] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const handleSummaryClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSummaryOpen(true);
    setIsLoadingSummary(true);
    try {
      const result = await generateAnnouncementSummary({
        title: announcement.title,
        description: announcement.content,
      });
      setSummary(result.summary);
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummary('Could not generate a summary at this time.');
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <>
      <Link href={`/announcements/${announcement.id}`} passHref legacyBehavior>
        <motion.a
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="block h-full"
        >
          <Card className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border bg-card shadow-lg transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
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
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <time dateTime={announcement.date}>
                  {format(new Date(announcement.date), 'MMMM d, yyyy')}
                </time>
              </div>
              <CardTitle className="mt-2 text-xl font-bold">{announcement.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-foreground/80">{announcement.description}</p>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-primary hover:bg-primary/10 hover:text-primary"
                onClick={handleSummaryClick}
              >
                <Sparkles className="h-4 w-4" />
                <span>AI Summary</span>
              </Button>
            </CardFooter>
          </Card>
        </motion.a>
      </Link>

      <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI-Generated Summary</DialogTitle>
            <DialogDescription>
              A quick summary of "{announcement.title}"
            </DialogDescription>
          </DialogHeader>
          {isLoadingSummary ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="prose prose-sm dark:prose-invert">
              <p>{summary}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
