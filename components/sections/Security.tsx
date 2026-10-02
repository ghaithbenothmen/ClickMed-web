import Image from "next/image";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
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
          </div>
        </div>
      </Container>
    </section>
  );
}
