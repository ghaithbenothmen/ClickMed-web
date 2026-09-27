import { Reveal } from "@/components/animations/Reveal";
import { ScrollScene } from "@/components/animations/ScrollScene";
import { ConsultationUI } from "@/components/product/ConsultationUI";
import { Container } from "@/components/ui/Container";
import { Kbd } from "@/components/ui/Kbd";
import { LiveDot } from "@/components/ui/LiveDot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { consultation } from "@/data/content";

const notes = [
  {
    title: "Constantes intégrées",
    text: "Tension, FC, température, SpO₂, poids et taille, saisis au fil de l'examen.",
  },
  {
    title: "Historique à côté",
    text: "Les consultations précédentes restent visibles sans quitter la page.",
  },
];

export function ConsultationExperience() {
  return (
    <section id="consultation" aria-labelledby="consultation-title" className="bg-white py-28 sm:py-36">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="consultation-title"
            chapter={consultation.chapter}
            title={consultation.title}
            body={consultation.body}
            className="lg:col-span-7"
          />
          <Reveal stagger className="flex flex-col gap-5 lg:col-span-4 lg:col-start-9">
            <p className="flex items-center gap-2.5 text-[15px] font-medium text-deep">
              <LiveDot /> {consultation.autosave}
            </p>
            <p className="flex flex-wrap items-center gap-2 text-[15px] text-ink-soft">
              <Kbd>Ctrl</Kbd>
              <span className="font-mono text-[13px]">+</span>
              <Kbd>Entrée</Kbd>
              <span>{consultation.finish}</span>
            </p>
          </Reveal>
        </div>

        <ScrollScene scene="consultation" as="figure" className="mt-14 sm:mt-20">
          <figcaption className="sr-only">
            Démonstration d&apos;une consultation SHIFA : motif, examen clinique, diagnostics et notes à gauche ;
            constantes (tension 120/80, FC 72 bpm, température 37,1 °C, SpO₂ 98 %, poids 72 kg, taille 178 cm)
            et historique à droite. Valeurs de démonstration.
          </figcaption>
          <div aria-hidden data-cursor="Explorer">
            <ConsultationUI />
          </div>
        </ScrollScene>

        <Reveal stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:w-2/3">
          {notes.map((n) => (
            <div key={n.title} className="border-l-2 border-lime pl-4">
              <p className="text-[15px] font-semibold text-deep">{n.title}</p>
              <p className="mt-1 text-[15px] text-ink-soft">{n.text}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
