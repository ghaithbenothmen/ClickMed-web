import { ArrowRightLeft } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollScene } from "@/components/animations/ScrollScene";
import { CommandPaletteMockup } from "@/components/product/CommandPaletteMockup";
import { OpenPaletteButton } from "@/components/sections/OpenPaletteButton";
import { Container } from "@/components/ui/Container";
import { Kbd } from "@/components/ui/Kbd";
import { LiveDot } from "@/components/ui/LiveDot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { productivity } from "@/data/content";

function ConceptVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <span className="flex items-center gap-1.5">
        <Kbd tone="dark">Ctrl</Kbd>
        <Kbd tone="dark">K</Kbd>
      </span>
    );
  }
  if (index === 1) {
    return (
      <span className="inline-flex items-center gap-2 font-mono text-[11px] text-white/80">
        <LiveDot /> Autosave
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] text-white/80">
      <ArrowRightLeft size={14} strokeWidth={2} className="text-lime" /> Transitions fluides
    </span>
  );
}

export function Productivity() {
  return (
    <section id="productivite" data-nav-theme="dark" aria-labelledby="productivity-title" className="bg-panel py-28 text-white sm:py-36">
      <Container size="wide">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-20">
          <div className="flex flex-col gap-10">
            <SectionHeading
              id="productivity-title"
              tone="dark"
              chapter={productivity.chapter}
              title={productivity.title}
              body={productivity.body}
            />
            <div>
              <OpenPaletteButton label={productivity.tryIt} />
            </div>
          </div>

          <ScrollScene scene="palette" as="figure" className="mx-auto w-full max-w-[560px]">
            <figcaption className="sr-only">
              Démonstration de la palette Ctrl + K : la saisie « Sa » met en avant la patiente Sarra Trabelsi.
            </figcaption>
            <div aria-hidden>
              <CommandPaletteMockup />
            </div>
          </ScrollScene>
        </div>

        <Reveal as="ul" stagger className="mt-20 grid border-t border-white/10 sm:mt-28 md:grid-cols-3">
          {productivity.concepts.map((c, i) => (
            <li
              key={c.title}
              className="flex flex-col gap-4 border-b border-white/10 py-8 md:border-b-0 md:py-10 md:pr-10 md:not-first:border-l md:not-first:pl-10"
            >
              <ConceptVisual index={i} />
              <div>
                <p className="text-[22px] font-semibold tracking-[-0.02em]">{c.title}</p>
                <p className="mt-2 text-[15px] leading-[1.55] text-white/65">{c.text}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
