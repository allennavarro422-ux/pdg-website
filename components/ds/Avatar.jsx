import React from "react";

/**
 * PDG Avatar — circular frame for a person or the brand. Coral-tint fill with
 * initials in coral by default, or an image. Service tones available.
 */
export function Avatar({ name, src, size = 44, tone = "coral", style, ...rest }) {
  const tones = {
    coral: { bg: "var(--coral-tint)", ink: "var(--coral)" },
    violet: { bg: "var(--violet-50)", ink: "var(--violet)" },
    teal: { bg: "var(--teal-tint)", ink: "var(--teal-deep)" },
    charcoal: { bg: "var(--surface-strong)", ink: "var(--charcoal)" },
  };
  const t = tones[tone] || tones.coral;

  const initials = (name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  const frame = {
    width: size,
    height: size,
    borderRadius: "50%",
    overflow: "hidden",
    flex: "0 0 auto",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: t.bg,
    color: t.ink,
    fontFamily: "var(--font-sans)",
    fontWeight: 700,
    fontSize: Math.round(size * 0.38),
    letterSpacing: "0.2px",
    ...style,
  };

  return (
    <span style={frame} aria-label={name} {...rest}>
      {src ? (
        <img src={src} alt={name || ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        initials
      )}
    </span>
  );
}
