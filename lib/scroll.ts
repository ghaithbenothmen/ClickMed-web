import type Lenis from "lenis";
import { prefersReducedMotion } from "./utils";

/**
 * Single source of truth for programmatic scrolling. When Lenis is running
 * (motion allowed) it animates the scroll; otherwise native scrolling is used.
 */
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

const NAV_OFFSET = -64;

/** Fired after an in-page link changed the query string (e.g. ?sujet=partenaire#question). */
export const PARAMS_EVENT = "clickmed:params";

/**
 * In-page link with a query, like "?sujet=partenaire#question": update the URL
 * without reloading, tell listeners, then scroll to the hash.
 */
export function followQueryLink(href: string) {
  const url = new URL(href, window.location.href);
  history.replaceState(null, "", url.pathname + url.search + url.hash);
  window.dispatchEvent(new Event(PARAMS_EVENT));
  if (url.hash) scrollToHash(url.hash);
}

export function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  const target = id === "top" ? document.body : document.getElementById(id);
  if (!target) return;

  // Pinned sections are wrapped in a GSAP pin-spacer; aim at the spacer so
  // the jump lands at the start of the pinned scene.
  const parent = target.parentElement;
  const anchor = parent?.classList.contains("pin-spacer") ? parent : target;

  if (lenis) {
    lenis.scrollTo(id === "top" ? 0 : (anchor as HTMLElement), {
      offset: NAV_OFFSET,
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    const top = id === "top" ? 0 : anchor.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  // Move keyboard focus to the destination for screen reader and keyboard users.
  if (id !== "top") {
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
  const { pathname, search } = window.location;
  history.replaceState(null, "", id === "top" ? pathname + search : `${pathname}${search}#${id}`);
}
