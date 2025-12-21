"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/announcements", label: "Announcements" },
  { href: "/achievements", label: "Achievements" },
  { href: "/cabinet", label: "Cabinet" },
  { href: "/#fields", label: "Fields" },
];

function useTheme() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const storedTheme =
      typeof window !== "undefined"
        ? localStorage.getItem("theme") || "dark"
        : "dark";
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
}

function useScrollPosition() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only apply scroll logic on home page
    if (pathname !== "/") {
      setIsScrolled(true); // Always use dark text on non-home pages
      return;
    }

    const handleScroll = () => {
      // Change color after scrolling past the hero section (approximately 80vh)
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;
      setIsScrolled(scrollPosition > heroHeight);
    };

    // Reset to white text when on home page
    setIsScrolled(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return isScrolled;
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isScrolled = useScrollPosition();

  // Dynamic text colors based on scroll position
  const textColor = isScrolled ? "text-foreground" : "text-white";
  const hoverTextColor = isScrolled
    ? "hover:text-foreground/80"
    : "hover:text-white/80";
  const hoverBgColor = isScrolled
    ? "hover:bg-foreground/10"
    : "hover:bg-white/10";

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-sm">
      <div className="container mx-auto flex h-20 max-w-screen-xl items-center justify-center px-4 md:px-6">
        <div className="absolute left-4 md:left-6 flex items-center">
          <Logo
            className={`${textColor} ${hoverTextColor} transition-colors duration-300`}
          />
        </div>

        <nav className="hidden items-center justify-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
              <Link
                href={link.href}
                className={`text-base font-medium ${textColor} transition-colors duration-300 ${hoverTextColor} ${hoverBgColor} px-4 py-2 rounded-md`}
              >
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="absolute right-4 md:right-6 flex items-center justify-end gap-2">
          <Button asChild className="hidden md:flex rounded-lg">
            <Link href="/#join-us" className="flex items-center gap-2">
              Join Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={`hidden md:flex ${textColor} ${hoverBgColor} transition-colors duration-300`}
          >
            {theme === "light" ? (
              <Moon className="h-6 w-6" />
            ) : (
              <Sun className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu
                    className={`h-6 w-6 ${textColor} transition-colors duration-300`}
                  />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-background"
              >
                <div className="flex h-full flex-col p-6">
                  <div className="mb-8 flex items-center">
                    <Logo className="text-foreground hover:text-foreground/80" />
                  </div>
                  <nav className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <Button asChild className="mt-8 w-full rounded-full">
                    <Link
                      href="/#join-us"
                      className="flex items-center justify-center gap-2"
                    >
                      Join Us
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="mt-auto flex items-center justify-between">
                    <span>Switch Theme</span>
                    <Button variant="ghost" size="icon" onClick={toggleTheme}>
                      {theme === "light" ? (
                        <Moon className="h-6 w-6" />
                      ) : (
                        <Sun className="h-6 w-6" />
                      )}
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
