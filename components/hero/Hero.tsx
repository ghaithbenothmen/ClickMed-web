import { Activity, Check, FileText, UsersRound } from "lucide-react";
import { BrandMotif, ClickMedMark } from "@/components/brand/ClickMedLogo";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { HeroAnimation } from "@/components/hero/HeroAnimation";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { Button } from "@/components/ui/Button";
import { Chapter } from "@/components/ui/Chapter";
import { Container } from "@/components/ui/Container";
import { hero } from "@/data/content";

const highlightIcons = [UsersRound, Activity, FileText];

function Word({ word, last }: { word: string; last: boolean }) {
  return (
    <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
      <span data-word className="inline-block">
        {word}
        {last ? "" : " "}
      </span>
    </span>
  );
}

export function Hero() {
  const title = hero.titleLines.join(" ");
  const words = title.replace(/\.$/, "").split(" ");
  const lastWord = words.pop()!;

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-clip pt-28 pb-24 sm:pt-32 lg:flex lg:min-h-svh lg:items-center lg:pt-28 lg:pb-20"
    >
      <HeroAnimation className="w-full">
        {/* Brand motif: the symbol's C, crescent and ring, drawn as outlines at architectural scale */}
        <div aria-hidden className="pointer-events-none absolute -top-64 -right-80 hidden md:block" data-hero-drift>
          <div className="size-[820px]" data-hero-bg>
            <BrandMotif className="size-full" />
          </div>
        </div>

        <Container size="wide" className="relative">
          <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-16">
            {/* Copy */}
            <div>
              <div data-intro="chapter">
                <Chapter chapter={hero.chapter} />
              </div>

              <h1 id="hero-title" data-intro className="mt-7 max-w-[17ch] text-hero font-semibold text-deep">
                <span className="sr-only">{title}</span>
                <span aria-hidden>
                  {words.map((w, i) => (
                    <Word key={i} word={w} last={false} />
                  ))}
                  {/* Last word and the brand mark (as full stop) never split across lines */}
                  <span className="inline-block whitespace-nowrap">
                    <Word word={lastWord} last />
                    <span data-hero-mark className="ml-[0.08em] inline-block size-[0.55em] align-[-0.04em]">
                      <ClickMedMark size={96} className="size-full object-contain" />
                    </span>
                  </span>
                </span>
              </h1>

              <div data-intro="copy" className="mt-7 flex flex-col gap-8">
                <p className="max-w-[34rem] text-[18px] leading-[1.55] text-ink sm:text-[20px] sm:leading-[1.5]">
                  {hero.lead.before}
                  <mark
                    data-hero-highlight
                    className="box-decoration-clone bg-transparent bg-[linear-gradient(transparent_60%,color-mix(in_srgb,var(--clickmed-lime)_75%,transparent)_60%)] bg-no-repeat px-0.5 font-semibold text-deep [background-size:100%_100%]"
                  >
                    {hero.lead.highlight}
                  </mark>
                  {hero.lead.after}
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <div className="flex flex-col items-stretch gap-2.5 sm:items-center">
                    <MagneticButton>
                      <Button href={hero.primaryHref} size="lg" className="w-full sm:w-auto">
                        {hero.primaryCta}
                      </Button>
                    </MagneticButton>
                    <span className="inline-flex items-center justify-center gap-1.5 text-[13px] font-medium text-ink-soft">
                      <Check size={14} strokeWidth={2.5} className="text-logo" aria-hidden />
                      {hero.primaryNote}
                    </span>
                  </div>
                  <Button href="#produit" size="lg" variant="secondary">
                    {hero.secondaryCta}
                  </Button>
                </div>

                <ul className="flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">
                  {hero.highlights.map((h, i) => {
                    const Icon = highlightIcons[i];
                    return (
                      <li key={h} className="flex items-center gap-2.5 text-[13px] font-medium text-ink">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-white text-deep ring-1 ring-line">
                          <Icon size={14} strokeWidth={2.25} aria-hidden />
                        </span>
                        {h}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Product */}
            <HeroVisual />
          </div>
        </Container>
      </HeroAnimation>
    </section>
  );
}
