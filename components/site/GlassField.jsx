"use client";
/* PDG GlassField — floating 3D liquid-glass shapes as a reusable hero backdrop.
 * Drops into any hero (absolute, inset 0) behind the content. Autonomous,
 * continuous motion; frosted glass with morphing blobs, tinted to the section's
 * line. Reduced-motion safe. */
import React, { useEffect, useState } from "react";

export function GlassField({ tone = "violet", bold = false }) {
  const TONES = {
    coral: { color: "var(--coral)", soft: "var(--coral-tint)" },
    violet: { color: "var(--violet)", soft: "var(--violet-50)" },
    teal: { color: "var(--teal)", soft: "var(--teal-tint)" },
  };
  const t = TONES[tone] || TONES.violet;
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const SHAPES = [
    { css: { top: "14%", right: "11%", width: "18vw", height: "18vw", maxWidth: 232, maxHeight: 232 }, anim: "pdgHFloatA", dur: 15000, delay: 0, morph: true },
    { css: { top: "20%", left: "9%", width: "11vw", height: "11vw", maxWidth: 150, maxHeight: 150 }, anim: "pdgHFloatB", dur: 12500, delay: 600, morph: true },
    { css: { bottom: "16%", left: "36%", width: "12vw", height: "12vw", maxWidth: 160, maxHeight: 160, borderRadius: "50%" }, anim: "pdgHFloatC", dur: 17000, delay: 300 },
    { css: { bottom: "24%", right: "24%", width: "6vw", height: "6vw", maxWidth: 82, maxHeight: 82, borderRadius: "42%" }, anim: "pdgHFloatB", dur: 11000, delay: 1200 },
  ];

  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", perspective: "1200px", pointerEvents: "none", transformStyle: "preserve-3d" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pdgHFloatA { 0%{transform:translate3d(0,0,0) rotate(0deg)} 33%{transform:translate3d(36px,-22px,44px) rotate(-8deg)} 66%{transform:translate3d(-24px,20px,22px) rotate(6deg)} 100%{transform:translate3d(0,0,0) rotate(0deg)} }
        @keyframes pdgHFloatB { 0%{transform:translate3d(0,0,0) rotate(0deg)} 50%{transform:translate3d(-34px,28px,40px) rotate(16deg)} 100%{transform:translate3d(0,0,0) rotate(0deg)} }
        @keyframes pdgHFloatC { 0%{transform:translate3d(0,0,0) rotateZ(0deg)} 33%{transform:translate3d(32px,-22px,28px) rotateZ(8deg)} 66%{transform:translate3d(-22px,-14px,16px) rotateZ(-6deg)} 100%{transform:translate3d(0,0,0) rotateZ(0deg)} }
        @keyframes pdgHMorph { 0%{border-radius:42% 58% 55% 45% / 48% 44% 56% 52%} 25%{border-radius:58% 42% 40% 60% / 55% 60% 40% 45%} 50%{border-radius:45% 55% 62% 38% / 40% 52% 48% 60%} 75%{border-radius:52% 48% 45% 55% / 58% 42% 56% 44%} 100%{border-radius:42% 58% 55% 45% / 48% 44% 56% 52%} }
      ` }} />
      {SHAPES.map((s, i) => {
        const floatAnim = reduce
          ? "none"
          : `${s.anim} ${s.dur}ms ease-in-out ${s.delay}ms infinite` + (s.morph ? `, pdgHMorph ${Math.round(s.dur * 0.5)}ms ease-in-out ${s.delay}ms infinite` : "");
        return (
          <div key={i} style={{ position: "absolute", ...s.css, willChange: "transform" }}>
            <div
              style={{
                width: "100%", height: "100%",
                borderRadius: s.morph ? "46% 54% 52% 48% / 50% 46% 54% 50%" : s.css.borderRadius,
                background: bold
                  ? `color-mix(in srgb, ${t.color} 42%, transparent)`
                  : `color-mix(in srgb, ${t.soft} 74%, transparent)`,
                opacity: bold ? 0.8 : 0.66,
                backdropFilter: "blur(16px) saturate(1.3)",
                WebkitBackdropFilter: "blur(16px) saturate(1.3)",
                border: bold ? `1px solid color-mix(in srgb, ${t.color} 30%, rgba(255,255,255,0.4))` : "1px solid rgba(255,255,255,0.35)",
                boxShadow: bold
                  ? `0 40px 90px -30px ${t.color}, inset 0 1px 1px rgba(255,255,255,0.55), inset 0 -18px 44px -26px ${t.color}`
                  : "inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -14px 34px -26px rgba(44,44,42,0.15)",
                animation: floatAnim,
                willChange: "transform, border-radius",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
