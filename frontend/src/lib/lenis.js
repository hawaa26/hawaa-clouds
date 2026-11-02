import Lenis from "lenis";

let instance = null;

export function startLenis() {
  instance = new Lenis({ duration: 1.25, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  let id;
  const raf = (time) => {
    instance.raf(time);
    id = requestAnimationFrame(raf);
  };
  id = requestAnimationFrame(raf);
  return () => {
    cancelAnimationFrame(id);
    instance.destroy();
    instance = null;
  };
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return false;
  if (instance) instance.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: "smooth" });
  return true;
}
