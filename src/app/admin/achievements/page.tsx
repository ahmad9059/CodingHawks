import { prisma } from "@/lib/prisma";
import { AchievementManager } from "@/components/admin/achievement-manager";

export const dynamic = "force-dynamic";

async function getAchievements() {
  return await prisma.achievement.findMany({
    orderBy: { order: "asc" },
  });
}

export default async function AdminAchievementsPage() {
  const achievements = await getAchievements();

  return (
    <div>
      <AchievementManager initialAchievements={achievements} />
    </div>
  );
}
