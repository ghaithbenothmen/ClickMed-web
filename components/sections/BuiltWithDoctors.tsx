import { Reveal } from "@/components/animations/Reveal";
import { BrandMotif } from "@/components/brand/ClickMedLogo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { builtWithDoctors } from "@/data/content";

/** Authority: ClickMed was shaped with practising doctors. Copy left, the figure right. */
export function BuiltWithDoctors() {
  const { title, paragraphs, conclusion, stat } = builtWithDoctors;

  return (
    <section id="medecins" aria-labelledby="doctors-title" className="bg-page py-28 sm:py-36">
      <Container size="wide">
        <div className="grid gap-12 border-t border-line pt-16 sm:pt-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHeading id="doctors-title" title={title} />
            <Reveal stagger className="flex max-w-[36rem] flex-col gap-4">
              {paragraphs.map((p) => (
                <p key={p} className="text-[18px] leading-[1.55] text-ink-soft">
                  {p}
                </p>
              ))}
              <p className="border-l-2 border-lime pl-4 text-[18px] leading-[1.55] font-semibold text-deep">
                {conclusion}
              </p>
            </Reveal>
          </div>

          <Reveal className="relative overflow-hidden rounded-panel bg-deep p-8 text-white shadow-deep sm:p-10">
            <BrandMotif tone="light" className="pointer-events-none absolute -right-24 -bottom-24 size-[320px] opacity-70" />
            <p className="relative flex flex-col">
              <span className="text-[80px] leading-none font-semibold tracking-[-0.03em] tabular sm:text-[112px]">
                {stat.value}
              </span>
              <span className="mt-2 text-[28px] font-semibold tracking-[-0.02em] text-lime sm:text-[38px]">
                {stat.label}
              </span>
            </p>
            <p className="relative mt-6 max-w-[22rem] border-t border-white/15 pt-5 text-[15px] leading-[1.55] text-white/75">
              {stat.caption}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
