import { cn } from "@/lib/utils";

/** SHIFA signature lime pulse for live or active elements. */
export function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex size-2", className)} aria-hidden>
      <span className="absolute inset-0 rounded-full bg-lime animate-live" />
      <span className="relative inline-flex size-2 rounded-full bg-lime" />
    </span>
  );
}
