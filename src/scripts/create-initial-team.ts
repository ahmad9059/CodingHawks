import { prisma } from "@/lib/prisma";

const initialTeamMembers = [
  {
    name: "Abdullah",
    position: "President",
    order: 0,
  },
  {
    name: "Sabina Asghar",
    position: "Female Vice President",
    order: 1,
  },
  {
    name: "M. Furqan Akhtar",
    position: "Male Vice President",
    order: 2,
  },
  {
    name: "Ahmad Hassan",
    position: "General Secretary",
    order: 3,
  },
  {
    name: "Shiza Khalid",
    position: "Joint Secretary",
    order: 4,
  },
  {
    name: "Esha Jamil",
    position: "Finance Manager",
    order: 5,
  },
  {
    name: "Wasay Raza",
    position: "Event Manager",
    order: 6,
  },
  {
    name: "Abdul Wahab",
    position: "AI Team Lead",
    order: 7,
  },
  {
    name: "Sadam Muneer",
    position: "Web Dev Team Lead",
    order: 8,
  },
  {
    name: "Sudais",
    position: "Graphics Designer",
    order: 9,
  },
  {
    name: "Unaiza",
    position: "Press Secretary",
    order: 10,
  },
  {
    name: "Tehseen",
    position: "Executive Member",
    order: 11,
  },
];

async function createInitialTeam() {
  try {
    console.log("🚀 Creating initial team members...");

    // Clear existing team members
    await prisma.teamMember.deleteMany();
    console.log("🗑️ Cleared existing team members");

    // Create new team members
    for (const member of initialTeamMembers) {
      const created = await prisma.teamMember.create({
        data: {
          ...member,
          isActive: true,
        },
      });
      console.log(`✅ Created: ${created.name} - ${created.position}`);
    }

    console.log(
      `\n🎉 Successfully created ${initialTeamMembers.length} team members!`
    );
    console.log("\n📝 Next steps:");
    console.log("1. Go to /admin/cabinet to add profile images");
    console.log("2. Add bio and social links for each member");
    console.log("3. Visit /cabinet to see the team page");
  } catch (error) {
    console.error("💥 Error creating team members:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  createInitialTeam()
    .then(() => {
      console.log("\n✨ Team creation completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Script failed:", error);
      process.exit(1);
    });
}

export { createInitialTeam };
