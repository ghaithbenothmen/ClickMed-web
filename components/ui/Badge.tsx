import { cn } from "@/lib/utils";
import { statusLabels } from "@/data/content";
import type { AppointmentStatus } from "@/types";

type Tone = "neutral" | "success" | "warning" | "info" | "danger" | "lime" | "teal";

const tones: Record<Tone, string> = {
  neutral: "bg-soft text-ink-soft",
  success: "bg-[color-mix(in_srgb,var(--clickmed-success)_10%,white)] text-success",
  warning: "bg-warning-bg text-warning-ink",
  info: "bg-info-bg text-info-ink",
  danger: "bg-danger-bg text-danger",
  lime: "bg-lime text-ink",
  teal: "bg-deep text-white",
};

type BadgeProps = {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  dot?: boolean;
};

export function Badge({ tone = "neutral", className, children, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold leading-5 whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  );
}

const statusTone: Record<AppointmentStatus, Tone> = {
  confirme: "success",
  attente: "warning",
  termine: "info",
  annule: "danger",
};

export function StatusBadge({ status, className }: { status: AppointmentStatus; className?: string }) {
  return (
    <Badge tone={statusTone[status]} dot className={className}>
      {statusLabels[status]}
    </Badge>
  );
}
