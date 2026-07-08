import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  on?: "light" | "dark";
  className?: string;
}

export function ArrowLink({ href, children, on = "light", className }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-[15px] font-medium tracking-[-0.01em] transition-colors",
        on === "dark"
          ? "text-white hover:text-azure-300"
          : "text-ink-950 hover:text-azure-600",
        className,
      )}
    >
      {children}
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
      >
        <path
          d="M2 8h11M9.2 3.5 13.7 8l-4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
