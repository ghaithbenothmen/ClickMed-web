"use client";

import { useRef } from "react";
import { gsap, mq, useGSAP } from "@/animations/gsap";
import { buildHeroIntro, buildHeroScroll } from "@/animations/hero";

declare global {
  interface Window {
    __clickmedReveal?: number;
  }
}

/** Client shell that runs the hero choreography over server-rendered content. */
export function HeroAnimation({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      // The script in <head> would otherwise force-show the hero after a delay.
      if (window.__clickmedReveal) window.clearTimeout(window.__clickmedReveal);

      const mm = gsap.matchMedia();
      mm.add(mq.motion, () => buildHeroIntro(root));
      mm.add(mq.desktopMotion, () => {
        buildHeroScroll(root);
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
