import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MotionWrapper } from "@/components/motion-wrapper";
import { FloatingElement } from "@/components/ui/floating-element";
import { Rocket } from "lucide-react";

type SiteSettings = {
  [key: string]: string;
};

export function About({ settings }: { settings: SiteSettings }) {
  const aboutImage = PlaceHolderImages.find((p) => p.id === "about-us");

  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 lg:py-32 bg-background"
    >
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <MotionWrapper>
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                  <Rocket className="h-4 w-4" />
                  Innovation Hub
                </div>
                <h2
                  className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
                  style={{ fontWeight: 700 }}
                >
                  {(() => {
                    const title = settings.about_title || "About Coding Hawks";
                    const words = title.split(" ");
                    const firstWord = words[0];
                    const restOfTitle = words.slice(1).join(" ");

                    return (
                      <>
                        {firstWord}{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                          {restOfTitle}
                        </span>
                      </>
                    );
                  })()}
                </h2>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-foreground/90 md:text-xl leading-relaxed">
                  {settings.about_description ||
                    "We're not just another coding society – we're a thriving ecosystem of passionate developers, innovators, and tech enthusiasts at MNS-University of Agriculture, Multan."}
                </p>

                <p className="text-lg text-foreground/80 md:text-xl leading-relaxed">
                  {settings.about_mission ||
                    "Our mission? To transform curious minds into industry-ready professionals through hands-on projects, collaborative learning, and cutting-edge technology exploration."}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {settings.about_members_count || "500+"}
                    </div>
                    <div className="text-lg text-foreground/70">
                      Active Members
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {settings.about_projects_count || "50+"}
                    </div>
                    <div className="text-lg text-foreground/70">
                      Projects Completed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MotionWrapper>

          <div className="flex justify-center lg:justify-end">
            <FloatingElement duration={4} yOffset={20}>
              <div className="relative w-full max-w-2xl">
                {/* Purple glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 blur-3xl rounded-full scale-110"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 blur-2xl rounded-2xl"></div>

                {aboutImage && (
                  <MotionWrapper
                    className="relative"
                    variants={{
                      hidden: { opacity: 0, x: 100, scale: 0.8 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
                      },
                    }}
                  >
                    <div className="relative overflow-hidden rounded-2xl">
                      <Image
                        src="/about.png"
                        alt={aboutImage.description}
                        width={700}
                        height={500}
                        className="relative w-full h-auto object-cover transition-all duration-500 hover:scale-105"
                        data-ai-hint={aboutImage.imageHint}
                        priority
                      />
                    </div>
                  </MotionWrapper>
                )}
              </div>
            </FloatingElement>
          </div>
        </div>
      </div>
    </section>
  );
}
