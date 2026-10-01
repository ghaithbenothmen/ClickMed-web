import type { MediaImage, MediaVideo } from "@/types";

/**
 * Every photo or video on the page is referenced from here.
 *
 * These are temporary editorial images from Unsplash used for the first
 * prototype. To switch to real ClickMed assets, drop the files into
 * /public/images (or /public/videos) and change `src` below, for example:
 *   src: "/images/hero/cabinet.jpg"
 * No component needs to change.
 */

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const media = {
  heroImage: {
    src: unsplash("1666214280391-8ff5bd3c0bf0", 2000),
    alt: "Deux médecins en blouse blanche échangent devant des écrans de travail.",
    width: 2000,
    height: 1333,
    credit: "Unsplash",
  },
  doctorLaptop: {
    src: unsplash("1576091160550-2173dba999ef"),
    alt: "Mains d'un médecin sur le clavier d'un ordinateur portable, un stéthoscope posé à côté.",
    width: 1600,
    height: 1067,
    credit: "Unsplash",
  },
  consultationImage: {
    src: unsplash("1631217868264-e5b90bb7e133"),
    alt: "Une médecin souriante présente un document à sa patiente pendant une consultation.",
    width: 1600,
    height: 1040,
    credit: "Unsplash",
  },
  careImage: {
    src: unsplash("1584820927498-cfe5211fd8bf", 1200),
    alt: "Mains enfilant des gants médicaux bleu-vert sur un fond gris clair.",
    width: 1200,
    height: 1800,
    credit: "Unsplash",
  },
  clinicImage: {
    src: unsplash("1551076805-e1869033e561"),
    alt: "Salle d'examen lumineuse et épurée.",
    width: 1600,
    height: 900,
    credit: "Unsplash",
  },
} satisfies Record<string, MediaImage>;

/**
 * Optional hero video. Set to a MediaVideo (for example
 * { src: "/videos/hero/clickmed.mp4", poster: "/images/hero/poster.jpg", type: "video/mp4" })
 * and the hero will play it muted in place of `media.heroImage`.
 */
export const heroVideo: MediaVideo | null = null;

/**
 * ClickMed brand artwork, generated from /ClickMed-logo (trimmed, web-sized).
 * "-light" variants have the teal turned white for dark backgrounds.
 */
export const brand = {
  logo: { src: "/brand/clickmed-logo.png", width: 608, height: 160 },
  logoLight: { src: "/brand/clickmed-logo-light.png", width: 608, height: 160 },
  mark: { src: "/brand/clickmed-mark.png", width: 247, height: 256 },
  markLight: { src: "/brand/clickmed-mark-light.png", width: 247, height: 256 },
  stacked: { src: "/brand/clickmed-logo-stacked.png", width: 684, height: 480 },
  stackedLight: { src: "/brand/clickmed-logo-stacked-light.png", width: 684, height: 480 },
} as const;
