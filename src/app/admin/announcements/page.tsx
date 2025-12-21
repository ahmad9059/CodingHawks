import { prisma } from "@/lib/prisma";
import { AnnouncementManager } from "@/components/admin/announcement-manager";

export const dynamic = "force-dynamic";

async function getAnnouncements() {
  return await prisma.announcement.findMany({
    orderBy: { date: "desc" },
  });
}

export default async function AdminAnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Manage Announcements
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Create and manage announcements with optional custom buttons
        </p>
      </div>

      <AnnouncementManager initialAnnouncements={announcements as any} />
    </div>
  );
}
