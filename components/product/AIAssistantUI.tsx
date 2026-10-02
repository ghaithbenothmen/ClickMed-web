import { ShieldCheck, Sparkles } from "lucide-react";
import { MockLabel } from "@/components/product/AppWindow";
import { LiveDot } from "@/components/ui/LiveDot";
import { ai } from "@/data/content";
import { cn } from "@/lib/utils";

const hypotheses = [
  {
    rank: "01",
    title: "Infection virale",
    level: "Probabilité élevée",
    strength: 3,
    why: "Fièvre rapportée, toux et fatigue récentes, sans signe de gravité noté.",
  },
  {
    rank: "02",
    title: "Pneumonie",
    level: "À vérifier",
    strength: 2,
    why: "À vérifier avec l'auscultation et, si besoin, une radiographie thoracique.",
  },
  {
    rank: "03",
    title: "Bronchite aiguë",
    level: "Probabilité plus faible",
    strength: 1,
    why: "Compatible avec une toux persistante sans fièvre élevée.",
  },
];

const checks = ["Température", "Auscultation", "Évolution des symptômes"];

function Strength({ value }: { value: number }) {
  return (
    <span className="flex gap-1" aria-hidden>
      {[1, 2, 3].map((n) => (
        <span key={n} className="h-1.5 w-6 overflow-hidden rounded-full bg-line">
          {n <= value && <span data-ai-bar className="block h-full w-full rounded-full bg-deep" />}
        </span>
      ))}
    </span>
  );
}

/** The ClickMed assistant, as it appears beside a consultation. */
export function AIAssistantUI() {
  return (
    <div data-ai-panel className="overflow-hidden rounded-panel border border-white/10 bg-white text-ink shadow-window">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
        <span className="flex size-8 items-center justify-center rounded-lg bg-lime text-ink">
          <Sparkles size={16} strokeWidth={2.25} />
        </span>
        <p className="label-caps text-deep">Assistant ClickMed</p>
        <span className="ml-auto grid text-[11px] font-semibold">
          <span data-ai-status="busy" className="invisible col-start-1 row-start-1 inline-flex items-center justify-end gap-2 text-ink-soft">
            <LiveDot /> Analyse du dossier…
          </span>
          <span data-ai-status="done" className="col-start-1 row-start-1 inline-flex items-center justify-end gap-2 text-deep">
            <span className="size-2 rounded-full bg-deep" /> 3 pistes proposées
          </span>
        </span>
      </div>

      <div className="flex flex-col gap-5 p-5 sm:p-6">
        {/* Hypotheses */}
        <div className="relative">
          <MockLabel className="mb-2.5">Hypothèses diagnostiques</MockLabel>
          <ol className="flex flex-col gap-2">
            {hypotheses.map((h) => (
              <li
                key={h.rank}
                data-ai-hypo
                className={cn(
                  "grid grid-cols-[auto_1fr] gap-x-3 rounded-xl border px-3.5 py-3",
                  h.rank === "01" ? "border-deep/25 bg-[color-mix(in_srgb,var(--clickmed-lime)_12%,white)]" : "border-line bg-white",
                )}
              >
                <span className="font-mono text-[13px] font-medium text-ink-soft">{h.rank}</span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <p className="text-[15px] font-semibold text-deep">{h.title}</p>
                    <span className="flex items-center gap-2 text-[11px] font-medium text-ink-soft">
                      {h.level}
                      <Strength value={h.strength} />
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-snug text-ink-soft">{h.why}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Processing overlay, shown while the assistant reads the record */}
          <div
            data-ai-processing
            aria-hidden
            className="invisible absolute inset-x-0 top-7 bottom-0 flex flex-col gap-2"
          >
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative flex-1 overflow-hidden rounded-xl bg-soft">
                <span className="absolute inset-0 animate-shimmer bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.9),transparent)]" />
              </div>
            ))}
          </div>
        </div>

        {/* What to check next */}
        <div data-ai-stage="checks" className="border-t border-line pt-4">
          <MockLabel className="mb-2.5">À vérifier</MockLabel>
          <ul className="flex flex-wrap gap-2">
            {checks.map((c) => (
              <li
                key={c}
                className="inline-flex items-center gap-2 rounded-full bg-soft px-3 py-1.5 text-[13px] font-medium text-ink"
              >
                <span className="size-1.5 rounded-full bg-logo" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Physician remains in charge */}
      <div className="flex items-center gap-2.5 border-t border-line bg-soft px-5 py-3 text-[11px] font-semibold text-deep">
        <ShieldCheck size={15} strokeWidth={2} className="shrink-0" />
        {ai.disclaimer}
      </div>
    </div>
  );
}
