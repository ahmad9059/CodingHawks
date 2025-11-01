import Link from 'next/link';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Logo } from '@/components/logo';

const socialLinks = [
  { icon: Twitter, href: '#', name: 'Twitter' },
  { icon: Github, href: '#', name: 'GitHub' },
  { icon: Linkedin, href: '#', name: 'LinkedIn' },
  { icon: Instagram, href: '#', name: 'Instagram' },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Logo />
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link key={social.name} href={social.href} aria-label={social.name} target="_blank" rel="noopener noreferrer">
                <social.icon className="h-6 w-6 text-foreground/60 transition-colors hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Coding Hawks Society. All rights reserved.</p>
          <p className="mt-1">MNS-University of Agriculture, Multan</p>
        </div>
      </div>
    </footer>
  );
}
