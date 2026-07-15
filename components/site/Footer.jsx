"use client";
/* PDG site footer — warm cream (surface-soft), never dark. Master mark + coral. */
import React from "react";
import { Logo } from "@/components/ds";
import { PDG_DATA } from "@/lib/data";

const btnStyle = { background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 14.5, color: "var(--body)", textAlign: "left" };

export function Footer({ onNavigate, onSection }) {
  const studio = PDG_DATA.studio;
  const services = [
    { key: "design", label: "Design", tone: "var(--teal-deep)" },
    { key: "logos", label: "Branding", tone: "var(--blue-deep)" },
    { key: "video", label: "Video", tone: "var(--violet)" },
    { key: "packages", label: "Packages", tone: "var(--gold-deep)" },
  ];

  return (
    <footer style={{ background: "var(--surface-soft)", borderTop: "1px solid var(--hairline)" }}>
      <div
        className="r-stack"
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          padding: "64px var(--content-gutter) 40px",
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr",
          gap: 40,
        }}
      >
        <div>
          <Logo line="master" size={30} />
          <p style={{ margin: "16px 0 0", maxWidth: 300, fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.55, color: "var(--muted)" }}>
            {studio.tagline}
          </p>
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--coral)" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--charcoal)" }}>Services</span>
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {services.map((s) => (
              <li key={s.label}>
                <button
                  onClick={() => onNavigate(s.key)}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 9, fontFamily: "var(--font-sans)", fontSize: 14.5, color: "var(--body)", textAlign: "left" }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.tone }} />
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--coral)" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--charcoal)" }}>Studio</span>
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            <li><button onClick={() => onNavigate("home")} style={btnStyle}>Home</button></li>
            <li><button onClick={() => onSection("work")} style={btnStyle}>Work</button></li>
            <li><button onClick={() => onSection("about")} style={btnStyle}>About</button></li>
            <li><button onClick={() => onNavigate("contact")} style={btnStyle}>Contact</button></li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--hairline)" }}>
        <div
          style={{
            maxWidth: "var(--content-max)",
            margin: "0 auto",
            padding: "20px var(--content-gutter)",
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "space-between",
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            color: "var(--muted)",
          }}
        >
          <span>© 2026 {studio.name}</span>
          <span>{studio.email}</span>
        </div>
      </div>
    </footer>
  );
}
