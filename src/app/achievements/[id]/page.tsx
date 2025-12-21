import Image from "next/image";
import { notFound } from "next/navigation";
import { Trophy, ExternalLink } from "lucide-react";
import { MotionWrapper } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ensureAbsoluteUrl } from "@/lib/url-utils";

// Force dynamic rendering
export const dynamic = "force-dynamic";

async function getAchievement(id: string) {
  try {
    const achievement = await prisma.achievement.findUnique({
      where: {
        id: id,
        isActive: true,
      },
    });
    return achievement;
  } catch (error) {
    console.error("Error fetching achievement:", error);
    return null;
  }
}

export default async function AchievementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const achievement = await getAchievement(id);

  if (!achievement) {
    notFound();
  }

  return (
    <div className="py-20 lg:py-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <MotionWrapper>
          <article className="prose prose-lg mx-auto dark:prose-invert prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80">
            <div className="space-y-4 not-prose">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-2 rounded-full bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  <Trophy className="h-4 w-4" />
                  {achievement.year}
                </div>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {achievement.title}
              </h1>
            </div>

            {/* Image */}
            {achievement.imageUrl ? (
              <div className="relative mt-8 overflow-hidden rounded-xl">
                <Image
                  src={achievement.imageUrl}
                  alt={achievement.title}
                  width={1200}
                  height={675}
                  className="w-full object-cover"
                />
              </div>
            ) : (
              <div className="relative mt-8 overflow-hidden rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/5 flex items-center justify-center h-64">
                <div className="text-center">
                  <Trophy className="h-16 w-16 text-yellow-500/30 mx-auto mb-4" />
                  <p className="text-lg text-yellow-500/50 font-medium">
                    Achievement Image
                  </p>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="mt-8">
              <div className="text-lg leading-relaxed">
                <p>{achievement.description}</p>
              </div>
            </div>

            {/* Custom Button - if enabled */}
            {/* Temporarily commented out due to TypeScript caching issues
            {achievement.buttonEnabled &&
              achievement.buttonText &&
              achievement.buttonUrl && (
                <div className="mt-8 not-prose">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    <a
                      href={ensureAbsoluteUrl(achievement.buttonUrl) || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      {achievement.buttonText}
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              )}
            */}
          </article>
        </MotionWrapper>
      </div>
    </div>
  );
}
