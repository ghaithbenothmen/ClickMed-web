"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import {
  aiScene,
  assembleScene,
  calendarScene,
  consultationScene,
  paletteScene,
  patientScene,
  prescriptionScene,
  type SceneBuilder,
} from "@/animations/product";
import { featuresScene, finaleScene, flowScene, statementScene } from "@/animations/scroll";

const scenes = {
  assemble: assembleScene,
  patient: patientScene,
  consultation: consultationScene,
  ai: aiScene,
  prescription: prescriptionScene,
  calendar: calendarScene,
  palette: paletteScene,
  statement: statementScene,
  features: featuresScene,
  flow: flowScene,
  finale: finaleScene,
} satisfies Record<string, SceneBuilder>;

export type SceneName = keyof typeof scenes;

type ScrollSceneProps = {
  scene: SceneName;
  children: React.ReactNode;
  className?: string;
  as?: "div" | "figure";
  id?: string;
};

/**
 * Client boundary that attaches one named timeline to server-rendered
 * children. All tweens and ScrollTriggers are reverted on unmount.
 */
export function ScrollScene({ scene, children, className, as: Tag = "div", id }: ScrollSceneProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const mm = gsap.matchMedia();
      scenes[scene](ref.current, mm);
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as never} className={className} id={id}>
      {children}
    </Tag>
  );
}
