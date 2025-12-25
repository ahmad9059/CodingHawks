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
    <div>
      <AnnouncementManager initialAnnouncements={announcements as any} />
    </div>
  );
}
