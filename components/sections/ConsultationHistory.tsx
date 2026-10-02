import { ScrollScene } from "@/components/animations/ScrollScene";
import { HistoryUI } from "@/components/product/HistoryUI";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { history } from "@/data/content";

export function ConsultationHistory() {
  return (
    <section id="historique" aria-labelledby="history-title" className="bg-white py-28 sm:py-36">
      <Container size="wide">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-20">
          <ScrollScene scene="history" as="figure" className="order-2 lg:order-1">
            <figcaption className="sr-only">
              Historique des consultations de Sarra Trabelsi. Dernière consultation le 14/02/2026 pour une angine :
              gorge érythémateuse sans fièvre observée, diagnostic d&apos;angine virale, paracétamol prescrit 3 jours.
              Consultations précédentes : bilan annuel le 03/10/2025 et certificat de sport le 22/05/2025.
            </figcaption>
            <div aria-hidden data-cursor="Explorer" className="mx-auto max-w-[640px]">
              <HistoryUI />
            </div>
          </ScrollScene>

          <SectionHeading
            id="history-title"
            chapter={history.chapter}
            title={history.title}
            body={history.body}
            className="order-1 lg:order-2"
          />
        </div>
      </Container>
    </section>
  );
}
