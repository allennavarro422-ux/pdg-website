"use client";
import React, { useState } from "react";
import { Badge } from "./Badge.jsx";

/**
 * PDG ServiceCard — the repeated unit on service tabs. Shows the service name,
 * price (verbatim), a one-line description, and an optional badge. When
 * `details` is supplied it gains a "What's included" toggle.
 */
export function ServiceCard({ name, price, description, badge, badgeTone, tone, details, onBook, style, ...rest }) {
  const [h, setH] = useState(false);
  const [open, setOpen] = useState(false);

  const accents = {
    coral: { ink: "var(--coral)", solid: "var(--coral)", badge: "coral" },
    violet: { ink: "var(--violet)", solid: "var(--violet)", badge: "violet" },
    teal: { ink: "var(--teal-deep)", solid: "var(--teal)", badge: "teal" },
  };
  const a = tone ? accents[tone] : null;
  const accentInk = a ? a.ink : "var(--accent)";
  const accentSolid = a ? a.solid : "var(--accent)";
  const bTone = badgeTone || (a ? a.badge : "coral");
  const expandable = !!(details && (details.summary || (details.includes && details.includes.length)));

  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: "var(--cream)",
        border: "1px solid",
        borderColor: h || open ? accentInk : "var(--hairline)",
        borderRadius: "var(--radius-lg)",
        padding: 24,
        transition: "transform var(--t-base), box-shadow var(--t-base), border-color var(--t-base)",
        transform: h && !open ? "translateY(-3px)" : "translateY(0)",
        boxShadow: h || open ? "var(--shadow-hover)" : "none",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 19, fontWeight: 600, letterSpacing: "-0.3px", color: "var(--charcoal)", lineHeight: 1.25 }}>
          {name}
        </h3>
        {badge ? <Badge tone={bTone}>{badge}</Badge> : null}
      </div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", color: accentInk, marginBottom: 12 }}>
        {price}
      </div>
      <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.55, color: "var(--body)" }}>
        {description}
      </p>

      {expandable ? (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            style={{
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              width: "100%",
              padding: "10px 0 0",
              background: "transparent",
              border: "none",
              borderTop: "1px solid var(--hairline)",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.2px",
              color: accentInk,
            }}
          >
            {open ? "Hide details" : "What's included"}
            <span aria-hidden style={{ display: "inline-flex", transition: "transform var(--t-base)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 5.5L7 9l3.5-3.5" stroke={accentInk} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows var(--t-base)" }}>
            <div style={{ overflow: "hidden" }}>
              <div style={{ paddingTop: 14 }}>
                {details.summary ? (
                  <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.6, color: "var(--body)" }}>
                    {details.summary}
                  </p>
                ) : null}
                {details.includes && details.includes.length ? (
                  <ul style={{ margin: "14px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {details.includes.map((it, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "var(--font-sans)", fontSize: 13.5, lineHeight: 1.5, color: "var(--charcoal)" }}>
                        <span aria-hidden style={{ marginTop: 6, width: 6, height: 6, borderRadius: "50%", background: accentInk, flex: "0 0 auto" }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </>
      ) : null}

      {onBook ? (
        <div style={{ marginTop: "auto", paddingTop: 22 }}>
          <button
            type="button"
            onClick={() => onBook(name)}
            onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.93)")}
            onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: "100%",
              height: 44,
              border: "none",
              borderRadius: "var(--radius-md)",
              background: accentSolid,
              color: "var(--cream)",
              fontFamily: "var(--font-sans)",
              fontSize: 14.5,
              fontWeight: 600,
              cursor: "pointer",
              transition: "filter var(--t-quick)",
            }}
          >
            Book this service
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
              <path d="M1 6h15M11 1l5 5-5 5" stroke="var(--cream)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
