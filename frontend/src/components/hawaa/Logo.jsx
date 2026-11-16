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
      <circle cx="23" cy="30.5" r="9.5" />
      <circle cx="33.5" cy="26" r="11" />
      <circle cx="44" cy="31" r="8" />
      <path d="M13.5 35.5 L50.5 35.5 L50.5 37 C50.5 40 48.5 41.8 45.8 41.6 C44.3 43.5 41.2 43.5 39.7 41.7 C37.6 43.6 34.2 43.6 32.1 41.7 C30 43.5 26.6 43.5 24.5 41.7 C22.4 43.4 19.3 43.3 17.8 41.5 C15.4 41.6 13.5 39.6 13.5 37 Z" />
    </g>
    <path d="M32 36C28 32.5 25.2 30.1 25.2 27.4c0-2.1 1.7-3.5 3.6-3.5 1.4 0 2.6.8 3.2 2 .6-1.2 1.8-2 3.2-2 1.9 0 3.6 1.4 3.6 3.5 0 2.7-2.8 5.1-6.8 8.6z" fill="url(#lg-heart)" />
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
