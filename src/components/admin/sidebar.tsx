"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Images,
  Megaphone,
  Trophy,
  Layers,
  Settings,
  LogOut,
  Users,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Slider Images", href: "/admin/slider", icon: Images },
  { name: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { name: "Achievements", href: "/admin/achievements", icon: Trophy },
  { name: "Cabinet", href: "/admin/cabinet", icon: Users },
  { name: "Fields", href: "/admin/fields", icon: Layers },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-900 px-6 pb-4 border-r border-gray-200 dark:border-gray-700">
        <div className="flex h-16 shrink-0 items-center border-b border-gray-200 dark:border-gray-700">
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
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        pathname === item.href
                          ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                          : "text-gray-700 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors"
                      )}
                    >
                      <item.icon
                        className={cn(
                          pathname === item.href
                            ? "text-purple-700 dark:text-purple-300"
                            : "text-gray-400 group-hover:text-purple-700 dark:group-hover:text-purple-300",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <button
                onClick={handleLogout}
                className="group -mx-2 flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 transition-colors"
              >
                <LogOut
                  className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-red-700 dark:group-hover:text-red-300"
                  aria-hidden="true"
                />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
