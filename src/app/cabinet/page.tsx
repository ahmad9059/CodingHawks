import Image from "next/image";
import Link from "next/link";
import { Linkedin, Instagram, Github, Globe, Users, Crown } from "lucide-react";
import { MotionWrapper } from "@/components/motion-wrapper";
import { prisma } from "@/lib/prisma";
import { ensureAbsoluteUrl } from "@/lib/url-utils";

// Force dynamic rendering
export const dynamic = "force-dynamic";

async function getTeamMembers() {
  return await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

export default async function CabinetPage() {
  const teamMembers = await getTeamMembers();

  // Separate supervisor from regular members
  const supervisor = teamMembers.find((member) => member.isSupervisor);
  const regularMembers = teamMembers.filter((member) => !member.isSupervisor);

  return (
    <div className="space-y-8">
      {/* Supervisor Card - Full Width Horizontal */}
      {supervisor && (
        <MotionWrapper
          amount={0.3}
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.95 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.6,
                ease: [0.25, 1, 0.5, 1],
              },
            },
          }}
        >
          <div className="relative w-full bg-gradient-to-r  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden shadow-lg border border-purple-200/50 dark:border-purple-500/20">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
              {/* Circular Image */}
              <div className="relative flex-shrink-0">
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden ring-4 ring-purple-500/30 shadow-xl">
                  {supervisor.imageUrl ? (
                    <Image
                      src={supervisor.imageUrl}
                      alt={supervisor.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 flex items-center justify-center">
                      <Users className="h-16 w-16 text-purple-400" />
                    </div>
                  )}
                </div>
                {/* Crown badge */}
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-400">
                  <Crown className="h-3 w-3" />
                  Society Supervisor
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {supervisor.name}
                </h2>

                <p className="text-base text-purple-600 dark:text-purple-400 font-medium">
                  {supervisor.position}
                </p>

                {supervisor.bio && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm max-w-2xl leading-relaxed">
                    {supervisor.bio}
                  </p>
                )}

                {/* Social Links */}
                <div className="inline-flex items-center justify-center md:justify-start bg-gray-50 dark:bg-gray-800 rounded-2xl p-3 mt-3">
                  <div className="flex items-center gap-4">
                    {supervisor.linkedin && (
                      <Link
                        href={ensureAbsoluteUrl(supervisor.linkedin) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Link>
                    )}
                    {supervisor.instagram && (
                      <Link
                        href={ensureAbsoluteUrl(supervisor.instagram) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
                      >
                        <Instagram className="h-5 w-5" />
                      </Link>
                    )}
                    {supervisor.github && (
                      <Link
                        href={ensureAbsoluteUrl(supervisor.github) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                    )}
                    {supervisor.website && (
                      <Link
                        href={ensureAbsoluteUrl(supervisor.website) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                      >
                        <Globe className="h-5 w-5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionWrapper>
      )}

      {/* Regular Team Members Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {regularMembers.map((member, index) => (
          <MotionWrapper
            key={member.id}
            amount={0.3}
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.9 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 1, 0.5, 1],
                },
              },
            }}
          >
            <div className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105">
              {/* Profile Image */}
              <div className="relative w-full aspect-square p-2">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {member.imageUrl ? (
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="px-6 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 text-center">
                  {member.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-2">
                  {member.position}
                </p>
                {member.bio && (
                  <p className="text-gray-600 dark:text-gray-300 text-xs text-center mb-4 line-clamp-2">
                    {member.bio}
                  </p>
                )}

                {/* Social Links */}
                <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-3">
                  <div className="flex items-center gap-3">
                    {member.linkedin && (
                      <Link
                        href={ensureAbsoluteUrl(member.linkedin) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Link>
                    )}
                    {member.instagram && (
                      <Link
                        href={ensureAbsoluteUrl(member.instagram) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
                      >
                        <Instagram className="h-4 w-4" />
                      </Link>
                    )}
                    {member.github && (
                      <Link
                        href={ensureAbsoluteUrl(member.github) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    )}
                    {member.website && (
                      <Link
                        href={ensureAbsoluteUrl(member.website) || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </MotionWrapper>
        ))}

        {/* Empty state */}
        {teamMembers.length === 0 && (
          <div className="col-span-full">
            <MotionWrapper className="text-center py-20">
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  No Team Members Yet
                </h3>
                <p className="text-foreground/70 max-w-md mx-auto">
                  Our amazing team will be introduced soon. Stay tuned!
                </p>
              </div>
            </MotionWrapper>
          </div>
        )}
      </div>
    </div>
  );
}
