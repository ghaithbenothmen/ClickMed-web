"use client";

import { useRef } from "react";
import { gsap, mq, motion, useGSAP } from "@/animations/gsap";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p";

type TextRevealProps = {
  text: string | readonly string[];
  as?: Tag;
  className?: string;
  lineClassName?: string;
  /** "scroll" reveals when entering the viewport, "none" leaves timing to a parent timeline. */
  trigger?: "scroll" | "none";
  delay?: number;
  id?: string;
};

/**
 * Word-by-word masked reveal. Screen readers get the plain sentence; the
 * split words are aria-hidden so they are not read one by one.
 * Pass an array to control line breaks explicitly.
 */
export function TextReveal({
  text,
  as: Tag = "h2",
  className,
  lineClassName,
  trigger = "scroll",
  delay = 0,
  id,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const lines = typeof text === "string" ? [text] : text;
  const plain = lines.join(" ");

  useGSAP(
    () => {
      const el = ref.current;
      if (trigger !== "scroll" || !el) return;
      const mm = gsap.matchMedia();
      mm.add(mq.motion, () => {
        gsap.from(el.querySelectorAll("[data-word]"), {
          yPercent: 110,
          duration: motion.duration.slow,
          ease: motion.ease.outStrong,
          stagger: motion.stagger.tight,
          delay,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as never} id={id} className={className}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden>
        {lines.map((line, li) => (
          <span key={li} className={cn("block", lineClassName)}>
            {line.split(" ").map((word, wi, arr) => (
              <span key={wi} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                <span data-word className="inline-block">
                  {word}
                  {wi < arr.length - 1 ? " " : ""}
                </span>
              </span>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
}
