"use client";
/* SiteChrome — the shared shell: sticky Header, the routed page, and the Footer,
 * plus two GSAP flourishes that live at the app level:
 *   1. a thin multi-accent scroll-progress bar tied to page scroll, and
 *   2. a quiet fade-and-rise page transition on every route change.
 * Navigation is provided by useNav(), which maps the original onNavigate(tab)
 * callback onto Next.js routes. */
import React, { useRef, useLayoutEffect, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
import { useNav } from "@/lib/nav";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export function SiteChrome({ children }) {
  const { go, goSection, tab } = useNav();
  const pathname = usePathname();
  const barRef = useRef(null);
  const mainRef = useRef(null);

  /* Scroll-progress bar — scrubbed against the whole document height. Rebuilt on
   * each route change so it tracks the new page's length. */
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || prefersReducedMotion()) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      scrub: 0.3,
      onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
    });
    ScrollTrigger.refresh();
    return () => st.kill();
  }, [pathname]);

  /* Page transition — a quiet cross-fade of the incoming route. Opacity only:
   * a transform here would shift child geometry and throw off the Reveal
   * ScrollTriggers' start calculations. */
  useLayoutEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    if (prefersReducedMotion()) { gsap.set(el, { opacity: 1 }); return; }
    const tween = gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power2.out" });
    // Recompute ScrollTrigger positions once the incoming page has settled
    // (fonts swapped in, images/iframes measured).
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 260);
    return () => { tween.kill(); window.clearTimeout(id); };
  }, [pathname]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--canvas)", display: "flex", flexDirection: "column" }}>
      <div ref={barRef} className="pdg-scrollprogress" aria-hidden="true" />
      <Header active={tab} onNavigate={go} onSection={goSection} />
      <main ref={mainRef} style={{ flex: 1 }}>{children}</main>
      <Footer onNavigate={go} onSection={goSection} />
    </div>
  );
}
