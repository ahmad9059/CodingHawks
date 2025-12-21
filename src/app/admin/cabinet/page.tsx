import { prisma } from "@/lib/prisma";
import { TeamMemberManager } from "@/components/admin/team-member-manager";

// Force dynamic rendering
export const dynamic = "force-dynamic";

async function getTeamMembers() {
  return prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  });
}

export default async function AdminCabinetPage() {
  const teamMembers = await getTeamMembers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Cabinet Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage team members and leadership cabinet
        </p>
      </div>

      <TeamMemberManager initialTeamMembers={teamMembers} />
    </div>
  );
}
