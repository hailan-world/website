import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * A server-rendered layout wrapper. The former scroll animation hid content
 * until client JavaScript ran, so visibility now takes precedence over motion.
 */
export function Reveal({ children, className }: RevealProps) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
