"use client";
/* Shared building blocks for the uniquely-structured service pages. All service
 * pages use the master coral accent (remapped per data-line scope); only their
 * STRUCTURE differs. */
import React, { useState, useRef, useEffect } from "react";
import { ServiceCard, Logo } from "@/components/ds";

/* Logo + "In-house" chip that opens every service hero. */
export function OwnerTag({ owner, line }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22, flexWrap: "wrap" }}>
      <Logo line="master" layout="wordmark" size={22} />
      <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "var(--muted)", padding: "5px 12px", borderRadius: "var(--radius-pill)", background: "var(--cream)", border: "1px solid var(--hairline)" }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)" }} />
        In-house
      </span>
    </div>
  );
}

export function PriceCard(props) {
  return <ServiceCard {...props} />;
}

/* FAQ accordion. */
export function FAQAccordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ background: "var(--cream)", border: "1px solid var(--hairline)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderTop: i === 0 ? "none" : "1px solid var(--hairline)" }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", cursor: "pointer", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, fontFamily: "var(--font-sans)", fontSize: 16.5, fontWeight: 600, letterSpacing: "-0.2px", color: "var(--charcoal)" }}
            >
              {it.q}
              <span aria-hidden style={{ flex: "0 0 auto", width: 24, height: 24, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", transition: "transform var(--t-base)", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </span>
            </button>
            <div style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows var(--t-base)" }}>
              <div style={{ overflow: "hidden" }}>
                <p style={{ margin: 0, padding: "0 24px 22px", maxWidth: 580, fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, color: "var(--body)" }}>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* Closing CTA row — shared by every page. */
export function ClosingCTA({ owner, onNavigate, headline }) {
  return (
    <div className="r-cta-pad" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "40px 44px", background: "var(--charcoal)", borderRadius: "var(--radius-xl)" }}>
      <div style={{ maxWidth: 560 }}>
        <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 28, fontWeight: 600, letterSpacing: "-0.6px", lineHeight: 1.15, color: "var(--cream)", textWrap: "balance" }}>
          {headline || "Not sure which fits? Let's talk it through."}
        </h2>
        <p style={{ margin: "12px 0 0", fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,0.66)" }}>
          A free 15-minute call In-house clears it up fast. No pitch, no pressure.
        </p>
      </div>
      <button
        onClick={() => onNavigate("contact")}
        style={{ display: "inline-flex", alignItems: "center", gap: 10, height: 52, padding: "0 30px", background: "var(--accent)", color: "var(--cream)", border: "none", borderRadius: "var(--radius-pill)", fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 600, cursor: "pointer", letterSpacing: "-0.1px", flex: "0 0 auto" }}
      >
        Book with us
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
  );
}

/* Small labelled section heading with the coral rule mark. */
export function RuleHead({ children, sub }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 32, height: 4, borderRadius: 2, background: "var(--accent)" }} />
        <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 28, fontWeight: 600, letterSpacing: "-0.6px", color: "var(--charcoal)" }}>{children}</h2>
      </div>
      {sub ? <p style={{ margin: "12px 0 0 44px", maxWidth: 560, fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.55, color: "var(--muted)" }}>{sub}</p> : null}
    </div>
  );
}

/* Expandable rate ROW — editorial alternative to the card. */
export function RateRow({ name, price, description, badge, details, onBook, big }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const expandable = !!(details && (details.summary || (details.includes && details.includes.length)));
  return (
    <div style={{ borderTop: "1px solid var(--hairline)", transition: "background var(--t-base)", background: hover || open ? "var(--cream)" : "transparent" }}>
      <button
        onClick={() => expandable && setOpen((v) => !v)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-expanded={open}
        className="rr-head"
        style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", cursor: expandable ? "pointer" : "default", padding: big ? "30px 26px" : "24px 26px", display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", columnGap: 28, rowGap: 8, alignItems: "baseline" }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: big ? 26 : 21, fontWeight: 600, letterSpacing: "-0.5px", color: "var(--charcoal)" }}>{name}</span>
            {badge ? <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: "var(--accent)", background: "var(--accent-tint)", padding: "3px 9px", borderRadius: "var(--radius-pill)" }}>{badge}</span> : null}
          </div>
          <p style={{ margin: "8px 0 0", maxWidth: 520, fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.55, color: "var(--muted)" }}>{description}</p>
        </div>
        <div className="rr-right" style={{ display: "flex", alignItems: "center", gap: 16, justifySelf: "end" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: big ? 24 : 20, fontWeight: 700, letterSpacing: "-0.5px", color: "var(--accent)", whiteSpace: "nowrap" }}>{price}</span>
          {expandable ? (
            <span aria-hidden style={{ width: 26, height: 26, flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "1px solid var(--hairline)", color: "var(--charcoal)", transition: "transform var(--t-base)", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </span>
          ) : null}
        </div>
      </button>
      {expandable ? (
        <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows var(--t-base)" }}>
          <div style={{ overflow: "hidden" }}>
            <div className="r-stack-2" style={{ padding: "0 26px 26px", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 32, alignItems: "start" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.6, color: "var(--body)" }}>{details.summary}</p>
              <div>
                {(details.includes || []).map((inc, k) => (
                  <div key={k} style={{ display: "flex", gap: 10, padding: "7px 0", borderTop: k === 0 ? "none" : "1px solid var(--hairline)" }}>
                    <span style={{ marginTop: 7, width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flex: "0 0 auto" }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.45, color: "var(--body)" }}>{inc}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16 }}>
                  <button onClick={() => onBook && onBook(name)} className="pp-book" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, letterSpacing: "-0.1px", color: "var(--accent)", background: "color-mix(in srgb, var(--accent) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--accent) 32%, transparent)", borderRadius: "var(--radius-pill)", padding: "8px 14px", cursor: "pointer", transition: "background var(--t-quick), color var(--t-quick), border-color var(--t-quick), transform var(--t-quick)" }}>
                    Book this
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ display: "block" }}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* A framed brand-work image tile — the full logo is always shown (contain). */
export function WorkImage({ src, alt, label, bg = "var(--cream)", ratio = "16 / 10", scale = 1 }) {
  const [hover, setHover] = useState(false);
  const [broken, setBroken] = useState(!src);
  const dark = /#(1|2|0)/.test(String(bg));
  const stripe = dark ? "rgba(255,255,255,0.05)" : "rgba(44,44,42,0.05)";
  const noteColor = dark ? "rgba(255,255,255,0.62)" : "var(--muted)";
  return (
    <figure
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ margin: 0, position: "relative", aspectRatio: ratio, background: bg, borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--hairline)", boxShadow: hover ? "0 26px 60px -30px rgba(44,44,42,0.4)" : "0 12px 30px -22px rgba(44,44,42,0.3)", transform: hover ? "translateY(-3px)" : "translateY(0)", transition: "transform var(--t-base), box-shadow var(--t-base)" }}
    >
      {broken ? (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backgroundImage: `repeating-linear-gradient(135deg, ${stripe} 0 10px, transparent 10px 20px)` }}>
          <span style={{ fontFamily: "var(--font-mono, ui-monospace, monospace)", fontSize: 12, lineHeight: 1.5, textAlign: "center", color: noteColor, maxWidth: "85%" }}>{alt}</span>
        </div>
      ) : (
        <img src={src} alt={alt} onError={() => setBroken(true)} style={{ display: "block", width: "100%", height: "100%", objectFit: "contain", transform: `translateY(-4%) scale(${scale})`, transformOrigin: "center" }} />
      )}
      {label && !broken ? (
        <figcaption style={{ position: "absolute", left: 12, bottom: 12, padding: "5px 11px", background: "color-mix(in srgb, var(--charcoal) 78%, transparent)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", color: "var(--cream)", borderRadius: "var(--radius-pill)", fontFamily: "var(--font-sans)", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.2px" }}>{label}</figcaption>
      ) : null}
    </figure>
  );
}

/* Live website showcase — the real site rendered inside browser-window chrome,
 * scaled down to a static preview (interaction disabled), with a visit link. */
export function SiteShowcase({ url, host, title, blurb, tags = [], shot }) {
  const [hover, setHover] = useState(false);
  const shotSrc = shot && shot.fallback ? shot.fallback : null;
  return (
    <div className="r-stack" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 0.7fr)", gap: 28, alignItems: "center" }}>
      <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--hairline)", background: "var(--cream)", boxShadow: "0 40px 90px -44px rgba(44,44,42,0.5)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "color-mix(in srgb, var(--charcoal) 5%, var(--cream))", borderBottom: "1px solid var(--hairline)" }}>
          <div style={{ display: "flex", gap: 7 }}>
            {["#E9705B", "#E8B84B", "#5FB57B"].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, maxWidth: 320, padding: "5px 14px", background: "var(--surface-soft)", border: "1px solid var(--hairline)", borderRadius: "var(--radius-pill)", fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--muted)" }}>
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.3" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.3" /></svg>
              {host}
            </span>
          </div>
          <span style={{ width: 46 }} />
        </div>
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ position: "relative", width: "100%", aspectRatio: "1530 / 778", overflow: "hidden", background: "#1a2129" }}>
          {shotSrc ? (
            <img
              src={shotSrc} alt={title} loading="lazy" draggable={false}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", border: 0, pointerEvents: "none" }}
            />
          ) : null}
          <div aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 88, background: "linear-gradient(to bottom, transparent, rgba(26,33,41,0.9))", pointerEvents: "none", opacity: hover ? 0.35 : 1, transition: "opacity var(--t-base)" }} />
          <div aria-hidden style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: hover ? "rgba(26,33,41,0.28)" : "transparent", transition: "background var(--t-base)", pointerEvents: "none" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: "var(--radius-pill)", background: "var(--cream)", border: "1px solid var(--hairline)", boxShadow: "0 12px 30px -14px rgba(20,20,19,0.5)", fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 600, color: "var(--charcoal)", opacity: hover ? 1 : 0, transform: hover ? "translateY(0) scale(1)" : "translateY(6px) scale(0.98)", transition: "opacity var(--t-base), transform var(--t-base)" }}>
              Open live site
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </div>
          <a href={url} target="_blank" rel="noopener noreferrer" aria-label={"Visit " + host} style={{ position: "absolute", inset: 0 }} />
        </div>
      </div>
      <div>
        <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.5px", lineHeight: 1.2, color: "var(--charcoal)" }}>{title}</h3>
        <p style={{ margin: "12px 0 0", fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, color: "var(--muted)" }}>{blurb}</p>
        <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {tags.map((t) => <span key={t} style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "var(--accent)", background: "var(--accent-tint)", padding: "4px 11px", borderRadius: "var(--radius-pill)" }}>{t}</span>)}
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 600, color: "var(--charcoal)", textDecoration: "none" }}>
          Visit live site
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </div>
  );
}

/* A 16:9 YouTube tile with a click-to-play facade. */
export function YouTubeEmbed({ id, caption, tone = "coral" }) {
  const [play, setPlay] = useState(false);
  const [hover, setHover] = useState(false);
  const [poster, setPoster] = useState("https://i.ytimg.com/vi/" + id + "/maxresdefault.jpg");
  const accent = tone === "teal" ? "var(--teal-deep)" : "var(--accent)";
  return (
    <figure style={{ margin: 0 }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ position: "relative", aspectRatio: "16 / 9", background: "#1a2129", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--hairline)", boxShadow: hover && !play ? "0 26px 60px -30px rgba(44,44,42,0.42)" : "0 12px 30px -22px rgba(44,44,42,0.3)", transition: "box-shadow var(--t-base)" }}
      >
        {play ? (
          <iframe
            src={"https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0&modestbranding=1"}
            title={caption}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlay(true)}
            aria-label={"Play video: " + caption}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", padding: 0, border: 0, background: "transparent", cursor: "pointer" }}
          >
            <img
              src={poster}
              alt=""
              onError={() => setPoster("https://i.ytimg.com/vi/" + id + "/hqdefault.jpg")}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: hover ? "scale(1.03)" : "scale(1)", transition: "transform var(--t-base)" }}
            />
            <span style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,26,33,0.05) 0%, rgba(20,26,33,0.45) 100%)" }} />
            <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 66, height: 66, borderRadius: "50%", background: hover ? accent : "color-mix(in srgb, var(--charcoal) 62%, transparent)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background var(--t-quick), transform var(--t-base)", boxShadow: "0 8px 24px -8px rgba(0,0,0,0.5)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 3 }}><path d="M7 5l12 7-12 7V5z" fill="var(--cream)" /></svg>
            </span>
          </button>
        )}
      </div>
      {caption ? (
        <figcaption style={{ margin: "12px 2px 0", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.2px", color: "var(--charcoal)", lineHeight: 1.4 }}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}
