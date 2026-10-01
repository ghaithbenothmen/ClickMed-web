import { CalendarPlus, CornerDownLeft, Search, Stethoscope } from "lucide-react";
import { Avatar } from "@/components/product/AppWindow";
import { Kbd } from "@/components/ui/Kbd";

const patients = [
  { name: "Mohamed Ben Ali", meta: "12/03/1984", initials: "MB", match: false },
  { name: "Sarra Trabelsi", meta: "04/11/1991", initials: "ST", match: true },
  { name: "Ahmed Mansour", meta: "27/06/1958", initials: "AM", match: false },
];

const actions = [
  { label: "Nouvelle consultation", icon: Stethoscope },
  { label: "Nouveau rendez-vous", icon: CalendarPlus },
];

/** The in-app Ctrl + K palette, on the dark ClickMed surface. */
export function CommandPaletteMockup() {
  return (
    <div className="relative">
      <div className="mb-5 flex items-center justify-center gap-2" aria-hidden>
        <span data-key>
          <Kbd tone="dark" className="h-11 min-w-16 rounded-xl px-3 text-[15px]">
            Ctrl
          </Kbd>
        </span>
        <span className="font-mono text-white/40">+</span>
        <span data-key>
          <Kbd tone="dark" className="h-11 min-w-11 rounded-xl text-[15px]">
            K
          </Kbd>
        </span>
      </div>

      <div data-palette className="overflow-hidden rounded-panel border border-white/10 bg-panel shadow-window">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
          <Search size={16} strokeWidth={2} className="text-white/50" />
          <span className="text-[15px] text-white">
            <span data-typed data-text="Sa">
              Sa
            </span>
            <span className="ml-px inline-block h-4 w-px translate-y-0.5 animate-caret bg-lime" />
          </span>
          <span className="ml-auto text-[11px] text-white/40">Rechercher un patient…</span>
        </div>

        <div className="p-2">
          <p className="px-2.5 pt-1.5 pb-2 text-[11px] font-semibold text-white/40">Patients</p>
          <ul>
            {patients.map((p) => (
              <li
                key={p.name}
                data-result
                data-result-match={p.match ? "" : undefined}
                className={
                  "flex items-center gap-3 rounded-xl px-2.5 py-2 " +
                  (p.match ? "bg-lime/14 ring-1 ring-lime/40" : "opacity-30")
                }
              >
                <Avatar initials={p.initials} tone={p.match ? "lime" : "soft"} className="size-7 text-[10px]" />
                <span className="flex-1 text-[13px] font-medium text-white">{p.name}</span>
                <span className="font-mono text-[11px] text-white/45">{p.meta}</span>
                {p.match && <CornerDownLeft size={14} strokeWidth={2} className="text-lime" />}
              </li>
            ))}
          </ul>
          <p className="px-2.5 pt-3 pb-2 text-[11px] font-semibold text-white/40">Actions</p>
          <ul>
            {actions.map(({ label, icon: Icon }) => (
              <li key={label} data-result className="flex items-center gap-3 rounded-xl px-2.5 py-2 opacity-30">
                <span className="flex size-7 items-center justify-center rounded-lg bg-white/8 text-white/70">
                  <Icon size={14} strokeWidth={2} />
                </span>
                <span className="text-[13px] font-medium text-white">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
