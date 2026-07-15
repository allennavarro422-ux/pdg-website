"use client";
import React, { useState } from "react";

/**
 * PDG Button — frosted-outline chips. Variants: primary (charcoal), coral
 * (high-intent), accent (inherits --accent), secondary (hairline outline),
 * ghost (underlined inline link). Quiet, eased hover (house curve).
 */
export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  full = false,
  disabled = false,
  href,
  onClick,
  type = "button",
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  const heights = { sm: 38, md: 46, lg: 54 };
  const pads = { sm: "0 18px", md: "0 24px", lg: "0 30px" };
  const fontSizes = { sm: 14, md: 15, lg: 16 };

  const isGhost = variant === "ghost";
  const colorFor = { primary: "var(--charcoal)", coral: "var(--coral)", accent: "var(--accent)", secondary: "var(--charcoal)" };
  const c = colorFor[variant] || colorFor.primary;
  const isNeutral = variant === "secondary" || variant === "primary";

  const fg = isNeutral ? "var(--charcoal)" : `color-mix(in srgb, ${c} 82%, var(--charcoal))`;
  const bgRest = `color-mix(in srgb, ${c} ${isNeutral ? 7 : 15}%, transparent)`;
  const bgHover = `color-mix(in srgb, ${c} ${isNeutral ? 13 : 24}%, transparent)`;
  const rim = `color-mix(in srgb, ${c} ${isNeutral ? 30 : 52}%, transparent)`;
  const rimHover = `color-mix(in srgb, ${c} ${isNeutral ? 48 : 70}%, transparent)`;

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: full ? "100%" : "auto",
    height: isGhost ? "auto" : heights[size],
    padding: isGhost ? 0 : pads[size],
    fontFamily: "var(--font-sans)",
    fontSize: fontSizes[size],
    fontWeight: 600,
    letterSpacing: "-0.1px",
    lineHeight: 1,
    color: isGhost ? "var(--charcoal)" : fg,
    background: isGhost ? "transparent" : hover && !disabled ? bgHover : bgRest,
    backdropFilter: isGhost ? "none" : "blur(12px) saturate(1.3)",
    WebkitBackdropFilter: isGhost ? "none" : "blur(12px) saturate(1.3)",
    border: isGhost ? "1px solid transparent" : `1.5px solid ${hover && !disabled ? rimHover : rim}`,
    borderRadius: isGhost ? 0 : "var(--radius-pill)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    textDecoration: "none",
    transform: isGhost || disabled ? "none" : pressed ? "translateY(0) scale(0.97)" : hover ? "translateY(-2px)" : "translateY(0)",
    boxShadow: isGhost || disabled ? "none" : hover && !pressed ? `0 12px 26px -14px ${c}` : "none",
    transition: "background var(--t-quick), border-color var(--t-quick), color var(--t-quick), transform 180ms var(--ease-house), box-shadow 180ms var(--ease-house)",
    boxSizing: "border-box",
    ...style,
  };

  const dot = isGhost ? null : (
    <span aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: c, flex: "0 0 auto" }} />
  );

  const ghostExtra = isGhost
    ? {
        position: "relative",
        paddingBottom: 2,
        backgroundImage: "linear-gradient(currentColor, currentColor)",
        backgroundSize: hover && !disabled ? "100% 1.5px" : "0% 1.5px",
        backgroundPosition: "left bottom",
        backgroundRepeat: "no-repeat",
        transition: "background-size var(--t-quick)",
      }
    : {};

  const content = (
    <>
      {icon ? <span aria-hidden style={{ display: "inline-flex" }}>{icon}</span> : dot}
      {children}
      {iconRight ? <span aria-hidden style={{ display: "inline-flex" }}>{iconRight}</span> : null}
    </>
  );

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setPressed(false); },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onFocus: () => setHover(true),
    onBlur: () => { setHover(false); setPressed(false); },
  };

  if (href && !disabled) {
    return (
      <a href={href} style={{ ...base, ...ghostExtra }} {...handlers} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} style={{ ...base, ...ghostExtra }} {...handlers} {...rest}>
      {content}
    </button>
  );
}
