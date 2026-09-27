"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";

/**
 * A small label that follows the pointer over elements marked with
 * `data-cursor="Explorer"`. The native cursor stays visible; this only adds
 * context. Disabled on touch devices and when reduced motion is requested.
 */
export function ContextCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    const label = labelRef.current;
    if (!el || !label) return;

    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 });
      const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
      let active: Element | null = null;

      const onMove = (e: PointerEvent) => {
        xTo(e.clientX + 34);
        yTo(e.clientY + 30);
        const target = e.target instanceof Element ? e.target.closest("[data-cursor]") : null;
        if (target === active) return;
        active = target;
        if (target) {
          label.textContent = target.getAttribute("data-cursor");
          gsap.to(el, { scale: 1, autoAlpha: 1, duration: 0.35, ease: "back.out(2)", overwrite: "auto" });
        } else {
          gsap.to(el, { scale: 0, autoAlpha: 0, duration: 0.25, ease: "power2.in", overwrite: "auto" });
        }
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    });
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none invisible fixed top-0 left-0 z-[90] flex h-9 items-center gap-2 rounded-full bg-deep pr-3.5 pl-2.5 text-[13px] font-semibold text-white shadow-deep"
    >
      <span className="size-2 rounded-full bg-lime" />
      <span ref={labelRef}>Explorer</span>
    </div>
  );
}
