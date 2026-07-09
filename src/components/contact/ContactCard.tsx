import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ContactCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  muted?: boolean;
  note?: string;
}

/** A single contact channel row — icon, label, value, and an optional link. */
export function ContactCard({
  icon,
  label,
  value,
  href,
  external,
  muted,
  note,
}: ContactCardProps) {
  const content = (
    <>
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
          muted ? "bg-mist-100 text-mist-400" : "bg-azure-600/8 text-azure-600",
        )}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-mist-500">
          {label}
        </span>
        <span
          className={cn(
            "mt-1 block truncate text-[15px] font-medium tracking-[-0.01em] md:text-base",
            muted ? "text-mist-400" : "text-ink-950",
          )}
        >
          {value}
        </span>
        {note && <span className="mt-1 block text-[13px] text-mist-500">{note}</span>}
      </span>
      {href && (
        <svg
          width="15"
          height="15"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="shrink-0 self-center text-mist-400 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-azure-600 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
        >
          <path
            d="M2 8h11M9.2 3.5 13.7 8l-4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );

  const rowClasses = cn(
    "group flex items-center gap-4 rounded-2xl border border-ink-950/10 bg-white p-5 transition-colors duration-300",
    href && "hover:border-azure-600/40 hover:bg-azure-600/[0.03]",
  );

  if (href) {
    return (
      <a
        href={href}
        className={rowClasses}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return <div className={rowClasses}>{content}</div>;
}
