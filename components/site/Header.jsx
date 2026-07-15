"use client";
/* PDG site header — master coral wordmark, four standalone service tabs
 * (Design, Branding, Video, Packages), each its own page, and a constant
 * "Book with us". The active tab is highlighted in its own service accent. */
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const HEADER_TABS = [
  { key: "home", label: "Home", accent: "var(--coral)" },
  { key: "design", label: "Design", accent: "var(--teal-deep)" },
  { key: "logos", label: "Branding", accent: "var(--blue-deep)" },
  { key: "video", label: "Video", accent: "var(--violet)" },
  { key: "packages", label: "Packages", accent: "var(--gold-deep)" },
];

export function Header({ active, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const bookAccent = (HEADER_TABS.find((t) => t.key === active) || {}).accent || "var(--coral)";
  const nav = (key) => { setMenuOpen(false); onNavigate(key); };

  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll + close on Escape while the cinematic overlay is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);
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

      {/* Cinematic full-screen mobile nav overlay — portalled to <body> so it
          escapes the backdrop-filtered header's fixed-position containing block. */}
      {mounted && menuOpen && createPortal(
        <div
          className="pdg-navovl"
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            display: "flex", flexDirection: "column",
            background: "var(--canvas)",
            animation: "pdg-ovl-in 260ms var(--ease-house) both",
            overflow: "hidden",
          }}
        >
          {/* Warm accent veil behind the list */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", top: "-24%", right: "-30%", width: "90vw", height: "90vw", maxWidth: 620, maxHeight: 620,
              borderRadius: "50%", pointerEvents: "none",
              background: `radial-gradient(circle, color-mix(in srgb, ${bookAccent} 22%, transparent), transparent 68%)`,
              filter: "blur(20px)",
              animation: "pdg-ovl-veil 900ms var(--ease-slow) both",
            }}
          />

          {/* Top bar: wordmark + close */}
          <div style={{ position: "relative", flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px var(--content-gutter)" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24, letterSpacing: "-1.08px", lineHeight: 1, color: "var(--charcoal)" }}>
              PDG<span style={{ color: bookAccent }}>.</span>
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{
                width: 44, height: 44, display: "inline-flex", alignItems: "center", justifyContent: "center",
                borderRadius: "var(--radius-pill)", cursor: "pointer", padding: 0, color: "var(--charcoal)",
                background: "var(--surface-card)", border: "1px solid var(--hairline)",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M2 2L15 15M15 2L2 15" />
              </svg>
            </button>
          </div>

          {/* Nav list — staggered cinematic rise */}
          <nav style={{ position: "relative", flex: "1 1 auto", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 var(--content-gutter)", minHeight: 0 }}>
            {HEADER_TABS.map((t, i) => {
              const on = active === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => nav(t.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 18, width: "100%", textAlign: "left",
                    padding: "14px 4px", cursor: "pointer", border: "none", background: "none",
                    borderBottom: "1px solid var(--hairline)",
                    animation: `pdg-navrise 560ms var(--ease-house) both`,
                    animationDelay: `${120 + i * 70}ms`,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, fontVariantNumeric: "tabular-nums", color: on ? bookAccent : "var(--muted)", width: 24, flex: "0 0 auto" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: t.accent, flex: "0 0 auto", boxShadow: on ? `0 0 0 4px color-mix(in srgb, ${t.accent} 30%, transparent)` : "none" }} />
                  <span style={{ flex: 1, fontFamily: "var(--font-sans)", fontSize: "clamp(30px, 9vw, 40px)", fontWeight: 600, letterSpacing: "-1.2px", lineHeight: 1.05, color: on ? t.accent : "var(--charcoal)" }}>
                    {t.label}
                  </span>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={on ? bookAccent : "var(--stone)"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }}>
                    <path d="M6 16L16 6M16 6H8M16 6V14" />
                  </svg>
                </button>
              );
            })}
          </nav>

          {/* Book with us CTA */}
          <div style={{ position: "relative", flex: "0 0 auto", padding: "0 var(--content-gutter) calc(24px + env(safe-area-inset-bottom))", animation: "pdg-navrise 560ms var(--ease-house) both", animationDelay: `${120 + HEADER_TABS.length * 70}ms` }}>
            <button
              onClick={() => nav("contact")}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 9, width: "100%",
                height: 56, borderRadius: "var(--radius-pill)", cursor: "pointer", border: "none",
                background: bookAccent, color: "var(--cream)", fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 600, letterSpacing: "-0.2px",
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--cream)", flex: "0 0 auto" }} />
              Book with us
            </button>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
