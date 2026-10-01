import { cn } from "@/lib/utils";

export function Kbd({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <kbd
      className={cn(
        "inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 font-mono text-[11px] font-medium",
        tone === "light"
          ? "border border-line bg-white text-ink shadow-[0_1px_0_var(--clickmed-border)]"
          : "border border-white/15 bg-white/10 text-white/90 shadow-[0_1px_0_rgba(255,255,255,0.08)]",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
