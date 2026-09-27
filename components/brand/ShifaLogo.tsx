import { cn } from "@/lib/utils";

type ShifaMarkProps = {
  size?: number;
  className?: string;
  title?: string;
};

/** The SHIFA mark: a teal square at 45° and a lime square at -12°, overlapping. */
export function ShifaMark({ size = 44, className, title }: ShifaMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect
        x="7"
        y="10"
        width="24"
        height="24"
        rx="6.5"
        fill="var(--shifa-logo-teal)"
        opacity="0.8"
        transform="rotate(45 19 22)"
      />
      <rect
        x="15"
        y="10"
        width="24"
        height="24"
        rx="6.5"
        fill="var(--shifa-lime)"
        opacity="0.8"
        transform="rotate(-12 27 22)"
      />
    </svg>
  );
}

type ShifaLogoProps = {
  className?: string;
  markSize?: number;
  tone?: "dark" | "light";
};

export function ShifaLogo({ className, markSize = 36, tone = "dark" }: ShifaLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <ShifaMark size={markSize} />
      <span
        className={cn(
          "text-[19px] font-bold tracking-[-0.02em]",
          tone === "dark" ? "text-deep" : "text-white",
        )}
      >
        SHIFA
      </span>
    </span>
  );
}
