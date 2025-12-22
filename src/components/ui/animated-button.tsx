"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function AnimatedButton({
  children,
  className,
  onClick,
  href,
  type = "button",
  disabled = false,
}: AnimatedButtonProps) {
  const buttonClasses = cn(
    "animated-button",
    "font-inherit text-xl bg-[#5D1A75] text-white py-3 px-4 pl-4 flex items-center border-none rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
    className
  );

  const content = (
    <>
      <span className="button-text block ml-1 transition-all duration-300 ease-in-out">
        {children}
      </span>
      <div className="svg-wrapper ml-2 transition-all duration-300 ease-in-out">
        <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-in-out" />
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {content}
    </button>
  );
}
