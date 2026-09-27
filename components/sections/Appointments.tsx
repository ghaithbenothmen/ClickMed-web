import { ScrollScene } from "@/components/animations/ScrollScene";
import { CalendarUI } from "@/components/product/CalendarUI";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { appointments } from "@/data/content";

export function Appointments() {
  return (
    <section id="planning" aria-labelledby="planning-title" className="bg-white py-28 sm:py-36">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="planning-title"
            chapter={appointments.chapter}
            title={appointments.title}
            className="lg:col-span-6"
          />
          <p className="max-w-[30rem] text-[18px] leading-[1.55] text-ink-soft lg:col-span-5 lg:col-start-8">
            {appointments.body}
          </p>
        </div>

        <ScrollScene scene="calendar" className="mt-14 sm:mt-20">
          <p className="mb-3 text-[13px] text-ink-soft">
            Aperçu interactif : changez de vue avec les onglets Jour, Semaine et Mois.
          </p>
          <CalendarUI />
        </ScrollScene>
      </Container>
    </section>
  );
}
