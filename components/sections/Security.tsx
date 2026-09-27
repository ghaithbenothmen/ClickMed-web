import Image from "next/image";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollScene } from "@/components/animations/ScrollScene";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { security } from "@/data/content";
import { securityPoints } from "@/data/features";
import { media } from "@/data/media";

export function Security() {
  return (
    <section id="securite" aria-labelledby="security-title" className="bg-white py-28 sm:py-36">
      <Container size="wide">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="relative hidden overflow-hidden rounded-panel lg:block">
            <Parallax speed={14} className="absolute -inset-y-[8%] inset-x-0">
              <Image
                src={media.careImage.src}
                alt={media.careImage.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </Parallax>
          </div>

          <div className="flex flex-col gap-12">
            <SectionHeading id="security-title" chapter={security.chapter} title={security.title} body={security.body} />

            <Reveal as="ul" stagger className="grid gap-x-10 sm:grid-cols-2">
              {securityPoints.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.title} className="flex gap-4 border-t border-line py-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-soft text-deep">
                      <Icon size={19} strokeWidth={2} aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[15px] font-semibold text-deep">{p.title}</span>
                      <span className="mt-0.5 block text-[15px] leading-snug text-ink-soft">{p.description}</span>
                    </span>
                  </li>
                );
              })}
            </Reveal>

            <ScrollScene scene="flow" className="rounded-panel bg-page p-6 sm:p-8">
              <h3 className="text-[18px] font-semibold text-deep">{security.flowTitle}</h3>
              <ol className="relative mt-7 grid gap-6 sm:grid-cols-4 sm:gap-4">
                <span
                  aria-hidden
                  data-flow-line
                  className="absolute top-3.5 right-[12%] left-[12%] hidden h-px origin-left bg-deep/30 sm:block"
                />
                <span
                  aria-hidden
                  data-flow-line
                  className="absolute top-3 bottom-3 left-3.5 w-px origin-top bg-deep/30 sm:hidden"
                />
                {security.flow.map((step, i) => (
                  <li key={step.title} data-flow-step className="relative flex gap-4 sm:flex-col sm:items-center sm:text-center">
                    <span className="relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full bg-deep font-mono text-[11px] font-medium text-white ring-4 ring-page">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-[15px] font-semibold text-deep">{step.title}</span>
                      <span className="mt-1 block text-[13px] leading-snug text-ink-soft">{step.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </ScrollScene>
          </div>
        </div>
      </Container>
    </section>
  );
}
