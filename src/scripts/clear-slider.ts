import { prisma } from "@/lib/prisma";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function clearSliderImages() {
  try {
    console.log("🧹 Clearing slider images from database...");

    const result = await prisma.sliderImage.deleteMany();

    console.log(`✅ Deleted ${result.count} slider images`);
    console.log("📱 Hero section will now use local images from /ch folder");
  } catch (error) {
    console.error("💥 Error clearing slider images:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
if (require.main === module) {
  clearSliderImages()
    .then(() => {
      console.log("✨ Slider images cleared!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Clear failed:", error);
      process.exit(1);
    });
}

export { clearSliderImages };
