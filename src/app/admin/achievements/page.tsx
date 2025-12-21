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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Manage Achievements
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Create and manage achievements with optional custom buttons
        </p>
      </div>

      <AchievementManager initialAchievements={achievements} />
    </div>
  );
}
