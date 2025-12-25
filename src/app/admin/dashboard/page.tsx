import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Images,
  Megaphone,
  Trophy,
  Users,
  Plus,
  TrendingUp,
  Activity,
  Eye,
  Edit3,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

// Force dynamic rendering
export const dynamic = "force-dynamic";

async function getDashboardStats() {
  const [
    sliderCount,
    announcementCount,
    achievementCount,
    fieldCount,
    teamMemberCount,
    activeAnnouncements,
    activeAchievements,
    activeTeamMembers,
  ] = await Promise.all([
    prisma.sliderImage.count(),
    prisma.announcement.count(),
    prisma.achievement.count(),
    prisma.field.count(),
    prisma.teamMember.count(),
    prisma.announcement.count({ where: { isActive: true } }),
    prisma.achievement.count({ where: { isActive: true } }),
    prisma.teamMember.count({ where: { isActive: true } }),
  ]);

  return {
    sliderCount,
    announcementCount,
    achievementCount,
    fieldCount,
    teamMemberCount,
    activeAnnouncements,
    activeAchievements,
    activeTeamMembers,
  };
}

async function getRecentActivity() {
  const [recentAnnouncements, recentAchievements, recentTeamMembers] =
    await Promise.all([
      prisma.announcement.findMany({
        take: 3,
        orderBy: { updatedAt: "desc" },
        select: { id: true, title: true, updatedAt: true, isActive: true },
      }),
      prisma.achievement.findMany({
        take: 3,
        orderBy: { updatedAt: "desc" },
        select: { id: true, title: true, updatedAt: true, isActive: true },
      }),
      prisma.teamMember.findMany({
        take: 3,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          name: true,
          position: true,
          updatedAt: true,
          isActive: true,
        },
      }),
    ]);

  return { recentAnnouncements, recentAchievements, recentTeamMembers };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  const activity = await getRecentActivity();

  const statsCards = [
    {
      title: "Slider Images",
      count: stats.sliderCount,
      description: "Hero section images",
      icon: Images,
      href: "/admin/slider",
      color: "bg-blue-500",
      trend: "+2 this week",
    },
    {
      title: "Announcements",
      count: stats.announcementCount,
      active: stats.activeAnnouncements,
      description: "Latest news and updates",
      icon: Megaphone,
      href: "/admin/announcements",
      color: "bg-green-500",
      trend: "+1 this week",
    },
    {
      title: "Achievements",
      count: stats.achievementCount,
      active: stats.activeAchievements,
      description: "Society accomplishments",
      icon: Trophy,
      href: "/admin/achievements",
      color: "bg-yellow-500",
      trend: "No change",
    },
    {
      title: "Cabinet",
      count: stats.teamMemberCount,
      active: stats.activeTeamMembers,
      description: "Team members",
      icon: Users,
      href: "/admin/cabinet",
      color: "bg-purple-500",
      trend: "+3 this month",
    },
  ];

  const quickActions = [
    {
      title: "Add Slider Image",
      description: "Upload new hero images",
      href: "/admin/slider",
      icon: Images,
      color:
        "bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900",
    },
    {
      title: "Create Announcement",
      description: "Share news and updates",
      href: "/admin/announcements",
      icon: Megaphone,
      color:
        "bg-green-50 hover:bg-green-100 dark:bg-green-950 dark:hover:bg-green-900",
    },
    {
      title: "Add Achievement",
      description: "Showcase accomplishments",
      href: "/admin/achievements",
      icon: Trophy,
      color:
        "bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950 dark:hover:bg-yellow-900",
    },
    {
      title: "Manage Cabinet",
      description: "Add team members",
      href: "/admin/cabinet",
      icon: Users,
      color:
        "bg-purple-50 hover:bg-purple-100 dark:bg-purple-950 dark:hover:bg-purple-900",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card) => (
          <Card
            key={card.title}
            className="relative overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <Link href={card.href} className="block">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.color} bg-opacity-10`}>
                  <card.icon
                    className={`h-4 w-4 ${card.color.replace("bg-", "text-")}`}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {card.count}
                  </div>
                  {card.active !== undefined && (
                    <Badge variant="secondary" className="text-xs">
                      {card.active} active
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <CardDescription className="text-xs">
                    {card.description}
                  </CardDescription>
                  <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {card.trend}
                  </div>
                </div>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest changes to your content
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activity.recentAnnouncements.map((item) => (
                <div
                  key={`announcement-${item.id}`}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      Announcement: {item.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(item.updatedAt).toLocaleDateString()} •{" "}
                      {item.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/announcements`}>
                      <Edit3 className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              ))}
              {activity.recentAchievements.map((item) => (
                <div
                  key={`achievement-${item.id}`}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      Achievement: {item.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(item.updatedAt).toLocaleDateString()} •{" "}
                      {item.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/achievements`}>
                      <Edit3 className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              ))}
              {activity.recentTeamMembers.map((item) => (
                <div
                  key={`team-${item.id}`}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      Team Member: {item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.position} •{" "}
                      {new Date(item.updatedAt).toLocaleDateString()} •{" "}
                      {item.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/cabinet`}>
                      <Edit3 className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className={`block w-full text-left p-4 rounded-lg ${action.color} transition-all duration-200 group`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <action.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {action.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {action.description}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
