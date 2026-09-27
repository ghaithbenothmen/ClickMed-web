import { FileDown, Pill, Printer, TriangleAlert, X } from "lucide-react";
import { AppWindow, MockLabel } from "@/components/product/AppWindow";
import { demo } from "@/data/content";
import { cn } from "@/lib/utils";

const templates = ["Infection respiratoire", "Douleur et fièvre", "Renouvellement"];

const lines = [
  { name: "Paracétamol 1 g", dosage: "1 comprimé 3 fois par jour", duration: "5 jours" },
  { name: "Sérum physiologique", dosage: "Lavage nasal matin et soir", duration: "5 jours" },
];

function RxLine({
  name,
  dosage,
  duration,
  flagged,
  ...rest
}: { name: string; dosage: string; duration: string; flagged?: boolean } & React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-xl border bg-white px-3.5 py-3",
        flagged ? "border-warning ring-4 ring-warning-bg" : "border-line",
      )}
      {...rest}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg",
          flagged ? "bg-warning-bg text-warning-ink" : "bg-soft text-deep",
        )}
      >
        <Pill size={15} strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-ink">{name}</p>
        <p className="truncate text-[11px] text-ink-soft">{dosage}</p>
      </div>
      <span className="hidden font-mono text-[11px] text-ink-soft sm:inline">{duration}</span>
      <X size={14} strokeWidth={2} className="text-ink-soft" />
    </li>
  );
}

/** An ordonnance built from a template, with an allergy conflict caught before printing. */
export function PrescriptionUI() {
  return (
    <AppWindow active="ordonnances" bodyClassName="p-4 sm:p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <MockLabel>Ordonnance</MockLabel>
          <p className="mt-1 text-[18px] font-semibold tracking-[-0.02em] text-deep">Sarra Trabelsi</p>
        </div>
        <p className="font-mono text-[11px] text-ink-soft">{demo.date}</p>
      </div>

      <div className="mt-4">
        <MockLabel className="mb-2">Modèles</MockLabel>
        <div className="flex flex-wrap gap-2">
          {templates.map((t, i) => (
            <span
              key={t}
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-semibold",
                i === 0 ? "bg-deep text-white" : "border border-line bg-white text-ink-soft",
              )}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {lines.map((l) => (
          <RxLine key={l.name} data-rx-row {...l} />
        ))}
        <RxLine
          data-rx-new
          flagged
          name="Amoxicilline 1 g"
          dosage="1 comprimé 2 fois par jour"
          duration="6 jours"
        />
      </ul>

      <div
        data-rx-warning
        role="presentation"
        className="mt-3 flex items-start gap-3 rounded-xl border border-warning/40 bg-warning-bg px-3.5 py-3"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-warning-ink text-white">
          <TriangleAlert size={16} strokeWidth={2.25} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-warning-ink">⚠ Allergie connue détectée</p>
          <p className="mt-0.5 text-[11px] leading-snug text-warning-ink/90">
            Le dossier indique une allergie à la pénicilline. L&apos;amoxicilline appartient à cette famille.
          </p>
          <div className="mt-2 flex gap-2">
            <span className="rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-warning-ink ring-1 ring-warning/30">
              Retirer
            </span>
            <span className="rounded-md px-2.5 py-1 text-[11px] font-semibold text-warning-ink">Voir le dossier</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <p className="text-[11px] text-ink-soft">
          {demo.doctor.display}, {demo.doctor.specialty.toLowerCase()}
        </p>
        <div className="flex gap-2">
          <span
            data-rx-action
            className="inline-flex h-9 items-center gap-2 rounded-btn border border-line bg-white px-3.5 text-[13px] font-semibold text-deep"
          >
            <Printer size={15} strokeWidth={2} /> Imprimer
          </span>
          <span
            data-rx-action
            className="inline-flex h-9 items-center gap-2 rounded-btn bg-deep px-3.5 text-[13px] font-semibold text-white"
          >
            <FileDown size={15} strokeWidth={2} /> PDF
          </span>
        </div>
      </div>
    </AppWindow>
  );
}
