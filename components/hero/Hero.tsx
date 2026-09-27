import { ShifaMark } from "@/components/brand/ShifaLogo";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { HeroAnimation } from "@/components/hero/HeroAnimation";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { Button } from "@/components/ui/Button";
import { Chapter } from "@/components/ui/Chapter";
import { Container } from "@/components/ui/Container";
import { hero } from "@/data/content";
import { accessHref } from "@/data/navigation";

function HeadlineWords({ line }: { line: string }) {
  return line.split(" ").map((word, i, arr) => (
    <span key={i} className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
      <span data-word className="inline-block">
        {word}
        {i < arr.length - 1 ? " " : ""}
      </span>
    </span>
  ));
}

export function Hero() {
  const [lineOne, lineTwo] = hero.titleLines;
  const lastLine = lineTwo.replace(/\.$/, "");

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-clip pt-32 pb-24 sm:pt-36 lg:pb-32">
      <HeroAnimation>
        {/* Brand motif: the logo's two squares, drawn as outlines at architectural scale */}
        <div aria-hidden className="pointer-events-none absolute -top-64 -right-80 hidden md:block" data-hero-drift>
          <div className="relative size-[760px]" data-hero-bg>
            <span className="absolute inset-[18%] rotate-45 rounded-[120px] border border-deep/8" />
            <span className="absolute inset-[18%] translate-x-[14%] -rotate-12 rounded-[120px] border border-lime/35" />
          </div>
        </div>

        <Container size="wide" className="relative">
          <div data-intro="chapter">
            <Chapter chapter={hero.chapter} />
          </div>

          <div className="mt-8 flex flex-col gap-10 lg:gap-12">
            <h1
              id="hero-title"
              data-intro
              className="text-hero font-semibold text-deep"
            >
              <span className="sr-only">{hero.titleLines.join(" ")}</span>
              <span aria-hidden className="block">
                <span className="block">
                  <HeadlineWords line={lineOne} />
                </span>
                <span className="block whitespace-nowrap">
                  <HeadlineWords line={lastLine} />
                  <span
                    data-hero-mark
                    className="ml-[0.06em] inline-block size-[0.36em] align-baseline"
                  >
                    <ShifaMark size={44} className="size-full" />
                  </span>
                </span>
              </span>
            </h1>

            <div
              data-intro="copy"
              className="grid gap-6 lg:grid-cols-[minmax(0,34rem)_minmax(0,22rem)] lg:justify-between lg:gap-12"
            >
              <p className="text-[18px] leading-[1.55] text-ink sm:text-[22px] sm:leading-[1.45]">{hero.lead}</p>
              <p className="border-l-2 border-lime pl-4 text-[15px] leading-[1.55] text-ink-soft lg:self-end">
                {hero.aiNote}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-2">
                <MagneticButton>
                  <Button href={accessHref} size="lg" className="w-full sm:w-auto">
                    {hero.primaryCta}
                  </Button>
                </MagneticButton>
                <Button href="#produit" size="lg" variant="secondary">
                  {hero.secondaryCta}
                </Button>
              </div>
            </div>
          </div>

          <HeroVisual />
        </Container>
      </HeroAnimation>
    </section>
  );
}
