import { Users } from "lucide-react";
import { MotionWrapper } from "@/components/motion-wrapper";

export default function CabinetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative bg-gradient-to-b from-background to-secondary/20 py-12 lg:py-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/3 to-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <MotionWrapper amount={0.2} className="mb-8 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">
              <Users className="h-4 w-4" />
              Leadership Team
            </div>
            <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Cabinet
              </span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base text-foreground/80 md:text-lg leading-relaxed">
              Meet the dedicated leaders who drive our vision forward and shape
              the future of technology education and innovation.
            </p>
          </div>
        </MotionWrapper>
        {children}
      </div>
    </section>
  );
}
