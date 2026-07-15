"use client";
/* PACKAGES — an interactive "Bundle Builder": toggle the three services and the
 * price, savings bar, and named bundle animate in real time. Quick-picks, an
 * "always included" strip, a how-it-works path, and a bundles FAQ. Gold line. */
import React, { useState, useRef, useEffect } from "react";
import { Band } from "./Layout.jsx";
import { Reveal } from "./Reveal.jsx";
import { ClosingCTA } from "./PageParts.jsx";

const KP = { sans: "var(--font-sans)" };

const KP_SERVICES = [
  { key: "Website", label: "Website", solo: 1800, color: "#1D9E75", deep: "var(--teal-deep)", tint: "var(--teal-tint)", blurb: "A custom marketing site",
    glyph: <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M3 8.5h18" stroke="currentColor" strokeWidth="1.8"/><circle cx="5.7" cy="6.3" r="0.7" fill="currentColor"/></svg> },
  { key: "Brand", label: "Brand", solo: 1200, color: "#2A6FDB", deep: "var(--blue-deep)", tint: "var(--blue-tint)", blurb: "Logo + full identity",
    glyph: <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 3l7.5 4.3v8.6L12 21l-7.5-5.1V7.3L12 3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M12 8v8M8.5 10.2v3.6M15.5 10.2v3.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg> },
  { key: "Video", label: "Video", solo: 1000, color: "#4A1E9C", deep: "var(--violet)", tint: "var(--violet-50)", blurb: "A launch film",
    glyph: <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M16 10l5-3v10l-5-3" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
];

const KP_BUNDLES = {
  "Brand+Website": { name: "The Launch Kit", price: 2600 },
  "Brand+Video": { name: "The Story Bundle", price: 1900 },
  "Video+Website": { name: "The Showcase", price: 2500 },
  "Brand+Video+Website": { name: "The Full Studio", price: 3400, flagship: true },
};
const KP_MAX_SAVE = 600;
const kpMoney = (n) => "$" + Math.round(n).toLocaleString();

function kpResolve(selected) {
  const chosen = KP_SERVICES.filter((s) => selected[s.key]);
  const separate = chosen.reduce((a, s) => a + s.solo, 0);
  const key = chosen.map((s) => s.key).sort().join("+");
  const info = KP_BUNDLES[key];
  if (chosen.length === 0) return { chosen, separate, total: 0, save: 0, name: null, empty: true };
  if (chosen.length === 1) return { chosen, separate, total: separate, save: 0, name: chosen[0].label + " only", single: true };
  return { chosen, separate, total: info ? info.price : separate, save: info ? separate - info.price : 0, name: info ? info.name : "Custom bundle", flagship: info && info.flagship };
}

function useCountUp(target, dur) {
  dur = dur || 520;
  const [val, setVal] = useState(target);
  const raf = useRef(0);
  const valRef = useRef(target);
  useEffect(() => { valRef.current = val; });
  useEffect(() => {
    const from = valRef.current, start = performance.now();
    cancelAnimationFrame(raf.current);
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (target - from) * e));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, dur]);
  return val;
}

function KP_Builder({ selected, setSelected, onNavigate }) {
  const r = kpResolve(selected);
  const total = useCountUp(r.total);
  const save = useCountUp(r.save);
  const toggle = (k) => setSelected((s) => ({ ...s, [k]: !s[k] }));
  const barPct = Math.min(100, (r.save / KP_MAX_SAVE) * 100);

  return (
    <div className="kp-builder" style={{ display: "grid", gridTemplateColumns: "1.35fr 0.85fr", gap: 22, alignItems: "stretch" }}>
      <div style={{ display: "grid", gridTemplateRows: "auto 1fr", gap: 14 }}>
        <span style={{ fontFamily: KP.sans, fontSize: 12.5, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--stone)" }}>1 · Pick your pieces</span>
        <div className="kp-tiles" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {KP_SERVICES.map((s) => {
            const on = !!selected[s.key];
            return (
              <button key={s.key} onClick={() => toggle(s.key)} aria-pressed={on} className="kp-tile"
                style={{ position: "relative", textAlign: "left", cursor: "pointer", borderRadius: "var(--radius-xl)", padding: "20px 18px 18px",
                  background: on ? s.tint : "var(--cream)", border: `1.5px solid ${on ? s.color : "var(--hairline)"}`,
                  boxShadow: on ? `0 22px 44px -26px ${s.color}` : "0 14px 30px -26px rgba(44,44,42,0.5)",
                  transform: on ? "translateY(-6px)" : "none", transition: "transform var(--t-base), box-shadow var(--t-base), background var(--t-base), border-color var(--t-base)" }}>
                <span style={{ position: "absolute", top: 14, right: 14, width: 22, height: 22, borderRadius: "50%", display: "grid", placeItems: "center",
                  background: on ? s.color : "transparent", border: on ? "none" : "1.5px solid var(--hairline)", transition: "all var(--t-base)" }}>
                  {on ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg> : null}
                </span>
                <span style={{ display: "inline-grid", placeItems: "center", width: 46, height: 46, borderRadius: "var(--radius-badge)", background: on ? "var(--cream)" : s.tint, color: s.color, transition: "background var(--t-base)" }}>{s.glyph}</span>
                <div style={{ marginTop: 14, fontFamily: KP.sans, fontSize: 18, fontWeight: 700, letterSpacing: "-0.4px", color: "var(--charcoal)" }}>{s.label}</div>
                <div style={{ marginTop: 3, fontFamily: KP.sans, fontSize: 13, color: "var(--muted)" }}>{s.blurb}</div>
                <div style={{ marginTop: 12, fontFamily: KP.sans, fontSize: 13.5, fontWeight: 600, color: on ? s.deep : "var(--stone)" }}>{kpMoney(s.solo)} solo</div>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius-xl)", background: "var(--charcoal)", color: "var(--cream)", padding: "24px 26px", display: "flex", flexDirection: "column" }}>
        <span aria-hidden="true" style={{ position: "absolute", top: -90, right: -70, width: 260, height: 260, borderRadius: "50%", background: "color-mix(in srgb, var(--gold) 30%, transparent)", filter: "blur(30px)" }} />
        <span style={{ position: "relative", fontFamily: KP.sans, fontSize: 12.5, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--gold-light)" }}>2 · Your bundle</span>

        {r.empty ? (
          <div style={{ position: "relative", margin: "auto 0", fontFamily: KP.sans, fontSize: 16, lineHeight: 1.5, color: "rgba(255,255,255,0.7)" }}>Select a service to start building.</div>
        ) : (
          <React.Fragment>
            <div style={{ position: "relative", marginTop: 12 }}>
              <span className="kp-name" style={{ fontFamily: KP.sans, fontSize: 24, fontWeight: 700, letterSpacing: "-0.6px", color: "var(--cream)" }}>{r.name}</span>
              {r.flagship ? <span style={{ marginLeft: 10, fontFamily: KP.sans, fontSize: 10, fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", color: "var(--charcoal)", background: "var(--gold-light)", padding: "3px 9px", borderRadius: "var(--radius-pill)", verticalAlign: "middle" }}>Best value</span> : null}
            </div>

            <div style={{ position: "relative", marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              {r.chosen.map((s) => (
                <div key={s.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: KP.sans, fontSize: 14 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.82)" }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: s.color }} />{s.label}</span>
                  <span style={{ color: "rgba(255,255,255,0.55)" }}>{kpMoney(s.solo)}</span>
                </div>
              ))}
            </div>

            <div style={{ position: "relative", marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.14)" }}>
              {r.save > 0 ? (
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: KP.sans, fontSize: 13.5, color: "rgba(255,255,255,0.6)" }}>Separately</span>
                  <span style={{ fontFamily: KP.sans, fontSize: 15, color: "rgba(255,255,255,0.55)", textDecoration: "line-through" }}>{kpMoney(r.separate)}</span>
                </div>
              ) : null}
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 6 }}>
                <span style={{ fontFamily: KP.sans, fontSize: 14, fontWeight: 600, color: "var(--cream)" }}>Bundled</span>
                <span style={{ fontFamily: KP.sans, fontSize: 34, fontWeight: 700, letterSpacing: "-1.2px", color: "var(--gold-light)" }}>{kpMoney(total)}</span>
              </div>
            </div>

            <div style={{ position: "relative", marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: KP.sans, fontSize: 12.5, color: "rgba(255,255,255,0.65)", marginBottom: 6 }}>
                <span>You save</span><span style={{ fontWeight: 700, color: r.save > 0 ? "var(--gold-light)" : "rgba(255,255,255,0.5)" }}>{kpMoney(save)}</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.14)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: barPct + "%", borderRadius: 3, background: "linear-gradient(90deg, var(--gold), var(--gold-light))", transition: "width var(--t-base)" }} />
              </div>
              {r.single ? <div style={{ marginTop: 8, fontFamily: KP.sans, fontSize: 12.5, color: "rgba(255,255,255,0.6)" }}>Add another piece to unlock bundle pricing.</div> : null}
            </div>

            <button onClick={() => onNavigate("contact", r.name)} className="kp-book" style={{ position: "relative", marginTop: "auto", width: "100%", height: 50, borderRadius: "var(--radius-pill)", border: "none", background: "var(--gold)", color: "var(--cream)", fontFamily: KP.sans, fontSize: 15.5, fontWeight: 600, cursor: "pointer", transition: "transform var(--t-quick), background var(--t-quick)" }}>
              Book {r.single ? "this service" : "this bundle"}
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export function PackagesPage({ onNavigate }) {
  const [selected, setSelected] = useState({ Website: true, Brand: true, Video: true });

  const quick = [
    { key: "The Launch Kit", set: { Website: true, Brand: true, Video: false }, combines: ["Website", "Brand"], price: 2600, save: 400, blurb: "Open your doors online with a site and identity that match from the first pixel." },
    { key: "The Story Bundle", set: { Website: false, Brand: true, Video: true }, combines: ["Brand", "Video"], price: 1900, save: 300, blurb: "A full identity plus a launch film to introduce it to the world." },
    { key: "The Full Studio", set: { Website: true, Brand: true, Video: true }, combines: ["Website", "Brand", "Video"], price: 3400, save: 600, flagship: true, blurb: "Every asset your business needs, all built by one studio in one voice." },
  ];
  const applyQuick = (q) => {
    setSelected(q.set);
    const el = document.getElementById("kp-builder-anchor");
    if (el) window.scrollTo({ top: window.pageYOffset + el.getBoundingClientRect().top - 90, behavior: "smooth" });
  };

  const included = [
    { t: "One point of contact", d: "The same person from kickoff to launch, so nothing is lost between vendors." },
    { t: "One shared timeline", d: "Every piece planned and built together, not stitched after the fact." },
    { t: "One bundled invoice", d: "A single price agreed up front. No surprise line items." },
  ];
  const steps = [
    { n: "01", t: "Pick your pieces", d: "Choose the services you need in the builder above." },
    { n: "02", t: "One kickoff call", d: "A single conversation sets the direction for all of it." },
    { n: "03", t: "One launch", d: "Everything ships together, ready to go live the same week." },
  ];
  const faqs = [
    { q: "Do bundles actually cost less?", a: "Yes. Every bundle is priced below buying each service on its own, and the more you combine, the more you save." },
    { q: "Can I add a service later?", a: "Absolutely. Start with two and add the third whenever you're ready; the bundle price adjusts to match." },
    { q: "What if I only need one service?", a: "Then a bundle isn't for you. Book that single service from its own tab and keep things simple." },
    { q: "How long does a bundle take?", a: "Most run 4 to 8 weeks depending on scope, all on one shared timeline so nothing waits on a handoff." },
  ];

  return (
    <div data-line="packages">
      <style dangerouslySetInnerHTML={{ __html: `
        .kp-tile:hover { transform: translateY(-6px) !important; }
        .kp-book:hover { transform: translateY(-2px); background: var(--gold-deep); }
        .kp-quick { transition: transform var(--t-base), box-shadow var(--t-base), border-color var(--t-base); }
        .kp-quick:hover { transform: translateY(-4px); box-shadow: 0 30px 56px -32px rgba(44,44,42,0.6); border-color: color-mix(in srgb, var(--gold) 55%, transparent); }
        @media (max-width: 860px) {
          .kp-builder { grid-template-columns: 1fr !important; }
          .kp-tiles { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .kp-tiles { grid-template-columns: 1fr !important; }
        }

        .kp-scene { position: relative; width: 460px; max-width: 100%; height: 208px; }
        .kp-scene-glow { position: absolute; top: 50%; left: 50%; width: 300px; height: 200px; transform: translate(-50%,-50%); background: radial-gradient(circle, var(--gold-tint), transparent 68%); filter: blur(14px); }
        .kp-card { position: absolute; left: 50%; top: 50%; display: flex; align-items: center; gap: 10px; width: 150px; padding: 12px 15px; border-radius: 15px; background: var(--cream); border: 1px solid var(--hairline); box-shadow: 0 22px 46px -26px rgba(44,44,42,0.5); white-space: nowrap; }
        .kp-card-ico { flex: 0 0 auto; display: grid; place-items: center; width: 32px; height: 32px; border-radius: 10px; }
        .kp-card-label { font-family: var(--font-sans); font-size: 15px; font-weight: 700; letter-spacing: -0.3px; color: var(--charcoal); }
        .kp-card-web   { z-index: 1; animation: kpWeb 7s cubic-bezier(0.16,1,0.3,1) infinite; }
        .kp-card-brand { z-index: 2; animation: kpBrand 7s cubic-bezier(0.16,1,0.3,1) infinite; }
        .kp-card-video { z-index: 3; animation: kpVideo 7s cubic-bezier(0.16,1,0.3,1) infinite; }
        .kp-tag { position: absolute; left: 50%; top: 50%; z-index: 4; display: flex; flex-direction: column; gap: 2px; padding: 13px 20px; border-radius: 16px; background: var(--charcoal); box-shadow: 0 26px 50px -22px color-mix(in srgb, var(--gold) 70%, transparent); animation: kpTag 7s cubic-bezier(0.16,1,0.3,1) infinite; }
        .kp-tag-top { font-family: var(--font-sans); font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--gold-light); }
        .kp-tag-price { font-family: var(--font-sans); font-size: 27px; font-weight: 700; letter-spacing: -1px; color: var(--gold-light); }
        .kp-save { position: absolute; left: 50%; top: 50%; z-index: 5; font-family: var(--font-sans); font-size: 12.5px; font-weight: 700; color: var(--cream); background: var(--gold-deep); padding: 6px 13px; border-radius: var(--radius-pill); box-shadow: 0 16px 30px -18px var(--gold-deep); animation: kpSave 7s cubic-bezier(0.16,1,0.3,1) infinite; }

        @keyframes kpWeb {
          0%      { transform: translate(calc(-50% - 220px), calc(-50% - 110px)) rotate(-24deg); opacity: 0; }
          16%, 80% { transform: translate(calc(-50% - 72px), calc(-50% - 36px)) rotate(-7deg); opacity: 1; }
          94%, 100% { transform: translate(calc(-50% - 220px), calc(-50% - 110px)) rotate(-24deg); opacity: 0; }
        }
        @keyframes kpBrand {
          0%      { transform: translate(calc(-50% - 96px), calc(-50% + 150px)) rotate(2deg); opacity: 0; }
          22%, 80% { transform: translate(calc(-50% - 80px), -50%) rotate(-1deg); opacity: 1; }
          94%, 100% { transform: translate(calc(-50% - 96px), calc(-50% + 150px)) rotate(2deg); opacity: 0; }
        }
        @keyframes kpVideo {
          0%      { transform: translate(calc(-50% - 220px), calc(-50% + 120px)) rotate(24deg); opacity: 0; }
          28%, 80% { transform: translate(calc(-50% - 72px), calc(-50% + 36px)) rotate(6deg); opacity: 1; }
          94%, 100% { transform: translate(calc(-50% - 220px), calc(-50% + 120px)) rotate(24deg); opacity: 0; }
        }
        @keyframes kpTag {
          0%, 34%  { transform: translate(calc(-50% + 108px), -50%) scale(0.6); opacity: 0; }
          42%      { transform: translate(calc(-50% + 108px), -50%) scale(1.08); opacity: 1; }
          48%, 80% { transform: translate(calc(-50% + 108px), -50%) scale(1); opacity: 1; }
          94%, 100% { transform: translate(calc(-50% + 108px), -50%) scale(0.6); opacity: 0; }
        }
        @keyframes kpSave {
          0%, 50%  { transform: translate(calc(-50% + 116px), calc(-50% + 56px)) translateY(8px); opacity: 0; }
          60%, 80% { transform: translate(calc(-50% + 116px), calc(-50% + 56px)) translateY(0); opacity: 1; }
          94%, 100% { transform: translate(calc(-50% + 116px), calc(-50% + 56px)) translateY(8px); opacity: 0; }
        }
        @media (max-width: 560px) {
          .kp-scene { transform: scale(0.78); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kp-card, .kp-tag, .kp-save { animation: none !important; opacity: 1 !important; }
          .kp-card-web   { transform: translate(calc(-50% - 72px), calc(-50% - 36px)) rotate(-7deg); }
          .kp-card-brand { transform: translate(calc(-50% - 80px), -50%) rotate(-1deg); }
          .kp-card-video { transform: translate(calc(-50% - 72px), calc(-50% + 36px)) rotate(6deg); }
          .kp-tag  { transform: translate(calc(-50% + 108px), -50%); }
          .kp-save { transform: translate(calc(-50% + 116px), calc(-50% + 56px)); }
        }
      ` }} />

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--canvas)" }}>
        <span aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(1000px 440px at 50% -14%, var(--gold-tint) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto", padding: "54px var(--content-gutter) 30px", textAlign: "center" }}>
          <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <span style={{ width: 26, height: 3, borderRadius: 2, background: "var(--accent)" }} />
            <span style={{ fontFamily: KP.sans, fontSize: 12.5, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--accent)" }}>Bundles</span>
            <span style={{ width: 26, height: 3, borderRadius: 2, background: "var(--accent)" }} />
          </Reveal>
          <Reveal delay={90} as="h1" style={{ margin: 0, fontFamily: KP.sans, fontSize: "clamp(38px, 6vw, 60px)", fontWeight: 700, letterSpacing: "-2px", lineHeight: 1.03, color: "var(--charcoal)", textWrap: "balance" }}>
            Build your bundle. Pay one price<span style={{ color: "var(--accent)" }}>.</span>
          </Reveal>
          <Reveal delay={160} as="p" style={{ margin: "20px auto 0", maxWidth: 540, fontFamily: KP.sans, fontSize: 19, lineHeight: 1.55, color: "var(--muted)" }}>
            Combine a website, a brand, and a film into one project. Toggle what you need below and watch the price, and your savings, update as you go.
          </Reveal>
        </div>
      </section>

      {/* BUILDER */}
      <Band py={34}>
        <span id="kp-builder-anchor" />
        <Reveal><KP_Builder selected={selected} setSelected={setSelected} onNavigate={onNavigate} /></Reveal>
      </Band>

      {/* QUICK PICKS */}
      <Band bg="var(--surface-soft)" py={54}>
        <Reveal style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontFamily: KP.sans, fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 700, letterSpacing: "-1px", color: "var(--charcoal)" }}>Popular starting points</h2>
          <span style={{ fontFamily: KP.sans, fontSize: 14.5, color: "var(--muted)" }}>Tap one to load it into the builder.</span>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 18 }}>
          {quick.map((q, i) => (
            <Reveal key={q.key} delay={i * 80}>
              <button onClick={() => applyQuick(q)} className="kp-quick" style={{ width: "100%", textAlign: "left", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column", gap: 14, padding: 22,
                borderRadius: "var(--radius-xl)", background: q.flagship ? "var(--gold-tint)" : "var(--cream)",
                border: `1px solid ${q.flagship ? "color-mix(in srgb, var(--gold) 42%, transparent)" : "var(--hairline)"}`, boxShadow: "0 20px 44px -30px rgba(44,44,42,0.55)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    {q.combines.map((c, k) => {
                      const sv = KP_SERVICES.find((s) => s.key === c);
                      return (
                        <React.Fragment key={c}>
                          {k > 0 ? <span style={{ fontFamily: KP.sans, fontSize: 13, fontWeight: 700, color: "var(--stone)" }}>+</span> : null}
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: "var(--radius-pill)", background: sv.tint, color: sv.deep, fontFamily: KP.sans, fontSize: 12.5, fontWeight: 600 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: sv.color }} />{c}</span>
                        </React.Fragment>
                      );
                    })}
                  </div>
                  {q.flagship ? <span style={{ fontFamily: KP.sans, fontSize: 10, fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", color: "var(--cream)", background: "var(--gold-deep)", padding: "3px 9px", borderRadius: "var(--radius-pill)" }}>Best value</span> : null}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontFamily: KP.sans, fontSize: 21, fontWeight: 700, letterSpacing: "-0.5px", color: "var(--charcoal)" }}>{q.key}</h3>
                  <p style={{ margin: "7px 0 0", fontFamily: KP.sans, fontSize: 14.5, lineHeight: 1.55, color: "var(--muted)" }}>{q.blurb}</p>
                </div>
                <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--hairline)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ display: "flex", alignItems: "baseline", gap: 5 }}><span style={{ fontFamily: KP.sans, fontSize: 12.5, color: "var(--stone)" }}>from</span><span style={{ fontFamily: KP.sans, fontSize: 24, fontWeight: 700, letterSpacing: "-0.6px", color: "var(--gold-deep)" }}>{kpMoney(q.price)}</span></span>
                  <span style={{ fontFamily: KP.sans, fontSize: 12.5, fontWeight: 700, color: "var(--gold-deep)", background: "var(--cream)", border: "1px solid color-mix(in srgb, var(--gold) 40%, transparent)", borderRadius: "var(--radius-pill)", padding: "3px 10px" }}>Save {kpMoney(q.save)}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ALWAYS INCLUDED */}
      <Band py={54}>
        <Reveal as="h2" style={{ margin: "0 0 26px", fontFamily: KP.sans, fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 700, letterSpacing: "-1px", color: "var(--charcoal)" }}>Every bundle, three promises</Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 16 }}>
          {included.map((c, i) => (
            <Reveal key={c.t} delay={i * 70}>
              <div style={{ height: "100%", padding: 22, borderRadius: "var(--radius-xl)", background: "var(--cream)", border: "1px solid var(--hairline)", boxShadow: "0 18px 40px -30px rgba(44,44,42,0.5)" }}>
                <span style={{ display: "inline-grid", placeItems: "center", width: 34, height: 34, borderRadius: "var(--radius-badge)", background: "var(--gold-tint)", color: "var(--gold-deep)", fontFamily: KP.sans, fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" }}>{`0${i + 1}`}</span>
                <h3 style={{ margin: "16px 0 0", fontFamily: KP.sans, fontSize: 18.5, fontWeight: 700, letterSpacing: "-0.4px", color: "var(--charcoal)" }}>{c.t}</h3>
                <p style={{ margin: "8px 0 0", fontFamily: KP.sans, fontSize: 14.5, lineHeight: 1.55, color: "var(--body)" }}>{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* HOW IT WORKS */}
      <Band bg="var(--surface-soft)" py={54}>
        <Reveal as="h2" style={{ margin: "0 0 30px", fontFamily: KP.sans, fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 700, letterSpacing: "-1px", color: "var(--charcoal)" }}>How bundling works</Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 18 }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div style={{ position: "relative", height: "100%", padding: "24px 22px", borderRadius: "var(--radius-xl)", background: "var(--cream)", border: "1px solid var(--hairline)" }}>
                <span style={{ fontFamily: KP.sans, fontSize: 34, fontWeight: 700, letterSpacing: "-1px", color: "var(--gold-light)" }}>{s.n}</span>
                <h3 style={{ margin: "10px 0 0", fontFamily: KP.sans, fontSize: 19, fontWeight: 700, letterSpacing: "-0.4px", color: "var(--charcoal)" }}>{s.t}</h3>
                <p style={{ margin: "8px 0 0", fontFamily: KP.sans, fontSize: 14.5, lineHeight: 1.55, color: "var(--body)" }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* FAQ */}
      <Band py={54}>
        <Reveal as="h2" style={{ margin: "0 0 24px", fontFamily: KP.sans, fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 700, letterSpacing: "-1px", color: "var(--charcoal)" }}>Bundle questions</Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 16 }}>
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 70}>
              <div style={{ height: "100%", padding: "22px 24px", borderRadius: "var(--radius-xl)", background: "var(--cream)", border: "1px solid var(--hairline)" }}>
                <h3 style={{ margin: 0, fontFamily: KP.sans, fontSize: 17.5, fontWeight: 700, letterSpacing: "-0.3px", color: "var(--charcoal)" }}>{f.q}</h3>
                <p style={{ margin: "9px 0 0", fontFamily: KP.sans, fontSize: 15, lineHeight: 1.6, color: "var(--body)" }}>{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* CLOSING */}
      <Band py={44}>
        <Reveal><ClosingCTA owner="Allen" onNavigate={onNavigate} headline="Not sure which pieces you need? Let's map it out together." /></Reveal>
      </Band>
    </div>
  );
}
