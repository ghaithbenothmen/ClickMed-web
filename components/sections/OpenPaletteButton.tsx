"use client";

import { Button } from "@/components/ui/Button";
import { Kbd } from "@/components/ui/Kbd";
import { OPEN_PALETTE_EVENT } from "@/components/layout/CommandPalette";

/** Opens the page's real command palette, the same way Ctrl + K does. */
export function OpenPaletteButton({ label }: { label: string }) {
  return (
    <Button
      variant="lime"
      size="lg"
      onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
      aria-keyshortcuts="Control+K"
    >
      {label}
      <span className="ml-1 flex gap-1" aria-hidden>
        <Kbd className="border-ink/15 bg-white/60">Ctrl</Kbd>
        <Kbd className="border-ink/15 bg-white/60">K</Kbd>
      </span>
    </Button>
  );
}
