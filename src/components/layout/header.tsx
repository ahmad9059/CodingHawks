'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/announcements', label: 'Announcements' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/#fields', label: 'Fields' },
];

function useTheme() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'border-b border-border/20 bg-background/80 backdrop-blur-xl' : 'border-b border-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 max-w-screen-lg items-center justify-between px-4 md:px-6">
        <div className="flex flex-1 justify-start">
          <Logo />
        </div>
        
        <nav className="hidden items-center justify-center gap-2 md:flex flex-1">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
                <Link
                href={link.href}
                className="text-base font-medium text-foreground/80 transition-colors hover:text-primary hover:bg-transparent px-4 py-2 rounded-md"
                >
                {link.label}
                </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 flex-1">
            <Button asChild className="hidden md:flex rounded-lg">
                <Link href="/#join-us">
                    Join Us
                </Link>
            </Button>
             <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
                <div className="flex h-full flex-col p-6">
                    <div className="mb-8 flex items-center justify-between">
                        <Logo />
                        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close menu</span>
                        </Button>
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
                        <Link href="/#join-us">Join Us</Link>
                    </Button>
                </div>
                </SheetContent>
            </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
