import { gsap, motion, mq } from "./gsap";

/**
 * Product demonstrations. Each builder receives the scene root and a
 * gsap.matchMedia instance. The server-rendered markup is always the final,
 * readable state: builders only set "before" states inside motion-allowed
 * media queries, so reduced-motion visitors simply see the finished UI.
 */
export type SceneBuilder = (root: HTMLElement, mm: gsap.MatchMedia) => void;

const all = <T extends Element = HTMLElement>(root: Element, sel: string) =>
  Array.from(root.querySelectorAll<T & HTMLElement>(sel));
const one = (root: Element, sel: string) => root.querySelector<HTMLElement>(sel);

/** Types `el`'s data-text into it on the timeline. Returns a restore function. */
export function typeInto(tl: gsap.core.Timeline, el: HTMLElement | null, position: gsap.Position, cps = 22) {
  if (!el) return () => {};
  const full = el.dataset.text ?? el.textContent ?? "";
  const proxy = { n: 0 };
  el.textContent = "";
  tl.to(
    proxy,
    {
      n: full.length,
      duration: Math.max(0.3, full.length / cps),
      ease: "none",
      onUpdate: () => {
        el.textContent = full.slice(0, Math.round(proxy.n));
      },
    },
    position,
  );
  return () => {
    el.textContent = full;
  };
}

const playOnEnter = (trigger: Element, start = "top 72%"): ScrollTrigger.Vars => ({
  trigger,
  start,
  toggleActions: "play none none none",
});

/* ------------------------------------------------------------------ */

/** Fragmented cabinet → one ClickMed window. Pinned and scrubbed on desktop. */
export const assembleScene: SceneBuilder = (root, mm) => {
  mm.add(mq.desktopMotion, () => {
    const stage = one(root, "[data-stage]")!;
    const frags = all(root, "[data-frag]");
    const inners = all(root, "[data-frag-inner]");
    const unified = one(root, "[data-unified]");
    const panels = all(root, "[data-panel]");
    const copyA = one(root, "[data-copy='a']");
    const copyB = one(root, "[data-copy='b']");

    const strike = one(root, "[data-strike]");

    gsap.set(unified, { autoAlpha: 0, scale: 0.82, y: 40 });
    gsap.set(copyA, { opacity: 1 });
    gsap.set(copyB, { autoAlpha: 0, y: 24 });
    gsap.set(strike, { scaleX: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "+=170%",
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Scattered pieces drift apart a little: the mess, made visible.
    tl.to(inners, { y: (i) => (i % 2 ? -26 : 22), rotate: (i) => (i % 2 ? -4 : 5), duration: 0.3 }, 0)
      // ...then converge into the centre, where the product window forms.
      .to(
        frags,
        {
          x: (_i, el: HTMLElement) => stage.offsetWidth / 2 - (el.offsetLeft + el.offsetWidth / 2),
          y: (_i, el: HTMLElement) => stage.offsetHeight / 2 - (el.offsetTop + el.offsetHeight / 2),
          scale: 0.35,
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.in",
          stagger: 0.03,
        },
        0.3,
      )
      .to(inners, { rotate: 0, duration: 0.3 }, 0.35)
      .to(strike, { scaleX: 1, duration: 0.1 }, 0.36)
      .to(copyA, { opacity: 0, y: -24, duration: 0.12 }, 0.48)
      .to(unified, { autoAlpha: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.55)
      .to(copyB, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.62)
      .from(panels, { autoAlpha: 0, y: 16, duration: 0.18, stagger: 0.05, ease: "power2.out" }, 0.72)
      .to({}, { duration: 0.12 });
  });

  mm.add(mq.mobileMotion, () => {
    const tl = gsap.timeline({ scrollTrigger: playOnEnter(root, "top 70%") });
    tl.from(all(root, "[data-frag]"), { y: 16, autoAlpha: 0, stagger: 0.05, duration: 0.5 })
      .to(all(root, "[data-frag-label]"), { opacity: 0.4, duration: 0.3, stagger: 0.04 }, "+=0.2")
      .from(one(root, "[data-unified]"), { y: 40, autoAlpha: 0, duration: 0.8, ease: motion.ease.outStrong }, "-=0.1")
      .from(all(root, "[data-panel]"), { y: 12, autoAlpha: 0, stagger: 0.06, duration: 0.5 }, "-=0.4");
  });
};

/** The patient record assembles: identity, then the essentials. */
export const patientScene: SceneBuilder = (root, mm) => {
  mm.add(mq.motion, () => {
    gsap.from(all(root, "[data-profile-item]"), {
      y: 16,
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: motion.ease.out,
      scrollTrigger: playOnEnter(root),
    });
  });
};

/** Past consultations: the timeline draws, the last visit opens, the details land. */
export const historyScene: SceneBuilder = (root, mm) => {
  mm.add(mq.motion, () => {
    const tl = gsap.timeline({ scrollTrigger: playOnEnter(root) });
    tl.fromTo(
      one(root, "[data-history-line]"),
      { scaleY: 0 },
      { scaleY: 1, duration: 0.9, ease: motion.ease.inOut },
    )
      .from(all(root, "[data-history-item]"), { x: -12, autoAlpha: 0, duration: 0.5, stagger: 0.12, ease: motion.ease.out }, 0.1)
      .from(all(root, "[data-history-detail]"), { y: 10, autoAlpha: 0, duration: 0.45, stagger: 0.1, ease: motion.ease.out }, ">-0.2");
  });
};

/** Fields land in reasoning order, motif and exam type themselves, autosave confirms. */
export const consultationScene: SceneBuilder = (root, mm) => {
  mm.add(mq.motion, () => {
    const saving = one(root, "[data-saving]");
    const saved = one(root, "[data-saved]");
    const fields = all(root, "[data-field]");
    const chips = all(root, "[data-diag]");
    const finish = one(root, "[data-finish]");

    gsap.set(saved, { autoAlpha: 0 });
    gsap.set(saving, { autoAlpha: 1 });

    const tl = gsap.timeline({ scrollTrigger: playOnEnter(root, "top 65%") });
    tl.from(fields, { y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: motion.ease.out }, 0);
    const restoreMotif = typeInto(tl, one(root, "[data-typed='motif']"), 0.5, 34);
    const restoreExam = typeInto(tl, one(root, "[data-typed='exam']"), ">0.15", 40);
    tl.from(chips, { scale: 0.8, autoAlpha: 0, duration: 0.4, stagger: 0.1, ease: "back.out(2)" }, ">0.1")
      .to(saving, { autoAlpha: 0, duration: 0.25 }, ">0.2")
      .to(saved, { autoAlpha: 1, duration: 0.25 }, "<")
      .fromTo(finish, { boxShadow: "0 0 0 0 rgba(200,224,74,0.6)" }, { boxShadow: "0 0 0 10px rgba(200,224,74,0)", duration: 0.9 }, ">");

    return () => {
      restoreMotif();
      restoreExam();
    };
  });
};

/** The AI panel: a short read of the record, then hypotheses, then what to check. */
export const aiScene: SceneBuilder = (root, mm) => {
  const build = (tl: gsap.core.Timeline) => {
    const hypos = all(root, "[data-ai-hypo]");
    const bars = all(root, "[data-ai-bar]");
    const checks = one(root, "[data-ai-stage='checks']");
    const processing = one(root, "[data-ai-processing]");
    const statusBusy = one(root, "[data-ai-status='busy']");
    const statusDone = one(root, "[data-ai-status='done']");

    gsap.set(hypos, { autoAlpha: 0, y: 18 });
    gsap.set(bars, { scaleX: 0, transformOrigin: "left" });
    gsap.set(checks, { autoAlpha: 0, y: 18 });
    gsap.set(processing, { autoAlpha: 1 });
    gsap.set(statusDone, { autoAlpha: 0 });
    gsap.set(statusBusy, { autoAlpha: 1 });

    tl.to(processing, { autoAlpha: 0, duration: 0.3 }, 0.5)
      .to(hypos, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.18 }, 0.55)
      .to(bars, { scaleX: 1, duration: 0.6, stagger: 0.18, ease: "power2.out" }, 0.7)
      .to(statusBusy, { autoAlpha: 0, duration: 0.2 }, 0.65)
      .to(statusDone, { autoAlpha: 1, duration: 0.2 }, 0.75)
      .to(checks, { autoAlpha: 1, y: 0, duration: 0.5 }, 1.4)
      .to({}, { duration: 0.4 });
  };

  mm.add(mq.desktopMotion, () => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
      },
    });
    build(tl);
  });

  mm.add(mq.mobileMotion, () => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: playOnEnter(one(root, "[data-ai-panel]") ?? root, "top 75%"),
    });
    build(tl);
  });
};

/** Template rows appear, an allergy conflict is added, the warning takes the stage. */
export const prescriptionScene: SceneBuilder = (root, mm) => {
  mm.add(mq.motion, () => {
    const rows = all(root, "[data-rx-row]");
    const added = one(root, "[data-rx-new]");
    const warning = one(root, "[data-rx-warning]");
    const actions = all(root, "[data-rx-action]");

    const tl = gsap.timeline({ scrollTrigger: playOnEnter(root, "top 65%") });
    tl.from(rows, { x: -16, autoAlpha: 0, duration: 0.5, stagger: 0.12, ease: motion.ease.out })
      .from(added, { x: -16, autoAlpha: 0, duration: 0.5, ease: motion.ease.out }, "+=0.35")
      .from(warning, { autoAlpha: 0, y: -8, scale: 0.97, duration: 0.45, ease: "back.out(2)" }, "+=0.15")
      .to(warning, { keyframes: { x: [0, -5, 5, -3, 3, 0] }, duration: 0.45, ease: "none" }, ">-0.05")
      .from(actions, { y: 8, autoAlpha: 0, duration: 0.4, stagger: 0.08 }, "-=0.1");
  });
};

/** Week fills in, today is picked, the next appointment opens. */
export const calendarScene: SceneBuilder = (root, mm) => {
  mm.add(mq.motion, () => {
    const blocks = all(root, "[data-cal-block]");
    const today = one(root, "[data-cal-today]");
    const popover = one(root, "[data-cal-popover]");

    const tl = gsap.timeline({ scrollTrigger: playOnEnter(root, "top 65%") });
    tl.from(blocks, { scale: 0.9, autoAlpha: 0, duration: 0.45, stagger: { each: 0.04, from: "start" }, ease: motion.ease.out })
      .from(today, { autoAlpha: 0, duration: 0.5 }, "+=0.1")
      .from(popover, { autoAlpha: 0, y: 10, scale: 0.96, duration: 0.5, ease: "back.out(1.8)" }, "+=0.2");
  });
};

/** Keys pressed, palette opens, the query narrows the list. */
export const paletteScene: SceneBuilder = (root, mm) => {
  mm.add(mq.motion, () => {
    const keys = all(root, "[data-key]");
    const palette = one(root, "[data-palette]");
    const others = all(root, "[data-result]:not([data-result-match])");
    const match = one(root, "[data-result-match]");
    gsap.set(others, { opacity: 1 });

    const tl = gsap.timeline({ scrollTrigger: playOnEnter(root, "top 65%") });
    tl.to(keys, { y: 3, scale: 0.94, duration: 0.12, stagger: 0.08, ease: "power2.in" })
      .to(keys, { y: 0, scale: 1, duration: 0.2, ease: "back.out(3)" }, "+=0.15")
      .from(palette, { autoAlpha: 0, y: 16, scale: 0.97, duration: 0.5, ease: motion.ease.outStrong }, "<");
    const restore = typeInto(tl, one(root, "[data-typed]"), ">0.1", 5);
    tl.to(others, { opacity: 0.3, duration: 0.3 }, ">").fromTo(
      match,
      { backgroundColor: "rgba(255,255,255,0)" },
      { backgroundColor: "rgba(200,224,74,0.14)", duration: 0.3 },
      "<",
    );
    return restore;
  });
};
