import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  on?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  on = "light",
  align = "left",
  className,
}: SectionHeadProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Eyebrow on={on}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-5 text-balance text-[2rem] font-medium leading-[1.12] tracking-[-0.02em] md:text-[2.75rem] md:leading-[1.08]",
          on === "dark" ? "text-white" : "text-ink-950",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            on === "dark" ? "text-ink-200" : "text-mist-600",
          )}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}
