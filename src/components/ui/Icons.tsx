type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ArrowUpRight = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" className={className} aria-hidden="true" {...base}>
    <path d="M4.5 11.5 11.5 4.5M5.75 4.5h5.75v5.75" />
  </svg>
);

export const ArrowDown = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" className={className} aria-hidden="true" {...base}>
    <path d="M8 3v10M3.75 8.75 8 13l4.25-4.25" />
  </svg>
);

export const ArrowLeft = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" className={className} aria-hidden="true" {...base}>
    <path d="M13 8H3M7.25 3.25 3 8l4.25 4.75" />
  </svg>
);

export const ArrowRight = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" className={className} aria-hidden="true" {...base}>
    <path d="M3 8h10M8.75 3.25 13 8l-4.25 4.75" />
  </svg>
);

export const Close = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" className={className} aria-hidden="true" {...base}>
    <path d="m4 4 8 8M12 4l-8 8" />
  </svg>
);

export const Instagram = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <rect x="3" y="3" width="18" height="18" rx="5.2" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const Snapchat = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M12 3c2.6 0 4.4 1.9 4.4 4.6 0 .9-.1 1.7-.1 2.3.5.3 1.1.2 1.6 0 .6-.2 1.1.6.6 1.1-.5.5-1.4.8-1.9 1 .4 1.5 2 3 3.4 3.3.5.1.6.7.1.9-.7.3-1.7.5-2.2.6-.2.4-.2.9-.5 1-.4.2-1.3-.1-2.2-.1-1 0-1.9.9-3.2.9s-2.2-.9-3.2-.9c-.9 0-1.8.3-2.2.1-.3-.1-.3-.6-.5-1-.5-.1-1.5-.3-2.2-.6-.5-.2-.4-.8.1-.9 1.4-.3 3-1.8 3.4-3.3-.5-.2-1.4-.5-1.9-1-.5-.5 0-1.3.6-1.1.5.2 1.1.3 1.6 0 0-.6-.1-1.4-.1-2.3C7.6 4.9 9.4 3 12 3Z" />
  </svg>
);

export const WhatsApp = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M3.5 20.5 5 16.4A8.2 8.2 0 1 1 8 19.3l-4.5 1.2Z" />
    <path d="M9.4 8.1c.3 2.9 2.6 5.2 5.5 5.5.5.1 1-.3 1-.8v-.9l-1.9-.6-.7.8a6.6 6.6 0 0 1-2.4-2.4l.8-.7-.6-1.9h-.9c-.5 0-.9.5-.8 1Z" />
  </svg>
);

export const Pin = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <path d="M12 21s6.5-5.6 6.5-10.3A6.5 6.5 0 0 0 5.5 10.7C5.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.6" r="2.4" />
  </svg>
);

export const Globe = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.2 2.4 3.3 5.4 3.3 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.3-5.4-3.3-8.5S9.8 5.9 12 3.5Z" />
  </svg>
);
