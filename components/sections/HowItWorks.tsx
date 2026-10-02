import { Check } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { ScrollScene } from "@/components/animations/ScrollScene";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorks, site } from "@/data/content";

/** Getting started with the free trial. The hero's "Tester ClickMed gratuitement" lands here. */
export function HowItWorks() {
  return (
    <section id="comment-ca-fonctionne" aria-labelledby="how-title" className="bg-white py-28 sm:py-36">
      <Container size="wide">
        <SectionHeading id="how-title" title={howItWorks.title} />

        <ScrollScene scene="flow" className="mt-14 sm:mt-20">
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-10">
            {/* Connecting line: horizontal on desktop, vertical on mobile */}
            <span
              aria-hidden
              data-flow-line
              className="absolute top-5 right-[16%] left-5 hidden h-px origin-left bg-deep/25 md:block"
            />
            <span
              aria-hidden
              data-flow-line
              className="absolute top-5 bottom-5 left-5 w-px origin-top bg-deep/25 md:hidden"
            />
            {howItWorks.steps.map((step, i) => (
              <li key={step.title} data-flow-step className="relative flex gap-5 md:flex-col md:gap-6">
                <span
                  aria-hidden
                  className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-deep ring-8 ring-white"
                >
                  <span className="size-2.5 rounded-full bg-lime" />
                </span>
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-[13px] font-medium text-deep">Étape {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="text-[22px] font-semibold text-deep">{step.title}</h3>
                  <p className="max-w-[22rem] text-[15px] leading-[1.55] text-ink-soft">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </ScrollScene>

        <div className="mt-16 flex flex-col items-start gap-5 border-t border-line pt-10 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2.5 text-[18px] font-medium text-deep">
            <span className="flex size-7 items-center justify-center rounded-full bg-lime text-ink" aria-hidden>
              <Check size={15} strokeWidth={2.5} />
            </span>
            {howItWorks.reassurance}
          </p>
          <div className="flex flex-col items-start gap-2.5 sm:items-center">
            <MagneticButton>
              <Button href={site.signupUrl} size="lg">
                {howItWorks.cta}
              </Button>
            </MagneticButton>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft">
              <Check size={14} strokeWidth={2.5} className="text-logo" aria-hidden />
              {howItWorks.ctaNote}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
