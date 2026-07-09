import type { SVGProps } from "react";

/** Shared line-icon set for contact channels, matching the site's thin-stroke style. */

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="m4 7 8 6.2L20 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GlobeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.2 17.8 4 20l2.28-2.14A8.5 8.5 0 1 0 6.2 17.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 8.6c.2-.5.4-.5.6-.5h.5c.16 0 .38 0 .55.42.2.5.68 1.78.74 1.9.06.14.1.3.02.48-.08.18-.12.28-.24.42-.12.16-.26.34-.37.46-.12.12-.25.26-.1.52.14.26.63 1.05 1.36 1.7.94.84 1.72 1.1 1.98 1.22.26.12.4.1.55-.06.16-.16.65-.76.82-1.02.17-.26.34-.22.56-.13.24.08 1.5.7 1.75.83.26.13.43.2.5.3.06.12.06.68-.16 1.35-.22.66-1.3 1.24-1.8 1.3-.46.06-1.02.1-1.66-.1-.38-.12-.87-.28-1.5-.55-2.63-1.14-4.35-3.8-4.48-3.98-.13-.18-1.08-1.43-1.08-2.74 0-1.3.68-1.94.92-2.2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QrIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14.5" y="3.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3.5" y="14.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M14.5 14.5h2.7v2.7h-2.7zM19.5 14.5h1v1h-1zM14.5 19.5h1v1h-1zM17.7 17.7h1.1v1.1h-1.1zM19.5 19.5h1v1h-1z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8.2 10.4v6.3M8.2 7.7v.01M11.6 16.7v-3.6c0-1.4.9-2.3 2.1-2.3s1.9.9 1.9 2.3v3.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11.6 10.4v6.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
