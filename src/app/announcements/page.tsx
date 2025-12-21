import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Calendar, ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { MotionWrapper } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ensureAbsoluteUrl } from "@/lib/url-utils";

// Force dynamic rendering
export const dynamic = "force-dynamic";

async function getAnnouncements() {
  return await prisma.announcement.findMany({
    where: { isActive: true },
    orderBy: { date: "desc" },
  });
}

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {announcements.map((announcement, index) => (
        <MotionWrapper
          key={announcement.id}
          amount={0.3}
          variants={{
            hidden: { opacity: 0, y: 50, scale: 0.9 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 1, 0.5, 1],
              },
            },
          }}
        >
          <div className="relative h-full overflow-hidden rounded-2xl border-2 border-border/50 bg-card shadow-lg transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 group">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Clickable area for the main card */}
            <Link
              href={`/announcements/${announcement.id}`}
              className="absolute inset-0 z-10 cursor-pointer"
              aria-label={`Read more about ${announcement.title}`}
            />

            {/* Image */}
            {announcement.imageUrl ? (
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={announcement.imageUrl}
                  alt={announcement.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ) : (
              <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="h-12 w-12 text-primary/30 mx-auto mb-2" />
                  <p className="text-sm text-primary/50 font-medium">
                    No Image
                  </p>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="relative p-6 flex flex-col">
              {/* Date badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(announcement.date), "MMM d, yyyy")}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {announcement.title}
              </h3>

              {/* Description */}
              <p className="text-foreground/70 leading-relaxed mb-6 line-clamp-3 group-hover:text-foreground/90 transition-colors duration-300">
                {announcement.description}
              </p>

              {/* Read More indicator */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-primary group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-sm font-medium">Read More</span>
                  <ArrowRight className="h-4 w-4" />
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm">AI Summary</span>
                </div>
              </div>

              {/* Custom Button - Above the card link */}
              {announcement.buttonEnabled &&
                announcement.buttonText &&
                announcement.buttonUrl && (
                  <div className="relative z-20 mt-4 pt-4 border-t border-border/50">
                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                      <a
                        href={ensureAbsoluteUrl(announcement.buttonUrl) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        {announcement.buttonText}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                )}

              {/* Bottom accent line */}
              <div className="h-1 w-0 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-500 rounded-full mt-4"></div>
            </div>

            {/* Floating decoration */}
            <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </MotionWrapper>
      ))}

      {/* Empty state */}
      {announcements.length === 0 && (
        <div className="col-span-full">
          <MotionWrapper className="text-center py-20">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                No Announcements Yet
              </h3>
              <p className="text-foreground/70 max-w-md mx-auto">
                Stay tuned! We'll be sharing exciting news and updates soon.
              </p>
            </div>
          </MotionWrapper>
        </div>
      )}
    </div>
  );
}
