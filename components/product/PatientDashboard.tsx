import { HeartPulse, Pill, TriangleAlert } from "lucide-react";
import { AppWindow, Avatar, MockLabel } from "@/components/product/AppWindow";

const blocks = [
  {
    label: "Antécédents",
    icon: HeartPulse,
    lines: ["Asthme dans l'enfance", "Aucune chirurgie"],
    tone: "default",
  },
  {
    label: "Allergies",
    icon: TriangleAlert,
    lines: ["Pénicilline"],
    tone: "warning",
  },
  {
    label: "Traitements en cours",
    icon: Pill,
    lines: ["Cétirizine 10 mg, si besoin"],
    tone: "default",
  },
] as const;

/** One patient record: identity and the three things a doctor checks first. */
export function PatientDashboard() {
  return (
    <AppWindow active="patients" bodyClassName="p-4 sm:p-6">
      <div className="overflow-hidden rounded-card border border-line bg-white shadow-card">
        {/* Identity */}
        <div data-profile-item className="flex items-center gap-4 border-b border-line p-5">
          <Avatar initials="ST" tone="deep" className="size-12 text-[15px]" />
          <div className="min-w-0">
            <p className="text-[22px] font-semibold tracking-[-0.02em] text-deep">Sarra Trabelsi</p>
            <p className="text-[15px] text-ink-soft">34 ans, née le 04/11/1991</p>
          </div>
        </div>

        {/* Essentials */}
        <div className="grid gap-3 p-5 sm:grid-cols-3">
          {blocks.map(({ label, icon: Icon, lines, tone }) => (
            <div
              key={label}
              data-profile-item
              className={
                tone === "warning"
                  ? "rounded-xl bg-warning-bg p-4 ring-1 ring-warning/30"
                  : "rounded-xl bg-soft p-4"
              }
            >
              <div className="flex items-center gap-2">
                <Icon
                  size={15}
                  strokeWidth={2.25}
                  className={tone === "warning" ? "text-warning-ink" : "text-deep"}
                />
                {tone === "warning" ? (
                  <p className="label-caps text-warning-ink">{label}</p>
                ) : (
                  <MockLabel>{label}</MockLabel>
                )}
              </div>
              <ul className="mt-3 space-y-1">
                {lines.map((line, i) => (
                  <li
                    key={line}
                    className={
                      tone === "warning"
                        ? "text-[15px] font-semibold text-warning-ink"
                        : i === 0
                          ? "text-[15px] font-medium text-ink"
                          : "text-[15px] text-ink-soft"
                    }
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
}
