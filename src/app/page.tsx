import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Fields } from "@/components/sections/fields";
import { Achievements } from "@/components/sections/achievements";
import { JoinUs } from "@/components/sections/join-us";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering
export const dynamic = "force-dynamic";

async function getPageData() {
  const [fields, achievements, settings, sliderImages] = await Promise.all([
    prisma.field.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.achievement.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.siteSettings.findMany(),
    prisma.sliderImage.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
  ]);

  // Convert settings array to object for easier access
  const settingsObj = settings.reduce(
    (acc: Record<string, string>, setting: { key: string; value: string }) => {
      acc[setting.key] = setting.value;
      return acc;
    },
    {} as Record<string, string>
  );

  return { fields, achievements, settings: settingsObj, sliderImages };
}

export default async function Home() {
  const { fields, achievements, settings, sliderImages } = await getPageData();

  return (
    <>
      <Hero sliderImages={sliderImages} />
      <About settings={settings} />
      <Fields fields={fields} />
      <Achievements achievements={achievements} />
      <JoinUs />
    </>
  );
}
