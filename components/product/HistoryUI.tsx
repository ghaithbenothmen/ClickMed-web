import { ChevronRight, Eye, FileText, Stethoscope } from "lucide-react";
import { AppWindow, Avatar, MockLabel } from "@/components/product/AppWindow";

const latest = {
  date: "14/02/2026",
  ago: "il y a 7 mois",
  reason: "Angine",
  details: [
    { icon: Eye, label: "Observé", text: "Gorge érythémateuse, pas de fièvre." },
    { icon: Stethoscope, label: "Diagnostic", text: "Angine virale" },
    { icon: FileText, label: "Prescrit", text: "Paracétamol 1 g, 3 jours" },
  ],
};

const earlier = [
  { date: "03/10/2025", ago: "il y a 1 an", reason: "Bilan annuel" },
  { date: "22/05/2025", ago: "il y a 16 mois", reason: "Certificat de sport" },
];

/** Past consultations of one patient: the last one open, the others one click away. */
export function HistoryUI() {
  return (
    <AppWindow active="consultation" bodyClassName="p-4 sm:p-6">
      <div data-history-item className="mb-4 flex items-center gap-3">
        <Avatar initials="ST" tone="deep" className="size-9" />
        <div>
          <p className="text-[15px] font-semibold text-deep">Sarra Trabelsi</p>
          <p className="text-[13px] text-ink-soft">Historique des consultations</p>
        </div>
      </div>

      <ol className="relative flex flex-col gap-3 pl-6">
        <span aria-hidden data-history-line className="absolute top-3 bottom-3 left-[7px] w-px origin-top bg-deep/20" />

        {/* Most recent consultation, expanded */}
        <li data-history-item className="relative">
          <span className="absolute top-5 -left-6 size-[15px] rounded-full border-[3px] border-white bg-lime ring-1 ring-deep/20" />
          <div className="overflow-hidden rounded-card border border-deep/20 bg-white shadow-card">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-line px-4 py-3.5">
              <p className="text-[17px] font-semibold text-deep">{latest.reason}</p>
              <p className="font-mono text-[12px] text-ink-soft">
                {latest.date} <span className="text-ink-soft/70">· {latest.ago}</span>
              </p>
            </div>
            <dl className="grid gap-px bg-line sm:grid-cols-3">
              {latest.details.map(({ icon: Icon, label, text }) => (
                <div key={label} data-history-detail className="bg-white px-4 py-3.5">
                  <dt className="flex items-center gap-1.5">
                    <Icon size={13} strokeWidth={2.25} className="text-deep" />
                    <MockLabel>{label}</MockLabel>
                  </dt>
                  <dd className="mt-1.5 text-[15px] leading-snug text-ink">{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </li>

        {/* Earlier consultations, collapsed */}
        {earlier.map((c) => (
          <li key={c.date} data-history-item className="relative">
            <span className="absolute top-1/2 -left-6 size-[15px] -translate-y-1/2 rounded-full border-[3px] border-white bg-deep/30" />
            <div className="flex items-center gap-4 rounded-card border border-line bg-white px-4 py-3">
              <span className="font-mono text-[12px] text-ink-soft">{c.date}</span>
              <span className="flex-1 text-[15px] font-medium text-ink">{c.reason}</span>
              <span className="hidden text-[12px] text-ink-soft sm:inline">{c.ago}</span>
              <ChevronRight size={16} strokeWidth={2} className="text-ink-soft" />
            </div>
          </li>
        ))}
      </ol>
    </AppWindow>
  );
}
