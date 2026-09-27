import { ScrollScene } from "@/components/animations/ScrollScene";
import { TextReveal } from "@/components/animations/TextReveal";
import { Chapter } from "@/components/ui/Chapter";
import { features } from "@/data/content";
import { featureGroups } from "@/data/features";

/** The day in review: five connected spaces, travelled horizontally on desktop. */
export function FeatureStory() {
  return (
    <section id="fonctionnalites" aria-labelledby="features-title" className="overflow-hidden bg-page">
      <ScrollScene scene="features" className="relative lg:flex lg:h-svh lg:min-h-[680px] lg:flex-col lg:justify-center">
        <div
          data-track
          className="flex flex-col gap-4 px-5 py-28 sm:px-8 sm:py-36 lg:w-max lg:flex-row lg:items-stretch lg:gap-5 lg:px-12 lg:py-0"
        >
          <div className="flex flex-col justify-center gap-6 pb-8 lg:w-[min(36vw,520px)] lg:shrink-0 lg:pr-10 lg:pb-0">
            <Chapter chapter={features.chapter} />
            <TextReveal as="h2" id="features-title" text={features.title} className="text-title font-semibold text-deep" />
            <p className="max-w-[26rem] text-[18px] leading-[1.55] text-ink-soft">{features.body}</p>
          </div>

          {featureGroups.map((g) => {
            const Icon = g.icon;
            return (
              <article
                key={g.id}
                data-feature
                className="group flex flex-col gap-10 rounded-panel border border-line bg-white p-7 shadow-card transition-[border-color,box-shadow,translate] duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-lime hover:shadow-card-hover sm:p-8 lg:h-[min(60vh,520px)] lg:w-[min(30vw,420px)] lg:shrink-0"
              >
                <div className="flex items-center justify-between">
                  <time className="font-mono text-[13px] text-ink-soft">{g.time}</time>
                  <span className="flex size-11 items-center justify-center rounded-xl bg-soft text-deep transition-colors duration-300 group-hover:bg-lime group-hover:text-ink">
                    <Icon size={20} strokeWidth={1.9} aria-hidden />
                  </span>
                </div>
                <div className="lg:pt-6">
                  <h3 className="text-[38px] leading-[1.05] font-semibold text-deep lg:text-[48px]">{g.title}</h3>
                  <p className="mt-3 max-w-[22rem] text-[15px] leading-[1.55] text-ink-soft">{g.summary}</p>
                </div>
                <ul className="mt-auto flex flex-col border-t border-line">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 border-b border-line py-2.5 text-[15px] font-medium text-ink last:border-b-0">
                      <span className="size-1.5 rounded-full bg-lime" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
          <div aria-hidden className="hidden w-[8vw] shrink-0 lg:block" />
        </div>

        <div aria-hidden className="absolute inset-x-12 bottom-10 hidden h-px bg-line lg:block">
          <span data-track-progress className="block h-full origin-left scale-x-0 bg-deep" />
        </div>
      </ScrollScene>
    </section>
  );
}
