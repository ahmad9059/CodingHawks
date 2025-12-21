import { prisma } from "@/lib/prisma";
import { SliderManager } from "@/components/admin/slider-manager";

// Force dynamic rendering
export const dynamic = "force-dynamic";

async function getSliderImages() {
  return prisma.sliderImage.findMany({
    orderBy: { order: "asc" },
  });
}

export default async function SliderPage() {
  const images = await getSliderImages();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Slider Images
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage hero section slider images
        </p>
      </div>

      <SliderManager initialImages={images} />
    </div>
  );
}
