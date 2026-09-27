import { cn } from "@/lib/utils";
import type { Chapter as ChapterType } from "@/types";

/**
 * Chapter marker: the page follows a doctor's day, so every section is
 * anchored to a time of day.
 */
export function Chapter({
  chapter,
  tone = "light",
  className,
}: {
  chapter: ChapterType;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[13px] font-medium",
        tone === "light" ? "text-ink-soft" : "text-white/60",
        className,
      )}
    >
      <time
        className={cn(
          "rounded-full px-2.5 py-1 font-mono text-[12px] tabular",
          tone === "light" ? "bg-white text-deep ring-1 ring-line" : "bg-white/8 text-lime ring-1 ring-white/10",
        )}
      >
        {chapter.time}
      </time>
      <span>{chapter.label}</span>
    </p>
  );
}
