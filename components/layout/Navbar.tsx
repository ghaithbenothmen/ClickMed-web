"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap, useGSAP } from "@/animations/gsap";
import { ClickMedLogo } from "@/components/brand/ClickMedLogo";
import { Button } from "@/components/ui/Button";
import { accessHref, navigation } from "@/data/navigation";
import { hero } from "@/data/content";
import { getLenis } from "@/lib/scroll";
import { cn, prefersReducedMotion } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [dark, setDark] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Compact style once the page has moved; dark style over dark sections.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const probe = 32;
      const overDark = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme='dark']")).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= probe && r.bottom >= probe;
      });
      setDark(overDark);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    const ids = navigation.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) setActive(id);
          else setActive((current) => (current === id ? null : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Mobile menu: lock scroll, close on Escape, animate the panel.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;
      if (prefersReducedMotion()) {
        gsap.set(panel, { autoAlpha: open ? 1 : 0 });
        return;
      }
      if (open) {
        gsap.set(panel, { autoAlpha: 1 });
        gsap.fromTo(
          panel,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "expo.out" },
        );
        gsap.fromTo(
          panel.querySelectorAll("[data-menu-item]"),
          { yPercent: 60, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out", stagger: 0.05, delay: 0.1 },
        );
      } else {
        gsap.to(panel, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.4,
          ease: "power3.in",
          onComplete: () => {
            gsap.set(panel, { autoAlpha: 0 });
          },
        });
      }
    },
    { dependencies: [open] },
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-[background-color,box-shadow,border-color,height] duration-300 ease-out-soft",
          "border-b",
          !scrolled || open
            ? "border-transparent bg-transparent"
            : dark
              ? "border-white/10 bg-night/80 backdrop-blur-md"
              : "border-line bg-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md",
        )}
      >
        <nav
          aria-label="Navigation principale"
          className={cn(
            "mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-[height] duration-300 ease-out-soft sm:px-8 lg:px-12",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <a href="#top" className="relative z-10 rounded-lg" aria-label="ClickMed, retour en haut de page">
            <ClickMedLogo height={scrolled ? 36 : 44} alt="" priority tone={dark && !open ? "light" : "dark"} />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative inline-flex h-10 items-center rounded-lg px-3.5 text-[15px] font-medium transition-colors duration-200",
                      dark
                        ? isActive
                          ? "text-white"
                          : "text-white/65 hover:text-white"
                        : isActive
                          ? "text-deep"
                          : "text-ink-soft hover:text-deep",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3.5 bottom-1.5 h-0.5 origin-left rounded-full bg-lime transition-transform duration-300 ease-out-soft",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex">
              <Button href={accessHref} variant={dark ? "lime" : "primary"} className="h-10 px-4 text-[14px]">
                Demander un accès
              </Button>
            </span>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className={cn(
                "relative z-10 inline-flex size-11 items-center justify-center rounded-btn border transition-colors md:hidden",
                dark && !open
                  ? "border-white/15 bg-white/5 text-white hover:border-lime"
                  : "border-line bg-white text-deep hover:border-deep",
              )}
            >
              {open ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </nav>
      </div>

      <div
        ref={panelRef}
        id="mobile-menu"
        className="invisible fixed inset-0 z-0 flex flex-col bg-page px-5 pt-28 pb-10 sm:px-8 md:hidden"
        aria-hidden={!open}
        inert={!open}
      >
        <ul className="flex flex-col">
          {navigation.map((item) => (
            <li key={item.href} className="overflow-hidden border-b border-line">
              <a
                data-menu-item
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-5 text-[32px] font-semibold tracking-[-0.02em] text-deep"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div data-menu-item className="mt-auto flex flex-col gap-3">
          <p className="text-[15px] text-ink-soft">{hero.aiNote}</p>
          <Button href={accessHref} size="lg" onClick={() => setOpen(false)}>
            {hero.primaryCta}
          </Button>
        </div>
      </div>
    </header>
  );
}
