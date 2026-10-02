import { ScrollScene } from "@/components/animations/ScrollScene";
import { ConsultationUI } from "@/components/product/ConsultationUI";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { consultation } from "@/data/content";

export function ConsultationExperience() {
  return (
    <section id="consultation" aria-labelledby="consultation-title" className="py-28 sm:py-36">
      <Container size="wide">
        <SectionHeading
          id="consultation-title"
          chapter={consultation.chapter}
          title={consultation.title}
          body={consultation.body}
        />

        <ScrollScene scene="consultation" as="figure" className="mx-auto mt-14 max-w-[1080px] sm:mt-20">
          <figcaption className="sr-only">
            Démonstration d&apos;une consultation ClickMed pour Sarra Trabelsi : motif, examen clinique, diagnostic et
            notes, dans cet ordre. Enregistrement automatique et Ctrl + Entrée pour terminer la consultation.
          </figcaption>
          <div aria-hidden data-cursor="Explorer">
            <ConsultationUI />
          </div>
        </ScrollScene>
      </Container>
    </section>
  );
}
