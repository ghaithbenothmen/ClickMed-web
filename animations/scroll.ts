import { gsap, mq } from "./gsap";
import type { SceneBuilder } from "./product";

const all = (root: Element, sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
const one = (root: Element, sel: string) => root.querySelector<HTMLElement>(sel);

/** Large statement whose words light up as it crosses the viewport. */
export const statementScene: SceneBuilder = (root, mm) => {
  mm.add(mq.motion, () => {
    gsap.fromTo(
      all(root, "[data-word]"),
      { opacity: 0.14 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 78%", end: "bottom 45%", scrub: true },
      },
    );
  });
};

/** Feature groups travel horizontally while the section is pinned (desktop only). */
export const featuresScene: SceneBuilder = (root, mm) => {
  mm.add(mq.desktopMotion, () => {
    const track = one(root, "[data-track]");
    const progress = one(root, "[data-track-progress]");
    if (!track) return;
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    tl.to(track, { x: () => -distance(), ease: "none" }, 0).fromTo(
      progress,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", transformOrigin: "left" },
      0,
    );
  });

  mm.add(mq.mobileMotion, () => {
    gsap.from(all(root, "[data-feature]"), {
      y: 24,
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.08,
      scrollTrigger: { trigger: root, start: "top 75%", once: true },
    });
  });
};

/** Access flow: the connecting line draws itself, each step lands on it. */
export const flowScene: SceneBuilder = (root, mm) => {
  mm.add(mq.motion, () => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 75%", toggleActions: "play none none none" },
    });
    tl.fromTo(
      all(root, "[data-flow-line]"),
      { scaleX: 0, scaleY: 0 },
      { scaleX: 1, scaleY: 1, duration: 1.4, ease: "power2.inOut" },
    ).from(
      all(root, "[data-flow-step]"),
      { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.25, ease: "power3.out" },
      0.1,
    );
  });
};

/** Final section: the brand mark breathes, fragments float. */
export const finaleScene: SceneBuilder = (root, mm) => {
  mm.add(mq.motion, () => {
    gsap.to(one(root, "[data-glow]"), {
      scale: 1.12,
      opacity: 0.85,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    all(root, "[data-final-chip]").forEach((chip, i) => {
      gsap.to(chip, {
        y: i % 2 ? 10 : -10,
        duration: 3 + i * 0.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
    gsap.from(all(root, "[data-final-chip]"), {
      autoAlpha: 0,
      scale: 0.9,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.6)",
      scrollTrigger: { trigger: root, start: "top 60%", once: true },
    });
  });
};
