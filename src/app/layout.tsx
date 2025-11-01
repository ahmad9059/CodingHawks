"use client";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Loader } from "@/components/loader";
import { AnimatePresence } from "framer-motion";

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const fontHeadline = Inter({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-headline",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const [themeLoaded, setThemeLoaded] = useState(false);

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
        <title>Coding Hawks - Coding Hawks Society</title>
        <meta
          name="description"
          content="Empowering the next generation of coders at MNS-University of Agriculture, Multan."
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
          <Header />
          <main className="flex-1 bg-background">{children}</main>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
