import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Chip({
  children,
  on = "light",
  className,
}: {
  children: ReactNode;
  on?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.08em]",
        on === "dark"
          ? "border-white/15 text-ink-200"
          : "border-ink-950/12 text-mist-600",
        className,
      )}
    >
      {children}
    </span>
  );
}
