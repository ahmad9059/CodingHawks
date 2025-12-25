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
    <div>
      <TeamMemberManager initialTeamMembers={teamMembers} />
    </div>
  );
}
