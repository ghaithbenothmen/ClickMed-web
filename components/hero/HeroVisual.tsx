import Image from "next/image";
import { Activity, Sparkles } from "lucide-react";
import { DashboardMockup } from "@/components/product/DashboardMockup";
import { LiveDot } from "@/components/ui/LiveDot";
import { heroVideo, media } from "@/data/media";

/** Editorial photo, live product frame and floating UI fragments. */
export function HeroVisual() {
  return (
    <div className="relative mt-14 sm:mt-16 lg:mt-20">
      {/* Photo: sits behind the product, offset left */}
      <div
        data-parallax="photo"
        className="absolute top-10 bottom-24 left-0 hidden w-[54%] lg:block"
      >
        <div data-intro="photo" className="relative h-full overflow-hidden rounded-panel">
          {heroVideo ? (
            <video
              className="size-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={heroVideo.poster}
              aria-hidden
            >
              <source src={heroVideo.src} type={heroVideo.type} />
            </video>
          ) : (
            <Image
              src={media.heroImage.src}
              alt={media.heroImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover object-[30%_center]"
            />
          )}
          <div className="absolute inset-0 bg-night/25 mix-blend-multiply" aria-hidden />
        </div>
      </div>

      {/* Product */}
      <div data-parallax="product" className="relative lg:ml-auto lg:w-[74%] lg:pt-0">
        <figure data-intro="product" data-cursor="Explorer" className="relative">
          <figcaption className="sr-only">
            Aperçu du tableau de bord ClickMed : message d&apos;accueil, prochain patient avec son allergie,
            salle d&apos;attente en direct et agenda du jour.
          </figcaption>
          <div aria-hidden>
            <DashboardMockup />
          </div>
        </figure>
      </div>

      {/* Floating fragments (desktop) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <div data-parallax="chip-a" className="absolute bottom-40 left-[6%]">
          <div
            data-float
            className="flex items-center gap-3 rounded-card border border-line bg-white px-4 py-3 shadow-card-hover"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-soft text-deep">
              <Activity size={18} strokeWidth={2} />
            </span>
            <span>
              <span className="block text-[11px] font-medium text-ink-soft">Tension</span>
              <span className="font-mono text-[18px] font-medium text-ink tabular">
                120 / 80 <span className="text-[11px] text-ink-soft">mmHg</span>
              </span>
            </span>
          </div>
        </div>

        <div data-parallax="chip-b" className="absolute -top-6 right-[-2%]">
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
                3 hypothèses à examiner pour Sarra Trabelsi
              </span>
            </span>
          </div>
        </div>

        <div data-parallax="chip-c" className="absolute -bottom-6 left-[34%]">
          <div
            data-float
            className="flex items-center gap-2.5 rounded-full border border-line bg-white py-2 pr-4 pl-3 text-[13px] font-medium text-deep shadow-card-hover"
          >
            <LiveDot />
            Enregistré automatiquement
          </div>
        </div>
      </div>
    </div>
  );
}
