import React from "react";

/**
 * PDG Eyebrow — a spaced uppercase label preceded by the signature dot. The dot
 * and text take the section accent by default (--accent), or an explicit tone.
 */
export function Eyebrow({ children, tone, bar = false, style, ...rest }) {
  const color = tone
    ? { coral: "var(--coral)", violet: "var(--violet)", teal: "var(--teal-deep)", charcoal: "var(--charcoal)", muted: "var(--muted)", accent: "var(--accent)" }[tone]
    : "var(--accent)";

  return (
    <span
      className="pdg-eyebrow"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-sans)",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color,
        ...style,
      }}
      {...rest}
    >
      {bar ? (
        <span aria-hidden style={{ width: 30, height: 3, borderRadius: 2, background: color }} />
      ) : (
        <span aria-hidden style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
      )}
      {children}
    </span>
  );
}
