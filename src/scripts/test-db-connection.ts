import { prisma } from "@/lib/prisma";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function testDatabaseConnection() {
  try {
    console.log("🔍 Testing database connection...");

    // Test basic connection
    await prisma.$connect();
    console.log("✅ Database connected successfully!");

    // Test a simple query
    const userCount = await prisma.user.count();
    console.log(`👥 Users in database: ${userCount}`);

    const sliderCount = await prisma.sliderImage.count();
    console.log(`🖼️  Slider images in database: ${sliderCount}`);

    const fieldCount = await prisma.field.count();
    console.log(`📝 Fields in database: ${fieldCount}`);

    console.log("🎉 All database operations successful!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
if (require.main === module) {
  testDatabaseConnection()
    .then(() => {
      console.log("✨ Database test completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Database test failed:", error);
      process.exit(1);
    });
}

export { testDatabaseConnection };
