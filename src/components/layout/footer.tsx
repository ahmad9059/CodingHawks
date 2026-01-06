import Link from "next/link";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Logo } from "@/components/logo";

type SiteSettings = {
  [key: string]: string;
};

interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const socialLinks = [
    {
      icon: Twitter,
      href: settings.social_twitter || "#",
      name: "Twitter",
    },
    {
      icon: Github,
      href: settings.social_github || "#",
      name: "GitHub",
    },
    {
      icon: Linkedin,
      href: settings.social_linkedin || "#",
      name: "LinkedIn",
    },
    {
      icon: Instagram,
      href: settings.social_instagram || "#",
      name: "Instagram",
    },
  ];
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-2 sm:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <div className="mb-4 sm:mb-6">
              <Logo className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300" />
            </div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 max-w-md leading-relaxed">
              {settings.site_description ||
                "Empowering the next generation of innovative coders and tech leaders at MNS-University of Agriculture, Multan. Turn your everyday coding into extraordinary opportunities."}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#5D1A75]/10 hover:bg-[#5D1A75]/20 flex items-center justify-center text-[#5D1A75] hover:text-[#5D1A75] transition-all duration-300 hover:scale-105"
                >
                  <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4
              className="font-headline font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white text-sm sm:text-base"
              style={{ fontWeight: 700 }}
            >
              Explore
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/#about"
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/announcements"
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Announcements
                </Link>
              </li>
              <li>
                <Link
                  href="/#fields"
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Fields
                </Link>
              </li>
              <li>
                <Link
                  href="/achievements"
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Achievements
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4
              className="font-headline font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white text-sm sm:text-base"
              style={{ fontWeight: 700 }}
            >
              Connect
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/admin/login"
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/cabinet"
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Cabinet
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Sponsor
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-2 sm:col-span-1">
            <h4
              className="font-headline font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white text-sm sm:text-base"
              style={{ fontWeight: 700 }}
            >
              Legal
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#5D1A75] flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                  {settings.contact_email || "support@codinghawks.com"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#5D1A75] flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                  Phone
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                  {settings.contact_phone || "+1 (234) 567-890"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:col-span-2 md:col-span-1">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#5D1A75] flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                  Address
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Agriculture Complex, Old Shuja Abad Rd, Multan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()}{" "}
              {settings.site_title || "Coding Hawks"}. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <Link
                href="#"
                className="hover:text-[#5D1A75] transition-colors duration-300"
              >
                Sitemap
              </Link>
              <Link
                href="#"
                className="hover:text-[#5D1A75] transition-colors duration-300"
              >
                Accessibility
              </Link>
              <Link
                href="#"
                className="hover:text-[#5D1A75] transition-colors duration-300"
              >
                Status
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
