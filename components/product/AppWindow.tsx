import {
  CalendarDays,
  FileText,
  LayoutDashboard,
  Search,
  Settings,
  Stethoscope,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { ClickMedMark } from "@/components/brand/ClickMedLogo";
import { demo } from "@/data/content";
import { cn } from "@/lib/utils";

export type AppSection = "dashboard" | "patients" | "agenda" | "consultation" | "ordonnances";

const nav: { id: AppSection; icon: LucideIcon; label: string }[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
  { id: "patients", icon: UsersRound, label: "Patients" },
  { id: "agenda", icon: CalendarDays, label: "Rendez-vous" },
  { id: "consultation", icon: Stethoscope, label: "Consultations" },
  { id: "ordonnances", icon: FileText, label: "Ordonnances" },
];

type AppWindowProps = {
  active?: AppSection;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  /** Hide the sidebar, e.g. for compact fragments or small screens. */
  sidebar?: boolean;
  toolbar?: boolean;
};

/**
 * The ClickMed application frame used by every mockup: a light chrome bar,
 * an icon sidebar and a content area on the soft background.
 */
export function AppWindow({
  active = "dashboard",
  children,
  className,
  bodyClassName,
  sidebar = true,
  toolbar = true,
}: AppWindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-panel border border-line bg-white text-ink shadow-window",
        className,
      )}
    >
      {toolbar && (
        <div className="flex h-10 items-center gap-3 border-b border-line bg-white px-4">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
          </div>
          <div className="mx-auto hidden h-6 w-[min(320px,50%)] items-center gap-2 rounded-md bg-soft px-2.5 text-[11px] text-ink-soft sm:flex">
            <Search size={12} strokeWidth={2} />
            <span>Rechercher</span>
            <span className="ml-auto font-mono text-[10px]">Ctrl K</span>
          </div>
          <div className="w-10 sm:hidden" />
        </div>
      )}
      <div className="flex">
        {sidebar && (
          <aside className="hidden w-16 shrink-0 flex-col items-center gap-1.5 border-r border-line bg-white py-4 md:flex">
            <ClickMedMark size={30} className="mb-3" />
            {nav.map(({ id, icon: Icon, label }) => (
              <span
                key={id}
                title={label}
                className={cn(
                  "relative flex size-10 items-center justify-center rounded-xl transition-colors",
                  id === active ? "bg-deep text-white" : "text-ink-soft",
                )}
              >
                {id === active && (
                  <span className="absolute -left-3 h-5 w-1 rounded-r-full bg-lime" aria-hidden />
                )}
                <Icon size={18} strokeWidth={1.75} />
              </span>
            ))}
            <span className="mt-auto flex size-10 items-center justify-center text-ink-soft">
              <Settings size={18} strokeWidth={1.75} />
            </span>
            <span className="flex size-9 items-center justify-center rounded-full bg-lime text-[11px] font-bold text-ink">
              {demo.doctor.initials}
            </span>
          </aside>
        )}
        <div className={cn("min-w-0 flex-1 bg-soft", bodyClassName)}>{children}</div>
      </div>
    </div>
  );
}

/** Small white card used inside mockups. */
export function MockCard({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-card border border-line bg-white p-4 shadow-card", className)} {...rest}>
      {children}
    </div>
  );
}

export function MockLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("label-caps text-ink-soft", className)}>{children}</p>;
}

export function Avatar({
  initials,
  tone = "soft",
  className,
}: {
  initials: string;
  tone?: "soft" | "deep" | "lime";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
        tone === "soft" && "bg-soft text-deep ring-1 ring-line",
        tone === "deep" && "bg-deep text-white",
        tone === "lime" && "bg-lime text-ink",
        className,
      )}
    >
      {initials}
    </span>
  );
}

/**
 * Text that a scene can "type". An invisible copy reserves the final size so
 * the surrounding layout never shifts while characters appear.
 */
export function TypedText({ text, name = "" }: { text: string; name?: string }) {
  return (
    <span className="grid">
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {text}
      </span>
      <span data-typed={name} data-text={text} className="col-start-1 row-start-1">
        {text}
      </span>
    </span>
  );
}
