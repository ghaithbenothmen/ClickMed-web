import { Check, FileDown, Moon } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { ScrollScene } from "@/components/animations/ScrollScene";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/ui/Button";
import { Chapter } from "@/components/ui/Chapter";
import { Container } from "@/components/ui/Container";
import { finalCta, site } from "@/data/content";

const chips = [
  { icon: Check, text: "Consultation terminée", pos: "left-[4%] top-[18%]" },
  { icon: FileDown, text: "Ordonnance exportée en PDF", pos: "right-[5%] top-[26%]" },
  { icon: Moon, text: "Session fermée, à demain", pos: "right-[12%] bottom-[16%]" },
];

/** End of the day, end of the story. */
export function FinalCTA() {
  return (
    <section id="contact" data-nav-theme="dark" aria-labelledby="final-title" className="relative overflow-hidden bg-night text-white">
      <ScrollScene scene="finale" className="relative">
        {/* Brand motif with a soft lime glow */}
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            data-glow
            className="size-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(200,224,74,0.22),rgba(200,224,74,0.06)_55%,transparent)] opacity-70"
          />
          <div className="absolute top-1/2 left-1/2 size-[460px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow">
            <span className="absolute inset-[16%] rotate-45 rounded-[72px] border border-white/10" />
            <span className="absolute inset-[16%] translate-x-[12%] -rotate-12 rounded-[72px] border border-lime/30" />
          </div>
        </div>

        {/* Fragments of the day, desktop only */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          {chips.map(({ icon: Icon, text, pos }) => (
            <div key={text} className={`absolute ${pos}`}>
              <div
                data-final-chip
                className="flex items-center gap-2.5 rounded-full border border-white/10 bg-panel/90 py-2 pr-4 pl-2 text-[13px] font-medium text-white/85 shadow-window"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-lime text-ink">
                  <Icon size={14} strokeWidth={2.5} />
                </span>
                {text}
              </div>
            </div>
          ))}
        </div>

        <Container className="relative flex min-h-[88svh] flex-col items-center justify-center gap-8 py-32 text-center">
          <Chapter chapter={finalCta.chapter} tone="dark" />
          <TextReveal
            as="h2"
            id="final-title"
            text={finalCta.title}
            className="max-w-[14ch] text-display font-semibold text-white"
          />
          <p className="max-w-[30rem] text-[18px] leading-[1.55] text-white/70 sm:text-[22px]">{finalCta.body}</p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <MagneticButton>
              <Button href={site.accessRequestUrl} variant="lime" size="lg" className="w-full sm:w-auto">
                {finalCta.primaryCta}
              </Button>
            </MagneticButton>
            <Button href="#produit" variant="outline-light" size="lg">
              {finalCta.secondaryCta}
            </Button>
          </div>
        </Container>
      </ScrollScene>
    </section>
  );
}
