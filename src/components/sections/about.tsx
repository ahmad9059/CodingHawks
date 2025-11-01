import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MotionWrapper } from '@/components/motion-wrapper';

export function About() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

  return (
    <section id="about" className="overflow-hidden bg-secondary/50 py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <MotionWrapper>
              <div className="space-y-6">
                <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">About Coding Hawks</h2>
                <p className="text-lg text-foreground/80 md:text-xl">
                  Coding Hawks is a student-led coding society at the MNS-University of Agriculture, Multan. We are dedicated to empowering students by fostering a community centered on technology, innovation, and collaboration.
                </p>
                <p className="text-lg text-foreground/80 md:text-xl">
                  Our mission is to bridge the gap between academic learning and real-world application, preparing members for successful careers in the tech industry.
                </p>
              </div>
            </MotionWrapper>
            {aboutImage && (
              <MotionWrapper
                className="relative"
                variants={{
                  hidden: { opacity: 0, x: 100 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
                }}
              >
                <div className="overflow-hidden rounded-xl shadow-2xl">
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    data-ai-hint={aboutImage.imageHint}
                  />
                </div>
              </MotionWrapper>
            )}
          </div>
      </div>
    </section>
  );
}
