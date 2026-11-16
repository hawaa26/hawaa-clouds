export const LogoMark = ({ className = "h-9 w-9" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="lg-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#D9ECF9" />
        <stop offset="1" stopColor="#FBE3EC" />
      </linearGradient>
      <linearGradient id="lg-heart" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F3B8D3" />
        <stop offset="1" stopColor="#DE8FBB" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="18" fill="url(#lg-sky)" />
    <g fill="#FFFFFF">
      <circle cx="21" cy="33" r="9.5" />
      <circle cx="32" cy="27" r="12" />
      <circle cx="43" cy="33" r="9.5" />
      <rect x="13" y="33" width="38" height="11" rx="5.5" />
    </g>
    <circle cx="24" cy="30" r="3" fill="#FFFFFF" opacity="0.9" />
    <path d="M32 43.2c-3.8-3.2-6.5-5.6-6.5-8.4 0-2 1.6-3.6 3.6-3.6 1.2 0 2.2.5 2.9 1.5a3.5 3.5 0 0 1 2.9-1.5c2 0 3.6 1.6 3.6 3.6 0 2.8-2.7 5.2-6.5 8.4z" fill="url(#lg-heart)" />
  </svg>
);

export const Logo = ({ light = false }) => (
  <span className="flex items-center gap-2.5">
    <LogoMark />
    <span className={`font-display text-2xl font-medium ${light ? "text-white" : "text-[var(--ink)]"}`}>
      hawaa
    </span>
  </span>
);
