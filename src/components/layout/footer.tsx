import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram, Heart } from "lucide-react";
import { Logo } from "@/components/logo";

const socialLinks = [
  { icon: Twitter, href: "#", name: "Twitter" },
  { icon: Github, href: "#", name: "GitHub" },
  { icon: Linkedin, href: "#", name: "LinkedIn" },
  { icon: Instagram, href: "#", name: "Instagram" },
];

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-background to-secondary/30 border-t border-border/50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 text-foreground/10 font-mono text-xs">
          {"<footer>"}
        </div>
        <div className="absolute bottom-20 right-32 text-foreground/10 font-mono text-xs">
          {"</coding-hawks>"}
        </div>
        <div className="absolute top-1/2 left-1/3 text-foreground/10 font-mono text-xs">
          {"{ community: true }"}
        </div>
      </div>

      <div className="container relative mx-auto px-4 py-16 md:px-6">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col items-start gap-6 lg:col-span-4">
            <Logo />
            <p className="max-w-xs text-foreground/80 leading-relaxed">
              Empowering the next generation of innovative coders and tech
              leaders at MNS-University of Agriculture, Multan.
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
                  className="group p-2 rounded-full bg-foreground/5 hover:bg-primary/10 text-foreground/60 hover:text-primary transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-headline font-semibold mb-6 text-foreground flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
                Explore
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/#about"
                    className="text-foreground/70 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/announcements"
                    className="text-foreground/70 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Announcements
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#fields"
                    className="text-foreground/70 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Fields
                  </Link>
                </li>
                <li>
                  <Link
                    href="/achievements"
                    className="text-foreground/70 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Achievements
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-headline font-semibold mb-6 text-foreground flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                Connect
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/#join-us"
                    className="text-foreground/70 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Join Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-foreground/70 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-foreground/70 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Sponsor
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 mt-8 md:mt-0">
              <h4 className="font-headline font-semibold mb-6 text-foreground flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                Legal
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-foreground/70 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-foreground/70 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-foreground/70">
                &copy; {new Date().getFullYear()} Coding Hawks Society. All
                rights reserved.
              </p>
              <p className="text-xs text-foreground/60 mt-1">
                MNS-University of Agriculture, Multan
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>by Coding Hawks</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
