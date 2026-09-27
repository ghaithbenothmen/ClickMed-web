import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollScene } from "@/components/animations/ScrollScene";
import { PatientDashboard } from "@/components/product/PatientDashboard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { patients } from "@/data/content";
import { media } from "@/data/media";

export function PatientManagement() {
  return (
    <section id="produit" aria-labelledby="patients-title" className="py-28 sm:py-36">
      <Container size="wide">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="flex flex-col gap-10 lg:pt-6">
            <SectionHeading id="patients-title" chapter={patients.chapter} title={patients.title} body={patients.body} />

            <Reveal as="ul" stagger className="flex flex-col border-t border-line">
              {patients.points.map((p) => (
                <li key={p.title} className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:gap-6">
                  <span className="text-[15px] font-semibold text-deep sm:w-48 sm:shrink-0">{p.title}</span>
                  <span className="text-[15px] text-ink-soft">{p.text}</span>
                </li>
              ))}
            </Reveal>

            <Reveal className="relative hidden aspect-[16/10] overflow-hidden rounded-panel lg:block">
              <Image
                src={media.consultationImage.src}
                alt={media.consultationImage.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>

          <ScrollScene scene="patient" as="figure" className="lg:sticky lg:top-24 lg:self-start">
            <figcaption className="sr-only">
              Démonstration : la recherche « Sa » filtre la liste des patients, puis le dossier de Sarra Trabelsi
              s&apos;ouvre avec ses antécédents, son allergie à la pénicilline, ses traitements, ses constantes et
              l&apos;historique de ses consultations.
            </figcaption>
            <div aria-hidden data-cursor="Explorer">
              <PatientDashboard />
            </div>
          </ScrollScene>
        </div>
      </Container>
    </section>
  );
}
