import { Sparkles } from "lucide-react";
import { HeroAutosave, HeroConsultation, HeroVitals } from "@/components/product/HeroConsultation";

/**
 * The product, centred on the consultation: the window, its vital signs layered
 * over the corner, the assistant hint and the autosave status around it.
 */
export function HeroVisual() {
  return (
    <div className="relative isolate">
      {/* Backdrop: fading dot grid and a soft brand glow */}
      <div aria-hidden className="pointer-events-none absolute -inset-x-16 -inset-y-20 -z-10 hidden sm:block">
        <div className="absolute inset-0 bg-[radial-gradient(var(--clickmed-ink-soft)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] [background-size:22px_22px] opacity-25" />
        <div className="absolute top-[12%] right-[8%] size-[360px] rounded-full bg-aqua/25 blur-[90px]" />
        <div className="absolute bottom-[6%] left-[14%] size-[320px] rounded-full bg-lime/30 blur-[90px]" />
      </div>

      <div data-parallax="product" className="relative lg:ml-12">
        <figure data-intro="product" data-cursor="Explorer" className="relative">
          <figcaption className="sr-only">
            Aperçu d&apos;une consultation dans ClickMed : la patiente Sarra Trabelsi, son allergie à la pénicilline,
            le motif et l&apos;examen clinique, le diagnostic, les constantes (tension 120/80, FC 72 bpm, température
            37,1 °C, SpO₂ 98 %, poids 72 kg, taille 178 cm) et le bouton pour terminer la consultation.
            Enregistrement automatique. Valeurs de démonstration.
          </figcaption>
          <div aria-hidden>
            <HeroConsultation />
          </div>
        </figure>
      </div>

      {/* Vital signs: below the window on mobile, layered over its corner on desktop */}
      <div
        aria-hidden
        data-parallax="chip-a"
        className="relative mt-4 sm:flex sm:justify-end lg:absolute lg:-bottom-28 lg:-left-4 lg:mt-0 lg:block"
      >
        <div data-float>
          <HeroVitals />
        </div>
      </div>

      {/* Assistant hint */}
      <div aria-hidden data-parallax="chip-b" className="pointer-events-none absolute -top-10 -right-4 hidden lg:block">
        <div
          data-float
          className="flex max-w-[260px] items-start gap-3 rounded-card bg-night px-4 py-3.5 text-white shadow-window"
        >
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-lime text-ink">
            <Sparkles size={16} strokeWidth={2.25} />
          </span>
          <span>
            <span className="block text-[13px] font-semibold">Assistant ClickMed</span>
            <span className="block text-[13px] leading-snug text-white/65">
              3 pistes à examiner. Vous gardez la décision.
            </span>
          </span>
        </div>
      </div>

      {/* Autosave status */}
      <div aria-hidden data-parallax="chip-c" className="pointer-events-none absolute -top-5 left-[18%] hidden lg:block">
        <div data-float>
          <HeroAutosave />
        </div>
      </div>
    </div>
  );
}
