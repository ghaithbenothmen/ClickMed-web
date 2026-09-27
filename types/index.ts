import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type MediaImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Photographer credit for temporary stock media. Remove once real assets are in place. */
  credit?: string;
};

export type MediaVideo = {
  src: string;
  poster: string;
  type: "video/mp4" | "video/webm";
};

export type AppointmentStatus = "confirme" | "attente" | "termine" | "annule";

export type FeatureGroup = {
  id: string;
  time: string;
  title: string;
  summary: string;
  items: string[];
  icon: LucideIcon;
};

export type SecurityPoint = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Chapter = {
  time: string;
  label: string;
};
