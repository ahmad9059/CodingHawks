import { prisma } from "@/lib/prisma";
import { SettingsManager } from "@/components/admin/settings-manager";

// Force dynamic rendering
export const dynamic = "force-dynamic";

async function getSettings() {
  return prisma.siteSettings.findMany({
    orderBy: { key: "asc" },
  });
}

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Site Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage global site configuration and settings
        </p>
      </div>

      <SettingsManager initialSettings={settings} />
    </div>
  );
}
