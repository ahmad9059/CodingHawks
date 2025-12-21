"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AuthGuard } from "@/components/admin/auth-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Don't show admin layout for login page
  if (pathname === "/admin/login") {
    return children;
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AdminSidebar />
        <div className="lg:pl-64">
          <main className="p-6 min-h-screen">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
