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
    <div>
      <SliderManager initialImages={images} />
    </div>
  );
}
