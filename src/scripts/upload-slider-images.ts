import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase environment variables!");
  console.log(
    "Make sure you have NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

async function uploadSliderImages() {
  try {
    console.log("🚀 Starting slider images upload to Supabase Storage...");

    // Clear existing slider images from database
    console.log("🧹 Clearing existing slider images from database...");
    await prisma.sliderImage.deleteMany();

    for (const imageData of sliderImages) {
      console.log(`📤 Uploading ${imageData.filename}...`);

      // Read the file from public/ch folder
      const imagePath = path.join(
        process.cwd(),
        "public",
        "ch",
        imageData.filename
      );

      if (!fs.existsSync(imagePath)) {
        console.log(`⚠️  File not found: ${imagePath}`);
        continue;
      }

      const fileBuffer = fs.readFileSync(imagePath);
      const fileName = `slider/${Date.now()}-${imageData.filename}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("codinghawks")
        .upload(fileName, fileBuffer, {
          contentType: "image/webp",
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error(`❌ Error uploading ${imageData.filename}:`, error);
        continue;
      }

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("codinghawks").getPublicUrl(fileName);

      console.log(`✅ Uploaded ${imageData.filename} to: ${publicUrl}`);

      // Save to database
      await prisma.sliderImage.create({
        data: {
          title: imageData.title,
          description: imageData.description,
          imageUrl: publicUrl,
          order: imageData.order,
          isActive: true,
        },
      });

      console.log(`💾 Saved ${imageData.filename} to database`);
    }

    console.log("🎉 All slider images uploaded successfully!");

    // Display summary
    const totalImages = await prisma.sliderImage.count();
    console.log(`📊 Total slider images in database: ${totalImages}`);
  } catch (error) {
    console.error("💥 Error uploading slider images:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the upload function
if (require.main === module) {
  uploadSliderImages()
    .then(() => {
      console.log("✨ Slider images upload completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Upload process failed:", error);
      process.exit(1);
    });
}

export { uploadSliderImages };
