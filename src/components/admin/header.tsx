"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Bell,
  Menu,
  X,
  LayoutDashboard,
  Images,
  Megaphone,
  Trophy,
  Layers,
  Settings,
  LogOut,
  Users,
  ChevronRight,
  Activity,
  Calendar,
  Check,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    description: "Overview of your content",
  },
  {
    name: "Slider Images",
    href: "/admin/slider",
    icon: Images,
    description: "Manage hero section images",
  },
  {
    name: "Announcements",
    href: "/admin/announcements",
    icon: Megaphone,
    description: "News and updates",
  },
  {
    name: "Achievements",
    href: "/admin/achievements",
    icon: Trophy,
    description: "Society accomplishments",
  },
  {
    name: "Cabinet",
    href: "/admin/cabinet",
    icon: Users,
    description: "Team members",
  },
  {
    name: "Fields",
    href: "/admin/fields",
    icon: Layers,
    description: "Custom content fields",
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    description: "Site configuration",
  },
];

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning";
};

export function AdminHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Achievement Added",
      message: "1st Position - BZU Clash and Code was added",
      time: "2 hours ago",
      read: false,
      type: "success",
    },
    {
      id: "2",
      title: "Announcement Published",
      message: "Venture Spark 2026 announcement is now live",
      time: "5 hours ago",
      read: false,
      type: "info",
    },
    {
      id: "3",
      title: "Team Member Updated",
      message: "Ali Abdullah's profile was updated",
      time: "1 day ago",
      read: true,
      type: "info",
    },
  ]);
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Get current page info
  const currentPage = navigation.find((item) => pathname === item.href);
  const pageTitle = currentPage?.name || "Dashboard";
  const pageDescription = currentPage?.description || "Welcome back!";

  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex h-20 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="lg:hidden -ml-2">
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex h-full flex-col bg-white dark:bg-gray-900">
              {/* Mobile menu header */}
              <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                    <Image
                      src="https://ahvnfpqkmwbozonseqqr.supabase.co/storage/v1/object/public/conding-hawks/extra/image-1.webp"
                      alt="Coding Hawks Logo"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                      Admin Panel
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Coding Hawks
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile navigation */}
              <nav className="flex-1 overflow-y-auto py-4 px-3">
                <ul className="space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          pathname === item.href
                            ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-l-4 border-purple-600"
                            : "text-gray-700 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-l-4 border-transparent",
                          "group flex items-center gap-x-3 rounded-r-md py-3 px-3 text-sm font-semibold transition-all"
                        )}
                      >
                        <item.icon
                          className={cn(
                            pathname === item.href
                              ? "text-purple-700 dark:text-purple-300"
                              : "text-gray-400 group-hover:text-purple-700 dark:group-hover:text-purple-300",
                            "h-5 w-5 shrink-0"
                          )}
                        />
                        {item.name}
                        <ChevronRight
                          className={cn(
                            "ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity",
                            pathname === item.href
                              ? "text-purple-700 dark:text-purple-300 opacity-100"
                              : "text-gray-400"
                          )}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile menu footer */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src="https://ahvnfpqkmwbozonseqqr.supabase.co/storage/v1/object/public/conding-hawks/extra/image-1.webp"
                      alt="Coding Hawks"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Administrator
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Full access
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-x-3 rounded-md py-2.5 px-3 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Page title section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            {currentPage && (
              <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <currentPage.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            )}
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                {pageTitle}
              </h1>
              <p className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 truncate">
                {pageDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-x-3 lg:gap-x-4">
          {/* Live badge - hidden on small screens */}
          <Badge
            variant="outline"
            className="hidden md:flex items-center gap-1 text-green-600 border-green-200 dark:border-green-800"
          >
            <Activity className="h-3 w-3" />
            Live
          </Badge>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-purple-600 hover:text-purple-700 dark:text-purple-400 font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No notifications</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors",
                          !notification.read &&
                            "bg-purple-50/50 dark:bg-purple-900/10"
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "mt-1 w-2 h-2 rounded-full shrink-0",
                              notification.type === "success" && "bg-green-500",
                              notification.type === "info" && "bg-blue-500",
                              notification.type === "warning" && "bg-yellow-500"
                            )}
                          />
                          <div className="flex-1 min-w-0">
                            <p
                              className={cn(
                                "text-sm truncate",
                                !notification.read
                                  ? "font-semibold text-gray-900 dark:text-white"
                                  : "font-medium text-gray-700 dark:text-gray-300"
                              )}
                            >
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0 mt-2" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-2">
                <button className="w-full text-center text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 font-medium py-1">
                  View all notifications
                </button>
              </div>
            </PopoverContent>
          </Popover>

          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-700" />

          {/* User profile */}
          <div className="flex items-center gap-x-3">
            <div className="h-9 w-9 rounded-full overflow-hidden shadow-sm ring-2 ring-purple-100 dark:ring-purple-900">
              <Image
                src="https://ahvnfpqkmwbozonseqqr.supabase.co/storage/v1/object/public/conding-hawks/extra/image-1.webp"
                alt="Coding Hawks"
                width={36}
                height={36}
                className="object-cover"
              />
            </div>
            <div className="hidden xl:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Administrator
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Coding Hawks
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
