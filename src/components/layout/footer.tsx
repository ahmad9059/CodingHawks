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

const socialLinks = [
  { icon: Twitter, href: "#", name: "Twitter" },
  { icon: Github, href: "#", name: "GitHub" },
  { icon: Linkedin, href: "#", name: "LinkedIn" },
  { icon: Instagram, href: "#", name: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
              Empowering the next generation of innovative coders and tech
              leaders at MNS-University of Agriculture, Multan. Turn your
              everyday coding into extraordinary opportunities.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#5D1A75]/10 hover:bg-[#5D1A75]/20 flex items-center justify-center text-[#5D1A75] hover:text-[#5D1A75] transition-all duration-300 hover:scale-105"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4
              className="font-headline font-semibold mb-6 text-gray-900 dark:text-white"
              style={{ fontWeight: 700 }}
            >
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#about"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/announcements"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Announcements
                </Link>
              </li>
              <li>
                <Link
                  href="/#fields"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Fields
                </Link>
              </li>
              <li>
                <Link
                  href="/achievements"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Achievements
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4
              className="font-headline font-semibold mb-6 text-gray-900 dark:text-white"
              style={{ fontWeight: 700 }}
            >
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#join-us"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Join Us
                </Link>
              </li>
              <li>
                <Link
                  href="/cabinet"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Cabinet
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Sponsor
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="font-headline font-semibold mb-6 text-gray-900 dark:text-white"
              style={{ fontWeight: 700 }}
            >
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#5D1A75] transition-colors duration-300"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-[#5D1A75]" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  support@codinghawks.com
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-[#5D1A75]" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Phone
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  +1 (234) 567-890
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#5D1A75]" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Address
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  123 Finance Street, City, Country
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Coding Hawks. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
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
