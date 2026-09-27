"use client";

import { useRef } from "react";
import { gsap, mq, useGSAP } from "@/animations/gsap";
import { buildParallax } from "@/animations/parallax";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Total travel in percent of the element height. Reduced on mobile, off with reduced motion. */
  speed?: number;
};

export function Parallax({ children, className, speed = 12 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(mq.desktopMotion, () => {
        buildParallax(el, speed);
      });
      mm.add(mq.mobileMotion, () => {
        buildParallax(el, speed / 3);
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
