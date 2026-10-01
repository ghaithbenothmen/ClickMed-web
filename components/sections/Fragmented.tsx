import { CalendarDays, FileText, Stethoscope, UserRound } from "lucide-react";
import { ScrollScene } from "@/components/animations/ScrollScene";
import { AppWindow, MockLabel } from "@/components/product/AppWindow";
import { Container } from "@/components/ui/Container";
import { intro } from "@/data/content";
import { cn } from "@/lib/utils";

/* Six analogue pieces of a scattered practice, drawn simply. */

const ruled =
  "bg-white bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_19px,var(--clickmed-border)_19px,var(--clickmed-border)_20px)]";

function AgendaPaper() {
  return (
    <div className={cn("w-[210px] rounded-md p-3 pt-2 shadow-card-hover", ruled)}>
      <p className="text-[11px] font-semibold text-deep">Lundi 28</p>
      <ul className="mt-1 space-y-[4px] font-mono text-[10px] leading-4 text-ink-soft">
        <li>9h00 M. Ben Ali</li>
        <li className="line-through">9h30 ??? rappeler</li>
        <li>10h15 A. Mansour</li>
        <li>11h00 ————</li>
      </ul>
    </div>
  );
}

function PrescriptionPad() {
  return (
    <div className="w-[190px] rounded-md bg-white p-3 shadow-card-hover ring-1 ring-line">
      <div className="mb-2 h-1.5 w-12 rounded-full bg-deep/30" />
      <p className="text-[11px] font-semibold text-ink">Ordonnance</p>
      <div className="mt-2 space-y-1.5">
        <div className="h-1 w-full rounded bg-line" />
        <div className="h-1 w-4/5 rounded bg-line" />
        <div className="h-1 w-3/5 rounded bg-line" />
      </div>
      <p className="mt-3 text-right font-mono text-[9px] text-ink-soft">Carnet n° 12</p>
    </div>
  );
}

function Folder() {
  return (
    <div className="relative w-[200px] pt-3">
      <span className="absolute top-0 left-0 h-4 w-20 rounded-t-md bg-soft ring-1 ring-line" />
      <div className="relative rounded-md rounded-tl-none bg-soft p-3 shadow-card-hover ring-1 ring-line">
        <p className="font-mono text-[10px] text-ink-soft">Dossiers T à Z</p>
        <div className="mt-2 flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-10 flex-1 rounded-sm bg-white ring-1 ring-line" />
          ))}
        </div>
      </div>
    </div>
  );
}

function PostIt() {
  return (
    <div className="flex size-[124px] flex-col justify-between bg-sun p-3 shadow-card-hover">
      <p className="text-[13px] leading-snug font-semibold text-ink">Rappeler le labo pour les résultats</p>
      <p className="font-mono text-[10px] text-ink/60">avant midi</p>
    </div>
  );
}

function Spreadsheet() {
  return (
    <div className="w-[210px] rounded-md bg-white p-2 shadow-card-hover ring-1 ring-line">
      <div className="grid grid-cols-4 gap-px bg-line text-[9px]">
        {["Nom", "Tél.", "Visite", "Payé", "Ben Ali", "…", "12/09", "oui", "Trabelsi", "…", "?", "", "Mansour", "…", "03/09", "non"].map(
          (c, i) => (
            <span key={i} className={cn("truncate bg-white px-1 py-0.5 font-mono", i < 4 && "bg-soft font-semibold")}>
              {c || " "}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

function Messages() {
  return (
    <div className="flex w-[200px] flex-col gap-1.5">
      <span className="self-start rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[11px] text-ink shadow-card-hover ring-1 ring-line">
        Le patient de 10h annule
      </span>
      <span className="self-end rounded-2xl rounded-br-md bg-deep px-3 py-2 text-[11px] text-white shadow-card-hover">
        Et son ordonnance ?
      </span>
    </div>
  );
}

const fragments = [
  { label: intro.fragments[0], visual: <AgendaPaper />, pos: "lg:left-[1%] lg:top-[4%]", rot: "lg:-rotate-6" },
  { label: intro.fragments[1], visual: <PrescriptionPad />, pos: "lg:right-[3%] lg:top-[0%]", rot: "lg:rotate-6" },
  { label: intro.fragments[2], visual: <Folder />, pos: "lg:left-[7%] lg:bottom-[4%]", rot: "lg:rotate-3" },
  { label: intro.fragments[3], visual: <PostIt />, pos: "lg:left-[31%] lg:top-[-4%]", rot: "lg:-rotate-3" },
  { label: intro.fragments[4], visual: <Spreadsheet />, pos: "lg:right-[1%] lg:bottom-[12%]", rot: "lg:-rotate-4" },
  { label: intro.fragments[5], visual: <Messages />, pos: "lg:right-[30%] lg:bottom-[-2%]", rot: "lg:rotate-6" },
];

function UnifiedWindow() {
  const panels = [
    { icon: UserRound, title: "Dossier", line: "Sarra Trabelsi, 34 ans", sub: "⚠ Pénicilline" },
    { icon: Stethoscope, title: "Consultation", line: "Toux et fatigue, 4 jours", sub: "Enregistré automatiquement" },
    { icon: FileText, title: "Ordonnance", line: "Modèle : infection respiratoire", sub: "PDF prêt" },
    { icon: CalendarDays, title: "Rendez-vous", line: "Contrôle jeudi, 09:30", sub: "Confirmé" },
  ];
  return (
    <AppWindow active="dashboard" bodyClassName="p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {panels.map(({ icon: Icon, title, line, sub }) => (
          <div key={title} data-panel className="rounded-card border border-line bg-white p-3.5 shadow-card">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-soft text-deep">
                <Icon size={14} strokeWidth={2} />
              </span>
              <MockLabel>{title}</MockLabel>
            </div>
            <p className="mt-3 truncate text-[13px] font-semibold text-ink">{line}</p>
            <p className="truncate text-[11px] text-ink-soft">{sub}</p>
          </div>
        ))}
      </div>
      <div data-panel className="mt-3 rounded-card border border-line bg-white p-3.5 shadow-card">
        <MockLabel>Parcours de la visite</MockLabel>
        <ol className="mt-3 grid grid-cols-4 gap-2">
          {[
            ["09:30", "Arrivée"],
            ["09:32", "Consultation"],
            ["09:41", "Ordonnance"],
            ["Jeudi", "Contrôle"],
          ].map(([time, label], i) => (
            <li key={label} className="flex flex-col gap-1.5">
              <span className={cn("h-1 rounded-full", i < 3 ? "bg-deep" : "bg-lime")} />
              <span className="font-mono text-[10px] text-ink-soft">{time}</span>
              <span className="text-[11px] font-semibold text-ink">{label}</span>
            </li>
          ))}
        </ol>
      </div>
    </AppWindow>
  );
}

/** From a scattered practice to a single ClickMed workspace. */
export function Fragmented() {
  return (
    <section aria-labelledby="fragmented-title" className="relative bg-white">
      <ScrollScene scene="assemble" className="relative overflow-hidden lg:h-svh lg:min-h-[720px]">
        <Container size="wide" className="relative flex flex-col py-24 lg:h-full lg:py-0 lg:pt-24">
          {/* Before / after copy. Stacked on mobile; on desktop both share one cell and
              the "after" state is the default, so reduced motion shows the resolved story. */}
          <div className="relative z-10 grid max-w-[44rem] lg:[&>*]:[grid-area:1/1]">
            <p
              data-copy="a"
              className="relative self-start justify-self-start text-[18px] font-medium text-ink-soft sm:text-[22px] lg:text-title lg:font-semibold lg:text-ink lg:opacity-0"
            >
              {intro.fragmentedTitle}
              <span
                data-strike
                aria-hidden
                className="absolute top-[55%] left-0 h-0.5 w-full origin-left rounded-full bg-lime"
              />
            </p>
            <div data-copy="b" className="mt-2 lg:mt-0">
              <h2 id="fragmented-title" className="text-title font-semibold text-deep">
                {intro.unifiedTitle}
              </h2>
              <p className="mt-4 max-w-[32rem] text-[15px] leading-[1.6] text-ink-soft sm:text-[18px]">
                {intro.unifiedBody}
              </p>
            </div>
          </div>

          <div
            data-stage
            className="relative mt-10 flex flex-col items-center gap-8 lg:mt-0 lg:flex-1 lg:justify-center lg:pb-10"
          >
            <ul className="flex flex-wrap justify-center gap-2 lg:contents" aria-label="Les outils éparpillés du cabinet">
              {fragments.map((f) => (
                <li key={f.label} data-frag className={cn("lg:absolute lg:z-10", f.pos)}>
                  <div data-frag-inner className={cn("flex flex-col items-center gap-2.5", f.rot)}>
                    <div className="hidden lg:block" aria-hidden>
                      {f.visual}
                    </div>
                    <span
                      data-frag-label
                      className="rounded-full bg-soft px-3 py-1 font-mono text-[11px] text-ink-soft ring-1 ring-line"
                    >
                      {f.label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <figure data-unified className="relative z-20 w-full max-w-[720px]">
              <figcaption className="sr-only">
                Un espace ClickMed unique réunissant le dossier, la consultation, l&apos;ordonnance et le rendez-vous de la patiente.
              </figcaption>
              <div aria-hidden>
                <UnifiedWindow />
              </div>
            </figure>
          </div>
        </Container>
      </ScrollScene>
    </section>
  );
}
