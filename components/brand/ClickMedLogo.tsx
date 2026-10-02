import Image from "next/image";
import { brand } from "@/data/media";
import { cn } from "@/lib/utils";

type Tone = "dark" | "light";

type ClickMedLogoProps = {
  /** Rendered height in px; width follows the artwork's ratio. */
  height?: number;
  /** "dark" artwork for light backgrounds, "light" artwork for dark backgrounds. */
  tone?: Tone;
  className?: string;
  priority?: boolean;
  /** Leave empty when a parent link already names the logo. */
  alt?: string;
};

/** Horizontal ClickMed lockup: symbol + wordmark. */
export function ClickMedLogo({ height = 34, tone = "dark", className, priority, alt = "ClickMed" }: ClickMedLogoProps) {
  const asset = tone === "dark" ? brand.logo : brand.logoLight;
  // Both dimensions are set explicitly (rounded) so the rendered size matches the attributes.
  const width = Math.round((asset.width / asset.height) * height);
  return (
    <Image
      src={asset.src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn("select-none", className)}
      style={{ width, height }}
    />
  );
}

type ClickMedMarkProps = {
  size?: number;
  tone?: Tone;
  className?: string;
  alt?: string;
};

/** The ClickMed symbol alone (C, cursor and stethoscope). */
export function ClickMedMark({ size = 32, tone = "dark", className, alt = "" }: ClickMedMarkProps) {
  const asset = tone === "dark" ? brand.mark : brand.markLight;
  return (
    <Image
      src={asset.src}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      width={Math.round((asset.width / asset.height) * size)}
      height={size}
      className={cn("select-none", className)}
    />
  );
}

/**
 * Brand motif drawn from the symbol: the open "C" arc, the lime crescent and
 * the stethoscope ring, as thin outlines at architectural scale.
 */
export function BrandMotif({ className, tone = "dark" }: { className?: string; tone?: Tone }) {
  const arc = tone === "dark" ? "rgba(26,71,71,0.10)" : "rgba(255,255,255,0.10)";
  return (
    <svg viewBox="0 0 400 400" fill="none" className={className} aria-hidden>
      {/* Open C, opening on the right */}
      <path d="M306 94 A150 150 0 1 0 296 315" stroke={arc} strokeWidth="1.5" strokeLinecap="round" />
      {/* Lime crescent, inside the lower-left of the C */}
      <path d="M96 236 A112 112 0 0 0 214 311" stroke="var(--clickmed-lime)" strokeOpacity="0.45" strokeWidth="1.5" strokeLinecap="round" />
      {/* Stethoscope ring at the tail */}
      <circle cx="322" cy="300" r="20" stroke={arc} strokeWidth="1.5" />
      <circle cx="322" cy="300" r="9" stroke="var(--clickmed-lime)" strokeOpacity="0.45" strokeWidth="1.5" />
    </svg>
  );
}
