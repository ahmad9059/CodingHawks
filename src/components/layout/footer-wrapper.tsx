import { prisma } from "@/lib/prisma";
import { Footer } from "./footer";

async function getSettings() {
  try {
    const settings = await prisma.siteSettings.findMany({
      select: {
        key: true,
        value: true,
        type: true,
      },
    });

    // Convert to object format for easier consumption
    const settingsObj = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>);

    return settingsObj;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return {};
  }
}

export async function FooterWrapper() {
  const settings = await getSettings();
  return <Footer settings={settings} />;
}
