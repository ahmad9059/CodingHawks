"use client";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { Inter, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Loader } from "@/components/loader";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSiteSettings } from "@/hooks/use-site-settings";

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const fontHeadline = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-headline",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const pathname = usePathname();
  const { settings } = useSiteSettings();

  // Check if we're on an admin page
  const isAdminPage = pathname?.startsWith("/admin");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setThemeLoaded(true);

    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <title>
          {settings.site_title
            ? `${settings.site_title} - Coding Hawks Society`
            : "Coding Hawks - Coding Hawks Society"}
        </title>
        <meta
          name="description"
          content={
            settings.site_description ||
            "Empowering the next generation of coders at MNS-University of Agriculture, Multan."
          }
        />
      </head>
      <body
        className={cn(
          "font-body text-foreground antialiased",
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <AnimatePresence>{loading && <Loader />}</AnimatePresence>

        <div
          className={cn(
            "flex min-h-screen flex-col transition-opacity duration-500",
            loading || !themeLoaded ? "opacity-0" : "opacity-100"
          )}
        >
          {!isAdminPage && <Header />}
          <main
            className={cn(
              "flex-1 bg-background",
              isAdminPage && "min-h-screen"
            )}
          >
            {children}
          </main>
          {!isAdminPage && <Footer settings={settings} />}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
