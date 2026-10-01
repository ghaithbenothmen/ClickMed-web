import { ShieldCheck } from "lucide-react";
import { ScrollScene } from "@/components/animations/ScrollScene";
import { TextReveal } from "@/components/animations/TextReveal";
import { BrandMotif } from "@/components/brand/ClickMedLogo";
import { AIAssistantUI } from "@/components/product/AIAssistantUI";
import { Chapter } from "@/components/ui/Chapter";
import { Container } from "@/components/ui/Container";
import { ai } from "@/data/content";

export function AIConsultation() {
  return (
    <section id="ia" data-nav-theme="dark" aria-labelledby="ai-title" className="relative bg-night text-white">
      {/* Brand motif, quiet on dark */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <BrandMotif tone="light" className="absolute -bottom-48 -left-48 size-[620px] opacity-60" />
      </div>

      <ScrollScene scene="ai" className="relative lg:flex lg:h-svh lg:min-h-[760px] lg:items-center">
        <Container size="wide" className="grid gap-12 py-24 sm:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20 lg:py-10">
          <div className="flex flex-col gap-7">
            <Chapter chapter={ai.chapter} tone="dark" />
            <TextReveal as="h2" id="ai-title" text={ai.title} className="text-title font-semibold text-white" />
            <p className="max-w-[32rem] text-[18px] leading-[1.55] text-white/70">{ai.body}</p>

            {/* The reasoning sequence the panel follows */}
            <ol className="relative mt-2 flex flex-col gap-4 pl-6" aria-label="Étapes de l'assistant">
              <span aria-hidden className="absolute top-1 bottom-1 left-0 w-px bg-white/12" />
              <span
                aria-hidden
                data-step-rail
                className="absolute top-1 bottom-1 left-0 w-px origin-top bg-lime"
              />
              {ai.steps.map((s, i) => (
                <li key={s.title} data-step className="relative">
                  <span
                    aria-hidden
                    className="absolute top-[7px] -left-[27px] size-[7px] rounded-full bg-lime ring-4 ring-night"
                  />
                  <p className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-lime">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[15px] font-semibold">{s.title}</span>
                  </p>
                  <p className="mt-0.5 pl-8 text-[13px] leading-snug text-white/60">{s.text}</p>
                </li>
              ))}
            </ol>

            <p className="flex items-start gap-3 rounded-card border border-lime/40 bg-white/5 px-4 py-3.5 text-[15px] font-medium text-white">
              <ShieldCheck size={20} strokeWidth={2} className="mt-0.5 shrink-0 text-lime" />
              {ai.disclaimer}
            </p>
          </div>

          <figure className="relative lg:self-center">
            <figcaption className="sr-only">
              Démonstration de l&apos;assistant ClickMed pour Sarra Trabelsi : lecture du dossier et du contexte clinique,
              puis trois hypothèses classées par probabilité (infection virale, pneumonie, bronchite aiguë), les
              points à vérifier (température, auscultation, évolution des symptômes) et un rappel de l&apos;allergie à
              la pénicilline. Aide à la décision uniquement.
            </figcaption>
            <div aria-hidden data-cursor="Explorer">
              <AIAssistantUI />
            </div>
          </figure>
        </Container>
      </ScrollScene>
    </section>
  );
}
