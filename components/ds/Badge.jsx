import React from "react";

/**
 * PDG Badge — a small pill that flags a standout offer (Flagship, Most popular)
 * or labels a status. Solid in an accent, or soft tint + accent text.
 */
export function Badge({ children, tone = "coral", soft = false, style, ...rest }) {
  const tones = {
    coral: { solid: "var(--coral)", tint: "var(--coral-tint)", ink: "var(--coral)" },
    violet: { solid: "var(--violet)", tint: "var(--violet-50)", ink: "var(--violet)" },
    teal: { solid: "var(--teal)", tint: "var(--teal-tint)", ink: "var(--teal-deep)" },
    blue: { solid: "var(--blue)", tint: "var(--blue-tint)", ink: "var(--blue-deep)" },
    gold: { solid: "var(--gold)", tint: "var(--gold-tint)", ink: "var(--gold-deep)" },
    charcoal: { solid: "var(--charcoal)", tint: "var(--surface-strong)", ink: "var(--charcoal)" },
  };
  const t = tones[tone] || tones.coral;

  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 24,
    padding: "0 11px",
    fontFamily: "var(--font-sans)",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    lineHeight: 1,
    borderRadius: "var(--radius-pill)",
    color: soft ? t.ink : "var(--cream)",
    background: soft ? t.tint : t.solid,
    whiteSpace: "nowrap",
    ...style,
  };

  return (
    <span style={base} {...rest}>
      {children}
    </span>
  );
}
