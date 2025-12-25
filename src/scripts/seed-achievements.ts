import { prisma } from "@/lib/prisma";

/**
 * Achievements Data for Coding Hawks
 * Compiled from 2023-2025 records
 */

const achievementsData = [
  // ==================== 2025 ACHIEVEMENTS ====================
  {
    year: "2025",
    title: "1st Position - VieroMind Pakathon 2025",
    description:
      "Ali Abdullah secured 1st Position in the VieroMind Pakathon 2025, a prestigious national programming competition. His exceptional creativity, dedication, and hard work brought immense pride to the IoC Department and demonstrated outstanding problem-solving skills in competitive programming.",
    order: 0,
    isActive: true,
    buttonEnabled: false,
  },
  {
    year: "2025",
    title: "2nd Position - VieroMind Pakathon 2025",
    description:
      "Ahmad Hassan achieved 2nd Position in the VieroMind Pakathon 2025. His innovative ideas and determination showcased the technical excellence of Coding Hawks members, bringing pride and recognition to the IoC Department through his competitive programming prowess.",
    order: 1,
    isActive: true,
    buttonEnabled: false,
  },
  {
    year: "2025",
    title: "1st Position - Maktab-e-Gulab Coding Competition 2025",
    description:
      "The talented team of Ahmad Hassan, Abdul Wahab, and Ali Abdullah secured 1st Position in the Maktab-e-Gulab Coding Competition 2025. Team Coding Hawks continued their winning streak, proudly representing MNS University of Agriculture, Multan and dominating the tech arena with their exceptional coding skills.",
    order: 2,
    isActive: true,
    buttonEnabled: false,
  },
  {
    year: "2025",
    title: "DataFest 2025 - Islamabad",
    description:
      "Coding Hawks participated in DataFest 2025, an amazing two-day event in Islamabad focused on learning, networking, and showcasing innovative work happening at MNS University of Agriculture, Multan. The team represented MNSUAM with distinction, supported by dedicated faculty mentors, and returned inspired and motivated to push boundaries in data science and analytics.",
    order: 3,
    isActive: true,
    buttonEnabled: false,
  },
  {
    year: "2025",
    title: "1st Position - BZU Clash and Code Speed Programming 2025",
    description:
      "Abdul Wahab from Coding Hawks secured 1st Position in the BZU Clash and Code Speed Programming Competition 2025 at Bahauddin Zakariya University. This victory highlighted his exceptional algorithmic thinking and rapid problem-solving abilities under pressure.",
    order: 4,
    isActive: true,
    buttonEnabled: false,
  },
  {
    year: "2025",
    title: "2nd Position - ACW-M Competition at Air University",
    description:
      "Abdul Wahab led the MNSUAM team to 2nd Position at the ACW-M (Algorithm & Coding Week - Multan) competition held at Air University. This achievement marked a proud moment for Coding Hawks, demonstrating our competitive edge in national-level programming contests.",
    order: 5,
    isActive: true,
    buttonEnabled: false,
  },
  {
    year: "2025",
    title: "5th Position - ICPC Regional Finals (Pakistan)",
    description:
      "Team CodeVisionX achieved an outstanding 5th Position across Pakistan in the prestigious ICPC (International Collegiate Programming Contest) Regional Finals. Competing against top universities nationwide, our team showcased exceptional algorithmic skills and teamwork in one of the world's most prestigious programming competitions.",
    order: 6,
    isActive: true,
    buttonEnabled: false,
  },
  {
    year: "2025",
    title: "1st Place - Ignite Cyber Security Workshop",
    description:
      "Ahmad Hassan secured 1st Place in the 3-day Cyber Security Workshop organized by Ignite - National Technology Fund. This intensive workshop tested participants on various cybersecurity concepts, and Ahmad's expertise in security fundamentals and practical skills earned him the top position.",
    order: 7,
    isActive: true,
    buttonEnabled: false,
  },
  {
    year: "2025",
    title: "3rd Place - Ignite Cyber Security Workshop",
    description:
      "Ali Abdullah achieved 3rd Place in the 3-day Cyber Security Workshop organized by Ignite - National Technology Fund. Competing alongside top talents from across the country, Ali demonstrated strong cybersecurity knowledge and practical problem-solving skills.",
    order: 8,
    isActive: true,
    buttonEnabled: false,
  },

  // ==================== 2023 ACHIEVEMENTS ====================
  {
    year: "2023",
    title: "1st Position National & Global Finalist - Falling Walls Lab",
    description:
      "Asma Rehman and Dr. Nadeem Iqbal (Club In-charge) achieved 1st Position nationally with their groundbreaking 'AI-based Bee Hive' project at Falling Walls Lab Lahore (July 3, 2023). This victory earned them a golden ticket to the global finale in Berlin, Germany (November 7, 2023), where they presented their innovative solution to pressing global challenges. This marked the first-ever international representation of MNS University at Falling Walls Lab Berlin.",
    order: 9,
    isActive: true,
    buttonEnabled: false,
  },
  {
    year: "2023",
    title: "Special Prize Winner - Venture Spark Business Competition",
    description:
      "Mariyam Pervez won a Special Prize of Rs. 10,000 at Venture Spark (November 29, 2023) for her innovative project 'Automatic Weed Detection and Spraying Robot.' Under the guidance of Dr. Nadeem Iqbal, this project showcased the intersection of AI and sustainable agriculture, positioning Coding Hawks as a hub for commercially viable and impactful technological ideas.",
    order: 10,
    isActive: true,
    buttonEnabled: false,
  },
  {
    year: "2023",
    title: "React Native Mobile App Development Workshop",
    description:
      "Coding Hawks successfully conducted a comprehensive 3-day workshop on Mobile Application Development using React Native (May 15-17, 2023). Participants built an Instagram Clone, learning cross-platform mobile development fundamentals, folder structure best practices, and reusable component design. The workshop featured hands-on exercises and a student challenge that fostered healthy competition and creativity.",
    order: 11,
    isActive: true,
    buttonEnabled: false,
  },
  {
    year: "2023",
    title: "1st Position - Code{In} Spring 2023 (C++ Category)",
    description:
      "Muhammad Sami secured 1st Position in the Coding in C++ category at Code{In} Spring 2023 competition held at NUML Multan. His exceptional coding skills, strong grasp of C++ concepts, and ability to efficiently solve complex problems set him apart from other participants, earning him the top spot.",
    order: 12,
    isActive: true,
    buttonEnabled: false,
  },
  {
    year: "2023",
    title: "2nd Position - Code{In} Spring 2023 (Poster Design)",
    description:
      "Muneeb Bilal achieved 2nd Position in the Poster Designing category at Code{In} Spring 2023 competition held at NUML Multan. His creative talent, eye-catching designs, and ability to effectively communicate messages through visual representations impressed the judges.",
    order: 13,
    isActive: true,
    buttonEnabled: false,
  },
  {
    year: "2023",
    title: "Microsoft Imagine Cup 2023 Participation",
    description:
      "Coding Hawks members participated in Microsoft Imagine Cup 2023, one of the world's premier student technology competitions. The competition provided a platform to showcase technical skills, problem-solving abilities, and creativity across various categories. Participants gained valuable experience learning from peers and industry professionals, fostering growth within the technology community.",
    order: 14,
    isActive: true,
    buttonEnabled: false,
  },
  {
    year: "2023",
    title: "DevOps Workshop - January 2023",
    description:
      "Coding Hawks organized a comprehensive DevOps Workshop in January 2023. Participants learned essential tools and techniques for implementing DevOps practices, automating workflows, enhancing collaboration, and delivering high-quality software. The workshop included real-world case studies and interactive exercises covering configuration management, deployment pipelines, and monitoring.",
    order: 15,
    isActive: true,
    buttonEnabled: false,
  },
];

async function seedAchievements() {
  console.log("🚀 Starting achievements seeding...");

  try {
    // First, delete existing achievements to avoid duplicates
    console.log("🗑️  Clearing existing achievements...");
    await prisma.achievement.deleteMany({});

    // Insert new achievements
    console.log("📝 Inserting new achievements...");

    for (const achievement of achievementsData) {
      await prisma.achievement.create({
        data: achievement,
      });
      console.log(`   ✅ Added: ${achievement.title}`);
    }

    console.log(
      `\n🎉 Successfully seeded ${achievementsData.length} achievements!`
    );

    // Display summary by year
    const years = [...new Set(achievementsData.map((a) => a.year))]
      .sort()
      .reverse();
    console.log("\n📊 Summary by Year:");
    years.forEach((year) => {
      const count = achievementsData.filter((a) => a.year === year).length;
      console.log(`   ${year}: ${count} achievements`);
    });
  } catch (error) {
    console.error("❌ Error seeding achievements:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedAchievements()
  .then(() => {
    console.log("\n✨ Seeding completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Seeding failed:", error);
    process.exit(1);
  });
