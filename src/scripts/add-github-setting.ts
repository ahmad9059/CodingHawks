import { prisma } from "@/lib/prisma";

async function addGitHubSetting() {
  try {
    console.log("🔧 Adding GitHub social setting...");

    // Check if the setting already exists
    const existingSetting = await prisma.siteSettings.findUnique({
      where: { key: "social_github" },
    });

    if (existingSetting) {
      console.log("✅ GitHub setting already exists");
      return;
    }

    // Add the GitHub setting
    await prisma.siteSettings.create({
      data: {
        key: "social_github",
        value: "https://github.com/codinghawks",
        type: "url",
      },
    });

    console.log("✅ GitHub setting added successfully");
  } catch (error) {
    console.error("❌ Error adding GitHub setting:", error);
  } finally {
    await prisma.$disconnect();
  }
}

addGitHubSetting();
