import { Megaphone } from "lucide-react";
import { MotionWrapper } from "@/components/motion-wrapper";

export default function AnnouncementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative bg-gradient-to-b from-background to-secondary/20 py-20 lg:py-32 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/3 to-blue-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <MotionWrapper amount={0.2} className="mb-20 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">
              <Megaphone className="h-4 w-4" />
              Latest Updates
            </div>
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Announcements
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/80 md:text-xl leading-relaxed">
              Stay updated with our latest news, events, workshops, and exciting
              developments in the world of technology and innovation.
            </p>
          </div>
        </MotionWrapper>
        {children}
      </div>
    </section>
  );
}
