import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';

const fontBody = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'HawksCode - Coding Hawks Society',
  description: 'Empowering the next generation of coders at MNS-University of Agriculture, Multan.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={cn("font-body flex min-h-screen flex-col bg-background text-foreground antialiased", fontBody.variable, fontHeadline.variable)}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
