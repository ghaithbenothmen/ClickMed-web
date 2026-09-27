import { FileDown, LayoutTemplate, Printer, TriangleAlert } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollScene } from "@/components/animations/ScrollScene";
import { PrescriptionUI } from "@/components/product/PrescriptionUI";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prescription } from "@/data/content";

const icons = [LayoutTemplate, TriangleAlert, Printer, FileDown];

export function Prescription() {
  return (
    <section id="ordonnance" aria-labelledby="rx-title" className="py-28 sm:py-36">
      <Container size="wide">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-20">
          <ScrollScene scene="prescription" as="figure" className="order-2 lg:order-1">
            <figcaption className="sr-only">
              Démonstration d&apos;une ordonnance créée à partir du modèle « Infection respiratoire ». L&apos;ajout
              d&apos;amoxicilline déclenche l&apos;alerte « Allergie connue détectée », car le dossier indique une
              allergie à la pénicilline. Boutons Imprimer et PDF.
            </figcaption>
            <div aria-hidden data-cursor="Explorer" className="mx-auto max-w-[640px]">
              <PrescriptionUI />
            </div>
          </ScrollScene>

          <div className="order-1 flex flex-col gap-10 lg:order-2">
            <SectionHeading id="rx-title" chapter={prescription.chapter} title={prescription.title} body={prescription.body} />
            <Reveal as="ul" stagger className="grid grid-cols-2 gap-x-6 gap-y-5">
              {prescription.points.map((p, i) => {
                const Icon = icons[i];
                return (
                  <li key={p} className="flex items-center gap-3 text-[15px] font-medium text-deep">
                    <span
                      className={
                        i === 1
                          ? "flex size-9 items-center justify-center rounded-xl bg-warning-bg text-warning-ink"
                          : "flex size-9 items-center justify-center rounded-xl bg-white text-deep ring-1 ring-line"
                      }
                    >
                      <Icon size={17} strokeWidth={2} aria-hidden />
                    </span>
                    {p}
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
