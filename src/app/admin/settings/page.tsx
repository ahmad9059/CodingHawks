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
    <div>
      <SettingsManager initialSettings={settings} />
    </div>
  );
}
