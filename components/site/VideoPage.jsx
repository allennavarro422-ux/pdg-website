"use client";
/* VIDEO — a cinematic "cutting room" experience. LIGHT/cream page, violet accent.
 * The literal playback/editor surfaces stay dark (timeline window, phone reel,
 * aspect-ratio frames) because those are actual screens. Signature animations:
 * a live editing timeline with sweeping playhead + waveform + self-typing
 * captions, a phone reel whose counters tick up live, a shoot->feed pipeline,
 * and an aspect-ratio morph. data-line="video" -> --accent = violet. */
import React, { useRef, useEffect } from "react";
import { Reveal } from "./Reveal.jsx";
import { YouTubeEmbed } from "./PageParts.jsx";
import { scrollToServiceId } from "@/lib/nav";

/* ---- CTA: solid violet, or a light hairline-outline ghost ---- */
function VX_Cta({ children, onClick, full, solid = true }) {
  const base = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, width: full ? "100%" : "auto", fontFamily: "var(--font-sans)", fontSize: 15.5, fontWeight: 600, letterSpacing: "-0.1px", borderRadius: "var(--radius-pill)", padding: "14px 26px", cursor: "pointer", transition: "all var(--t-quick)", boxSizing: "border-box" };
  const solidStyle = { ...base, color: "var(--cream)", background: "var(--violet)", border: "1px solid color-mix(in srgb, var(--violet) 60%, #000)", boxShadow: "0 16px 34px -20px var(--violet)" };
  const ghostStyle = { ...base, color: "var(--charcoal)", background: "transparent", border: "1px solid var(--hairline)" };
  return (
    <button onClick={onClick} className={solid ? "vx-cta" : "vx-ghost"} style={solid ? solidStyle : ghostStyle}>
      <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: solid ? "var(--violet-light)" : "var(--violet)", flex: "0 0 auto" }} />
      {children}
    </button>
  );
}

const VX = {
  page: "var(--canvas)",
  panel: "var(--surface-card)",
  panelSoft: "var(--surface-soft)",
  line: "var(--hairline)",
  lineSoft: "color-mix(in srgb, var(--charcoal) 8%, transparent)",
  glow: "color-mix(in srgb, var(--violet) 16%, transparent)",
  violetTint: "color-mix(in srgb, var(--violet) 9%, var(--canvas))",
  mono: "var(--font-mono, 'DM Mono', ui-monospace, monospace)",
};
const VXD = {
  panel: "color-mix(in srgb, var(--charcoal) 82%, #000)",
  track: "color-mix(in srgb, var(--charcoal) 94%, #000)",
  line: "rgba(255,255,255,0.10)",
  lineSoft: "rgba(255,255,255,0.05)",
};

export function VideoPage({ onNavigate }) {
  return (
    <div data-line="video" style={{ background: VX.page, color: "var(--charcoal)", position: "relative", overflow: "hidden" }}>
      <VideoStyles />
      <VX_Hero onNavigate={onNavigate} />
      <VX_Pipeline />
      <VX_Work />
      <VX_Gear />
      <VX_Reel onNavigate={onNavigate} />
      <VX_Closing onNavigate={onNavigate} />
    </div>
  );
}

/* ============================ HERO ============================ */
function VX_Hero({ onNavigate }) {
  const tcRef = useRef(null);
  const viewsRef = useRef(null);
  const likesRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let f = 0, views = 12420, likes = 843, acc = 0;
    const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n));
    const id = setInterval(() => {
      f = (f + 1) % (24 * 60);
      const s = Math.floor(f / 24), fr = f % 24;
      const mm = String(Math.floor(s / 60)).padStart(2, "0");
      const ss = String(s % 60).padStart(2, "0");
      const ff = String(fr).padStart(2, "0");
      if (tcRef.current) tcRef.current.textContent = `00:${mm}:${ss}:${ff}`;
      acc++;
      if (acc % 5 === 0) {
        views += Math.floor(Math.random() * 9) + 1;
        if (Math.random() > 0.55) likes += 1;
        if (viewsRef.current) viewsRef.current.textContent = fmt(views);
        if (likesRef.current) likesRef.current.textContent = fmt(likes);
      }
    }, 42);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ position: "relative" }}>
      <div aria-hidden="true" className="vx-glow" style={{ position: "absolute", top: "-10%", right: "-8%", width: 640, height: 640, borderRadius: "50%", background: `radial-gradient(circle, ${VX.glow}, transparent 62%)`, filter: "blur(20px)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(60,50,40,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(60,50,40,0.05) 1px, transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(circle at 60% 12%, #000, transparent 72%)", WebkitMaskImage: "radial-gradient(circle at 60% 12%, #000, transparent 72%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: "var(--content-max)", margin: "0 auto", padding: "26px var(--content-gutter) 40px" }}>
        <Reveal style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", fontFamily: VX.mono, fontSize: 12, letterSpacing: "0.5px", color: "var(--muted)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--charcoal)" }}>
            <span className="vx-rec" style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--coral)" }} />REC
          </span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span ref={tcRef} style={{ color: "var(--violet)" }}>00:00:00:00</span>
          <span style={{ marginLeft: "auto", display: "inline-flex", gap: 12, opacity: 0.85 }}>
            <span>4K</span><span style={{ opacity: 0.4 }}>·</span><span>60&nbsp;FPS</span><span style={{ opacity: 0.4 }}>·</span><span>SOUND&nbsp;ON</span>
          </span>
        </Reveal>

        <div className="vx-hero-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)", gap: 40, alignItems: "center", marginTop: 30 }}>
          <div>
            <Reveal delay={60}><span style={{ fontFamily: VX.mono, fontSize: 12.5, fontWeight: 500, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--violet)" }}>Motion &amp; Video</span></Reveal>
            <Reveal delay={130}>
              <h1 style={{ margin: "18px 0 0", fontFamily: "var(--font-sans)", fontSize: "clamp(44px, 6vw, 78px)", fontWeight: 700, letterSpacing: "-2.5px", lineHeight: 0.98, color: "var(--charcoal)", textWrap: "balance" }}>
                <span className="vx-word">Video that</span><br />
                <span className="vx-word vx-word-2">earns the</span><br />
                <span className="vx-word vx-word-3">scroll<span style={{ color: "var(--violet)" }}>.</span></span>
              </h1>
            </Reveal>
            <Reveal delay={220} as="p" style={{ margin: "26px 0 0", maxWidth: 440, fontFamily: "var(--font-sans)", fontSize: 18.5, lineHeight: 1.55, color: "var(--muted)" }}>
              We roll camera, cut for pace, and burn in captions, then hand it back ready to publish. One day on location becomes a month of content people actually stop for.
            </Reveal>
            <Reveal delay={300} style={{ marginTop: 30, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <VX_Cta onClick={() => onNavigate("contact", "Monthly Content Package")}>Start a project&nbsp;→</VX_Cta>
              <VX_Cta solid={false} onClick={() => scrollToServiceId("vx-reel")}>View the rate reel</VX_Cta>
            </Reveal>
          </div>

          <Reveal delay={240} style={{ display: "flex", justifyContent: "center" }}>
            <VX_Phone viewsRef={viewsRef} likesRef={likesRef} />
          </Reveal>
        </div>

        <Reveal delay={140} style={{ marginTop: 44 }}>
          <VX_Timeline />
        </Reveal>
      </div>
    </section>
  );
}

function VX_Phone({ viewsRef, likesRef }) {
  return (
    <div className="vx-phone-float" style={{ position: "relative", width: 232 }}>
      <div style={{ position: "relative", borderRadius: 34, padding: 9, background: "color-mix(in srgb, var(--charcoal) 92%, #000)", border: `1px solid ${VXD.line}`, boxShadow: `0 34px 70px -34px color-mix(in srgb, var(--violet) 55%, #000), 0 0 0 1px ${VXD.lineSoft}` }}>
        <div style={{ position: "relative", borderRadius: 26, overflow: "hidden", aspectRatio: "9 / 16", background: `linear-gradient(155deg, var(--violet) 0%, color-mix(in srgb, var(--violet) 55%, #000) 65%, #000 100%)` }}>
          <div aria-hidden="true" className="vx-scan" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.14), transparent)", height: "38%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 62, height: 6, borderRadius: 3, background: "rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <div className="vx-phone-play" style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(255,255,255,0.16)", backdropFilter: "blur(4px)", display: "grid", placeItems: "center", border: "1px solid rgba(255,255,255,0.3)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 5l12 7-12 7z" fill="#fff" /></svg>
            </div>
          </div>
          <div style={{ position: "absolute", right: 12, bottom: 74, display: "flex", flexDirection: "column", gap: 16, alignItems: "center", color: "#fff", fontFamily: VX.mono, fontSize: 11 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <span className="vx-heart" style={{ fontSize: 22, lineHeight: 1 }}>♥</span>
              <span ref={likesRef}>843</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
              <span>Share</span>
            </div>
          </div>
          <div style={{ position: "absolute", left: 12, right: 56, bottom: 40 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: VX.mono, fontSize: 10.5, color: "#fff", background: "rgba(0,0,0,0.35)", borderRadius: 20, padding: "4px 9px" }}>
              <span className="vx-rec" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--coral)" }} />
              <span ref={viewsRef}>12.4K</span>&nbsp;views
            </span>
            <div style={{ marginTop: 8, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "#fff", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>
              <span className="vx-cap">how we shot this in one take</span>
            </div>
          </div>
          <div style={{ position: "absolute", left: 12, right: 12, bottom: 20, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.25)" }}>
            <div className="vx-progress" style={{ height: "100%", borderRadius: 2, background: "#fff" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function VX_Timeline() {
  const clips = [
    { w: 15, label: "INTRO", c: "var(--violet)" },
    { w: 24, label: "A-ROLL", c: "color-mix(in srgb, var(--violet) 72%, #000)" },
    { w: 12, label: "CUT", c: "var(--coral)" },
    { w: 20, label: "B-ROLL", c: "color-mix(in srgb, var(--violet-light) 60%, var(--violet))" },
    { w: 17, label: "OUTRO", c: "color-mix(in srgb, var(--violet) 55%, #000)" },
  ];
  const bars = Array.from({ length: 72 });
  const ticks = ["00:00", "00:06", "00:12", "00:18", "00:24", "00:30"];
  return (
    <div style={{ position: "relative", borderRadius: 18, background: VXD.panel, border: `1px solid ${VXD.line}`, boxShadow: "0 40px 80px -46px color-mix(in srgb, var(--violet) 40%, #000)", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 18px", borderBottom: `1px solid ${VXD.lineSoft}` }}>
        <span style={{ display: "flex", gap: 7 }}>
          {["#E5674A", "#E4C377", "#5DCAA5"].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.85 }} />)}
        </span>
        <span style={{ fontFamily: VX.mono, fontSize: 12.5, color: "var(--stone)", marginLeft: 6 }}>PDG_reel_final.mp4</span>
        <span style={{ marginLeft: "auto", display: "inline-flex", gap: 8, alignItems: "center" }}>
          <span className="vx-render" style={{ fontFamily: VX.mono, fontSize: 11, color: "var(--violet-light)" }}>rendering…</span>
          <span style={{ fontFamily: VX.mono, fontSize: 11, fontWeight: 600, color: "var(--cream)", background: "var(--violet)", borderRadius: 6, padding: "4px 10px" }}>EXPORT</span>
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 18px 0", fontFamily: VX.mono, fontSize: 10.5, color: "var(--stone)", opacity: 0.85 }}>
        {ticks.map((t) => <span key={t}>{t}</span>)}
      </div>

      <div style={{ position: "relative", padding: "10px 18px 20px" }}>
        <div aria-hidden="true" className="vx-playhead" style={{ position: "absolute", top: 0, bottom: 12, width: 2, background: "var(--coral)", zIndex: 4, boxShadow: "0 0 14px 1px color-mix(in srgb, var(--coral) 70%, transparent)" }}>
          <span style={{ position: "absolute", top: -2, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "9px solid var(--coral)" }} />
        </div>

        <div style={{ display: "flex", gap: 6, height: 52 }}>
          {clips.map((c, i) => (
            <div key={i} className="vx-clip" style={{ flex: c.w, position: "relative", borderRadius: 8, background: c.c, overflow: "hidden", animationDelay: `${i * 90}ms` }}>
              <span style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(115deg, rgba(255,255,255,0.14), transparent 45%)" }} />
              <span style={{ position: "absolute", left: 8, bottom: 6, fontFamily: VX.mono, fontSize: 9.5, letterSpacing: "0.5px", color: "rgba(255,255,255,0.92)" }}>{c.label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 2, height: 40, marginTop: 8, padding: "0 4px", borderRadius: 8, background: VXD.track, overflow: "hidden" }}>
          {bars.map((_, i) => (
            <span key={i} className="vx-bar" style={{ flex: 1, minWidth: 0, height: `${20 + Math.abs(Math.sin(i * 0.7)) * 62}%`, background: "color-mix(in srgb, var(--violet-light) 70%, transparent)", borderRadius: 1, animationDelay: `${(i % 12) * 70}ms` }} />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, height: 34, marginTop: 8, padding: "0 12px", borderRadius: 8, background: VXD.track }}>
          <span style={{ fontFamily: VX.mono, fontSize: 10, color: "var(--stone)", flex: "0 0 auto" }}>CC</span>
          <span style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            <span className="vx-typing" style={{ display: "inline-block", fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 600, color: "var(--cream)", borderRight: "2px solid var(--violet-light)" }}>captions, burned in and sized for sound-off</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================ PIPELINE ============================ */
function VX_Pipeline() {
  const steps = [
    { n: "01", t: "Roll", d: "On location, we direct and capture everything in a few focused hours.", icon: "camera" },
    { n: "02", t: "Cut", d: "Story-first edits with pace, motion, and sound that hold attention.", icon: "scissors" },
    { n: "03", t: "Caption", d: "Clean, burned-in captions sized for the sound-off scroll.", icon: "cc" },
    { n: "04", t: "Publish", d: "Delivered in every ratio, ready to post the moment you get them.", icon: "send" },
  ];
  return (
    <section style={{ position: "relative", borderTop: `1px solid ${VX.lineSoft}`, padding: "62px 0" }}>
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 var(--content-gutter)" }}>
        <Reveal><span style={{ fontFamily: VX.mono, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", color: "var(--violet)" }}>The pipeline</span></Reveal>
        <Reveal delay={70}><h2 style={{ margin: "12px 0 0", fontFamily: "var(--font-sans)", fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 700, letterSpacing: "-1.5px", lineHeight: 1.04, color: "var(--charcoal)" }}>From lens to feed, in four moves.</h2></Reveal>

        <div aria-hidden="true" style={{ marginTop: 34, height: 16, borderRadius: 4, background: VX.panelSoft, border: `1px solid ${VX.line}`, overflow: "hidden" }}>
          <div className="vx-film" style={{ display: "flex", gap: 12, padding: "0 6px", height: "100%", alignItems: "center", width: "max-content" }}>
            {Array.from({ length: 60 }).map((_, i) => <span key={i} style={{ width: 10, height: 8, borderRadius: 2, background: "color-mix(in srgb, var(--charcoal) 20%, transparent)", flex: "0 0 auto" }} />)}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 16, marginTop: 20 }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="vx-step" style={{ position: "relative", borderRadius: 16, background: VX.panel, border: `1px solid ${VX.line}`, padding: "22px 20px 24px", height: "100%", transition: "transform var(--t-base), border-color var(--t-base)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ width: 42, height: 42, borderRadius: 12, background: "color-mix(in srgb, var(--violet) 12%, transparent)", border: `1px solid ${VX.line}`, display: "grid", placeItems: "center", color: "var(--violet)" }}>
                    <VX_Icon name={s.icon} />
                  </span>
                  <span style={{ fontFamily: VX.mono, fontSize: 12, color: "var(--stone)" }}>{s.n}</span>
                </div>
                <h3 style={{ margin: "16px 0 0", fontFamily: "var(--font-sans)", fontSize: 21, fontWeight: 700, letterSpacing: "-0.5px", color: "var(--charcoal)" }}>{s.t}</h3>
                <p style={{ margin: "8px 0 0", fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.55, color: "var(--muted)" }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ THE KIT (gear) ============================ */
function VX_Gear() {
  const specs = [
    { b: "4K", t: "up to 120fps" },
    { b: "10-bit", t: "4:2:2 color" },
    { b: "S-Cinetone", t: "cinema look" },
  ];
  const gear = [
    { icon: "mic", t: "Professional audio", d: "Shotgun and wireless lav mics for broadcast-clean dialogue." },
    { icon: "light", t: "Shaped lighting & glass", d: "Portable LED kit and fast prime lenses for any location." },
  ];
  return (
    <section style={{ position: "relative", borderTop: `1px solid ${VX.lineSoft}`, background: VX.panelSoft, padding: "66px 0" }}>
      <div className="vx-2col" style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 var(--content-gutter)", display: "grid", gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)", gap: 48, alignItems: "center" }}>
        <div>
          <Reveal><span style={{ fontFamily: VX.mono, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", color: "var(--violet)" }}>The kit</span></Reveal>
          <Reveal delay={70}><h2 style={{ margin: "12px 0 0", fontFamily: "var(--font-sans)", fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 700, letterSpacing: "-1.5px", lineHeight: 1.04, color: "var(--charcoal)" }}>Shot on real<br />cinema gear.</h2></Reveal>
          <Reveal delay={140} as="p" style={{ margin: "20px 0 0", maxWidth: 420, fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.6, color: "var(--muted)" }}>
            Every project is filmed on a Sony FX30 cinema camera with professional audio and shaped lighting, so your footage looks and sounds like a studio made it, not a phone.
          </Reveal>
          <Reveal delay={210} style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {specs.map((s) => (
              <span key={s.b} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: VX.mono, fontSize: 12.5, color: "var(--charcoal)", background: VX.violetTint, border: `1px solid ${VX.line}`, borderRadius: "var(--radius-pill)", padding: "8px 14px" }}>
                <b style={{ color: "var(--violet)" }}>{s.b}</b> {s.t}
              </span>
            ))}
          </Reveal>
        </div>

        {/* Gear stack: featured camera card + supporting gear rows */}
        <Reveal delay={120} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Featured: Sony FX30 (dark cinema-camera surface) */}
          <div className="vx-gearcard vx-gear-hero" style={{ position: "relative", borderRadius: 18, background: VXD.panel, border: `1px solid ${VXD.line}`, overflow: "hidden", boxShadow: "0 40px 80px -46px color-mix(in srgb, var(--violet) 40%, #000)", transition: "transform var(--t-base)" }}>
            <div aria-hidden="true" className="vx-glow" style={{ position: "absolute", top: "-40%", right: "-20%", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, color-mix(in srgb, var(--violet) 40%, transparent), transparent 64%)`, filter: "blur(18px)", pointerEvents: "none" }} />
            {/* header */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, padding: "15px 20px", borderBottom: `1px solid ${VXD.lineSoft}` }}>
              <span style={{ fontFamily: VX.mono, fontSize: 11.5, letterSpacing: "1.5px", color: "var(--stone)" }}>SONY</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 700, letterSpacing: "-0.4px", color: "var(--cream)" }}>FX30</span>
              <span style={{ fontFamily: VX.mono, fontSize: 10.5, letterSpacing: "1px", color: "var(--violet-light)", marginLeft: 4, border: "1px solid rgba(255,255,255,0.16)", borderRadius: 6, padding: "2px 7px" }}>CINEMA LINE</span>
              <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 7, fontFamily: VX.mono, fontSize: 11, color: "var(--stone)" }}>
                <span className="vx-rec" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--coral)" }} />REC
              </span>
            </div>
            {/* lens */}
            <div style={{ position: "relative", display: "grid", placeItems: "center", padding: "32px 20px 24px" }}>
              <div className="vx-lens" style={{ position: "relative", width: 132, height: 132, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%, #4b4a58 0%, #17171d 44%, #08080b 100%)", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "inset 0 0 0 6px rgba(255,255,255,0.04), inset 0 0 26px rgba(0,0,0,0.8), 0 18px 40px -22px #000" }}>
                <span style={{ position: "absolute", inset: 16, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.10)" }} />
                <span style={{ position: "absolute", inset: 30, borderRadius: "50%", background: "radial-gradient(circle at 40% 36%, #26242f 0%, #0b0b0f 70%)", border: "1px solid rgba(255,255,255,0.06)" }} />
                <span style={{ position: "absolute", inset: 48, borderRadius: "50%", background: "radial-gradient(circle at 42% 38%, color-mix(in srgb, var(--violet) 60%, #000), #050507 72%)", boxShadow: "0 0 18px 1px color-mix(in srgb, var(--violet) 55%, transparent)" }} />
                {/* coating catchlight */}
                <span aria-hidden="true" style={{ position: "absolute", top: 24, left: 30, width: 26, height: 14, borderRadius: "50%", background: "rgba(255,255,255,0.5)", filter: "blur(4px)" }} />
                <span aria-hidden="true" style={{ position: "absolute", bottom: 26, right: 30, width: 12, height: 12, borderRadius: "50%", background: "color-mix(in srgb, var(--violet-light) 80%, transparent)", filter: "blur(3px)" }} />
              </div>
            </div>
            {/* spec strip */}
            <div style={{ position: "relative", display: "flex", justifyContent: "center", gap: 0, borderTop: `1px solid ${VXD.lineSoft}` }}>
              {["4K", "120 FPS", "10-BIT", "S35"].map((s, i) => (
                <span key={s} style={{ flex: 1, textAlign: "center", padding: "13px 4px", fontFamily: VX.mono, fontSize: 11.5, letterSpacing: "0.5px", color: "var(--cream)", borderLeft: i === 0 ? "none" : `1px solid ${VXD.lineSoft}` }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Supporting gear rows */}
          {gear.map((g) => (
            <div key={g.t} className="vx-gearcard vx-gearrow" style={{ display: "flex", alignItems: "center", gap: 16, borderRadius: 16, background: VX.panel, border: `1px solid ${VX.line}`, padding: "16px 18px", transition: "transform var(--t-base), border-color var(--t-base)" }}>
              <span style={{ width: 44, height: 44, flex: "0 0 auto", borderRadius: 12, background: "color-mix(in srgb, var(--violet) 12%, transparent)", border: `1px solid ${VX.line}`, display: "grid", placeItems: "center", color: "var(--violet)" }}>
                <VX_Icon name={g.icon} />
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 700, letterSpacing: "-0.3px", color: "var(--charcoal)" }}>{g.t}</span>
                <span style={{ display: "block", marginTop: 2, fontFamily: "var(--font-sans)", fontSize: 13.5, lineHeight: 1.45, color: "var(--muted)" }}>{g.d}</span>
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ SELECTED WORK ============================ */
function VX_Work() {
  const items = [
    { caption: "The Rise Above Podcast with guest Ryan Silverfield, fully edited episode", youtube: "ihwkb3KQOrI" },
    { caption: "NWA Gives Rally Recap Video", youtube: "05lwZKPPlN0" },
  ];
  return (
    <section style={{ position: "relative", borderTop: `1px solid ${VX.lineSoft}`, padding: "66px 0" }}>
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 var(--content-gutter)" }}>
        <Reveal><span style={{ fontFamily: VX.mono, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", color: "var(--violet)" }}>Selected work</span></Reveal>
        <Reveal delay={70}><h2 style={{ margin: "12px 0 0", fontFamily: "var(--font-sans)", fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 700, letterSpacing: "-1.5px", lineHeight: 1.04, color: "var(--charcoal)" }}>Recent cuts.</h2></Reveal>
        <Reveal delay={140} as="p" style={{ margin: "16px 0 0", maxWidth: 460, fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.6, color: "var(--muted)" }}>
          Full editing and production, from long-form podcast episodes to short-form recap films.
        </Reveal>

        <Reveal delay={200} className="vx-workgrid" style={{ marginTop: 34, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {items.map((v, i) =>
            v.placeholder ? (
              <figure key={i} style={{ margin: 0 }}>
                <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px dashed color-mix(in srgb, var(--violet) 45%, var(--hairline))", background: "linear-gradient(135deg, color-mix(in srgb, var(--violet) 12%, var(--cream)), var(--surface-soft))", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, textAlign: "center", padding: 24 }}>
                  <span style={{ width: 56, height: 56, borderRadius: "50%", background: "color-mix(in srgb, var(--violet) 16%, var(--cream))", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--violet)" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 5l12 7-12 7V5z" fill="currentColor" /></svg>
                  </span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, letterSpacing: "0.4px", textTransform: "uppercase", color: "var(--violet)" }}>Coming soon</span>
                </div>
                <figcaption style={{ margin: "12px 2px 0", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.2px", color: "var(--charcoal)", lineHeight: 1.4 }}>{v.caption}</figcaption>
              </figure>
            ) : (
              <YouTubeEmbed key={i} id={v.youtube} caption={v.caption} />
            )
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ RATE REEL ============================ */
function VX_Reel({ onNavigate }) {
  const tiers = [
    {
      key: "Entry",
      kicker: "01 · Entry",
      lede: "Test the waters or keep the feed fed.",
      items: [
        { name: "Single short-form video", price: "$250", note: "One Reel, TikTok, or Short, shot and cut end to end", live: true },
        { name: "Edit only", price: "$150", unit: "/ video", note: "You send the footage, we make the cut" },
        { name: "Short-form 3-pack", price: "$650", note: "Three videos from a single session" },
      ],
    },
    {
      key: "Core",
      kicker: "02 · Core",
      lede: "Flagship films and full production days.",
      items: [
        { name: "Brand story video", price: "$1,200", note: "A cinematic 60 to 90 second film of who you are", live: true },
        { name: "Testimonial or case study", price: "$900", note: "Client interview cut with supporting b-roll" },
        { name: "Product or service explainer", price: "$1,000", note: "Show exactly how it works, step by step" },
        { name: "Half-day shoot", price: "$1,200", note: "Up to four hours on location" },
        { name: "Full-day shoot", price: "$2,200", note: "A full day on location, maximum footage" },
      ],
    },
  ];
  return (
    <section id="vx-reel" style={{ position: "relative", borderTop: `1px solid ${VX.lineSoft}`, padding: "66px 0" }}>
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "0 var(--content-gutter)" }}>
        <Reveal style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <span style={{ fontFamily: VX.mono, fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", color: "var(--violet)" }}>The rate reel</span>
            <h2 style={{ margin: "12px 0 0", fontFamily: "var(--font-sans)", fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 700, letterSpacing: "-1.5px", lineHeight: 1.04, color: "var(--charcoal)" }}>Pick your cut.</h2>
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: VX.mono, fontSize: 12, letterSpacing: "0.5px", color: "var(--muted)" }}>
            <span className="vx-rec" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--violet)" }} />
            Starting rates, every project quoted to fit
          </span>
        </Reveal>

        <div className="vx-reelgrid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.92fr) minmax(0, 1.08fr)", gap: 18, marginTop: 34, alignItems: "start" }}>
          {tiers.map((t, ti) => (
            <Reveal key={t.key} delay={ti * 110}>
              <div style={{ position: "relative", borderRadius: 18, background: VX.panel, border: `1px solid ${VX.line}`, overflow: "hidden" }}>
                <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: "repeating-linear-gradient(115deg, var(--charcoal) 0 14px, var(--violet) 14px 28px)", opacity: 0.5 }} />
                <div style={{ padding: "26px 24px 18px", borderBottom: `1px solid ${VX.line}` }}>
                  <span style={{ fontFamily: VX.mono, fontSize: 11.5, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--violet)" }}>{t.kicker}</span>
                  <p style={{ margin: "8px 0 0", fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 600, letterSpacing: "-0.4px", color: "var(--charcoal)" }}>{t.lede}</p>
                </div>
                <div>
                  {t.items.map((it, ii) => (
                    <div
                      key={it.name}
                      className="vx-row"
                      role="button"
                      tabIndex={0}
                      onClick={() => onNavigate("contact", it.name)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onNavigate("contact", it.name); } }}
                      style={{ width: "100%", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, padding: "17px 24px", background: "transparent", borderTop: ii === 0 ? "none" : `1px solid ${VX.lineSoft}`, transition: "background var(--t-quick)" }}
                    >
                      <span style={{ minWidth: 0, flex: 1 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <span style={{ fontFamily: "var(--font-sans)", fontSize: 16.5, fontWeight: 600, letterSpacing: "-0.3px", color: "var(--charcoal)" }}>{it.name}</span>
                          {it.live && <span style={{ fontFamily: VX.mono, fontSize: 10, letterSpacing: "0.5px", textTransform: "uppercase", color: "var(--violet)", background: VX.violetTint, border: "1px solid color-mix(in srgb, var(--violet) 30%, transparent)", borderRadius: "var(--radius-pill)", padding: "2px 8px", flex: "0 0 auto" }}>Signature</span>}
                        </span>
                        <span style={{ display: "block", marginTop: 3, fontFamily: "var(--font-sans)", fontSize: 13.5, lineHeight: 1.45, color: "var(--muted)" }}>{it.note}</span>
                      </span>
                      <span style={{ display: "flex", alignItems: "baseline", gap: 2, flex: "0 0 auto", fontFamily: "var(--font-sans)", color: "var(--violet)" }}>
                        <span style={{ fontFamily: VX.mono, fontSize: 11, color: "var(--stone)", alignSelf: "center", marginRight: 4 }}>from</span>
                        <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.6px" }}>{it.price}</span>
                        {it.unit && <span style={{ fontSize: 12.5, color: "var(--muted)", fontWeight: 500 }}>{it.unit}</span>}
                      </span>
                      <button
                        className="vx-book"
                        onClick={(e) => { e.stopPropagation(); onNavigate("contact", it.name); }}
                        style={{ flex: "0 0 auto", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, letterSpacing: "-0.1px", color: "var(--violet)", background: VX.violetTint, border: "1px solid color-mix(in srgb, var(--violet) 32%, transparent)", borderRadius: "var(--radius-pill)", padding: "8px 14px", whiteSpace: "nowrap", transition: "background var(--t-quick), color var(--t-quick), border-color var(--t-quick), transform var(--t-quick)" }}
                      >
                        Book this
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ display: "block" }}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={220} style={{ marginTop: 22, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14 }}>
          <VX_Cta onClick={() => onNavigate("contact", "Video project")}>Start a project&nbsp;→</VX_Cta>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--muted)" }}>Bundling a shoot with edits? We&rsquo;ll build a custom package.</span>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ CLOSING ============================ */
function VX_Closing({ onNavigate }) {
  return (
    <section style={{ position: "relative", borderTop: `1px solid ${VX.lineSoft}`, padding: "72px 0 78px", textAlign: "center", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", bottom: "-40%", left: "50%", transform: "translateX(-50%)", width: 720, height: 720, borderRadius: "50%", background: `radial-gradient(circle, ${VX.glow}, transparent 62%)`, filter: "blur(24px)", pointerEvents: "none" }} />
      <div style={{ position: "relative", maxWidth: 680, margin: "0 auto", padding: "0 var(--content-gutter)" }}>
        <Reveal style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: VX.mono, fontSize: 12, letterSpacing: "1px", color: "var(--muted)" }}>
          <span className="vx-rec" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--coral)" }} />READY WHEN YOU ARE
        </Reveal>
        <Reveal delay={80}><h2 style={{ margin: "18px 0 0", fontFamily: "var(--font-sans)", fontSize: "clamp(34px, 5vw, 60px)", fontWeight: 700, letterSpacing: "-2px", lineHeight: 1.0, color: "var(--charcoal)" }}>Let&rsquo;s roll camera<span style={{ color: "var(--violet)" }}>.</span></h2></Reveal>
        <Reveal delay={150} as="p" style={{ margin: "20px auto 0", maxWidth: 440, fontFamily: "var(--font-sans)", fontSize: 18, lineHeight: 1.55, color: "var(--muted)" }}>
          Tell us what you want people to feel, and we will hand you a month of video that says it.
        </Reveal>
        <Reveal delay={220} style={{ marginTop: 30, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <VX_Cta onClick={() => onNavigate("contact", "Monthly Content Package")}>Start a project&nbsp;→</VX_Cta>
          <VX_Cta solid={false} onClick={() => onNavigate("contact", "Single Short-Form Video")}>Try a single video</VX_Cta>
        </Reveal>
      </div>
    </section>
  );
}

function VX_Icon({ name }) {
  const p = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "camera") return <svg {...p}><path d="M3 7h11v10H3z" /><path d="M14 10l7-3v10l-7-3" /></svg>;
  if (name === "scissors") return <svg {...p}><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4L8.5 15.5M14.5 14L20 20M8.5 8.5L11 11" /></svg>;
  if (name === "cc") return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 10.5a2 2 0 100 3M16 10.5a2 2 0 100 3" /></svg>;
  if (name === "mic") return <svg {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0012 0M12 17v4M8.5 21h7" /></svg>;
  if (name === "light") return <svg {...p}><circle cx="12" cy="12" r="3.6" /><path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7" /></svg>;
  return <svg {...p}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg>;
}

function VideoStyles() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes vxRecPulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.82); } }
      @keyframes vxWordIn { from { opacity: 0; transform: translateY(0.4em) skewY(3deg); } to { opacity: 1; transform: none; } }
      @keyframes vxPlayhead { 0% { left: 4%; } 100% { left: 96%; } }
      @keyframes vxBar { 0%,100% { transform: scaleY(0.45); } 50% { transform: scaleY(1); } }
      @keyframes vxType { 0% { width: 0; } 55% { width: 100%; } 92% { width: 100%; } 100% { width: 0; } }
      @keyframes vxCaret { 50% { border-color: transparent; } }
      @keyframes vxProgress { 0% { width: 4%; } 92% { width: 100%; } 100% { width: 100%; } }
      @keyframes vxScan { 0% { transform: translateY(-120%); } 100% { transform: translateY(320%); } }
      @keyframes vxHeart { 0%,100% { transform: scale(1); } 42% { transform: scale(1.35); } 58% { transform: scale(0.9); } }
      @keyframes vxFloat { 0%,100% { transform: translateY(0) rotate(-1.2deg); } 50% { transform: translateY(-12px) rotate(1.2deg); } }
      @keyframes vxGlow { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }
      @keyframes vxFilm { from { transform: translateX(0); } to { transform: translateX(-264px); } }
      @keyframes vxClipIn { from { opacity: 0; transform: scaleX(0.6); transform-origin: left; } to { opacity: 1; transform: none; } }
      @keyframes vxRender { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
      @keyframes vxFmtFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-11px); } }
      @keyframes vxFmtPulse {
        0% { border-color: rgba(255,255,255,0.55); box-shadow: 0 0 0 1px var(--violet-light), 0 34px 66px -30px color-mix(in srgb, var(--violet) 85%, #000); }
        20% { border-color: rgba(255,255,255,0.55); box-shadow: 0 0 0 1px var(--violet-light), 0 34px 66px -30px color-mix(in srgb, var(--violet) 85%, #000); }
        30%, 100% { border-color: rgba(255,255,255,0.14); box-shadow: 0 36px 70px -46px color-mix(in srgb, var(--violet) 45%, #000); }
      }
      @keyframes vxFmtLabel {
        0%, 20% { background: var(--violet); color: #fff; }
        30%, 100% { background: rgba(0,0,0,0.42); color: rgba(255,255,255,0.92); }
      }
      @keyframes vxMorph {
        0%, 22%   { width: 320px; height: 180px; }
        33%, 55%  { width: 240px; height: 240px; }
        66%, 92%  { width: 180px; height: 320px; }
        100%      { width: 320px; height: 180px; }
      }

      .vx-rec { animation: vxRecPulse 1.4s var(--ease-house) infinite; }
      .vx-gearrow:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--violet) 40%, transparent); }
      .vx-gear-hero:hover { transform: translateY(-3px); }
      .vx-word { display: inline-block; animation: vxWordIn 0.7s var(--ease-house) both; }
      .vx-word-2 { animation-delay: 0.1s; }
      .vx-word-3 { animation-delay: 0.2s; }
      .vx-playhead { animation: vxPlayhead 7s linear infinite; }
      .vx-bar { transform-origin: center; animation: vxBar 1.1s ease-in-out infinite; }
      .vx-clip { animation: vxClipIn 0.6s var(--ease-house) both; }
      .vx-typing { animation: vxType 6s steps(40, end) infinite, vxCaret 0.7s step-end infinite; overflow: hidden; white-space: nowrap; vertical-align: bottom; }
      .vx-progress { width: 4%; animation: vxProgress 6s linear infinite; }
      .vx-scan { animation: vxScan 3.4s ease-in-out infinite; }
      .vx-heart { display: inline-block; color: var(--coral); animation: vxHeart 2.2s var(--ease-house) infinite; }
      .vx-phone-float { animation: vxFloat 6.5s ease-in-out infinite; }
      .vx-glow { animation: vxGlow 5s ease-in-out infinite; }
      .vx-film { animation: vxFilm 6s linear infinite; }
      .vx-render { animation: vxRender 1.6s ease-in-out infinite; }
      .vx-morph { animation: vxMorph 9s var(--ease-house) infinite; }

      .vx-fmt-stage { position: relative; width: 400px; height: 380px; }
      .vx-fmt { position: absolute; border-radius: 15px; overflow: hidden; border: 1px solid rgba(255,255,255,0.14); background: linear-gradient(155deg, var(--violet), color-mix(in srgb, var(--violet) 42%, #000)); box-shadow: 0 36px 70px -46px color-mix(in srgb, var(--violet) 45%, #000); animation: vxFmtFloat 7s ease-in-out infinite, vxFmtPulse 6s ease-in-out infinite; }
      .vx-fmt-wide   { width: 250px; height: 141px; top: 30px;  left: 0;     z-index: 1; animation-delay: 0s, 0s; }
      .vx-fmt-square { width: 138px; height: 138px; top: 165px; left: 120px; z-index: 2; animation-delay: -2.3s, -2s; }
      .vx-fmt-vert   { width: 122px; height: 217px; top: 58px;  left: 258px; z-index: 3; animation-delay: -4.6s, -4s; }
      .vx-fmt-label { position: absolute; top: 10px; left: 10px; z-index: 3; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; letter-spacing: 0.5px; border-radius: 6px; padding: 3px 8px; background: rgba(0,0,0,0.42); color: rgba(255,255,255,0.92); animation: vxFmtLabel 6s ease-in-out infinite; }
      .vx-fmt-wide .vx-fmt-label   { animation-delay: 0s; }
      .vx-fmt-square .vx-fmt-label { animation-delay: -2s; }
      .vx-fmt-vert .vx-fmt-label   { animation-delay: -4s; }
      .vx-fmt-play { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 46px; height: 46px; border-radius: 50%; background: rgba(255,255,255,0.16); border: 1px solid rgba(255,255,255,0.35); display: grid; place-items: center; }
      .vx-phone-play { transition: transform var(--t-quick); }
      .vx-cap { display: inline-block; }

      .vx-ghost:hover { border-color: var(--violet); color: var(--charcoal); background: color-mix(in srgb, var(--violet) 6%, transparent); }
      .vx-cta:hover { transform: translateY(-2px); background: color-mix(in srgb, var(--violet) 88%, #000); }
      .vx-step:hover { transform: translateY(-4px); border-color: color-mix(in srgb, var(--violet) 40%, transparent); }
      .vx-pack:hover { transform: translateY(-5px); border-color: color-mix(in srgb, var(--violet) 45%, transparent); }
      .vx-row:hover { background: color-mix(in srgb, var(--violet) 6%, transparent); }
      .vx-book { margin-left: auto; }
      .vx-book:hover { background: var(--violet); color: var(--cream); border-color: var(--violet); transform: translateY(-1px); }
      .vx-book:active { transform: translateY(0); }

      @media (max-width: 860px) {
        [data-line="video"] .vx-hero-grid,
        [data-line="video"] .vx-2col,
        [data-line="video"] .vx-reelgrid { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 520px) {
        [data-line="video"] .vx-row { flex-wrap: wrap; row-gap: 12px; }
        [data-line="video"] .vx-row > span:first-child { flex: 1 1 100% !important; }
      }
      @media (max-width: 640px) {
        [data-line="video"] .vx-workgrid { grid-template-columns: 1fr !important; }
        [data-line="video"] .vx-cta,
        [data-line="video"] .vx-ghost { font-size: 13px !important; padding: 11px 18px !important; }
        [data-line="video"] .vx-fmt-stage { transform: scale(0.8); transform-origin: center; }
        [data-line="video"] [style*="min-height: 380px"] { min-height: 300px !important; }
        [data-line="video"] .vx-phone-float { width: 190px !important; }
        [data-line="video"] .vx-clip span { font-size: 8.5px !important; }
      }
      @media (prefers-reduced-motion: reduce) {
        .vx-rec, .vx-word, .vx-playhead, .vx-bar, .vx-clip, .vx-typing, .vx-progress, .vx-scan,
        .vx-heart, .vx-phone-float, .vx-glow, .vx-film, .vx-render, .vx-morph, .vx-fmt, .vx-fmt-label { animation: none !important; }
        .vx-typing { width: 100% !important; border-right: none; }
        .vx-progress { width: 68% !important; }
        .vx-word { opacity: 1 !important; transform: none !important; }
      }
    ` }} />
  );
}
