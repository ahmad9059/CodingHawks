"use client";

import Image from "next/image";

const logos = [
  {
    name: "Agriculture University",
    src: "/carousel/agricultureUni-logo.svg",
    alt: "Agriculture University Logo",
  },
  {
    name: "Data Science",
    src: "/carousel/data-science.svg",
    alt: "Data Science Logo",
  },
  {
    name: "DSA",
    src: "/carousel/dsa-logo.svg",
    alt: "DSA Logo",
  },
  {
    name: "Ignite",
    src: "/carousel/ignite.svg",
    alt: "Ignite Logo",
  },
  {
    name: "Microsoft",
    src: "/carousel/microsoft.webp",
    alt: "Microsoft Logo",
  },
  {
    name: "Naqash",
    src: "/carousel/naqash.svg",
    alt: "Naqash Logo",
  },
  {
    name: "Vieromind",
    src: "/carousel/vieromind.svg",
    alt: "Vieromind Logo",
  },
  {
    name: "Forman Christian College",
    src: "/carousel/fccu.svg",
    alt: "FCCU Logo",
  },
  {
    name: "Air University",
    src: "/carousel/air.svg",
    alt: "Air University Logo",
  },
];

export function LogoCarousel() {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-16  dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Carousel Container */}
        <div className="relative">
          <div className="flex animate-scroll">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
                style={{ minWidth: "150px" }}
              >
                <div className="relative w-40 h-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 128px, 128px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
