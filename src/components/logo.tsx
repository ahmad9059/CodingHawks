import Link from 'next/link';
import { Feather } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-3 text-foreground transition-colors hover:text-primary', className)}>
      <div className="rounded-lg bg-primary p-2.5">
        <Feather className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold font-headline">HawksCode</span>
    </Link>
  );
}
