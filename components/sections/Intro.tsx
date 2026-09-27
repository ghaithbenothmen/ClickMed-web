import { Reveal } from "@/components/animations/Reveal";
import { ScrollScene } from "@/components/animations/ScrollScene";
import { SplitWords } from "@/components/animations/SplitWords";
import { Container } from "@/components/ui/Container";
import { intro } from "@/data/content";

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="py-28 sm:py-36 lg:py-48">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-12">
          <ScrollScene scene="statement" className="lg:col-span-10">
            <h2 id="intro-title" className="text-display font-semibold text-deep">
              <SplitWords text={intro.statement} />
            </h2>
          </ScrollScene>
          <Reveal className="lg:col-span-5 lg:col-start-7">
            <p className="text-[18px] leading-[1.6] text-ink-soft sm:text-[22px] sm:leading-[1.5]">{intro.body}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
