import React from "react";

/**
 * PDG Logo — the wordmark rendered live in Space Grotesk Bold with the period
 * in the line accent. Master = coral, web = violet, marketing = teal.
 */
export function Logo({
  line = "master",
  layout = "wordmark",
  size = 28,
  onDark = false,
  onAccent = false,
  href,
  style,
  ...rest
}) {
  const lines = {
    master: { dot: "var(--coral)", descriptor: "AGENCY", accentTint: "var(--coral-tint)" },
    web: { dot: "var(--violet)", descriptor: "WEB + VIDEO", accentTint: "var(--violet-50)" },
    marketing: { dot: "var(--teal)", descriptor: "MARKETING", accentTint: "var(--teal-tint)" },
  };
  const l = lines[line] || lines.master;

  const wordColor = onDark || onAccent ? "var(--cream)" : "var(--charcoal)";
  const dotColor = onAccent ? l.accentTint : onDark ? l.accentTint : l.dot;
  const descColor = onAccent ? l.accentTint : l.dot;

  const wordmark = (
    <span
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: size,
        letterSpacing: `${-size * 0.045}px`,
        lineHeight: 1,
        color: wordColor,
        whiteSpace: "nowrap",
      }}
    >
      PDG<span style={{ color: dotColor }}>.</span>
    </span>
  );

  const descriptor = (
    <span
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: Math.max(10, size * 0.34),
        letterSpacing: "3px",
        textTransform: "uppercase",
        color: descColor,
        whiteSpace: "nowrap",
      }}
    >
      {l.descriptor}
    </span>
  );

  let inner;
  if (layout === "horizontal" && line !== "master") {
    inner = (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
        {wordmark}
        <span aria-hidden style={{ width: 1, height: size * 0.78, background: onDark || onAccent ? "rgba(250,246,238,0.4)" : "var(--hairline)" }} />
        {descriptor}
      </span>
    );
  } else if (layout === "stacked" && line !== "master") {
    inner = (
      <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: size * 0.28 }}>
        {wordmark}
        <span aria-hidden style={{ width: size * 1.3, height: 3, borderRadius: 2, background: descColor }} />
        {descriptor}
      </span>
    );
  } else {
    inner = wordmark;
  }

  if (href) {
    return (
      <a href={href} style={{ textDecoration: "none", display: "inline-flex", ...style }} aria-label={`PDG ${line}`} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <span style={{ display: "inline-flex", ...style }} aria-label={`PDG ${line}`} {...rest}>
      {inner}
    </span>
  );
}
