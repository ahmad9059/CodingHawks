import Image from "next/image";
import Link from "next/link";
import { Linkedin, Instagram, Github, Globe, Users } from "lucide-react";
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

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {teamMembers.map((member, index) => (
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
            {/* Profile Image - MINIMAL padding */}
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
              {/* Name - less bold */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 text-center">
                {member.name}
              </h3>

              {/* Position - directly below name, smaller text */}
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-2">
                {member.position}
              </p>

              {/* Bio/Title - below position if exists */}
              {member.bio && (
                <p className="text-gray-600 dark:text-gray-300 text-xs text-center mb-4 line-clamp-2">
                  {member.bio}
                </p>
              )}

              {/* Bottom Section with Social Links Only - centered */}
              <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-3">
                {/* Social Links - centered */}
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
  );
}
