"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.8 });
  registered = true;
}

/** Motion tokens shared by every timeline on the page. */
export const motion = {
  ease: {
    out: "power3.out",
    outStrong: "expo.out",
    inOut: "power2.inOut",
    soft: "sine.inOut",
  },
  duration: {
    fast: 0.3,
    base: 0.7,
    slow: 1.1,
  },
  stagger: {
    tight: 0.04,
    base: 0.08,
    loose: 0.14,
  },
} as const;

/** Media query keys used with gsap.matchMedia(). */
export const mq = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)",
  desktopMotion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobileMotion: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
} as const;

export { gsap, ScrollTrigger, useGSAP };
