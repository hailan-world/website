import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  /** The background the label sits on. */
  on?: "light" | "dark";
  className?: string;
}

export function Eyebrow({ children, on = "light", className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em]",
        on === "dark" ? "text-azure-300" : "text-azure-600",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5",
          on === "dark" ? "bg-azure-300" : "bg-azure-600",
        )}
      />
      {children}
    </span>
  );
}
