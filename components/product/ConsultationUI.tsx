import { Check, Clock3, History, Sparkles } from "lucide-react";
import { AppWindow, Avatar, MockCard, MockLabel, TypedText } from "@/components/product/AppWindow";
import { Badge } from "@/components/ui/Badge";
import { Kbd } from "@/components/ui/Kbd";
import { LiveDot } from "@/components/ui/LiveDot";
import { consultation, demo } from "@/data/content";

const motif = "Toux et fatigue depuis 4 jours, fièvre rapportée à domicile.";
const exam = "Gorge légèrement inflammatoire. Auscultation à compléter.";

const timeline = [
  { date: "14/02/2026", label: "Angine", note: "Traitement symptomatique" },
  { date: "03/10/2025", label: "Bilan annuel", note: "RAS" },
];

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div data-field className={className}>
      <MockLabel className="mb-1.5">{label}</MockLabel>
      <div className="rounded-xl border border-line bg-white px-3.5 py-3 text-[13px] leading-relaxed text-ink">
        {children}
      </div>
    </div>
  );
}

/** A structured consultation: reasoning order on the left, context on the right. */
export function ConsultationUI() {
  return (
    <AppWindow active="consultation" bodyClassName="flex flex-col">
      {/* Patient bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-line bg-white px-4 py-3 sm:px-5">
        <Avatar initials="ST" tone="deep" className="size-9" />
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-deep">Sarra Trabelsi</p>
          <p className="text-[11px] text-ink-soft">34 ans, consultation du {demo.date.toLowerCase()}</p>
        </div>
        <Badge tone="warning" className="hidden sm:inline-flex">
          ⚠ Pénicilline
        </Badge>
        <div className="ml-auto flex items-center gap-4">
          <span className="hidden items-center gap-1.5 font-mono text-[11px] text-ink-soft md:inline-flex">
            <Clock3 size={12} strokeWidth={2} /> 06:12
          </span>
          <span data-autosave className="grid text-[11px] font-semibold">
            <span data-saving className="invisible col-start-1 row-start-1 inline-flex items-center gap-2 text-ink-soft">
              <span className="size-2 rounded-full bg-sun" />
              {consultation.saving}
            </span>
            <span data-saved className="col-start-1 row-start-1 inline-flex items-center gap-2 text-deep">
              <LiveDot />
              {consultation.autosave}
            </span>
          </span>
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1.55fr_1fr]">
        {/* Reasoning column */}
        <div className="flex flex-col gap-3.5">
          <Field label="Motif">
            <TypedText name="motif" text={motif} />
          </Field>
          <Field label="Examen clinique">
            <TypedText name="exam" text={exam} />
          </Field>
          <div data-field>
            <MockLabel className="mb-1.5">Diagnostics</MockLabel>
            <div className="flex flex-wrap gap-2 rounded-xl border border-line bg-white px-3 py-2.5">
              <span data-diag className="inline-flex items-center gap-1.5 rounded-full bg-deep px-2.5 py-1 text-[11px] font-semibold text-white">
                <Check size={12} strokeWidth={2.5} /> Infection respiratoire, à préciser
              </span>
              <span data-diag className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-deep/40 px-2.5 py-1 text-[11px] font-semibold text-deep">
                <Sparkles size={12} strokeWidth={2.25} /> Voir les pistes de l&apos;assistant
              </span>
            </div>
          </div>
          <Field label="Notes du médecin" className="hidden sm:block">
            <span className="text-ink-soft">Revoir dans 48 h si la fièvre persiste.</span>
          </Field>
        </div>

        {/* Context column */}
        <div className="flex flex-col gap-3.5">
          <MockCard data-field className="p-3.5">
            <div className="flex items-center justify-between">
              <MockLabel>Constantes</MockLabel>
              <span className="font-mono text-[10px] text-ink-soft">09:34</span>
            </div>
            <dl className="mt-3 grid grid-cols-3 gap-x-3 gap-y-3.5 lg:grid-cols-2">
              {demo.vitals.map((v) => (
                <div key={v.label} className="rounded-lg bg-soft px-2.5 py-2">
                  <dt className="text-[11px] text-ink-soft">{v.label}</dt>
                  <dd className="font-mono text-[15px] font-medium text-ink tabular sm:text-[18px]">
                    {v.numeric === null ? (
                      v.value
                    ) : (
                      <span
                        data-count
                        data-value={v.numeric}
                        data-decimals={String(v.numeric).includes(".") ? 1 : 0}
                      >
                        {v.value}
                      </span>
                    )}
                    <span className="ml-1 text-[10px] text-ink-soft">{v.unit}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </MockCard>

          <MockCard data-field className="hidden p-3.5 sm:block">
            <div className="flex items-center gap-2">
              <History size={14} strokeWidth={2} className="text-ink-soft" />
              <MockLabel>Historique</MockLabel>
            </div>
            <ol className="mt-3 space-y-3 border-l border-line pl-3.5">
              {timeline.map((t) => (
                <li key={t.date} className="relative text-[13px]">
                  <span className="absolute top-1.5 -left-[18px] size-2 rounded-full border-2 border-white bg-logo" />
                  <p className="font-mono text-[11px] text-ink-soft">{t.date}</p>
                  <p className="font-medium">{t.label}</p>
                  <p className="text-[11px] text-ink-soft">{t.note}</p>
                </li>
              ))}
            </ol>
          </MockCard>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white px-4 py-3 sm:px-5">
        <span className="flex items-center gap-1.5 text-[11px] text-ink-soft">
          <Kbd>Ctrl</Kbd>
          <span className="font-mono">+</span>
          <Kbd>Entrée</Kbd>
          <span className="ml-1.5 hidden sm:inline">pour terminer</span>
        </span>
        <span
          data-finish
          className="inline-flex h-9 items-center gap-2 rounded-btn bg-deep px-4 text-[13px] font-semibold text-white"
        >
          {consultation.finish}
        </span>
      </div>
    </AppWindow>
  );
}
