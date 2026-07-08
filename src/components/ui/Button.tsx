import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "inverted" | "outline" | "outlineDark";
type Size = "md" | "sm";

const variants: Record<Variant, string> = {
  primary: "bg-ink-950 text-white hover:bg-ink-700",
  inverted: "bg-white text-ink-950 hover:bg-azure-100",
  outline:
    "border border-ink-950/20 text-ink-950 hover:border-ink-950/60 hover:bg-ink-950/[0.03]",
  outlineDark:
    "border border-white/25 text-white hover:border-white/70 hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-7 text-[15px]",
  sm: "h-10 px-5 text-sm",
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

function ArrowIcon() {
  return (
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
  );
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-all duration-300",
    variants[variant],
    sizes[size],
    disabled && "pointer-events-none opacity-60",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {arrow && <ArrowIcon />}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled}>
      {children}
      {arrow && <ArrowIcon />}
    </button>
  );
}
