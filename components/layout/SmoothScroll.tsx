"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { followQueryLink, scrollToHash, setLenis } from "@/lib/scroll";

/**
 * Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger and
 * Lenis share one clock. Skipped entirely when reduced motion is requested.
 * Also routes in-page anchor clicks through `scrollToHash`.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;

    const start = () => {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: false });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    };

    const stop = () => {
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
      lenis = null;
      setLenis(null);
    };

    if (!reduce.matches) start();

    const onChange = () => (reduce.matches ? stop() : start());
    reduce.addEventListener("change", onChange);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const link =
        e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[href^="#"], a[href^="?"]') : null;
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      if (href.startsWith("?")) followQueryLink(href);
      else scrollToHash(href);
    };
    document.addEventListener("click", onClick);

    // Fonts and images shift layout after first paint; recompute triggers once settled.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      reduce.removeEventListener("change", onChange);
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", onLoad);
      stop();
    };
  }, []);

  return null;
}
