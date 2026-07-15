"use client";
/* LOGOS & BRAND — a distinct structure: split hero with a live identity forge,
 * a brand-system gallery, a three-tier ladder where the tiers build on each
 * other, a deliverables strip, a small process, an open FAQ grid, and the
 * closing CTA. data-line="logos" -> --accent = blue. */
import React, { useRef, useState, useEffect } from "react";
import { Button, Eyebrow } from "@/components/ds";
import { Band } from "./Layout.jsx";
import { Reveal } from "./Reveal.jsx";
import { GlassField } from "./GlassField.jsx";
import { RuleHead, WorkImage, ClosingCTA } from "./PageParts.jsx";
import { PDG_DATA } from "@/lib/data";
import { scrollToServiceId } from "@/lib/nav";

const LP_DELIVERABLES = [
  {
    t: "Logo suite",
    d: "Primary mark, a secondary version, and a compact icon.",
    icon: (
      <svg width="21" viewBox="0 0 24 24" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" /><path d="M12 7.5l1.4 3.1L16.5 12l-3.1 1.4L12 16.5l-1.4-3.1L7.5 12l3.1-1.4z" fill="currentColor" /></svg>
    ),
  },
  {
    t: "Color palette",
    d: "A defined set with exact codes for print and screen.",
    icon: (
      <svg width="21" viewBox="0 0 24 24" fill="none"><circle cx="8.5" cy="9" r="3.1" stroke="currentColor" strokeWidth="1.6" /><circle cx="15.5" cy="9" r="3.1" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="15.5" r="3.1" stroke="currentColor" strokeWidth="1.6" /></svg>
    ),
  },
  {
    t: "Typography",
    d: "Chosen typefaces and how they pair together.",
    icon: (
      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 17, letterSpacing: "-0.5px", lineHeight: 1 }}>Aa</span>
    ),
  },
  {
    t: "Usage guide",
    d: "Simple rules so the brand always looks right.",
    icon: (
      <svg width="21" viewBox="0 0 24 24" fill="none"><rect x="5" y="3.5" width="14" height="17" rx="2.4" stroke="currentColor" strokeWidth="1.6" /><path d="M8.3 8.5h7.4M8.3 12h7.4M8.3 15.5h4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
    ),
  },
  {
    t: "Every format",
    d: "Vector and raster files ready for any use.",
    icon: (
      <svg width="21" viewBox="0 0 24 24" fill="none"><rect x="4" y="6.5" width="12" height="13.5" rx="2.2" stroke="currentColor" strokeWidth="1.6" /><path d="M8 6.5V5.6A1.6 1.6 0 019.6 4H18a1.6 1.6 0 011.6 1.6v9.2a1.6 1.6 0 01-1.6 1.6h-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
  },
];

const LP_PALETTE = [
  { c: "var(--blue)", t: "var(--blue-tint)", name: "Azure" },
  { c: "var(--teal-deep)", t: "var(--teal-tint)", name: "Pine" },
  { c: "var(--violet)", t: "var(--violet-50)", name: "Iris" },
  { c: "var(--gold-deep)", t: "var(--gold-tint)", name: "Amber" },
  { c: "var(--coral)", t: "var(--coral-tint)", name: "Ember" },
];

function LP_Chev({ color = "#fff", w = 34 }) {
  return (
    <svg width={w} viewBox="0 0 100 100" fill="none" style={{ display: "block" }}>
      <path d="M50 6 C55 33 67 45 94 50 C67 55 55 67 50 94 C45 67 33 55 6 50 C33 45 45 33 50 6 Z" fill={color} />
    </svg>
  );
}

function BrandForge() {
  const [reduce, setReduce] = useState(false);
  const ref = useRef(null);
  const [i, setI] = useState(0);
  const [p, setP] = useState({ x: 0, y: 0 });
  useEffect(() => {
    setReduce(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % LP_PALETTE.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);
  const cur = LP_PALETTE[i];
  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setP({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 });
  };
  const par = (d) => (reduce ? "none" : `translate(${p.x * d}px, ${p.y * d}px)`);
  const T = "color 600ms var(--ease-house), background 600ms var(--ease-house), border-color 600ms var(--ease-house), box-shadow 600ms var(--ease-house)";
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setP({ x: 0, y: 0 })} style={{ position: "relative", minHeight: 470, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pdgBobA { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pdgBobB { 0%,100% { transform: translateY(0); } 50% { transform: translateY(11px); } }
        @media (prefers-reduced-motion: no-preference) { .pdg-bobA { animation: pdgBobA 6s ease-in-out infinite; } .pdg-bobB { animation: pdgBobB 7.4s ease-in-out infinite; } }
      ` }} />

      <span aria-hidden style={{ position: "absolute", width: 340, height: 340, borderRadius: "50%", background: `color-mix(in srgb, ${cur.c} 24%, transparent)`, filter: "blur(48px)", transition: "background 600ms ease", transform: par(6) }} />

      <div style={{ position: "relative", zIndex: 2, transform: par(10), transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)" }}>
        <div style={{ width: 178, height: 178, borderRadius: 40, background: cur.c, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 42px 90px -38px ${cur.c}`, transition: T }}>
          <LP_Chev color="#fff" w={78} />
        </div>
      </div>

      <div className="pdg-bobA" style={{ position: "absolute", left: "0%", top: "8%", zIndex: 3, transform: par(24) }}>
        <div style={{ width: 186, height: 112, borderRadius: 14, background: "var(--cream)", border: "1px solid var(--hairline)", boxShadow: "0 30px 60px -34px rgba(44,44,42,0.5)", padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 27, height: 27, borderRadius: 7, background: cur.t, display: "inline-flex", alignItems: "center", justifyContent: "center", transition: T }}><LP_Chev color={cur.c} w={15} /></span>
            <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ height: 6, width: 62, borderRadius: 3, background: "var(--charcoal)" }} />
              <span style={{ height: 4, width: 40, borderRadius: 3, background: "var(--hairline)" }} />
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ height: 5, width: "70%", borderRadius: 3, background: cur.c, transition: T }} />
            <span style={{ height: 5, width: "46%", borderRadius: 3, background: "var(--hairline)" }} />
          </div>
        </div>
      </div>

      <div className="pdg-bobB" style={{ position: "absolute", left: "8%", bottom: "11%", zIndex: 3, transform: par(32) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 15px 8px 9px", background: "var(--cream)", border: "1px solid var(--hairline)", borderRadius: "var(--radius-pill)", boxShadow: "0 20px 44px -28px rgba(44,44,42,0.5)" }}>
          <span style={{ width: 22, height: 22, borderRadius: 6, background: cur.c, display: "inline-flex", alignItems: "center", justifyContent: "center", transition: T }}><LP_Chev color="#fff" w={12} /></span>
          <span style={{ height: 6, width: 82, borderRadius: 3, background: "var(--hairline)" }} />
        </div>
      </div>

      <div className="pdg-bobA" style={{ position: "absolute", right: "2%", top: "22%", zIndex: 3, transform: par(28) }}>
        <div style={{ width: 96, height: 96, borderRadius: "50%", background: "var(--cream)", border: `2px solid ${cur.c}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 26px 54px -30px ${cur.c}`, transition: T }}>
          <LP_Chev color={cur.c} w={40} />
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", zIndex: 4, display: "inline-flex", alignItems: "center", gap: 12, padding: "9px 15px", background: "var(--cream)", border: "1px solid var(--hairline)", borderRadius: "var(--radius-pill)", boxShadow: "0 16px 40px -26px rgba(44,44,42,0.5)" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 11.5, fontWeight: 600, color: "var(--muted)", whiteSpace: "nowrap", minWidth: 40 }}>{cur.name}</span>
        <span style={{ width: 1, height: 16, background: "var(--hairline)" }} />
        <div style={{ display: "flex", gap: 7 }}>
          {LP_PALETTE.map((pl, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={pl.name} style={{ width: 18, height: 18, borderRadius: "50%", background: pl.c, border: "2px solid", borderColor: i === k ? "var(--charcoal)" : "transparent", cursor: "pointer", padding: 0, transform: i === k ? "scale(1.14)" : "scale(1)", transition: "transform 200ms var(--ease-house), border-color 200ms" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function LogosPage({ onNavigate }) {
  const data = PDG_DATA;
  const tab = data.serviceTabs.find((t) => t.key === "logos");
  const tiers = tab.groups.flatMap((g) => g.services);
  const details = data.serviceDetails;
  const brand = data.work.brand;

  const process = [
    { t: "Sketch", d: "Concepts drawn around your business, not pulled from a library." },
    { t: "Refine", d: "We narrow to one direction and sharpen every detail together." },
    { t: "Deliver", d: "Every format you'll ever need, plus a usage sheet." },
  ];

  return (
    <div data-line="logos">
      {/* Split hero */}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--canvas)" }}>
        <GlassField tone="violet" />
        <div className="r-hero" style={{ position: "relative", maxWidth: "var(--content-max)", margin: "0 auto", padding: "60px var(--content-gutter) 54px", display: "grid", gridTemplateColumns: "0.98fr 1.02fr", gap: 52, alignItems: "center" }}>
          <Reveal delay={90}>
            <BrandForge />
          </Reveal>
          <div className="r-hero-alignL" style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <Reveal delay={150}><Eyebrow tone="accent">{tab.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={210} as="h1" className="r-htitle" style={{ margin: "18px 0 0", maxWidth: 540, fontFamily: "var(--font-sans)", fontSize: 54, fontWeight: 700, letterSpacing: "-1.8px", lineHeight: 1.03, color: "var(--charcoal)", textWrap: "balance" }}>
              {tab.headline}<span style={{ color: "var(--accent)" }}>.</span>
            </Reveal>
            <Reveal delay={280} as="p" style={{ margin: "22px 0 0", maxWidth: 460, fontFamily: "var(--font-sans)", fontSize: 19, lineHeight: 1.55, color: "var(--muted)" }}>
              {tab.intro}
            </Reveal>
            <Reveal delay={340} className="r-actions-L" style={{ marginTop: 30, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "flex-end" }}>
              <Button variant="accent" size="lg" onClick={() => onNavigate("contact", "Signature Logo")}>Book with us</Button>
              <Button variant="secondary" size="lg" onClick={() => scrollToServiceId("logo-tiers")}>See tiers</Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Brand-system gallery */}
      <Band bg="var(--surface-soft)" py={56}>
        <Reveal style={{ marginBottom: 30 }}><RuleHead sub="One mark, built to work everywhere in dark, light, and compact.">A system, not just a logo</RuleHead></Reveal>
        <Reveal delay={80} className="r-stack r-stack-rows-flat" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)", gap: 16 }}>
          <WorkImage src={brand.primary.fallback} alt={brand.primary.alt} label={brand.primary.label} bg={brand.primary.bg} ratio="16 / 11" scale={1.25} />
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 16 }}>
            <WorkImage src={brand.light.fallback} alt={brand.light.alt} label={brand.light.label} bg={brand.light.bg} scale={1.25} />
            <WorkImage src={brand.mark.fallback} alt={brand.mark.alt} label={brand.mark.label} bg={brand.mark.bg} scale={1.4} />
          </div>
        </Reveal>
      </Band>

      {/* Tier ladder */}
      <Band id="logo-tiers" py={42}>
        <Reveal><RuleHead sub="Each tier builds on the one before it. Pick where you want to start.">Three ways in</RuleHead></Reveal>
        <div className="r-stack" style={{ marginTop: 44, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, alignItems: "end" }}>
          {tiers.map((t, i) => {
            const featured = i === 1;
            const d = details[t.name] || {};
            return (
              <Reveal key={t.name} delay={i * 90}>
                <div style={{ position: "relative", background: featured ? "var(--charcoal)" : "var(--cream)", border: featured ? "none" : "1px solid var(--hairline)", borderRadius: "var(--radius-xl)", padding: featured ? "36px 30px 30px" : "28px 30px 30px", boxShadow: featured ? "0 40px 90px -40px color-mix(in srgb, var(--accent) 70%, transparent)" : "0 20px 50px -40px rgba(44,44,42,0.4)" }}>
                  {featured ? (
                    <span style={{ position: "absolute", top: -13, left: 30, background: "var(--accent)", color: "var(--cream)", fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", padding: "4px 12px", borderRadius: "var(--radius-pill)" }}>{t.badge}</span>
                  ) : null}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 28, height: 28, borderRadius: "50%", background: featured ? "var(--accent)" : "var(--accent-tint)", color: featured ? "var(--cream)" : "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13 }}>{i + 1}</span>
                    <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 20, fontWeight: 600, letterSpacing: "-0.4px", color: featured ? "var(--cream)" : "var(--charcoal)" }}>{t.name}</h3>
                  </div>
                  <div style={{ margin: "18px 0 0", fontFamily: "var(--font-sans)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.6px", color: featured ? "var(--accent-soft)" : "var(--accent)" }}>{t.price}</div>
                  <p style={{ margin: "8px 0 0", fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.55, color: featured ? "rgba(255,255,255,0.66)" : "var(--muted)" }}>{t.description}</p>
                  <div style={{ marginTop: 20, paddingTop: 18, borderTop: featured ? "1px solid rgba(255,255,255,0.16)" : "1px solid var(--hairline)" }}>
                    {(d.includes || []).map((inc, k) => (
                      <div key={k} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "7px 0" }}>
                        <span style={{ marginTop: 3, flex: "0 0 auto", color: "var(--accent-soft)" }}>
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, lineHeight: 1.45, color: featured ? "rgba(255,255,255,0.82)" : "var(--body)" }}>{inc}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => onNavigate("contact", t.name)} style={{ marginTop: 22, width: "100%", height: 46, borderRadius: "var(--radius-pill)", border: featured ? "none" : "1px solid var(--accent)", background: featured ? "var(--accent)" : "transparent", color: featured ? "var(--cream)" : "var(--accent)", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                    Book this
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Band>

      {/* Deliverables strip */}
      <Band bg="var(--surface-soft)" py={52}>
        <Reveal><RuleHead sub="A complete kit, not a single file. Every identity system arrives with all of this.">Everything you walk away with</RuleHead></Reveal>
        <div style={{ marginTop: 38, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 188px), 1fr))", gap: 14 }}>
          {LP_DELIVERABLES.map((d, i) => (
            <Reveal key={d.t} delay={i * 70}>
              <div style={{ height: "100%", background: "var(--cream)", border: "1px solid var(--hairline)", borderRadius: "var(--radius-lg)", padding: "24px 22px 22px", display: "flex", flexDirection: "column", gap: 13 }}>
                <span style={{ width: 42, height: 42, borderRadius: 12, background: "var(--accent-tint)", color: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{d.icon}</span>
                <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 600, letterSpacing: "-0.3px", color: "var(--charcoal)" }}>{d.t}</h3>
                <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 13.5, lineHeight: 1.5, color: "var(--muted)" }}>{d.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* Process */}
      <Band bg="var(--surface-soft)" py={56}>
        <Reveal><RuleHead>How every logo comes together</RuleHead></Reveal>
        <div className="r-stack lp-process" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
          {process.map((s, i) => (
            <Reveal key={s.t} delay={i * 80} style={{ padding: "0 28px", borderLeft: i === 0 ? "none" : "1px solid var(--hairline)" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, letterSpacing: "1px", color: "var(--accent)" }}>0{i + 1}</span>
              <h3 style={{ margin: "12px 0 0", fontFamily: "var(--font-sans)", fontSize: 21, fontWeight: 600, letterSpacing: "-0.3px", color: "var(--charcoal)" }}>{s.t}</h3>
              <p style={{ margin: "10px 0 0", fontFamily: "var(--font-sans)", fontSize: 15.5, lineHeight: 1.6, color: "var(--body)" }}>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* Questions */}
      <Band py={56}>
        <Reveal style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <Eyebrow tone="accent">Frequently asked</Eyebrow>
          <h2 style={{ margin: "14px 0 0", fontFamily: "var(--font-sans)", fontSize: 34, fontWeight: 700, letterSpacing: "-0.8px", color: "var(--charcoal)" }}>Questions, answered</h2>
          <p style={{ margin: "12px auto 0", maxWidth: 460, fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.55, color: "var(--muted)" }}>The things owners ask most before starting a brand.</p>
        </Reveal>
        <div className="r-stack" style={{ marginTop: 44, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
          {(tab.faq || []).map((f, i) => (
            <Reveal key={i} delay={(i % 2) * 90}>
              <div style={{ height: "100%", background: "var(--cream)", border: "1px solid var(--hairline)", borderRadius: "var(--radius-xl)", padding: "26px 26px 24px", boxShadow: "0 20px 50px -44px rgba(44,44,42,0.4)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ flex: "0 0 auto", width: 34, height: 34, borderRadius: 10, background: "var(--accent-tint)", color: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15 }}>Q</span>
                  <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 17.5, fontWeight: 600, letterSpacing: "-0.3px", color: "var(--charcoal)" }}>{f.q}</h3>
                </div>
                <p style={{ margin: "14px 0 0", paddingLeft: 46, fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, color: "var(--body)" }}>{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* Closing */}
      <Band py={42}>
        <Reveal><ClosingCTA owner="Allen" onNavigate={onNavigate} headline="Ready for a mark you can build on?" /></Reveal>
      </Band>
    </div>
  );
}
