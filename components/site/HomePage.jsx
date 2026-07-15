"use client";
/* PDG homepage — the front door. Brand voice (no personal name, no location).
 * A kinetic aurora hero with a floating 3D craft cluster and rotating word, a
 * range band routing to the service tabs, a testimonials-forward results band,
 * a nameless "How we work" section, a light work teaser, and the closing CTA. */
import React from "react";
import { Eyebrow, Button } from "@/components/ds";
import { Band, SectionHead } from "./Layout.jsx";
import { Reveal } from "./Reveal.jsx";
import { SiteShowcase, WorkImage } from "./PageParts.jsx";
import { PDG_DATA } from "@/lib/data";
import { scrollToId } from "@/lib/nav";

function Stars({ value = 5, size = 16 }) {
  return (
    <span style={{ display: "inline-flex", gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i < value ? "var(--coral)" : "var(--hairline)"} aria-hidden>
          <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9 5.06 16.8 6 11.3l-4-3.9 5.53-.8z" />
        </svg>
      ))}
    </span>
  );
}

function FeaturedTestimonial({ quote, name, role }) {
  return (
    <div style={{ position: "relative", background: "var(--cream)", border: "1px solid var(--hairline)", borderRadius: "var(--radius-xl)", padding: "30px 34px 26px", boxShadow: "0 30px 64px -34px rgba(0,0,0,0.55)" }}>
      <div style={{ position: "relative" }}>
        <div style={{ marginBottom: 14 }}><Stars value={5} /></div>
        <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "clamp(16px, 1.5vw, 18px)", fontWeight: 500, lineHeight: 1.5, letterSpacing: "-0.2px", color: "var(--charcoal)" }}>
          {quote}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20, paddingTop: 18, borderTop: "1px solid var(--hairline)" }}>
          <span aria-hidden style={{ width: 30, height: 2, background: "var(--coral)", borderRadius: 2 }} />
          <div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, color: "var(--charcoal)" }}>{name}</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--muted)" }}>{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SERVICE_OVERVIEW = [
  { key: "design", label: "Design", desc: "Custom websites built to convert.", accent: "var(--teal-deep)", tint: "var(--teal-tint)" },
  { key: "logos", label: "Branding", desc: "Identity systems you build on.", accent: "var(--blue-deep)", tint: "var(--blue-tint)" },
  { key: "video", label: "Video", desc: "Content you can actually post.", accent: "var(--violet)", tint: "var(--violet-50)" },
  { key: "packages", label: "Packages", desc: "Bundles that combine it all.", accent: "var(--gold-deep)", tint: "var(--gold-tint)" },
];

function ServicesOverview({ onNavigate }) {
  return (
    <Band id="services" bg="var(--canvas)" py={72} style={{ scrollMarginTop: 80 }}>
      <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 40px" }}>
        <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}><Eyebrow tone="coral">What we do</Eyebrow></div>
        <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-1.4px", lineHeight: 1.06, color: "var(--charcoal)", textWrap: "balance" }}>
          Three services, plus bundles<span style={{ color: "var(--coral)" }}>.</span>
        </h2>
        <p style={{ margin: "16px auto 0", maxWidth: 480, fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.6, color: "var(--muted)" }}>
          Open any tab to see everything included, with pricing.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 18 }}>
        {SERVICE_OVERVIEW.map((s, i) => (
          <Reveal key={s.key} delay={i * 70}>
            <button
              onClick={() => onNavigate(s.key)}
              className="pdg-cap"
              style={{ width: "100%", textAlign: "left", cursor: "pointer", background: "var(--cream)", border: "1px solid var(--hairline)", borderRadius: "var(--radius-xl)", padding: 22, display: "flex", flexDirection: "column", gap: 14, minHeight: 190, boxShadow: "0 18px 40px -30px rgba(44,44,42,0.5)", transition: "transform 200ms var(--ease-house), box-shadow 200ms var(--ease-house), border-color 200ms var(--ease-house)" }}
            >
              <span style={{ flex: "0 0 auto", width: 40, height: 40, borderRadius: "var(--radius-badge)", background: s.tint, color: s.accent, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16 }}>0{i + 1}</span>
              <div style={{ marginTop: "auto" }}>
                <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 20, fontWeight: 600, letterSpacing: "-0.4px", color: "var(--charcoal)" }}>{s.label}</h3>
                <p style={{ margin: "8px 0 0", fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.5, color: "var(--muted)" }}>{s.desc}</p>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 600, color: s.accent }}>
                Explore
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

export function HomePage({ onNavigate }) {
  const data = PDG_DATA;
  const work = data.work;
  const brand = work.brand;

  const principles = [
    { n: "01", t: "One studio, every asset", d: "Website, logo, and video from one place, so everything speaks the same language." },
    { n: "02", t: "Built from scratch", d: "No templates, ever. Every project is designed around the business behind it." },
    { n: "03", t: "Direct and simple", d: "No account managers, no handoffs. You talk to the people doing the work." },
    { n: "04", t: "Priced up front", d: "Clear pricing before anything starts. No surprises, no scope creep." },
  ];

  return (
    <div>
      {/* 1 — Aurora hero */}
      <section className="home-hero" style={{ position: "relative", overflow: "hidden", background: "var(--canvas)" }}>
        <div aria-hidden className="pdg-aurora" style={{ position: "absolute", inset: "-20% -10%", zIndex: 0, pointerEvents: "none", filter: "blur(64px)", opacity: 0.9 }}>
          <span className="ab ab1" style={{ background: "var(--teal-deep)" }} />
          <span className="ab ab2" style={{ background: "var(--blue-deep)" }} />
          <span className="ab ab3" style={{ background: "var(--violet)" }} />
          <span className="ab ab4" style={{ background: "var(--gold-deep)" }} />
          <span className="ab ab5" style={{ background: "var(--coral)" }} />
        </div>
        <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg, color-mix(in srgb, var(--canvas) 30%, transparent), color-mix(in srgb, var(--canvas) 62%, transparent))", pointerEvents: "none" }} />

        <div className="home-hero-grid" style={{ position: "relative", zIndex: 2, maxWidth: "var(--content-max)", margin: "0 auto", padding: "84px var(--content-gutter) 76px", display: "grid", gridTemplateColumns: "1.06fr 0.94fr", gap: 44, alignItems: "center" }}>
          <div className="hh-copy">
            <Reveal delay={0} style={{ marginBottom: 22 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 14px", borderRadius: "var(--radius-pill)", background: "color-mix(in srgb, var(--cream) 70%, transparent)", border: "1px solid var(--hairline)", backdropFilter: "blur(6px)", fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: "var(--charcoal)" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--coral)" }} />
                One studio · three crafts
              </span>
            </Reveal>
            <Reveal delay={90} as="h1" style={{ margin: 0, maxWidth: 640, fontFamily: "var(--font-sans)", fontSize: "clamp(38px, 5.4vw, 66px)", fontWeight: 700, letterSpacing: "-2.4px", lineHeight: 1.03, color: "var(--charcoal)", textWrap: "balance" }}>
              A brand that feels{" "}
              <span className="hh-rot" aria-hidden>
                <span className="hh-rot-track">
                  <span style={{ color: "var(--teal-deep)" }}>premium.</span>
                  <span style={{ color: "var(--blue-deep)" }}>trusted.</span>
                  <span style={{ color: "var(--violet)" }}>modern.</span>
                  <span style={{ color: "var(--gold-deep)" }}>ready.</span>
                  <span style={{ color: "var(--teal-deep)" }}>premium.</span>
                </span>
              </span>
              <span className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>premium, trusted, modern, ready.</span>
            </Reveal>
            <Reveal delay={170} as="p" style={{ margin: "24px 0 0", maxWidth: 500, fontFamily: "var(--font-sans)", fontSize: "clamp(16.5px, 2vw, 20px)", lineHeight: 1.55, color: "var(--body)" }}>
              Design, identity, and film, made together in one place, so every part of your brand moves as one.
            </Reveal>
            <Reveal delay={250} style={{ marginTop: 34, display: "flex", flexWrap: "wrap", gap: 14 }}>
              <Button variant="coral" size="lg" onClick={() => onNavigate("contact")}>Book with us</Button>
              <Button variant="secondary" size="lg" onClick={() => scrollToId("services")}>See what we do</Button>
            </Reveal>
          </div>

          <Reveal delay={140} className="hh-stage" style={{ position: "relative", height: 440, perspective: "1200px" }}>
            <div className="hh-cluster" style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
              <span aria-hidden style={{ position: "absolute", top: "50%", left: "50%", width: 300, height: 300, transform: "translate(-50%,-50%)", borderRadius: "50%", background: "radial-gradient(circle, color-mix(in srgb, var(--coral) 26%, transparent), transparent 68%)", filter: "blur(20px)" }} />

              {/* Card A — Website (teal) */}
              <div className="hh-card hh-cardA" style={{ borderTop: "3px solid var(--teal-deep)" }}>
                <div className="hh-card-top">
                  <span className="hh-dot" style={{ background: "var(--teal-deep)" }} />
                  <span className="hh-tag" style={{ color: "var(--teal-deep)" }}>Website</span>
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#E5645A" }} />
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#E8B04B" }} />
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#5FA97F" }} />
                </div>
                <div style={{ marginTop: 12, display: "grid", gap: 7 }}>
                  <span style={{ height: 9, width: "78%", borderRadius: 3, background: "color-mix(in srgb, var(--teal-deep) 24%, var(--hairline))" }} />
                  <span style={{ height: 9, width: "94%", borderRadius: 3, background: "var(--hairline)" }} />
                  <span style={{ height: 9, width: "60%", borderRadius: 3, background: "var(--hairline)" }} />
                  <span style={{ height: 26, width: "44%", borderRadius: 7, background: "var(--teal-deep)", marginTop: 4 }} />
                </div>
              </div>

              {/* Card B — Logo (blue) */}
              <div className="hh-card hh-cardB" style={{ borderTop: "3px solid var(--blue-deep)" }}>
                <div className="hh-card-top">
                  <span className="hh-dot" style={{ background: "var(--blue-deep)" }} />
                  <span className="hh-tag" style={{ color: "var(--blue-deep)" }}>Logo</span>
                </div>
                <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", height: 96, borderRadius: 12, background: "color-mix(in srgb, var(--blue-deep) 8%, var(--cream))" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 46, letterSpacing: "-2px", color: "var(--blue-deep)" }}>P<span style={{ color: "color-mix(in srgb, var(--blue-deep) 55%, var(--cream))" }}>D</span>G</span>
                </div>
                <div style={{ marginTop: 10, display: "flex", gap: 6, justifyContent: "center" }}>
                  {["var(--blue-deep)", "color-mix(in srgb, var(--blue-deep) 60%, var(--cream))", "var(--charcoal)"].map((c, i) => (
                    <span key={i} style={{ width: 18, height: 18, borderRadius: "50%", background: c, border: "1px solid var(--hairline)" }} />
                  ))}
                </div>
              </div>

              {/* Card C — Video (violet) */}
              <div className="hh-card hh-cardC" style={{ borderTop: "3px solid var(--violet)" }}>
                <div className="hh-card-top">
                  <span className="hh-dot" style={{ background: "var(--violet)" }} />
                  <span className="hh-tag" style={{ color: "var(--violet)" }}>Video</span>
                </div>
                <div style={{ marginTop: 14, position: "relative", height: 74, borderRadius: 12, background: "linear-gradient(135deg, color-mix(in srgb, var(--violet) 22%, var(--charcoal)), var(--charcoal))", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <span style={{ width: 0, height: 0, borderLeft: "16px solid var(--cream)", borderTop: "10px solid transparent", borderBottom: "10px solid transparent", marginLeft: 4 }} />
                  <span className="hh-scan" aria-hidden style={{ position: "absolute", top: 0, bottom: 0, width: 2, background: "color-mix(in srgb, var(--violet-light, var(--violet)) 80%, #fff)" }} />
                </div>
                <div style={{ marginTop: 10, display: "flex", gap: 4, alignItems: "flex-end", height: 22 }}>
                  {[10, 18, 8, 22, 14, 20, 9, 16, 12, 19, 7, 15].map((h, i) => (
                    <span key={i} style={{ flex: 1, height: h, borderRadius: 2, background: "color-mix(in srgb, var(--violet) 42%, var(--hairline))" }} />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 — Range */}
      <ServicesOverview onNavigate={onNavigate} />

      {/* 3 — Results / testimonials-forward */}
      <section style={{ background: "var(--charcoal)", position: "relative", overflow: "hidden" }}>
        <span aria-hidden style={{ position: "absolute", top: -140, left: -100, width: 360, height: 360, borderRadius: "50%", background: "color-mix(in srgb, var(--coral) 20%, transparent)", filter: "blur(30px)" }} />
        <div className="results-grid" style={{ position: "relative", maxWidth: "var(--content-max)", margin: "0 auto", padding: "60px var(--content-gutter)", display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 44, alignItems: "center" }}>
          <Reveal>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 600, letterSpacing: "1.4px", textTransform: "uppercase", color: "var(--coral-soft, var(--coral))" }}>Results</span>
            <h2 style={{ margin: "14px 0 0", fontFamily: "var(--font-sans)", fontSize: "clamp(28px, 3.2vw, 36px)", fontWeight: 700, letterSpacing: "-1.2px", lineHeight: 1.08, color: "var(--cream)", textWrap: "balance" }}>
              Businesses that look the part get taken seriously.
            </h2>
            <p style={{ margin: "16px 0 0", maxWidth: 380, fontFamily: "var(--font-sans)", fontSize: 15.5, lineHeight: 1.55, color: "rgba(255,255,255,0.6)" }}>
              A sharper website, a brand that matches, and video worth posting, all pulling in the same direction.
            </p>
          </Reveal>
          {data.testimonials.items.slice(0, 1).map((t) => (
            <Reveal key={t.name}>
              <FeaturedTestimonial quote={t.quote} name={t.name} role={t.role} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4 — How we work */}
      <Band id="about" bg="var(--surface-soft)" py={66}>
        <Reveal><SectionHead eyebrow="How we work" eyebrowTone="coral" title="A studio built around your business" /></Reveal>
        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 18 }}>
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={i * 70}>
              <div style={{ background: "var(--cream)", border: "1px solid var(--hairline)", borderRadius: "var(--radius-xl)", padding: 26, height: "100%", boxShadow: "0 20px 44px -30px rgba(44,44,42,0.55)" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, letterSpacing: "0.5px", color: "var(--coral)" }}>{p.n}</span>
                <h3 style={{ margin: "14px 0 0", fontFamily: "var(--font-sans)", fontSize: 20, fontWeight: 600, letterSpacing: "-0.4px", color: "var(--charcoal)" }}>{p.t}</h3>
                <p style={{ margin: "10px 0 0", fontFamily: "var(--font-sans)", fontSize: 15.5, lineHeight: 1.6, color: "var(--body)" }}>{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* 5 — Work teaser */}
      <Band id="work" py={70}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 34, flexWrap: "wrap" }}>
          <Reveal><SectionHead eyebrow="Selected work" eyebrowTone="coral" title="A few things we've built" /></Reveal>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--muted)", maxWidth: 280, textAlign: "right" }}>See more inside each service tab.</span>
        </div>
        <Reveal>
          <div style={{ marginBottom: 16, fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 600, letterSpacing: "1.4px", textTransform: "uppercase", color: "var(--coral)" }}>Website</div>
          <SiteShowcase url={work.site.url} host={work.site.host} title={work.site.title} blurb={work.site.blurb} tags={work.site.tags} shot={work.site.shot} />
        </Reveal>
        <Reveal delay={60} style={{ marginTop: 48 }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 600, letterSpacing: "1.4px", textTransform: "uppercase", color: "var(--coral)" }}>Brand &amp; logos</div>
          <p style={{ margin: "8px 0 0", fontFamily: "var(--font-sans)", fontSize: 15.5, lineHeight: 1.55, color: "var(--muted)", maxWidth: 460 }}>A full identity for The Rise Above Podcast: primary lockup, light variant, and icon mark.</p>
        </Reveal>
        <Reveal delay={80} className="r-stack" style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <WorkImage src={brand.primary.fallback} alt={brand.primary.alt} label={brand.primary.label} bg={brand.primary.bg} scale={1.25} />
          <WorkImage src={brand.light.fallback} alt={brand.light.alt} label={brand.light.label} bg={brand.light.bg} scale={1.25} />
          <WorkImage src={brand.mark.fallback} alt={brand.mark.alt} label={brand.mark.label} bg={brand.mark.bg} scale={1.4} />
        </Reveal>
      </Band>

      {/* 6 — Closing CTA */}
      <section style={{ background: "var(--coral)", position: "relative", overflow: "hidden" }}>
        <span aria-hidden style={{ position: "absolute", bottom: -180, right: -120, width: 420, height: 420, borderRadius: "50%", background: "rgba(250,246,238,0.10)" }} />
        <div style={{ position: "relative", maxWidth: "var(--content-max)", margin: "0 auto", padding: "64px var(--content-gutter)", display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", justifyContent: "space-between" }}>
          <Reveal>
            <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-1.2px", lineHeight: 1.05, color: "var(--cream)", textWrap: "balance" }}>
              Ready to look the part<span style={{ color: "var(--coral-tint)" }}>.</span>
            </h2>
            <p style={{ margin: "14px 0 0", maxWidth: 460, fontFamily: "var(--font-sans)", fontSize: 17.5, lineHeight: 1.5, color: "rgba(250,246,238,0.9)" }}>
              A free 15-minute call. No pitch, no pressure.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <button onClick={() => onNavigate("contact")} className="pdg-ctabtn" style={{ height: 54, padding: "0 30px", background: "var(--charcoal)", color: "var(--cream)", border: "none", borderRadius: "var(--radius-md)", fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "transform 180ms var(--ease-house), box-shadow 180ms var(--ease-house)" }}>
              Book with us
            </button>
          </Reveal>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .pdg-aurora .ab { position: absolute; border-radius: 50%; opacity: 0.55; will-change: transform; }
        .pdg-aurora .ab1 { width: 46%; height: 60%; top: -8%;  left: -4%;  animation: abDrift1 20s ease-in-out infinite; }
        .pdg-aurora .ab2 { width: 42%; height: 56%; top: 22%;  left: 26%;  animation: abDrift2 24s ease-in-out infinite; }
        .pdg-aurora .ab3 { width: 40%; height: 54%; top: -6%;  right: 4%;  animation: abDrift3 22s ease-in-out infinite; }
        .pdg-aurora .ab4 { width: 38%; height: 50%; bottom: -10%; right: 18%; animation: abDrift1 26s ease-in-out infinite reverse; }
        .pdg-aurora .ab5 { width: 34%; height: 46%; bottom: -8%; left: 12%;  animation: abDrift2 21s ease-in-out infinite; }
        @keyframes abDrift1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(6%, 5%) scale(1.12); } }
        @keyframes abDrift2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-7%, 4%) scale(1.1); } }
        @keyframes abDrift3 { 0%,100% { transform: translate(0,0) scale(1.05); } 50% { transform: translate(4%, -6%) scale(0.94); } }

        .hh-rot { display: inline-block; height: 1.02em; line-height: 1.02em; overflow: hidden; vertical-align: bottom; width: 4.481em; animation: hhWidth 10s cubic-bezier(0.76,0,0.24,1) infinite; }
        .hh-rot-track { display: flex; flex-direction: column; align-items: flex-start; animation: hhSpin 10s cubic-bezier(0.76,0,0.24,1) infinite; }
        .hh-rot-track > span { height: 1.02em; line-height: 1.02em; white-space: nowrap; text-align: left; }
        @keyframes hhWidth {
          0%,17%   { width: 4.481em; }
          22%,42%  { width: 3.933em; }
          47%,67%  { width: 3.991em; }
          72%,92%  { width: 3.075em; }
          97%,100% { width: 4.481em; }
        }
        @keyframes hhSpin {
          0%,17%    { transform: translateY(0); }
          22%,42%   { transform: translateY(-1.02em); }
          47%,67%   { transform: translateY(-2.04em); }
          72%,92%   { transform: translateY(-3.06em); }
          97%,100%  { transform: translateY(-4.08em); }
        }

        .hh-card {
          position: absolute; width: 218px; padding: 16px; border-radius: 18px;
          background: var(--cream); border: 1px solid var(--hairline);
          box-shadow: 0 40px 70px -34px rgba(44,44,42,0.6);
          will-change: transform;
        }
        .hh-card-top { display: flex; align-items: center; gap: 8px; }
        .hh-dot { width: 8px; height: 8px; border-radius: 50%; }
        .hh-tag { font-family: var(--font-sans); font-size: 12px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase; }
        .hh-cardA { top: 30px;  left: 8%;   z-index: 3; animation: hhFloatA 7s ease-in-out infinite; }
        .hh-cardB { top: 120px; right: 4%;  z-index: 2; animation: hhFloatB 8s ease-in-out infinite; }
        .hh-cardC { bottom: 26px; left: 22%; z-index: 4; animation: hhFloatC 6.4s ease-in-out infinite; }
        @keyframes hhFloatA { 0%,100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-16px) rotate(-4deg); } }
        @keyframes hhFloatB { 0%,100% { transform: translateY(0) rotate(5deg); } 50% { transform: translateY(14px) rotate(5deg); } }
        @keyframes hhFloatC { 0%,100% { transform: translateY(0) rotate(2deg); } 50% { transform: translateY(-12px) rotate(2deg); } }
        .hh-scan { left: 30%; animation: hhScan 2.6s ease-in-out infinite; }
        @keyframes hhScan { 0%,100% { left: 16%; opacity: 0.4; } 50% { left: 82%; opacity: 1; } }

        @media (max-width: 900px) {
          .results-grid { grid-template-columns: 1fr !important; gap: 26px !important; }
          .home-hero-grid { grid-template-columns: 1fr !important; gap: 8px !important; padding-top: 56px !important; padding-bottom: 40px !important; text-align: center; }
          /* Center every piece of the hero copy on stacked layouts. The inline
             max-width on the headline is overridden here so the balanced box
             actually sits in the middle instead of hugging the left. */
          .hh-copy { text-align: center; }
          .hh-copy > * { margin-left: auto !important; margin-right: auto !important; }
          .home-hero-grid .hh-copy h1 { max-width: 520px !important; text-align: center !important; }
          .home-hero-grid .hh-copy p  { max-width: 520px !important; text-align: center !important; }
          .home-hero-grid .hh-copy > div:last-child { justify-content: center; }
          /* Stabilise the rotating word: hold a fixed slot width (widest word)
             so the centred line can't reflow, jitter, or spill onto the line
             above. The vertical word-spin keeps running. */
          .hh-rot { width: 4.481em !important; animation: none !important; }

          /* Balanced card cluster — the three cards form a centred stack under
             the copy, symmetric about the middle and fully inside the stage.
             The top margin keeps the floating cards clear of the buttons. */
          .hh-stage { height: 392px !important; max-width: 380px; margin: 44px auto 0; }
          .hh-card { width: 164px; padding: 14px; }
          .hh-cardA { top: 0 !important;     left: calc(50% - 60px) !important;  right: auto !important; bottom: auto !important; }
          .hh-cardB { top: 104px !important; left: calc(50% - 140px) !important; right: auto !important; bottom: auto !important; }
          .hh-cardC { top: 210px !important; left: calc(50% - 16px) !important;  right: auto !important; bottom: auto !important; }
        }
        @media (max-width: 480px) {
          .home-hero-grid .hh-copy h1 { max-width: 340px !important; }
          .home-hero-grid .hh-copy p  { max-width: 340px !important; }
          .hh-stage { height: 372px !important; max-width: 330px; margin: 28px auto 0; }
          .hh-card { width: 150px !important; padding: 13px !important; }
          .hh-cardA { top: 0 !important;     left: calc(50% - 57px) !important; }
          .hh-cardB { top: 100px !important; left: calc(50% - 135px) !important; }
          .hh-cardC { top: 200px !important; left: calc(50% - 15px) !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pdg-aurora .ab, .hh-card, .hh-scan { animation: none !important; }
          .hh-rot-track { animation: none !important; transform: translateY(0) !important; }
        }
      ` }} />
    </div>
  );
}
