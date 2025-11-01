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
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-12 md:grid-cols-3">
            <div className='flex flex-col items-start gap-4'>
                <Logo />
                <p className="max-w-xs text-foreground/70">Empowering the next generation of coders.</p>
            </div>
            <div className='grid grid-cols-2 gap-8'>
                <div>
                    <h4 className='font-headline font-semibold mb-4'>Explore</h4>
                    <ul className='space-y-3'>
                        <li><Link href="/#about" className="text-foreground/70 transition-colors hover:text-primary">About Us</Link></li>
                        <li><Link href="/announcements" className="text-foreground/70 transition-colors hover:text-primary">Announcements</Link></li>
                        <li><Link href="/#fields" className="text-foreground/70 transition-colors hover:text-primary">Fields</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className='font-headline font-semibold mb-4'>Connect</h4>
                    <ul className='space-y-3'>
                        <li><Link href="/#join-us" className="text-foreground/70 transition-colors hover:text-primary">Join Us</Link></li>
                        <li><Link href="#" className="text-foreground/70 transition-colors hover:text-primary">Contact</Link></li>
                    </ul>
                </div>
            </div>
             <div className='md:text-right'>
                <h4 className='font-headline font-semibold mb-4'>Follow Us</h4>
                <div className="flex items-center gap-4 md:justify-end">
                    {socialLinks.map((social) => (
                    <Link key={social.name} href={social.href} aria-label={social.name} target="_blank" rel="noopener noreferrer">
                        <social.icon className="h-6 w-6 text-foreground/60 transition-colors hover:text-primary" />
                    </Link>
                    ))}
                </div>
            </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Coding Hawks Society. All rights reserved.</p>
          <p className="mt-1">MNS-University of Agriculture, Multan</p>
        </div>
      </div>
    </footer>
  );
}
