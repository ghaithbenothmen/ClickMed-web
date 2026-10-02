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
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-20">
          <div className="flex flex-col gap-10">
            <SectionHeading id="patients-title" chapter={patients.chapter} title={patients.title} body={patients.body} />

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

          <ScrollScene scene="patient" as="figure">
            <figcaption className="sr-only">
              Dossier de la patiente Sarra Trabelsi, 34 ans : antécédents (asthme dans l&apos;enfance), allergie à la
              pénicilline et traitement en cours (cétirizine si besoin).
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
