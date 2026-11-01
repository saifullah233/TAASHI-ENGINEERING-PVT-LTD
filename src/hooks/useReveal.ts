import { useEffect, useRef } from "react";

export function useReveal() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(root.current.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.1 });
    items.forEach(item => {
      // Keep above-the-fold content and no-JS previews visible from first paint.
      if (item.getBoundingClientRect().top >= window.innerHeight) item.classList.add("reveal-pending");
      observer.observe(item);
    });
    return () => {
      observer.disconnect();
      items.forEach(item => item.classList.remove("reveal-pending"));
    };
  }, []);
  return root;
}
