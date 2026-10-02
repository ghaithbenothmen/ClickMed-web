"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { CornerDownLeft, Search } from "lucide-react";
import { gsap } from "@/animations/gsap";
import { Kbd } from "@/components/ui/Kbd";
import { getLenis, scrollToHash } from "@/lib/scroll";
import { cn, prefersReducedMotion } from "@/lib/utils";

export const OPEN_PALETTE_EVENT = "clickmed:open-palette";

const destinations = [
  { label: "Accueil", hint: "Le cabinet médical, simplifié.", href: "#top" },
  { label: "Dossier patient", hint: "Recherche, antécédents, allergies", href: "#produit" },
  { label: "Historique des consultations", hint: "Ce qui a été fait, prescrit et observé", href: "#historique" },
  { label: "Consultation", hint: "Motif, examen, constantes, autosave", href: "#consultation" },
  { label: "Assistant IA", hint: "Hypothèses et points à vérifier", href: "#ia" },
  { label: "Ordonnance", hint: "Modèles, alerte allergies, PDF", href: "#ordonnance" },
  { label: "Fonctionnalités", hint: "Toute la journée en un outil", href: "#fonctionnalites" },
  { label: "Sécurité", hint: "Comptes validés, session protégée", href: "#securite" },
  { label: "Tutoriels", hint: "L'essentiel en quelques minutes", href: "#tutoriels" },
  { label: "Comment ça fonctionne", hint: "Tester ClickMed gratuitement", href: "#comment-ca-fonctionne" },
  { label: "Offre médecin fondateur", hint: "15 places disponibles", href: "#offre-fondateur" },
  { label: "Demander un accès médecin", hint: "Rejoindre ClickMed", href: "#contact" },
  { label: "Poser une question", hint: "L'équipe ClickMed vous répond", href: "#question" },
] as const;

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/**
 * A working Ctrl + K palette for navigating this page. It mirrors the one in
 * the ClickMed app.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const listId = useId();

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return destinations;
    return destinations.filter((d) => normalize(`${d.label} ${d.hint}`).includes(q));
  }, [query]);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setIndex(0);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus?.();
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      // Let the dialog close and scrolling resume before moving.
      requestAnimationFrame(() => scrollToHash(href));
    },
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) hide();
        else show();
      }
    };
    const onOpen = () => show();
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, [open, show, hide]);

  useEffect(() => {
    const lenis = getLenis();
    const dialog = dialogRef.current;
    if (open) {
      lenis?.stop();
      inputRef.current?.focus();
      if (dialog && !prefersReducedMotion()) {
        gsap.fromTo(
          dialog,
          { autoAlpha: 0, y: -12, scale: 0.98 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "expo.out" },
        );
      }
    } else {
      lenis?.start();
    }
  }, [open]);

  if (!open) return null;

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = results[index];
      if (hit) go(hit.href);
    } else if (e.key === "Escape") {
      e.preventDefault();
      hide();
    } else if (e.key === "Tab") {
      // Keep focus inside the dialog: the input is its only focus stop.
      e.preventDefault();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[14vh]">
      <button
        type="button"
        aria-label="Fermer la recherche"
        tabIndex={-1}
        onClick={hide}
        className="absolute inset-0 cursor-default bg-night/40 backdrop-blur-[2px]"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Recherche rapide"
        className="relative w-full max-w-[560px] overflow-hidden rounded-panel border border-line bg-white shadow-window"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={18} strokeWidth={2} className="text-ink-soft" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Aller à une section…"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[index] ? `${listId}-${index}` : undefined}
            aria-autocomplete="list"
            className="h-14 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-soft"
          />
          <Kbd>Échap</Kbd>
        </div>

        <ul id={listId} role="listbox" aria-label="Sections" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-[13px] text-ink-soft">
              Aucune section ne correspond à « {query} ».
            </li>
          )}
          {results.map((item, i) => (
            <li
              key={item.href}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === index}
              onMouseMove={() => setIndex(i)}
              onClick={() => go(item.href)}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-4 rounded-xl px-3 py-2.5 transition-colors",
                i === index ? "bg-soft" : "bg-transparent",
              )}
            >
              <span className="flex min-w-0 flex-col">
                <span className="text-[15px] font-medium text-ink">{item.label}</span>
                <span className="truncate text-[13px] text-ink-soft">{item.hint}</span>
              </span>
              {i === index && <CornerDownLeft size={16} strokeWidth={2} className="shrink-0 text-deep" aria-hidden />}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-line bg-soft px-4 py-2.5 font-mono text-[11px] text-ink-soft">
          <span>↑ ↓ pour naviguer</span>
          <span>Entrée pour ouvrir</span>
        </div>
      </div>
    </div>
  );
}
