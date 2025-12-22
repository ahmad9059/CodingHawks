import { prisma } from "@/lib/prisma";

const fieldsData = [
  {
    title: "Web Development",
    description:
      "Master front-end and back-end technologies to build modern web applications.",
    icon: "Code",
    order: 0,
    isActive: true,
  },
  {
    title: "AI/ML",
    description:
      "Explore the world of artificial intelligence and machine learning models.",
    icon: "BrainCircuit",
    order: 1,
    isActive: true,
  },
  {
    title: "Speed Programming",
    description:
      "Hone your problem-solving skills and compete in coding challenges.",
    icon: "Zap",
    order: 2,
    isActive: true,
  },
  {
    title: "Android Development",
    description:
      "Create innovative and user-friendly mobile applications for Android.",
    icon: "Smartphone",
    order: 3,
    isActive: true,
  },
  {
    title: "Cybersecurity",
    description:
      "Learn to protect systems and networks from digital threats and attacks.",
    icon: "Shield",
    order: 4,
    isActive: true,
  },
  {
    title: "SaaS/AI Development",
    description:
      "Build and deploy scalable Software as a Service applications with AI.",
    icon: "CloudCog",
    order: 5,
    isActive: true,
  },
  {
    title: "Graphic Design/UI/UX",
    description:
      "Design intuitive and visually appealing interfaces for a great user experience.",
    icon: "Palette",
    order: 6,
    isActive: true,
  },
];

const achievementsData = [
  {
    year: "2024",
    title: "Hackathon Winner",
    description:
      "Our team secured the first place in the National Inter-University Hackathon.",
    order: 0,
    isActive: true,
  },
  {
    year: "2024",
    title: "Tech Conference Speaker",
    description:
      "Society members were invited to speak at the Annual Tech Innovators Conference.",
    order: 1,
    isActive: true,
  },
  {
    year: "2023",
    title: "Open Source Contribution",
    description:
      "Major contributions to a popular open-source machine learning library.",
    order: 2,
    isActive: true,
  },
  {
    year: "2023",
    title: "Coding Competition Victory",
    description:
      "Won the regional speed programming competition, setting a new record.",
    order: 3,
    isActive: true,
  },
];

const announcementsData = [
  {
    title: "Web Development Workshop",
    description:
      "Join us for a hands-on workshop covering the fundamentals of React and Next.js. Perfect for beginners!",
    content: `This workshop is designed to get you up and running with two of the most popular technologies in modern web development: React and Next.js. We'll start from the very basics, so no prior experience is required. By the end of the session, you'll have built your first dynamic web application.

What You'll Learn:
• The core concepts of React: components, state, and props.
• How to set up a new project using Next.js.
• Building pages and creating routes.
• Fetching data and displaying it in your application.
• Styling your components with Tailwind CSS.

Make sure to bring your laptop with Node.js and a code editor (like VS Code) installed. We can't wait to see you there!`,
    date: new Date("2024-08-15T10:00:00Z"),
    isActive: true,
  },
  {
    title: 'Annual Hackathon "CodeRumble"',
    description:
      "Get ready for 24 hours of intense coding, innovation, and fun. Prizes worth thousands await the winners.",
    content: `The Ultimate Coding Challenge is Back!

CodeRumble is our flagship annual hackathon, bringing together the brightest minds to solve real-world problems through technology. Whether you're a seasoned coder or just starting out, this is an opportunity to learn, collaborate, and create something amazing.

Event Details:
• Duration: 24 hours straight.
• Team Size: 1-4 members.
• Prizes: Cash prizes, tech gadgets, and internship opportunities for the top 3 teams.
• Mentors: Industry experts will be available to guide you.

Food, drinks, and plenty of coffee will be provided to keep you going. Register your team now and get ready to rumble!`,
    date: new Date("2024-09-01T09:00:00Z"),
    isActive: true,
  },
  {
    title: "Tech Meetup & Networking Event",
    description:
      "Connect with industry professionals and fellow students. Keynote speech on the future of AI.",
    content: `Join us for an evening of insightful talks, networking, and inspiration. This is a fantastic opportunity to connect with people from the tech industry, learn about career paths, and discuss the latest trends.

Agenda:
• 6:00 PM: Welcome & Networking
• 7:00 PM: Keynote: "The AI Revolution: What's Next?" by industry veteran Jane Doe.
• 8:00 PM: Q&A Session and Panel Discussion.
• 8:30 PM: More Networking & Refreshments.

Don't miss this chance to expand your professional network and gain valuable insights. The event is free, but seats are limited, so be sure to RSVP.`,
    date: new Date("2024-09-20T18:00:00Z"),
    isActive: true,
  },
];

const siteSettingsData = [
  { key: "site_title", value: "Coding Hawks", type: "text" },
  {
    key: "site_description",
    value:
      "A thriving ecosystem of passionate developers, innovators, and tech enthusiasts at MNS-University of Agriculture, Multan.",
    type: "text",
  },
  {
    key: "hero_title",
    value: "Fueling Creativity, Collaboration, and Coding Excellence",
    type: "text",
  },
  {
    key: "hero_subtitle",
    value:
      "Join the most dynamic coding society at MNS-University of Agriculture, Multan. Where innovation meets collaboration.",
    type: "text",
  },
  { key: "about_title", value: "About Coding Hawks", type: "text" },
  {
    key: "about_description",
    value:
      "We're not just another coding society – we're a thriving ecosystem of passionate developers, innovators, and tech enthusiasts at MNS-University of Agriculture, Multan.",
    type: "text",
  },
  {
    key: "about_mission",
    value:
      "Our mission? To transform curious minds into industry-ready professionals through hands-on projects, collaborative learning, and cutting-edge technology exploration.",
    type: "text",
  },
  { key: "about_members_count", value: "500+", type: "text" },
  { key: "about_projects_count", value: "50+", type: "text" },
  { key: "contact_email", value: "info@codinghawks.com", type: "email" },
  { key: "contact_phone", value: "+92 300 1234567", type: "text" },
  {
    key: "social_facebook",
    value: "https://facebook.com/codinghawks",
    type: "url",
  },
  {
    key: "social_twitter",
    value: "https://twitter.com/codinghawks",
    type: "url",
  },
  {
    key: "social_linkedin",
    value: "https://linkedin.com/company/codinghawks",
    type: "url",
  },
  {
    key: "social_instagram",
    value: "https://instagram.com/codinghawks",
    type: "url",
  },
  {
    key: "social_github",
    value: "https://github.com/codinghawks",
    type: "url",
  },
];

async function seedData() {
  try {
    console.log("🌱 Starting database seeding...");

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await prisma.siteSettings.deleteMany();
    await prisma.field.deleteMany();
    await prisma.achievement.deleteMany();
    await prisma.announcement.deleteMany();

    // Seed Fields
    console.log("📝 Seeding fields...");
    for (const field of fieldsData) {
      await prisma.field.create({ data: field });
    }

    // Seed Achievements
    console.log("🏆 Seeding achievements...");
    for (const achievement of achievementsData) {
      await prisma.achievement.create({ data: achievement });
    }

    // Seed Announcements
    console.log("📢 Seeding announcements...");
    for (const announcement of announcementsData) {
      await prisma.announcement.create({ data: announcement });
    }

    // Seed Site Settings
    console.log("⚙️ Seeding site settings...");
    for (const setting of siteSettingsData) {
      await prisma.siteSettings.create({ data: setting });
    }

    console.log("✅ Database seeding completed successfully!");
    console.log(`📊 Seeded:
    - ${fieldsData.length} fields
    - ${achievementsData.length} achievements  
    - ${announcementsData.length} announcements
    - ${siteSettingsData.length} site settings`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
if (require.main === module) {
  seedData()
    .then(() => {
      console.log("🎉 Seeding process completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Seeding process failed:", error);
      process.exit(1);
    });
}

export { seedData };
