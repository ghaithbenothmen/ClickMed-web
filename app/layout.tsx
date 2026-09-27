import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ContextCursor } from "@/components/animations/ContextCursor";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { site } from "@/data/content";
import "./globals.css";

// Self-hosted (from @fontsource) so builds never depend on reaching Google Fonts.
// Each weight is a real file: 700 is never synthesised.
const inter = localFont({
  src: [
    { path: "./fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/inter-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"],
});

const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  fallback: ["ui-monospace", "Consolas", "monospace"],
});

const title = `${site.name} — ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#F2F3F5",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint: hides hero elements only when motion is allowed,
 * so the GSAP intro can reveal them without a flash. A timer shows them anyway
 * if the app never hydrates.
 */
const motionScript = `(function(){try{var d=document.documentElement;if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion-ok');window.__shifaReveal=setTimeout(function(){d.classList.add('reveal-fallback')},4000)}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <a
          href="#contenu"
          className="sr-only fixed top-3 left-3 z-[200] rounded-btn bg-deep px-4 py-2.5 text-[15px] font-semibold text-white focus:not-sr-only"
        >
          Aller au contenu
        </a>
        <SmoothScroll />
        {children}
        <CommandPalette />
        <ContextCursor />
      </body>
    </html>
  );
}
