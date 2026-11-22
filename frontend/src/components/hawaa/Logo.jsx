export const LogoMark = ({ className = "h-9 w-9" }) => (
  <img src="/logo-mark.png" alt="Hawaa" className={`${className} rounded-[26%] object-cover`} />
);



export const Logo = ({ light = false }) => (
  <span className="flex items-center gap-2.5">
    <LogoMark />
    <span className={`font-display text-2xl font-medium ${light ? "text-white" : "text-[var(--ink)]"}`}>
      hawaa
    </span>
  </span>
);
