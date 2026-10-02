import { Check, Sparkles } from "lucide-react";
import { AppWindow, Avatar, MockLabel, TypedText } from "@/components/product/AppWindow";
import { Badge } from "@/components/ui/Badge";
import { Kbd } from "@/components/ui/Kbd";
import { LiveDot } from "@/components/ui/LiveDot";
import { consultation, demo } from "@/data/content";
import { cn } from "@/lib/utils";

const motif = "Toux et fatigue depuis 4 jours, fièvre rapportée à domicile.";
const exam = "Gorge légèrement inflammatoire. Auscultation à compléter.";
const notes = "Revoir dans 48 h si la fièvre persiste.";

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div data-field className={cn("flex flex-col", className)}>
      <MockLabel className="mb-2">{label}</MockLabel>
      <div className="flex-1 rounded-xl border border-line bg-white px-4 py-3.5 text-[15px] leading-relaxed text-ink">
        {children}
      </div>
    </div>
  );
}

/** A consultation in the order of the doctor's reasoning: motif, exam, diagnosis, notes. */
export function ConsultationUI() {
  return (
    <AppWindow active="consultation" bodyClassName="flex flex-col">
      {/* Patient bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-line bg-white px-4 py-3.5 sm:px-6">
        <Avatar initials="ST" tone="deep" className="size-9" />
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-deep">Sarra Trabelsi</p>
          <p className="text-[12px] text-ink-soft">34 ans, consultation du {demo.date.toLowerCase()}</p>
        </div>
        <Badge tone="warning" className="hidden sm:inline-flex">
          ⚠ Pénicilline
        </Badge>
        <span data-autosave className="ml-auto grid text-[12px] font-semibold">
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

      {/* Reasoning, in order */}
      <div className="grid gap-5 p-4 sm:p-6 md:grid-cols-2">
        <Field label="Motif">
          <TypedText name="motif" text={motif} />
        </Field>
        <Field label="Examen clinique">
          <TypedText name="exam" text={exam} />
        </Field>
        <div data-field className="flex flex-col">
          <MockLabel className="mb-2">Diagnostic</MockLabel>
          <div className="flex flex-1 flex-wrap content-start gap-2 rounded-xl border border-line bg-white px-3.5 py-3">
            <span
              data-diag
              className="inline-flex items-center gap-1.5 rounded-full bg-deep px-3 py-1.5 text-[13px] font-semibold text-white"
            >
              <Check size={13} strokeWidth={2.5} /> Infection respiratoire, à préciser
            </span>
            <span
              data-diag
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-deep/40 px-3 py-1.5 text-[13px] font-semibold text-deep"
            >
              <Sparkles size={13} strokeWidth={2.25} /> Pistes de l&apos;assistant
            </span>
          </div>
        </div>
        <Field label="Notes">
          <span className="text-ink-soft">{notes}</span>
        </Field>
      </div>

      {/* Finish */}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white px-4 py-3.5 sm:px-6">
        <span className="flex items-center gap-1.5 text-[12px] text-ink-soft">
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
