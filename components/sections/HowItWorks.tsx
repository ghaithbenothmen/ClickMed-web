import { Check } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { ScrollScene } from "@/components/animations/ScrollScene";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorks } from "@/data/content";
import { accessHref } from "@/data/navigation";

/** Where the hero's "Tester ClickMed gratuitement" leads: the four steps, then access. */
export function HowItWorks() {
  return (
    <section id="comment-ca-fonctionne" aria-labelledby="how-title" className="bg-white py-28 sm:py-36">
      <Container size="wide">
        <SectionHeading id="how-title" title={howItWorks.title} body={howItWorks.body} />

        <ScrollScene scene="flow" className="mt-14 sm:mt-20">
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-8">
            {/* Connecting line: horizontal on desktop, vertical on mobile */}
            <span
              aria-hidden
              data-flow-line
              className="absolute top-5 right-[12%] left-5 hidden h-px origin-left bg-deep/25 md:block"
            />
            <span
              aria-hidden
              data-flow-line
              className="absolute top-5 bottom-5 left-5 w-px origin-top bg-deep/25 md:hidden"
            />
            {howItWorks.steps.map((step, i) => (
              <li key={step.title} data-flow-step className="relative flex gap-5 md:flex-col md:gap-6">
                <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-deep font-mono text-[13px] font-medium text-white ring-8 ring-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[22px] font-semibold text-deep">{step.title}</h3>
                  <p className="max-w-[22rem] text-[15px] leading-[1.55] text-ink-soft">{step.text}</p>
                  <a
                    href={step.href}
                    className="mt-1 w-fit text-[15px] font-semibold text-deep underline decoration-lime decoration-2 underline-offset-4 transition-colors duration-200 hover:text-logo"
                  >
                    {step.link}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </ScrollScene>

        <div className="mt-16 flex flex-col items-start gap-2.5 border-t border-line pt-10 sm:mt-20">
          <MagneticButton>
            <Button href={accessHref} size="lg">
              {howItWorks.cta}
            </Button>
          </MagneticButton>
          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft">
            <Check size={14} strokeWidth={2.5} className="text-logo" aria-hidden />
            {howItWorks.ctaNote}
          </span>
        </div>
      </Container>
    </section>
  );
}
