# ClickMed — site vitrine

Single-page marketing site for ClickMed, built with Next.js (App Router), Tailwind CSS v4, GSAP + ScrollTrigger and Lenis.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

Set `NEXT_PUBLIC_SITE_URL` in production so Open Graph URLs are absolute.

## Story

The page follows one doctor's day and one patient (Sarra Trabelsi), each section anchored to a time:

| Time  | Section                  | File                                         |
| ----- | ------------------------ | -------------------------------------------- |
| 08:30 | Hero                     | `components/hero/Hero.tsx`                   |
| —     | Statement, scattered practice → one window | `sections/Intro.tsx`, `sections/Fragmented.tsx` |
| 09:30 | Patient record (`#produit`) | `sections/PatientManagement.tsx`          |
| 09:32 | Consultation + vital signs | `sections/ConsultationExperience.tsx`      |
| 09:38 | AI assistant (`#ia`)     | `sections/AIConsultation.tsx`                |
| 09:41 | Prescription             | `sections/Prescription.tsx`                  |
| 12:30 | Appointments             | `sections/Appointments.tsx`                  |
| 14:00 | Productivity (Ctrl + K)  | `sections/Productivity.tsx`                  |
| 17:30 | Features (`#fonctionnalites`) | `sections/FeatureStory.tsx`             |
| 18:00 | Security (`#securite`)   | `sections/Security.tsx`                      |
| 18:05 | Request access (`#contact`) | `sections/FinalCTA.tsx`                   |

## Where things live

- **Copy**: all French text is in `data/content.ts`, `data/features.ts`, `data/navigation.ts`.
- **Media**: every photo is referenced from `data/media.ts`. Replace a `src` with a local path such as `/images/hero/cabinet.jpg` (file in `public/`) and no component changes. Set `heroVideo` to play a video in the hero. Remove the Unsplash entry in `next.config.ts` and the footer credit once no remote images remain.
- **Access request link**: `site.accessRequestUrl` in `data/content.ts` is a placeholder (`#contact`). Point it at the app's access-request route.
- **Logo**: source files are in `ClickMed-logo/`. Web versions (trimmed, resized, plus `-light` versions with the teal turned white for dark backgrounds) are in `public/brand/` and referenced from `brand` in `data/media.ts`. Components: `ClickMedLogo`, `ClickMedMark` and `BrandMotif` in `components/brand/ClickMedLogo.tsx`. `app/icon.png` and `app/apple-icon.png` are generated from the symbol.
- **Design tokens**: `app/globals.css` (`--clickmed-*` variables, mapped to Tailwind utilities such as `bg-deep`, `text-ink-soft`, `border-line`). The default Tailwind palette is disabled on purpose.
- **Fonts**: Inter 400/500/600/700 and IBM Plex Mono 400/500 are self-hosted in `app/fonts/` (from Fontsource) and loaded with `next/font/local`.

## Animation system

- `animations/gsap.ts`: plugin registration, motion tokens, media queries.
- `components/layout/SmoothScroll.tsx`: Lenis driven by the GSAP ticker, synced with ScrollTrigger; also handles in-page anchor clicks. Disabled with reduced motion.
- `animations/hero.ts`, `animations/product.ts`, `animations/scroll.ts`: named timelines. `components/animations/ScrollScene.tsx` attaches one by name to server-rendered markup.
- Mockups (`components/product/*`) render their **final** state in HTML. Timelines only set "before" states inside `prefers-reduced-motion: no-preference`, so reduced-motion visitors and no-JS visitors see the finished UI.
- Pinned, scrubbed scenes (scattered practice, AI, features) run on desktop only; on mobile they play once on entry.

## Content rules

Product mockups use demo data only. No certifications, compliance claims, statistics, testimonials or diagnostic accuracy claims are made. The AI is always described as decision support: the physician validates.
