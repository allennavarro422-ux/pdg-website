"use client";
/* PDG site header — master coral wordmark, four standalone service tabs
 * (Design, Branding, Video, Packages), each its own page, and a constant
 * "Book with us". The active tab is highlighted in its own service accent. */
import React, { useState } from "react";

const HEADER_TABS = [
  { key: "home", label: "Home", accent: "var(--coral)" },
  { key: "design", label: "Design", accent: "var(--teal-deep)" },
  { key: "logos", label: "Branding", accent: "var(--blue-deep)" },
  { key: "video", label: "Video", accent: "var(--violet)" },
  { key: "packages", label: "Packages", accent: "var(--gold-deep)" },
];

export function Header({ active, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const bookAccent = (HEADER_TABS.find((t) => t.key === active) || {}).accent || "var(--coral)";
  const nav = (key) => { setMenuOpen(false); onNavigate(key); };
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "color-mix(in srgb, var(--canvas) 88%, transparent)",
        backdropFilter: "saturate(1.1) blur(10px)",
        WebkitBackdropFilter: "saturate(1.1) blur(10px)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          padding: "16px var(--content-gutter)",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
          <button
            onClick={() => nav("home")}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 12 }}
            aria-label="PDG home"
          >
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24, letterSpacing: "-1.08px", lineHeight: 1, color: "var(--charcoal)", whiteSpace: "nowrap" }}>
              PDG<span style={{ color: bookAccent, transition: "color 180ms var(--ease-house)" }}>.</span>
            </span>
          </button>
        </div>

        <nav className="pdg-navtabs" style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
          {HEADER_TABS.map((t) => {
            const on = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => onNavigate(t.key)}
                className="pdg-navlink"
                style={{
                  position: "relative",
                  background: on ? "var(--surface-card)" : "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "9px 16px",
                  borderRadius: "var(--radius-pill)",
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  fontWeight: on ? 600 : 500,
                  color: on ? t.accent : "var(--body)",
                  whiteSpace: "nowrap",
                  transition: "color 160ms var(--ease-house), background 160ms var(--ease-house)",
                }}
              >
                {t.label}
                <span style={{ position: "absolute", left: 16, right: 16, bottom: 3, height: 2, borderRadius: 2, background: t.accent, opacity: on ? 1 : 0, transition: "opacity 160ms var(--ease-house)" }} />
              </button>
            );
          })}
        </nav>

        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => nav("contact")}
            className="pdg-bookbtn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              height: 38,
              padding: "0 18px",
              borderRadius: "var(--radius-pill)",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              fontWeight: 600,
              color: bookAccent,
              background: `color-mix(in srgb, ${bookAccent} 14%, transparent)`,
              border: `1px solid color-mix(in srgb, ${bookAccent} 42%, transparent)`,
              transition: "background 180ms var(--ease-house), border-color 180ms var(--ease-house), color 180ms var(--ease-house)",
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: bookAccent, flex: "0 0 auto" }} />
            Book with us
          </button>

          <button
            className="pdg-menubtn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              width: 40, height: 40, flex: "0 0 auto", alignItems: "center", justifyContent: "center",
              borderRadius: "var(--radius-md)", border: "1px solid var(--hairline)", background: "var(--surface-card)",
              cursor: "pointer", color: "var(--charcoal)", padding: 0,
            }}
          >
            <span style={{ position: "relative", width: 17, height: 12, display: "block" }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  position: "absolute", left: 0, height: 2, width: "100%", borderRadius: 2, background: "currentColor",
                  top: menuOpen ? 5 : i * 5,
                  transform: menuOpen ? (i === 1 ? "scaleX(0)" : i === 0 ? "rotate(45deg)" : "rotate(-45deg)") : "none",
                  transition: "top 220ms var(--ease-house), transform 220ms var(--ease-house)",
                }} />
              ))}
            </span>
          </button>
        </div>
      </div>

      <div
        className="pdg-mobilepanel"
        style={{
          overflow: "hidden",
          borderTop: menuOpen ? "1px solid var(--hairline)" : "1px solid transparent",
          maxHeight: menuOpen ? 420 : 0,
          opacity: menuOpen ? 1 : 0,
          transition: "max-height 300ms var(--ease-house), opacity 200ms var(--ease-house), border-color 200ms var(--ease-house)",
          background: "color-mix(in srgb, var(--canvas) 96%, transparent)",
        }}
      >
        <nav style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "10px var(--content-gutter) 18px", display: "flex", flexDirection: "column", gap: 4 }}>
          {HEADER_TABS.map((t) => {
            const on = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => nav(t.key)}
                style={{
                  display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left",
                  padding: "13px 14px", borderRadius: "var(--radius-md)", cursor: "pointer", border: "none",
                  background: on ? "var(--surface-card)" : "transparent",
                  fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: on ? 600 : 500,
                  color: on ? t.accent : "var(--charcoal)",
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.accent, flex: "0 0 auto", opacity: on ? 1 : 0.5 }} />
                {t.label}
              </button>
            );
          })}
          <button
            onClick={() => nav("contact")}
            style={{
              marginTop: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              height: 48, borderRadius: "var(--radius-pill)", cursor: "pointer", border: "none",
              background: bookAccent, color: "var(--cream)", fontFamily: "var(--font-sans)", fontSize: 15.5, fontWeight: 600,
            }}
          >
            Book with us
          </button>
        </nav>
      </div>
    </header>
  );
}
