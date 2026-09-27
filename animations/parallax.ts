import { gsap } from "./gsap";

/** Scrubbed vertical drift, used for images and floating UI fragments. */
export function buildParallax(el: Element, speed: number) {
  return gsap.fromTo(
    el,
    { yPercent: -speed / 2 },
    {
      yPercent: speed / 2,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    },
  );
}
