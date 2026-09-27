import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";
import { Chapter } from "@/components/ui/Chapter";
import { cn } from "@/lib/utils";
import type { Chapter as ChapterType } from "@/types";

type SectionHeadingProps = {
  chapter?: ChapterType;
  title: string | readonly string[];
  body?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  size?: "title" | "display";
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

export function SectionHeading({
  chapter,
  title,
  body,
  tone = "light",
  align = "left",
  size = "title",
  id,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {chapter && (
        <Reveal y={12}>
          <Chapter chapter={chapter} tone={tone} />
        </Reveal>
      )}
      <TextReveal
        as="h2"
        id={id}
        text={title}
        className={cn(
          "font-semibold",
          size === "title" ? "text-title" : "text-display",
          tone === "light" ? "text-deep" : "text-white",
        )}
      />
      {body && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "max-w-[36rem] text-[18px] leading-[1.55]",
              align === "center" && "mx-auto",
              tone === "light" ? "text-ink-soft" : "text-white/70",
            )}
          >
            {body}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
