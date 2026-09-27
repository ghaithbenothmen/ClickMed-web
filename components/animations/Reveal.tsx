"use client";

import { useRef } from "react";
import { gsap, mq, motion, useGSAP } from "@/animations/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Animate direct children one after another instead of the wrapper itself. */
  stagger?: boolean;
  y?: number;
  delay?: number;
  start?: string;
  as?: "div" | "ul" | "ol" | "figure";
};

export function Reveal({
  children,
  className,
  stagger = false,
  y = 28,
  delay = 0,
  start = "top 85%",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(mq.motion, () => {
        const targets = stagger ? Array.from(el.children) : el;
        gsap.from(targets, {
          y,
          autoAlpha: 0,
          duration: motion.duration.base,
          ease: motion.ease.out,
          delay,
          stagger: stagger ? motion.stagger.base : 0,
          scrollTrigger: { trigger: el, start, once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
