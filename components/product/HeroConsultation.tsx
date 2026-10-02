import { Activity, Check } from "lucide-react";
import { AppWindow, Avatar, MockLabel, TypedText } from "@/components/product/AppWindow";
import { Badge } from "@/components/ui/Badge";
import { Kbd } from "@/components/ui/Kbd";
import { LiveDot } from "@/components/ui/LiveDot";
import { consultation, demo } from "@/data/content";

const motif = "Toux et fatigue depuis 4 jours, fièvre rapportée à domicile.";
const exam = "Gorge légèrement inflammatoire. Auscultation à compléter.";

/**
 * The hero's product view: one consultation in progress, nothing else.
 * Deliberately calmer than the full ConsultationUI shown further down.
 */
export function HeroConsultation() {
  return (
    <AppWindow active="consultation" bodyClassName="flex flex-col">
      {/* Patient */}
      <div data-dash-item className="flex flex-wrap items-center gap-3 border-b border-line bg-white px-5 py-4">
        <Avatar initials="ST" tone="deep" className="size-10 text-[13px]" />
        <div className="min-w-0">
          <p className="text-[17px] font-semibold tracking-[-0.02em] text-deep">Sarra Trabelsi</p>
          <p className="text-[13px] text-ink-soft">34 ans, consultation en cours</p>
        </div>
        <Badge tone="warning" className="ml-auto">
          ⚠ Pénicilline
        </Badge>
      </div>

      <div className="flex flex-col gap-4 p-5 lg:pb-9">
        <div data-dash-item>
          <MockLabel className="mb-2">Motif</MockLabel>
          <div className="rounded-xl border border-deep/30 bg-white px-4 py-3 text-[15px] leading-relaxed text-ink ring-4 ring-lime/20">
            <TypedText name="hero-motif" text={motif} />
          </div>
        </div>
        <div data-dash-item>
          <MockLabel className="mb-2">Examen clinique</MockLabel>
          <div className="rounded-xl border border-line bg-white px-4 py-3 text-[15px] leading-relaxed text-ink">
            {exam}
          </div>
        </div>
        <div data-dash-item className="flex flex-wrap items-center gap-2">
          <MockLabel className="w-full">Diagnostic</MockLabel>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-deep px-3 py-1.5 text-[13px] font-semibold text-white">
            <Check size={14} strokeWidth={2.5} /> Infection respiratoire, à préciser
          </span>
        </div>
      </div>

      {/* Finish */}
      <div
        data-dash-item
        className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white px-5 py-3.5"
      >
        <span className="flex items-center gap-1.5 text-[13px] text-ink-soft">
          <Kbd>Ctrl</Kbd>
          <span className="font-mono">+</span>
          <Kbd>Entrée</Kbd>
        </span>
        <span className="inline-flex h-10 items-center rounded-btn bg-deep px-4 text-[13px] font-semibold text-white">
          {consultation.finish}
        </span>
      </div>
    </AppWindow>
  );
}

/** Vital signs of the same consultation, shown as a card layered over the window. */
export function HeroVitals() {
  return (
    <div className="w-[300px] rounded-panel border border-line bg-white p-4 shadow-window">
      <div className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-lg bg-soft text-deep">
          <Activity size={14} strokeWidth={2.25} />
        </span>
        <MockLabel>Constantes</MockLabel>
        <span className="ml-auto font-mono text-[11px] text-ink-soft">09:34</span>
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2">
        {demo.vitals.map((v) => (
          <div key={v.label} className="rounded-lg bg-soft px-2.5 py-2">
            <dt className="truncate text-[10px] text-ink-soft">{v.label}</dt>
            <dd className="font-mono text-[14px] font-medium whitespace-nowrap text-ink tabular">
              {v.value.replace(" / ", "/")}
              <span className="ml-0.5 text-[9px] text-ink-soft">{v.unit}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Autosave status pill, floating beside the window. */
export function HeroAutosave() {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white py-2 pr-4 pl-3 text-[13px] font-semibold text-deep shadow-card-hover">
      <LiveDot />
      {consultation.autosave}
    </span>
  );
}
