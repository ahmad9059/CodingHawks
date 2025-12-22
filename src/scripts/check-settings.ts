import { prisma } from "@/lib/prisma";

async function checkSettings() {
  try {
    console.log("🔍 Checking current site settings...");

    const settings = await prisma.siteSettings.findMany({
      orderBy: { key: "asc" },
    });

    console.log(`📊 Found ${settings.length} settings:`);
    settings.forEach((setting) => {
      console.log(`  ${setting.key}: ${setting.value} (${setting.type})`);
    });
  } catch (error) {
    console.error("❌ Error checking settings:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSettings();
