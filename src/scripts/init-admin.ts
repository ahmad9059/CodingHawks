import { createAdminUser } from "@/lib/auth";

async function main() {
  try {
    await createAdminUser();
    console.log("Admin user initialization completed");
  } catch (error) {
    console.error("Error initializing admin user:", error);
  }
}

main();
