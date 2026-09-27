import { ArrowUpDown, MousePointer2, Phone, Plus, Search, SlidersHorizontal } from "lucide-react";
import { AppWindow, Avatar, MockCard, MockLabel } from "@/components/product/AppWindow";
import { Badge } from "@/components/ui/Badge";
import { demo } from "@/data/content";
import { cn } from "@/lib/utils";

const query = "Sa";
const matches = (name: string) => name.toLowerCase().split(" ").some((part) => part.startsWith(query.toLowerCase()));

const history = [
  { date: "14/02/2026", reason: "Angine", doctor: "Dr Haddad" },
  { date: "03/10/2025", reason: "Bilan annuel", doctor: "Dr Haddad" },
  { date: "22/05/2025", reason: "Certificat de sport", doctor: "Dr Haddad" },
];

/** Patient list with instant search; the selected patient's record opens over it. */
export function PatientDashboard() {
  return (
    <AppWindow active="patients" bodyClassName="p-4 sm:p-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex h-10 min-w-0 flex-1 items-center gap-2.5 rounded-btn border border-deep/40 bg-white px-3 ring-4 ring-lime/25">
          <Search size={16} strokeWidth={2} className="shrink-0 text-ink-soft" />
          <span className="min-w-0 truncate text-[13px] text-ink">
            <span data-typed data-text={query}>
              {query}
            </span>
            <span className="ml-px inline-block h-4 w-px translate-y-0.5 animate-caret bg-deep" />
          </span>
          <span className="ml-auto hidden font-mono text-[11px] text-ink-soft sm:inline">2 résultats</span>
        </div>
        <span className="hidden h-10 items-center gap-1.5 rounded-btn border border-line bg-white px-3 text-[13px] font-medium text-ink-soft sm:inline-flex">
          <ArrowUpDown size={14} strokeWidth={2} /> Nom
        </span>
        <span className="hidden h-10 items-center gap-1.5 rounded-btn border border-line bg-white px-3 text-[13px] font-medium text-ink-soft sm:inline-flex">
          <SlidersHorizontal size={14} strokeWidth={2} /> Filtres
        </span>
        <span className="inline-flex h-10 items-center gap-1.5 rounded-btn bg-deep px-3 text-[13px] font-semibold text-white">
          <Plus size={15} strokeWidth={2.5} /> <span className="hidden sm:inline">Nouveau patient</span>
        </span>
      </div>

      <div className="relative mt-4 min-h-[720px] sm:min-h-[450px]">
        {/* Results list */}
        <MockCard className="p-0">
          <div className="grid grid-cols-[1.4fr_1fr] gap-3 border-b border-line px-4 py-2.5 sm:grid-cols-[1.4fr_1fr_1fr]">
            <MockLabel>Nom</MockLabel>
            <MockLabel>Date de naissance</MockLabel>
            <MockLabel className="hidden sm:block">Téléphone</MockLabel>
          </div>
          <ul>
            {demo.patients.map((p) => {
              const isMatch = matches(p.name);
              const isTarget = p.name === "Sarra Trabelsi";
              return (
                <li
                  key={p.name}
                  data-row
                  data-row-match={isMatch ? "" : undefined}
                  data-row-target={isTarget ? "" : undefined}
                  className={cn(
                    "relative grid grid-cols-[1.4fr_1fr] items-center gap-3 border-b border-line px-4 py-3 last:border-b-0 sm:grid-cols-[1.4fr_1fr_1fr]",
                    !isMatch && "opacity-30",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Avatar initials={p.initials} className="size-7 text-[10px]" />
                    <span className="truncate text-[13px] font-semibold">{p.name}</span>
                  </span>
                  <span className="font-mono text-[13px] text-ink-soft tabular">{p.birth}</span>
                  <span className="hidden font-mono text-[13px] text-ink-soft tabular sm:block">{p.phone}</span>
                  {isTarget && (
                    <span
                      data-pointer
                      className="pointer-events-none absolute top-1/2 left-[42%] z-10 text-deep opacity-0"
                    >
                      <MousePointer2 size={20} strokeWidth={1.75} className="fill-white drop-shadow" />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </MockCard>

        {/* Patient record */}
        <div data-profile className="absolute inset-0 z-20 overflow-hidden rounded-card border border-line bg-white shadow-card-hover">
          <div data-profile-item className="flex flex-wrap items-center gap-3 border-b border-line p-4">
            <Avatar initials="ST" tone="deep" className="size-11 text-[13px]" />
            <div className="min-w-0 flex-1">
              <p className="text-[18px] font-semibold tracking-[-0.02em] text-deep">Sarra Trabelsi</p>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-ink-soft">
                <span>34 ans, née le 04/11/1991</span>
                <span className="inline-flex items-center gap-1 font-mono text-[12px]">
                  <Phone size={12} strokeWidth={2} /> +216 20 000 102
                </span>
              </p>
            </div>
            <Badge tone="warning">⚠ Allergie : Pénicilline</Badge>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2">
            <div data-profile-item className="rounded-xl bg-soft p-3">
              <MockLabel>Antécédents</MockLabel>
              <ul className="mt-2 space-y-1 text-[13px]">
                <li>Asthme dans l&apos;enfance</li>
                <li className="text-ink-soft">Aucune chirurgie</li>
              </ul>
            </div>
            <div data-profile-item className="rounded-xl bg-soft p-3">
              <MockLabel>Traitements en cours</MockLabel>
              <ul className="mt-2 space-y-1 text-[13px]">
                <li>Cétirizine 10 mg, si besoin</li>
              </ul>
            </div>
            <div data-profile-item className="rounded-xl bg-soft p-3 sm:col-span-2">
              <MockLabel>Dernières constantes</MockLabel>
              <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {demo.vitals.map((v) => (
                  <div key={v.label}>
                    <p className="text-[11px] text-ink-soft">{v.label}</p>
                    <p className="font-mono text-[12px] font-medium whitespace-nowrap tabular sm:text-[13px]">
                      {v.value}
                      <span className="text-[10px] text-ink-soft"> {v.unit}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div data-profile-item className="sm:col-span-2">
              <MockLabel className="mb-2">Historique des consultations</MockLabel>
              <ul className="divide-y divide-line rounded-xl border border-line">
                {history.map((h) => (
                  <li key={h.date} className="flex items-center gap-4 px-3 py-2 text-[13px]">
                    <span className="font-mono text-ink-soft tabular">{h.date}</span>
                    <span className="flex-1 font-medium">{h.reason}</span>
                    <span className="hidden text-ink-soft sm:inline">{h.doctor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}
