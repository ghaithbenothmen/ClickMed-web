"use client";

import { useId, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { AppWindow, MockLabel } from "@/components/product/AppWindow";
import { StatusBadge } from "@/components/ui/Badge";
import { statusLabels } from "@/data/content";
import { cn } from "@/lib/utils";
import type { AppointmentStatus } from "@/types";

type View = "jour" | "semaine" | "mois";

type Appt = {
  day: number; // 0 = lundi
  start: number; // hours, e.g. 9.5 = 09:30
  length: number; // hours
  name: string;
  reason: string;
  status: AppointmentStatus;
};

const START = 8;
const END = 15;
const HOURS = END - START;
const ROW = 60; // px per hour

const days = [
  { short: "Lun", date: 28 },
  { short: "Mar", date: 29 },
  { short: "Mer", date: 30 },
  { short: "Jeu", date: 1 },
  { short: "Ven", date: 2 },
];

// Planning seen at 12:30 on Monday: the morning is done, the afternoon is ahead.
const appointments: Appt[] = [
  { day: 0, start: 9, length: 0.5, name: "Mohamed Ben Ali", reason: "Suivi tension", status: "termine" },
  { day: 0, start: 9.5, length: 0.5, name: "Sarra Trabelsi", reason: "Toux fébrile", status: "termine" },
  { day: 0, start: 10.25, length: 0.5, name: "Ahmed Mansour", reason: "Renouvellement", status: "termine" },
  { day: 0, start: 11, length: 0.5, name: "Mariem Ben Salah", reason: "Certificat", status: "annule" },
  { day: 0, start: 14, length: 0.75, name: "Youssef Gharbi", reason: "Suivi diabète", status: "confirme" },
  { day: 1, start: 8.5, length: 0.75, name: "Leila Chaabane", reason: "Première visite", status: "confirme" },
  { day: 1, start: 10, length: 0.5, name: "Nour Jaziri", reason: "Vaccination", status: "confirme" },
  { day: 1, start: 11.5, length: 0.5, name: "Hichem Ayari", reason: "Lombalgie", status: "attente" },
  { day: 2, start: 9, length: 1, name: "Amel Bouzid", reason: "Bilan annuel", status: "confirme" },
  { day: 2, start: 11, length: 0.5, name: "Sami Ferchichi", reason: "Résultats", status: "attente" },
  { day: 3, start: 8.5, length: 0.5, name: "Rania Mejri", reason: "Suivi grossesse", status: "confirme" },
  { day: 3, start: 10.5, length: 0.75, name: "Walid Hamdi", reason: "Douleur thoracique", status: "confirme" },
  { day: 3, start: 13, length: 0.5, name: "Ines Kefi", reason: "Certificat", status: "attente" },
  { day: 4, start: 9.25, length: 0.5, name: "Omar Sassi", reason: "Renouvellement", status: "confirme" },
  { day: 4, start: 11, length: 0.5, name: "Salma Riahi", reason: "Suivi", status: "annule" },
];

const statusStyle: Record<AppointmentStatus, string> = {
  confirme: "border-l-success bg-[color-mix(in_srgb,var(--clickmed-success)_8%,white)]",
  attente: "border-l-warning bg-warning-bg/70",
  termine: "border-l-info bg-info-bg/50 text-ink-soft",
  annule: "border-l-danger bg-danger-bg text-ink-soft line-through decoration-danger/40",
};

const fmt = (h: number) => {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
};

function WeekView() {
  const next = appointments.find((a) => a.name === "Youssef Gharbi")!;
  return (
    <div>
      <div className="grid grid-cols-[34px_repeat(5,1fr)] sm:grid-cols-[48px_repeat(5,1fr)]">
        <div />
        {days.map((d, i) => (
          <div key={d.date} className="border-b border-line px-2 pb-2 text-center">
            <span className="text-[11px] text-ink-soft">{d.short}</span>
            <span
              className={cn(
                "mx-auto mt-0.5 flex size-7 items-center justify-center rounded-full font-mono text-[13px] font-medium",
                i === 0 ? "bg-deep text-white" : "text-ink",
              )}
            >
              {d.date}
            </span>
          </div>
        ))}

        {/* Hours column */}
        <div className="relative" style={{ height: HOURS * ROW }}>
          {Array.from({ length: HOURS }, (_, h) => (
            <span
              key={h}
              className="absolute right-1.5 -translate-y-1/2 font-mono text-[9px] text-ink-soft sm:right-2 sm:text-[10px]"
              style={{ top: h * ROW }}
            >
              {fmt(START + h)}
            </span>
          ))}
        </div>

        {days.map((d, di) => (
          <div
            key={d.date}
            className="relative border-l border-line"
            style={{
              height: HOURS * ROW,
              backgroundImage: "linear-gradient(to bottom, var(--clickmed-border) 1px, transparent 1px)",
              backgroundSize: `100% ${ROW}px`,
            }}
          >
            {di === 0 && (
              <>
                <span data-cal-today className="absolute inset-0 bg-lime/10 ring-1 ring-lime ring-inset" aria-hidden />
                {/* "Now" line at 12:30 */}
                <span
                  className="absolute inset-x-0 z-10 flex items-center"
                  style={{ top: (12.5 - START) * ROW }}
                  aria-hidden
                >
                  <span className="-ml-1 size-2 rounded-full bg-deep" />
                  <span className="h-px flex-1 bg-deep" />
                </span>
              </>
            )}
            {appointments
              .filter((a) => a.day === di)
              .map((a) => (
                <div
                  key={a.name}
                  data-cal-block
                  className={cn(
                    "absolute inset-x-1 overflow-hidden rounded-md border-l-[3px] px-1.5 py-1 text-[10px] leading-tight",
                    statusStyle[a.status],
                  )}
                  style={{ top: (a.start - START) * ROW + 2, height: a.length * ROW - 4 }}
                >
                  <p className="truncate font-mono sm:hidden">{fmt(a.start)}</p>
                  {a.length <= 0.5 ? (
                    <p className="hidden items-baseline gap-1.5 truncate sm:flex">
                      <span className="font-mono opacity-70">{fmt(a.start)}</span>
                      <span className="truncate font-semibold">{a.name}</span>
                    </p>
                  ) : (
                    <div className="hidden sm:block">
                      <p className="truncate font-semibold">{a.name}</p>
                      <p className="truncate font-mono opacity-70">{fmt(a.start)}</p>
                    </div>
                  )}
                </div>
              ))}
            {di === 0 && (
              <div
                data-cal-popover
                className="absolute left-[92%] z-20 hidden w-[230px] rounded-card border border-line bg-white p-3.5 shadow-window sm:block"
                style={{ top: (next.start - START) * ROW - 70 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-ink-soft">
                    {fmt(next.start)} – {fmt(next.start + next.length)}
                  </span>
                  <StatusBadge status={next.status} />
                </div>
                <p className="mt-2 text-[15px] font-semibold text-deep">{next.name}</p>
                <p className="text-[11px] text-ink-soft">{next.reason}</p>
                <span className="mt-3 flex h-8 items-center justify-center gap-1.5 rounded-lg bg-deep text-[11px] font-semibold text-white">
                  Démarrer la consultation <ArrowRight size={12} strokeWidth={2.5} />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-card border border-line bg-white p-3.5 sm:hidden">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] text-ink-soft">
            Prochain : {fmt(next.start)} – {fmt(next.start + next.length)}
          </p>
          <p className="truncate text-[15px] font-semibold text-deep">{next.name}</p>
        </div>
        <StatusBadge status={next.status} />
      </div>
    </div>
  );
}

function DayView() {
  const today = appointments.filter((a) => a.day === 0);
  return (
    <ul className="flex flex-col gap-2">
      {today.map((a) => (
        <li
          key={a.name}
          className={cn(
            "flex items-center gap-4 rounded-xl border border-line border-l-[3px] bg-white px-3.5 py-3",
            statusStyle[a.status].split(" ")[0],
          )}
        >
          <span className="w-12 font-mono text-[13px] text-deep">{fmt(a.start)}</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-semibold">{a.name}</span>
            <span className="block truncate text-[11px] text-ink-soft">{a.reason}</span>
          </span>
          <StatusBadge status={a.status} />
        </li>
      ))}
    </ul>
  );
}

function MonthView() {
  // Index 0 is Monday 31 August: September 2026 starts on a Tuesday, so index = date.
  const cells = Array.from({ length: 35 }, (_, i) => i);
  const busy = (d: number) => (d % 7 === 5 || d % 7 === 6 ? 0 : ((d * 7) % 5) + 1);
  return (
    <div>
      <div className="grid grid-cols-7 gap-1 pb-2 text-center text-[11px] text-ink-soft">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((i) => {
          const date = i;
          const inMonth = date >= 1 && date <= 30;
          const count = inMonth ? busy(date) : 0;
          return (
            <div
              key={i}
              className={cn(
                "flex aspect-[1.3] flex-col justify-between rounded-lg p-1.5",
                inMonth ? "bg-white ring-1 ring-line" : "bg-transparent",
                date === 28 && "ring-2 ring-deep",
              )}
            >
              {inMonth && (
                <>
                  <span className={cn("font-mono text-[11px]", date === 28 ? "font-medium text-deep" : "text-ink-soft")}>
                    {date}
                  </span>
                  <span className="flex gap-0.5">
                    {Array.from({ length: Math.min(count, 4) }, (_, k) => (
                      <span key={k} className="h-1 flex-1 rounded-full bg-logo/70" />
                    ))}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const views: { id: View; label: string }[] = [
  { id: "jour", label: "Jour" },
  { id: "semaine", label: "Semaine" },
  { id: "mois", label: "Mois" },
];

/** Interactive agenda: the view switcher works, the content is demo data. */
export function CalendarUI() {
  const [view, setView] = useState<View>("semaine");
  const id = useId();

  return (
    <AppWindow active="agenda" bodyClassName="p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div>
          <MockLabel>Rendez-vous</MockLabel>
          <p className="mt-0.5 text-[18px] font-semibold tracking-[-0.02em] text-deep">
            {view === "mois" ? "Septembre 2026" : view === "jour" ? "Lundi 28 septembre" : "28 sept. – 2 oct."}
          </p>
        </div>

        <div role="tablist" aria-label="Affichage de l'agenda" className="ml-auto flex rounded-btn bg-white p-1 ring-1 ring-line">
          {views.map((v) => (
            <button
              key={v.id}
              role="tab"
              type="button"
              id={`${id}-tab-${v.id}`}
              aria-selected={view === v.id}
              aria-controls={`${id}-panel`}
              onClick={() => setView(v.id)}
              className={cn(
                "h-8 rounded-lg px-3 text-[13px] font-semibold transition-colors duration-200",
                view === v.id ? "bg-deep text-white" : "text-ink-soft hover:text-deep",
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
        <span className="group hidden h-10 items-center gap-1.5 rounded-btn bg-deep px-3 text-[13px] font-semibold text-white sm:inline-flex">
          <Plus size={15} strokeWidth={2.5} className="transition-transform duration-300 group-hover:rotate-90" />
          Nouveau
        </span>
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${view}`}>
        {view === "semaine" && <WeekView />}
        {view === "jour" && <DayView />}
        {view === "mois" && <MonthView />}
      </div>

      <ul className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4" aria-label="Statuts">
        {(Object.keys(statusLabels) as AppointmentStatus[]).map((s) => (
          <li key={s}>
            <StatusBadge status={s} />
          </li>
        ))}
      </ul>
    </AppWindow>
  );
}
