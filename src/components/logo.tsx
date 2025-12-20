import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-3 text-white transition-colors hover:text-white/80",
        className
      )}
    >
      <div className="p-1 bg-transparent">
        <Image
          src="/trans-2.png"
          alt="HawksCode logo"
          width={32}
          height={32}
          loading="eager"
          className="object-contain"
          priority
        />
      </div>
      <span className="text-xl font-bold font-headline">CodingHawks</span>
    </Link>
  );
}
