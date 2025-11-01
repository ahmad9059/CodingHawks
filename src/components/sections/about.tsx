import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MotionWrapper } from '@/components/motion-wrapper';

export function About() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <MotionWrapper>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">About Coding Hawks</h2>
              <p className="text-lg text-foreground/80 md:text-xl">
                Coding Hawks is a student-led coding society at the MNS-University of Agriculture, Multan. We are dedicated to empowering students by fostering a community centered on technology, innovation, and collaboration.
              </p>
              <p className="text-lg text-foreground/80 md:text-xl">
                Our mission is to bridge the gap between academic learning and real-world application, preparing members for successful careers in the tech industry.
              </p>
            </div>
            {aboutImage && (
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
            )}
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
