import { BookOpen, Info, MessagesSquare } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { QuestionForm } from "@/components/forms/QuestionForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { askQuestion } from "@/data/content";

const outcomeIcons = [BookOpen, Info, MessagesSquare];

/** "Posez-nous votre question": the last stop before the footer, and the target of the intent CTAs. */
export function AskQuestion() {
  return (
    <section id="question" aria-labelledby="question-title" className="bg-page py-28 sm:py-36">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="flex flex-col gap-10 lg:pt-4">
            <SectionHeading id="question-title" title={askQuestion.title} body={askQuestion.body} />

            <div>
              <p className="text-[15px] font-semibold text-deep">{askQuestion.outcomesTitle}</p>
              <Reveal as="ul" stagger className="mt-4 flex flex-col border-t border-line">
                {askQuestion.outcomes.map((o, i) => {
                  const Icon = outcomeIcons[i];
                  return (
                    <li key={o.title} className="flex gap-4 border-b border-line py-4">
                      <span
                        aria-hidden
                        className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-deep ring-1 ring-line"
                      >
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      <span>
                        <span className="block text-[15px] font-semibold text-deep">{o.title}</span>
                        <span className="mt-0.5 block text-[15px] text-ink-soft">{o.text}</span>
                      </span>
                    </li>
                  );
                })}
              </Reveal>
            </div>
          </div>

          <QuestionForm />
        </div>
      </Container>
    </section>
  );
}
