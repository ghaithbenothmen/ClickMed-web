import { Check, Users } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { BrandMotif } from "@/components/brand/ClickMedLogo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { founderOffer, site } from "@/data/content";

/**
 * Founder doctor offer: a dark, lime-framed panel unlike the feature sections.
 * Scarcity (15 places) and the price lead the "pass" card on the right.
 */
export function FounderOffer() {
  const { badge, title, positioning, seats, seatsLabel, price, priceLabel, benefits, cta, reassurance } = founderOffer;

  return (
    <section id="offre-fondateur" aria-labelledby="founder-title" className="bg-page py-28 sm:py-36">
      <Container size="wide">
        <div className="relative overflow-hidden rounded-panel bg-night text-white shadow-window ring-1 ring-lime/50">
          {/* Brand motif and a soft lime glow behind the pass */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <BrandMotif tone="light" className="absolute -right-32 -bottom-40 size-[560px] opacity-60" />
            <div className="absolute top-1/2 right-[10%] size-[420px] -translate-y-1/2 rounded-full bg-lime/15 blur-[100px]" />
          </div>

          <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-x-14 lg:gap-y-10 lg:p-14">
            {/* Offer: on mobile the pass comes right after this, before the benefits */}
            <div className="flex flex-col gap-8 lg:col-start-1 lg:row-start-1">
              <p className="w-fit rounded-full bg-lime px-3.5 py-1.5 label-caps text-ink">{badge}</p>
              <TextReveal as="h2" id="founder-title" text={title} className="text-title font-semibold text-white" />
              <p className="max-w-[34rem] border-l-2 border-lime pl-4 text-[18px] leading-[1.55] font-medium text-white/85">
                {positioning}
              </p>
            </div>

            {/* Pass: scarcity, price, action */}
            <Reveal className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              <div className="rounded-panel bg-white p-6 text-ink shadow-window sm:p-8">
                <div className="flex items-end justify-between gap-4">
                  <p className="flex items-baseline gap-2">
                    <span className="text-[72px] leading-none font-semibold tracking-[-0.03em] text-deep tabular">
                      {seats}
                    </span>
                    <span className="text-[22px] font-semibold text-deep">{seatsLabel}</span>
                  </p>
                  <span aria-hidden className="mb-2 flex size-10 items-center justify-center rounded-xl bg-soft text-deep">
                    <Users size={18} strokeWidth={2.25} />
                  </span>
                </div>

                {/* One marker per founder place */}
                <div aria-hidden className="mt-5 grid grid-cols-[repeat(15,minmax(0,1fr))] gap-1.5">
                  {Array.from({ length: seats }, (_, i) => (
                    <span key={i} className="h-2.5 rounded-full bg-lime ring-1 ring-deep/10" />
                  ))}
                </div>

                <div className="mt-7 border-t border-line pt-6">
                  <p className="label-caps text-ink-soft">{priceLabel}</p>
                  <p className="mt-2 text-[56px] leading-none font-semibold tracking-[-0.03em] text-deep">{price}</p>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <MagneticButton className="w-full">
                    <Button href={site.founderRequestUrl} size="lg" className="w-full">
                      {cta}
                    </Button>
                  </MagneticButton>
                  <p className="text-center text-[13px] font-semibold text-warning-ink">{reassurance}</p>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-start-1 lg:row-start-2">
              <h3 className="sr-only">Ce que comprend l&apos;offre</h3>
              <Reveal as="ul" stagger className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {benefits.map((b) => (
                  <li key={b.title} className="flex gap-3.5">
                    <span
                      aria-hidden
                      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime ring-1 ring-lime/40"
                    >
                      <Check size={13} strokeWidth={2.75} />
                    </span>
                    <span>
                      <span className="block text-[15px] font-semibold text-white">{b.title}</span>
                      <span className="mt-1 block text-[15px] leading-[1.5] text-white/65">{b.text}</span>
                    </span>
                  </li>
                ))}
              </Reveal>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
