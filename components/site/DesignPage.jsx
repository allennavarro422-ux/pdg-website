"use client";
/* DESIGN (web) — editorial / split-screen structure, teal accent. Asymmetric
 * text hero + floating browser wireframes, a live-site showcase, an editorial
 * rate list, a Starter vs Premium comparison, a three-step process, an FAQ, and
 * the closing CTA. data-line="websites" maps --accent -> teal. */
import React from "react";
import { Button, Eyebrow } from "@/components/ds";
import { Band } from "./Layout.jsx";
import { Reveal } from "./Reveal.jsx";
import { GlassField } from "./GlassField.jsx";
import { RuleHead, RateRow, SiteShowcase, FAQAccordion, ClosingCTA } from "./PageParts.jsx";
import { PDG_DATA } from "@/lib/data";
import { scrollToServiceId } from "@/lib/nav";

/* Floating browser-window wireframe mockup — the design-tab hero motif. */
function WebFrame({ style, anim, lines = 4, small = false }) {
  const bars = Array.from({ length: lines });
  return (
    <div
      className="pdg-frame"
      style={{ position: "absolute", background: "var(--cream)", border: "1px solid var(--hairline)", borderRadius: "var(--radius-lg)", boxShadow: "0 30px 70px -44px rgba(44,44,42,0.45)", overflow: "hidden", "--frame-anim": `${anim} ${small ? 7 : 8}s ease-in-out infinite`, ...style }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 14px", borderBottom: "1px solid var(--hairline)" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-soft)" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--hairline)" }} />
        <span style={{ marginLeft: "auto", width: 56, height: 6, borderRadius: 3, background: "var(--accent-tint)" }} />
      </div>
      <div style={{ padding: small ? "16px 16px 20px" : "20px 18px 26px", display: "flex", flexDirection: "column", gap: 11 }}>
        {bars.map((_, i) => (
          <span key={i} className="pdg-bar" style={{ height: i === 0 ? 9 : 7, borderRadius: 4, width: ["86%", "62%", "74%", "50%"][i % 4], background: i === 0 ? "var(--accent)" : i % 2 ? "var(--accent-soft)" : "var(--hairline)", transformOrigin: "left", animationDelay: `${(small ? 500 : 0) + i * 300}ms` }} />
        ))}
        <span className="pdg-caret" style={{ width: 2, height: small ? 12 : 15, background: "var(--accent)", borderRadius: 1 }} />
      </div>
    </div>
  );
}

export function DesignPage({ onNavigate }) {
  const data = PDG_DATA;
  const tab = data.serviceTabs.find((t) => t.key === "design");
  const services = tab.groups.flatMap((g) => g.services);
  const details = data.serviceDetails;
  const work = data.work.site;

  const steps = [
    { n: "1", t: "Plan", d: "A short call to map what your site actually needs to do." },
    { n: "2", t: "Design", d: "Every page is designed around your brand and your customer." },
    { n: "3", t: "Build & launch", d: "Developed, tested, connected, and shipped." },
  ];

  return (
    <div data-line="websites">
      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--canvas)" }}>
        <GlassField tone="teal" />
        <div className="r-hero" style={{ position: "relative", maxWidth: "var(--content-max)", margin: "0 auto", padding: "58px var(--content-gutter) 50px", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 48, alignItems: "center" }}>
          <div>
            <Reveal delay={70}><Eyebrow tone="accent">{tab.eyebrow}</Eyebrow></Reveal>
            <Reveal delay={140} as="h1" className="r-htitle" style={{ margin: "18px 0 0", maxWidth: 560, fontFamily: "var(--font-sans)", fontSize: 56, fontWeight: 700, letterSpacing: "-2px", lineHeight: 1.02, color: "var(--charcoal)", textWrap: "balance" }}>
              Design that makes you look the part<span style={{ color: "var(--accent)" }}>.</span>
            </Reveal>
            <Reveal delay={210} as="p" style={{ margin: "22px 0 0", maxWidth: 460, fontFamily: "var(--font-sans)", fontSize: 20, lineHeight: 1.55, color: "var(--muted)" }}>
              Custom websites and logos, built from scratch, never a template.
            </Reveal>
            <Reveal delay={280} style={{ marginTop: 30, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Button variant="accent" size="lg" iconRight="→" onClick={() => onNavigate("contact", "Premium Business Website")}>Start a project</Button>
              <Button variant="secondary" size="lg" onClick={() => scrollToServiceId("web-services")}>See pricing</Button>
            </Reveal>
            <Reveal delay={380} style={{ marginTop: 42, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 11.5, fontWeight: 600, letterSpacing: "1.4px", textTransform: "uppercase", color: "var(--muted)" }}>Scroll to explore</span>
              <span className="pdg-scrollcue" style={{ color: "var(--accent)" }}>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M8 2v11M3.5 8.5L8 13l4.5-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <div className="pdg-frame-stage" style={{ position: "relative", height: 380 }}>
              <WebFrame style={{ top: 6, right: 0, width: 300 }} anim="pdgFrameA" lines={4} />
              <WebFrame style={{ bottom: 4, left: 0, width: 244 }} anim="pdgFrameB" lines={3} small />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Live-site showcase */}
      <Band bg="var(--surface-soft)" py={56}>
        <Reveal style={{ marginBottom: 34 }}><RuleHead sub="A full marketing site designed and built end to end.">Recent work</RuleHead></Reveal>
        <Reveal delay={80}>
          <SiteShowcase url={work.url} host={work.host} title={work.title} blurb={work.blurb} tags={work.tags} shot={work.shot} />
        </Reveal>
      </Band>

      {/* Editorial rate list */}
      <Band id="web-services" py={42}>
        <Reveal style={{ marginBottom: 8 }}><RuleHead sub="Every site is custom. Prices are starting points that scale with scope.">Web design services</RuleHead></Reveal>
        <Reveal delay={60} style={{ marginTop: 30, borderBottom: "1px solid var(--hairline)" }}>
          {services.map((s, i) => (
            <RateRow key={s.name} name={s.name} price={s.price} description={s.description} badge={s.badge} details={details[s.name]} big={i === 0} onBook={(name) => onNavigate("contact", name)} />
          ))}
        </Reveal>
      </Band>

      {/* Two tiers */}
      <Band py={56}>
        <Reveal><RuleHead sub="Both are fully custom, from scratch. The difference is how far the site works for you.">Starter vs Premium</RuleHead></Reveal>

        <div className="r-stack" style={{ marginTop: 34, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[["Depth", "Done for you", "Copywriting, full on-page SEO, and a discovery plan. Starter is custom design around content you provide."], ["Interaction", "It moves", "Animation and richer, interactive moments. Starter is clean, fast, and static."], ["Function", "It does more", "Booking, payments, and CRM wired in. Starter ships with a contact form."]].map(([k, t, d]) => (
            <Reveal key={k}>
              <div style={{ background: "var(--cream)", border: "1px solid var(--hairline)", borderRadius: "var(--radius-xl)", padding: 24, height: "100%", boxShadow: "0 20px 44px -30px rgba(44,44,42,.55)" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "var(--accent)" }}>{k}</span>
                <h3 style={{ margin: "10px 0 0", fontFamily: "var(--font-sans)", fontSize: 19, fontWeight: 600, letterSpacing: "-.3px", color: "var(--charcoal)" }}>{t}</h3>
                <p style={{ margin: "8px 0 0", fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.55, color: "var(--body)" }}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80} className="r-table" style={{ marginTop: 22, border: "1px solid var(--hairline)", borderRadius: "var(--radius-xl)", overflow: "hidden", background: "var(--cream)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr" }}>
            <div style={{ padding: "20px 22px", fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", color: "var(--muted)", alignSelf: "center" }}>What you get</div>
            <div style={{ padding: "18px 22px" }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 19, fontWeight: 700, letterSpacing: "-.4px", color: "var(--charcoal)" }}>Starter</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 600, color: "var(--accent)", marginTop: 2 }}>from $1,800</div>
            </div>
            <div style={{ padding: "18px 22px", background: "var(--accent)" }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 19, fontWeight: 700, letterSpacing: "-.4px", color: "var(--cream)" }}>Premium <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", background: "rgba(255,255,255,.22)", padding: "3px 8px", borderRadius: 20, verticalAlign: "middle", color: "var(--cream)" }}>Flagship</span></div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 600, color: "var(--cream)", opacity: .9, marginTop: 2 }}>from $3,500</div>
            </div>
          </div>
          {[["Pages", "3 to 4 custom pages", "5 to 7 custom pages", false], ["Design", "Fully custom, from scratch", "Fully custom, from scratch", false], ["Copywriting", "You provide, PDG polishes", "Written for you", true], ["SEO", "Basic setup", "Full on-page SEO", true], ["Interactions", "Clean, static, fast", "Animation & richer interactions", true], ["Integrations", "Contact form", "Booking, payments, CRM", true], ["Strategy", "Sitemap guidance", "Discovery + conversion plan", true], ["Analytics", "Basic", "Analytics + conversion tracking", false], ["Timeline", "2 to 3 weeks", "4 to 6 weeks", false], ["After launch", "30 day fixes", "Priority, care-plan ready", true]].map(([f, s, p, only]) => (
            <div key={f} style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", borderTop: "1px solid var(--hairline)" }}>
              <div style={{ padding: "14px 22px", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--charcoal)" }}>{f}</div>
              <div style={{ padding: "14px 22px", fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.5, color: "var(--muted)" }}>{s}</div>
              <div style={{ padding: "14px 22px", fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.5, color: "var(--charcoal)", background: "color-mix(in srgb, var(--accent) 7%, transparent)", fontWeight: only ? 600 : 500, display: "flex", alignItems: "center", gap: 7 }}>{only ? <span style={{ color: "var(--accent)", flex: "0 0 auto" }}>★</span> : null}{p}</div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={120} style={{ marginTop: 16 }}>
          <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.6, color: "var(--muted)" }}>★ = Premium only. <strong style={{ color: "var(--charcoal)" }}>Starter makes you look the part. Premium makes the site do the work.</strong></p>
        </Reveal>
      </Band>

      {/* Process */}
      <Band bg="var(--surface-soft)" py={56}>
        <Reveal><RuleHead>How a build goes</RuleHead></Reveal>
        <div className="r-stack" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div style={{ background: "var(--cream)", border: "1px solid var(--hairline)", borderRadius: "var(--radius-xl)", padding: 25, height: "100%", boxShadow: "0 20px 44px -30px rgba(44,44,42,0.55)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--accent)", color: "var(--cream)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15 }}>{s.n}</span>
                  <span style={{ width: 30, height: 3, borderRadius: 2, background: "var(--accent)" }} />
                </div>
                <h3 style={{ margin: "18px 0 0", fontFamily: "var(--font-sans)", fontSize: 21, fontWeight: 600, letterSpacing: "-0.3px", color: "var(--charcoal)" }}>{s.t}</h3>
                <p style={{ margin: "10px 0 0", fontFamily: "var(--font-sans)", fontSize: 15.5, lineHeight: 1.6, color: "var(--body)" }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* FAQ */}
      <Band py={56}>
        <div className="r-stack" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 48, alignItems: "start" }}>
          <Reveal><RuleHead sub="Straight answers before we ever talk.">Common questions</RuleHead></Reveal>
          <Reveal delay={80}><FAQAccordion items={tab.faq} /></Reveal>
        </div>
      </Band>

      {/* Closing */}
      <Band bg="var(--surface-soft)" py={42}>
        <Reveal><ClosingCTA owner="Allen" onNavigate={onNavigate} headline="Ready for a site that looks the part?" /></Reveal>
      </Band>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (prefers-reduced-motion: no-preference) {
          .pdg-scrollcue { animation: pdgScrollCue 1.8s var(--ease-house) infinite; }
          .pdg-frame { animation: var(--frame-anim); }
          .pdg-bar { animation: pdgBarDraw 4s cubic-bezier(0.5,0,0.2,1) infinite; }
          .pdg-caret { animation: pdgCaret 1s steps(1) infinite; }
        }
        @keyframes pdgBarDraw { 0% { transform: scaleX(0); opacity: 0.35; } 12% { transform: scaleX(1); opacity: 1; } 78% { transform: scaleX(1); opacity: 1; } 92%,100% { transform: scaleX(0); opacity: 0.35; } }
        @keyframes pdgCaret { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
        @keyframes pdgScrollCue { 0%,100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
        @keyframes pdgFrameA { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pdgFrameB { 0%,100% { transform: translateY(0); } 50% { transform: translateY(10px); } }

        @media (max-width: 640px) {
          [data-line="websites"] .r-table { overflow: visible !important; }
          [data-line="websites"] .r-table > div { grid-template-columns: 1fr 1fr !important; min-width: 0 !important; }
          [data-line="websites"] .r-table > div > *:nth-child(1) { grid-column: 1 / -1 !important; padding-bottom: 4px !important; }
          [data-line="websites"] .r-table > div > *:nth-child(2),
          [data-line="websites"] .r-table > div > *:nth-child(3) { padding-top: 10px !important; padding-bottom: 12px !important; font-size: 13.5px !important; }
          [data-line="websites"] .r-table > div:not(:first-child) > *:nth-child(2)::before { content: "Starter"; display: block; font-family: var(--font-sans); font-size: 10px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase; color: var(--muted); margin-bottom: 3px; }
          [data-line="websites"] .r-table > div:not(:first-child) > *:nth-child(3)::before { content: "Premium"; display: block; font-family: var(--font-sans); font-size: 10px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase; color: var(--accent); margin-bottom: 3px; }
          [data-line="websites"] .r-table > div:not(:first-child) > *:nth-child(2),
          [data-line="websites"] .r-table > div:not(:first-child) > *:nth-child(3) { display: block !important; }
          [data-line="websites"] .r-table > div:not(:first-child) > *:nth-child(3) > span:first-child { margin-right: 5px; }
        }
        @media (max-width: 820px) {
          [data-line="websites"] .pdg-frame-stage { height: auto !important; display: flex; flex-direction: column; gap: 16px; }
          [data-line="websites"] .pdg-frame {
            position: relative !important;
            top: auto !important; right: auto !important; bottom: auto !important; left: auto !important;
            width: 100% !important; max-width: 340px; margin: 0 auto;
            animation: none !important;
          }
        }
      ` }} />
    </div>
  );
}
