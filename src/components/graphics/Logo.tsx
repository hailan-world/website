import { cn } from "@/lib/utils";

interface LogoProps {
  /** The background the logo sits on. */
  on?: "light" | "dark";
  className?: string;
}

/** HAILAN wordmark with the layered-material monogram. */
export function Logo({ on = "dark", className }: LogoProps) {
  const bar = on === "dark" ? "fill-white" : "fill-ink-950";
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="3.5" width="20" height="3.2" rx="1.6" className={bar} />
        <rect
          x="2"
          y="10.4"
          width="13.5"
          height="3.2"
          rx="1.6"
          className={on === "dark" ? "fill-azure-400" : "fill-azure-600"}
        />
        <rect x="2" y="17.3" width="20" height="3.2" rx="1.6" className={bar} />
      </svg>
      <span
        className={cn(
          "text-[15px] font-semibold tracking-[0.34em]",
          on === "dark" ? "text-white" : "text-ink-950",
        )}
      >
        HAILAN
      </span>
    </span>
  );
}
