import { gsap, motion } from "./gsap";
import { typeInto } from "./product";

/**
 * Hero page-load choreography:
 * background → chapter → headline → mark → statement (highlight draws in) →
 * CTAs → consultation window → the motif types itself → assistant hint.
 *
 * Elements marked [data-intro] start hidden via CSS (see globals.css), so
 * their tweens use fromTo() with an explicit visible end state.
 * Returns a restore function for the typed text.
 */
export function buildHeroIntro(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const show = { autoAlpha: 1 };

  // Containers whose children carry the motion.
  gsap.set(q("h1[data-intro], [data-intro='copy']"), show);

  const tl = gsap.timeline({ defaults: { ease: motion.ease.outStrong } });

  tl.from(q("[data-hero-bg]"), { autoAlpha: 0, scale: 0.9, rotate: -8, duration: 2.2, ease: "power2.out" }, 0)
    .fromTo(q("[data-intro='chapter']"), { y: 14, autoAlpha: 0 }, { y: 0, ...show, duration: 0.8 }, 0.15)
    .from(q("h1 [data-word]"), { yPercent: 115, duration: 1.2, stagger: 0.05 }, 0.25)
    .from(q("[data-hero-mark]"), { scale: 0, rotate: -120, duration: 1.1, ease: "back.out(1.6)" }, 0.95)
    .from(q("[data-intro='copy'] > *"), { y: 18, autoAlpha: 0, duration: 0.9, stagger: 0.1 }, 0.75)
    .fromTo(
      q("[data-hero-highlight]"),
      { backgroundSize: "0% 100%" },
      { backgroundSize: "100% 100%", duration: 0.9, ease: "power2.inOut" },
      1.3,
    )
    .fromTo(
      q("[data-intro='product']"),
      { y: 90, scale: 0.96, autoAlpha: 0, filter: "blur(8px)" },
      { y: 0, scale: 1, ...show, filter: "blur(0px)", duration: 1.3, clearProps: "filter" },
      1.0,
    )
    .from(q("[data-dash-item]"), { y: 16, autoAlpha: 0, duration: 0.8, stagger: 0.07 }, 1.3);

  const restore = typeInto(tl, root.querySelector<HTMLElement>("[data-typed='hero-motif']"), 1.9, 30);

  tl.from(
    q("[data-float]"),
    { y: 24, scale: 0.92, autoAlpha: 0, duration: 0.9, stagger: 0.18, ease: "back.out(1.5)" },
    1.7,
  );

  return restore;
}

/** Scroll-linked depth once the intro is done: the window lifts, the layered cards drift at different speeds. */
export function buildHeroScroll(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  tl.to(q("[data-parallax='product']"), { yPercent: -6, ease: "none" }, 0)
    .to(q("[data-parallax='chip-a']"), { yPercent: -40, ease: "none" }, 0)
    .to(q("[data-parallax='chip-b']"), { yPercent: -90, ease: "none" }, 0)
    .to(q("[data-parallax='chip-c']"), { yPercent: -160, ease: "none" }, 0)
    .to(q("[data-hero-drift]"), { rotate: 18, ease: "none" }, 0);

  return tl;
}
