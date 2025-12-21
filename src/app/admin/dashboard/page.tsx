import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Images, Megaphone, Trophy, Layers, Users } from "lucide-react";

// Force dynamic rendering
export const dynamic = "force-dynamic";

async function getDashboardStats() {
  const [
    sliderCount,
    announcementCount,
    achievementCount,
    fieldCount,
    teamMemberCount,
  ] = await Promise.all([
    prisma.sliderImage.count(),
    prisma.announcement.count(),
    prisma.achievement.count(),
    prisma.field.count(),
    prisma.teamMember.count(),
  ]);

  return {
    sliderCount,
    announcementCount,
    achievementCount,
    fieldCount,
    teamMemberCount,
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const cards = [
    {
      title: "Slider Images",
      count: stats.sliderCount,
      description: "Hero section images",
      icon: Images,
      href: "/admin/slider",
    },
    {
      title: "Announcements",
      count: stats.announcementCount,
      description: "Latest news and updates",
      icon: Megaphone,
      href: "/admin/announcements",
    },
    {
      title: "Achievements",
      count: stats.achievementCount,
      description: "Society accomplishments",
      icon: Trophy,
      href: "/admin/achievements",
    },
    {
      title: "Cabinet",
      count: stats.teamMemberCount,
      description: "Team members",
      icon: Users,
      href: "/admin/cabinet",
    },
    {
      title: "Fields",
      count: stats.fieldCount,
      description: "Areas of expertise",
      icon: Layers,
      href: "/admin/fields",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to the Coding Hawks admin dashboard
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card
            key={card.title}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.count}</div>
              <CardDescription>{card.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest changes to your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New slider image added</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Achievement updated</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    New announcement published
                  </p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="/admin/slider"
                className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="font-medium">Add Slider Image</div>
                <div className="text-sm text-gray-500">
                  Upload new hero images
                </div>
              </a>
              <a
                href="/admin/announcements"
                className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="font-medium">Create Announcement</div>
                <div className="text-sm text-gray-500">
                  Share news and updates
                </div>
              </a>
              <a
                href="/admin/achievements"
                className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="font-medium">Add Achievement</div>
                <div className="text-sm text-gray-500">
                  Showcase accomplishments
                </div>
              </a>
              <a
                href="/admin/cabinet"
                className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="font-medium">Manage Cabinet</div>
                <div className="text-sm text-gray-500">Add team members</div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
