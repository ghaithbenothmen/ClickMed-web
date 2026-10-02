import { Check, Play } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Reveal } from "@/components/animations/Reveal";
import { BrandMotif } from "@/components/brand/ClickMedLogo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site, tutorials } from "@/data/content";
import { tutorialVideos } from "@/data/media";
import type { MediaVideo } from "@/types";

/** 16:9 slot: the real video when one is set in data/media.ts, otherwise a placeholder. */
function TutorialMedia({ video, title }: { video: MediaVideo | null; title: string }) {
  if (video) {
    return (
      <video
        className="aspect-video w-full rounded-card bg-night object-cover"
        controls
        preload="none"
        poster={video.poster}
        aria-label={`Tutoriel : ${title}`}
      >
        <source src={video.src} type={video.type} />
      </video>
    );
  }

  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-card bg-night">
      <BrandMotif tone="light" className="pointer-events-none absolute -right-12 -bottom-16 size-[200px] opacity-70" />
      <div className="relative flex flex-col items-center gap-3">
        <span aria-hidden className="flex size-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
          <Play size={22} strokeWidth={2} className="translate-x-0.5 text-white/80" />
        </span>
        <span className="text-[13px] font-medium text-white/70">{tutorials.placeholder}</span>
      </div>
    </div>
  );
}

export function Tutorials() {
  return (
    <section id="tutoriels" aria-labelledby="tutorials-title" className="bg-page py-28 sm:py-36">
      <Container size="wide">
        <SectionHeading id="tutorials-title" title={tutorials.title} body={tutorials.body} />

        <Reveal as="ol" stagger className="mt-14 grid gap-x-6 gap-y-10 sm:mt-20 md:grid-cols-2 xl:grid-cols-4">
          {tutorials.items.map((item, i) => (
            <li key={item.id} className="flex flex-col gap-5">
              <TutorialMedia video={tutorialVideos[item.id] ?? null} title={item.title} />
              <div className="flex gap-4">
                <span className="pt-1 font-mono text-[13px] text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[18px] leading-snug font-semibold text-deep">{item.title}</h3>
                  <p className="mt-1.5 max-w-[30rem] text-[15px] leading-[1.55] text-ink-soft">{item.text}</p>
                </div>
              </div>
            </li>
          ))}
        </Reveal>

        <div className="mt-16 flex flex-col items-start gap-2.5 sm:mt-20">
          <MagneticButton>
            <Button href={site.signupUrl} size="lg">
              {tutorials.cta}
            </Button>
          </MagneticButton>
          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft">
            <Check size={14} strokeWidth={2.5} className="text-logo" aria-hidden />
            {tutorials.ctaNote}
          </span>
        </div>
      </Container>
    </section>
  );
}
