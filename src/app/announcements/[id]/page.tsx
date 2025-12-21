import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Calendar, ExternalLink } from "lucide-react";
import { MotionWrapper } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ensureAbsoluteUrl } from "@/lib/url-utils";

// Force dynamic rendering
export const dynamic = "force-dynamic";

async function getAnnouncement(id: string) {
  try {
    const announcement = await prisma.announcement.findUnique({
      where: {
        id: id,
        isActive: true,
      },
    });
    return announcement;
  } catch (error) {
    console.error("Error fetching announcement:", error);
    return null;
  }
}

export default async function AnnouncementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const announcement = await getAnnouncement(id);

  if (!announcement) {
    notFound();
  }

  return (
    <div className="py-20 lg:py-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <MotionWrapper>
          <article className="prose prose-lg mx-auto dark:prose-invert prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80">
            <div className="space-y-4 not-prose">
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {announcement.title}
              </h1>

              <div className="flex items-center text-muted-foreground">
                <Calendar className="mr-2 h-5 w-5" />
                <time dateTime={announcement.date.toISOString()}>
                  {format(new Date(announcement.date), "MMMM d, yyyy")}
                </time>
              </div>
            </div>

            {/* Image */}
            {announcement.imageUrl ? (
              <div className="relative mt-8 overflow-hidden rounded-xl">
                <Image
                  src={announcement.imageUrl}
                  alt={announcement.title}
                  width={1200}
                  height={675}
                  className="w-full object-cover"
                />
              </div>
            ) : (
              <div className="relative mt-8 overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center h-64">
                <div className="text-center">
                  <Calendar className="h-16 w-16 text-primary/30 mx-auto mb-4" />
                  <p className="text-lg text-primary/50 font-medium">
                    No Image Available
                  </p>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="mt-8">
              {announcement.content ? (
                <div
                  dangerouslySetInnerHTML={{ __html: announcement.content }}
                />
              ) : (
                <div className="text-lg leading-relaxed">
                  <p>{announcement.description}</p>
                </div>
              )}
            </div>

            {/* Custom Button - if enabled */}
            {(announcement as any).buttonEnabled &&
              (announcement as any).buttonText &&
              (announcement as any).buttonUrl && (
                <div className="mt-8 not-prose">
                  <Button
                    asChild
                    size="lg"
                    className="text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "#5D1A75" }}
                  >
                    <a
                      href={
                        ensureAbsoluteUrl((announcement as any).buttonUrl) ||
                        "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      {(announcement as any).buttonText}
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              )}
          </article>
        </MotionWrapper>
      </div>
    </div>
  );
}
