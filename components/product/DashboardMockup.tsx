import { ArrowRight, Plus } from "lucide-react";
import { AppWindow, Avatar, MockCard, MockLabel } from "@/components/product/AppWindow";
import { StatusBadge } from "@/components/ui/Badge";
import { LiveDot } from "@/components/ui/LiveDot";
import { demo } from "@/data/content";
import type { AppointmentStatus } from "@/types";

/** The SHIFA home screen, as a doctor sees it at the start of the day. */
export function DashboardMockup() {
  const next = demo.agenda[1];

  return (
    <AppWindow active="dashboard" bodyClassName="p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4" data-dash-item>
        <div>
          <p className="font-mono text-[11px] text-ink-soft">{demo.date}</p>
          <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-deep sm:text-[28px]">
            Bonjour, {demo.doctor.firstName}{" "}
            <span className="inline-block origin-[70%_70%] animate-wave" aria-hidden>
              👋
            </span>
          </p>
        </div>
        <span className="group inline-flex h-9 items-center gap-2 rounded-btn bg-deep px-3.5 text-[13px] font-semibold text-white shadow-deep">
          <Plus
            size={16}
            strokeWidth={2.5}
            className="transition-transform duration-300 ease-out-soft group-hover:rotate-90"
          />
          Nouvelle consultation
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[1.25fr_1fr]">
        {/* Next patient */}
        <div data-dash-item className="relative overflow-hidden rounded-card bg-night p-5 text-white">
          <div className="flex items-center justify-between">
            <p className="label-caps text-white/60">Prochain patient</p>
            <span className="font-mono text-[13px] text-lime">{next.time}</span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <Avatar initials="ST" tone="lime" className="size-11 text-[13px]" />
            <div>
              <p className="text-[18px] font-semibold">{next.name}</p>
              <p className="text-[13px] text-white/60">34 ans · {next.reason}</p>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-warning-bg px-2.5 py-0.5 text-[11px] font-semibold text-warning-ink">
              ⚠ Allergie : Pénicilline
            </span>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-lime">
              Démarrer <ArrowRight size={14} strokeWidth={2.25} />
            </span>
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 -right-10 size-36 rotate-45 rounded-[28px] border border-white/8"
          />
        </div>

        {/* Waiting room */}
        <MockCard data-dash-item className="flex flex-col">
          <div className="flex items-center justify-between">
            <MockLabel>Salle d&apos;attente</MockLabel>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-deep">
              <LiveDot /> En direct
            </span>
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {[
              { initials: "ST", name: "Sarra Trabelsi", since: "arrivée 09:18" },
              { initials: "AM", name: "Ahmed Mansour", since: "arrivé 09:26" },
            ].map((p) => (
              <li key={p.name} className="flex items-center gap-3">
                <Avatar initials={p.initials} />
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold">{p.name}</p>
                  <p className="font-mono text-[11px] text-ink-soft">{p.since}</p>
                </div>
              </li>
            ))}
          </ul>
        </MockCard>
      </div>

      {/* Agenda */}
      <MockCard data-dash-item className="mt-4 hidden p-0 sm:block">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <MockLabel>Agenda du jour</MockLabel>
          <span className="font-mono text-[11px] text-ink-soft">4 rendez-vous</span>
        </div>
        <ul>
          {demo.agenda.map((a) => (
            <li
              key={a.time}
              className="flex items-center gap-4 border-b border-line px-4 py-2.5 last:border-b-0"
            >
              <span className="w-11 font-mono text-[13px] text-deep tabular">{a.time}</span>
              <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{a.name}</span>
              <span className="hidden truncate text-[13px] text-ink-soft lg:block lg:w-32">{a.reason}</span>
              <StatusBadge status={a.status as AppointmentStatus} />
            </li>
          ))}
        </ul>
      </MockCard>
    </AppWindow>
  );
}
