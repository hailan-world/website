import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[80rem] px-6 md:px-10", className)}>
      {children}
    </div>
  );
}
