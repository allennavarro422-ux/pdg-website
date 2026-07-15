/* Shared layout atoms for the PDG site: Band (full-width section with rhythm)
 * and SectionHead. */
import React from "react";
import { Eyebrow } from "@/components/ds";
import { GlassField } from "./GlassField.jsx";

export function Band({ children, bg = "var(--canvas)", line, py = 64, glass, glassBold = false, style, ...rest }) {
  return (
    <section
      data-line={line}
      className="pdg-band"
      style={{ position: "relative", overflow: glass ? "hidden" : undefined, background: bg, padding: `${py}px var(--content-gutter)`, ...style }}
      {...rest}
    >
      {glass ? <GlassField tone={glass} bold={glassBold} /> : null}
      <div style={{ position: "relative", maxWidth: "var(--content-max)", margin: "0 auto" }}>{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, eyebrowTone, title, sub, align = "left", maxTitle = 720 }) {
  return (
    <div style={{ textAlign: align, maxWidth: align === "center" ? 760 : "none", marginInline: align === "center" ? "auto" : 0 }}>
      {eyebrow ? (
        <div style={{ marginBottom: 18, display: "flex", justifyContent: align === "center" ? "center" : "flex-start" }}>
          <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2 style={{ margin: 0, maxWidth: maxTitle, fontFamily: "var(--font-sans)", fontSize: 40, fontWeight: 600, letterSpacing: "-1px", lineHeight: 1.08, color: "var(--charcoal)", textWrap: "balance" }}>
        {title}
      </h2>
      {sub ? (
        <p style={{ margin: "16px 0 0", maxWidth: 660, marginInline: align === "center" ? "auto" : 0, fontFamily: "var(--font-sans)", fontSize: 19, lineHeight: 1.55, color: "var(--muted)" }}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}
