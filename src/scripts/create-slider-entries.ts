import { prisma } from "@/lib/prisma";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

const sliderImages = [
  {
    filename: "ch-1.webp",
    title: "Coding Excellence",
    description:
      "Empowering students with cutting-edge programming skills and innovative thinking.",
    order: 0,
  },
  {
    filename: "ch-2.webp",
    title: "Innovation Hub",
    description:
      "Where creativity meets technology to build the future of software development.",
    order: 1,
  },
  {
    filename: "ch-3.webp",
    title: "Collaborative Learning",
    description:
      "Building a community of passionate developers through teamwork and knowledge sharing.",
    order: 2,
  },
  {
    filename: "ch-4.webp",
    title: "Tech Leadership",
    description:
      "Developing the next generation of technology leaders and industry pioneers.",
    order: 3,
  },
  {
    filename: "ch-5.webp",
    title: "Project Excellence",
    description:
      "Transforming ideas into reality through hands-on projects and real-world applications.",
    order: 4,
  },
  {
    filename: "ch-6.webp",
    title: "Skills Development",
    description:
      "Comprehensive training programs designed to enhance technical and professional skills.",
    order: 5,
  },
  {
    filename: "ch-7.webp",
    title: "Community Impact",
    description:
      "Making a difference in the tech community through open source contributions and mentorship.",
    order: 6,
  },
  {
    filename: "ch-8.webp",
    title: "Future Ready",
    description:
      "Preparing students for the evolving landscape of technology and digital innovation.",
    order: 7,
  },
];

async function createSliderEntries() {
  try {
    console.log("🚀 Creating slider image entries in database...");

    // Clear existing slider images from database
    console.log("🧹 Clearing existing slider images from database...");
    await prisma.sliderImage.deleteMany();

    for (const imageData of sliderImages) {
      // Construct the Supabase Storage URL
      const imageUrl = `${supabaseUrl}/storage/v1/object/public/codinghawks/${imageData.filename}`;

      console.log(`💾 Creating entry for ${imageData.filename}...`);
      console.log(`🔗 URL: ${imageUrl}`);

      // Save to database
      await prisma.sliderImage.create({
        data: {
          title: imageData.title,
          description: imageData.description,
          imageUrl: imageUrl,
          order: imageData.order,
          isActive: true,
        },
      });

      console.log(`✅ Created entry for ${imageData.filename}`);
    }

    console.log("🎉 All slider image entries created successfully!");

    // Display summary
    const totalImages = await prisma.sliderImage.count();
    console.log(`📊 Total slider images in database: ${totalImages}`);

    // Show all entries
    const allImages = await prisma.sliderImage.findMany({
      orderBy: { order: "asc" },
    });

    console.log("\n📋 Slider Images Summary:");
    allImages.forEach((img, index) => {
      console.log(`  ${index + 1}. ${img.title}`);
      console.log(`     📸 ${img.imageUrl}`);
      console.log(`     📝 ${img.description}`);
      console.log("");
    });
  } catch (error) {
    console.error("💥 Error creating slider entries:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
if (require.main === module) {
  createSliderEntries()
    .then(() => {
      console.log("✨ Slider entries creation completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Creation process failed:", error);
      process.exit(1);
    });
}

export { createSliderEntries };
