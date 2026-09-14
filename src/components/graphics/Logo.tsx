import { cn } from "@/lib/utils";

interface LogoProps {
  /** The background the logo sits on. */
  on?: "light" | "dark";
  className?: string;
}

/** Official HAILAN wordmark, traced from the provided final artwork. */
export function Logo({ on = "dark", className }: LogoProps) {
  return (
    <svg
      viewBox="176.98 255.66 487.92 83.96"
      aria-hidden="true"
      className={cn(
        "h-5 w-auto shrink-0",
        on === "dark" ? "fill-white" : "fill-ink-950",
        className,
      )}
    >
      <path d="M176.98,339.62v-83.96h13.15v83.96h-13.15ZM189.06,303.87v-11.2h52.03v11.2h-52.03ZM234.13,339.62v-83.96h13.15v83.96h-13.15Z" />
      <path d="M268.35,339.62l34.56-83.96h11.22l34.56,83.96h-14.19l-25.98-67.73-25.98,67.73h-14.18Z" />
      <path d="M384.18,255.66v83.96h-13.15v-83.96h13.15Z" />
      <path d="M415.56,339.62v-83.96h13.15v83.96h-13.15ZM422.14,339.62v-11.2h53.64v11.2h-53.64Z" />
      <path d="M491.68,339.62l34.56-83.96h11.22l34.56,83.96h-14.18l-25.98-67.73-25.98,67.73h-14.18Z" />
      <path d="M595.66,339.56v-83.9h13.23l43.24,63.6-.25-63.6h13.02v83.9h-12.06l-44.41-63.92.25,63.92h-13.02Z" />
    </svg>
  );
}
