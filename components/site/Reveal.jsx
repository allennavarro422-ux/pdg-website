"use client";
/* PDG Reveal — scroll-in wrapper. An IntersectionObserver decides when the
 * element is in view (reliable, and it fires immediately for content already
 * visible on load); GSAP drives the actual fade-and-rise so the easing matches
 * the rest of the site's motion. The reveal re-fires whether you scroll down OR
 * back up. Reduced motion shows content immediately.
 *
 * Usage: <Reveal delay={80}><h2>…</h2></Reveal>
 * Stagger a group: <Reveal delay={i * 80}>…</Reveal>
 */
import React, { useRef, useLayoutEffect } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export function Reveal({ children, delay = 0, y = 22, as = "div", style, className, ...rest }) {
  const ref = useRef(null);
  const Tag = as;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Once JS owns the element, drop the CSS pre-hide so GSAP controls opacity.
    el.classList.add("is-revealed");

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(el, { opacity: 0, y, willChange: "opacity, transform" });
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.72,
      delay: delay / 1000,
      ease: "power3.out",
      paused: true,
    });

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) tween.play();
          else tween.reverse();
        }),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);

    return () => { io.disconnect(); tween.kill(); };
  }, [delay, y]);

  return (
    <Tag ref={ref} className={["gsap-reveal", className].filter(Boolean).join(" ")} style={style} {...rest}>
      {children}
    </Tag>
  );
}
