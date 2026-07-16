"use client";
/* PDG Contact — "Let's talk" with an inline booking calendar (pick date -> time)
 * beside an expanded contact form, plus a signature live-chat hero. Agency-wide,
 * coral master accent. */
import React, { useState, useEffect } from "react";
import { Input, Textarea, Select, Button } from "@/components/ds";
import { PDG_DATA } from "@/lib/data";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WD = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

function startOfDay(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }

export function ContactPage({ preselectService }) {
  const today = startOfDay(new Date());

  const data = PDG_DATA;
  const serviceOptions = [
    ...data.serviceTabs.map((t) => ({
      label: t.label,
      options: t.groups.flatMap((g) => g.services.map((s) => s.name)),
    })),
    "Not sure yet",
  ];

  const [service, setService] = useState(preselectService || "");
  useEffect(() => { if (preselectService) setService(preselectService); }, [preselectService]);

  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setError("");
    setSending(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      business: fd.get("business"),
      phone: fd.get("phone"),
      service: service,
      message: fd.get("message"),
      date: date ? fmt(date) : "",
      time: time || "",
    };
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const first = new Date(view.y, view.m, 1);
  const lead = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.y, view.m, d));

  const canPrev = view.y > today.getFullYear() || (view.y === today.getFullYear() && view.m > today.getMonth());
  const step = (delta) => {
    let m = view.m + delta, y = view.y;
    if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
    setView({ y, m });
  };

  const isDisabled = (d) => {
    if (!d) return true;
    const wd = d.getDay();
    if (wd === 0 || wd === 6) return true;
    return startOfDay(d) < today;
  };
  const sameDay = (a, b) => a && b && a.getTime() === b.getTime();
  const fmt = (d) => `${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;

  if (sent) {
    return (
      <ContactShell>
        <div style={{ gridColumn: "1 / -1", background: "var(--cream)", border: "1px solid var(--hairline)", borderRadius: "var(--radius-xl)", padding: "56px 40px", textAlign: "center" }}>
          <span style={{ display: "inline-flex", width: 56, height: 56, borderRadius: "50%", background: "var(--coral-tint)", color: "var(--coral)", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M5 13.5l5 5L21 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 30, fontWeight: 600, letterSpacing: "-0.7px", color: "var(--charcoal)" }}>You're on the calendar</h2>
          <p style={{ margin: "12px auto 0", maxWidth: 440, fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.55, color: "var(--muted)" }}>
            {date && time ? `We'll see you ${fmt(date)} at ${time}. ` : ""}A confirmation is on its way to your inbox. No pitch, no pressure, just a real conversation.
          </p>
          <div style={{ marginTop: 26 }}>
            <Button variant="secondary" onClick={() => { setSent(false); setDate(null); setTime(null); }}>Book another time</Button>
          </div>
        </div>
      </ContactShell>
    );
  }

  return (
    <ContactShell
      footer={
        <>
          <Button variant="coral" size="lg" type="submit" form="pdg-contact-form" full disabled={!(date && time) || sending}>
            {sending ? "Sending…" : date && time ? "Book with us" : "Pick a time to continue"}
          </Button>
          {error ? (
            <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--coral)", textAlign: "center" }}>
              {error}
            </p>
          ) : (
            <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--muted)", textAlign: "center" }}>
              15 minutes. No pitch. No pressure.
            </p>
          )}
        </>
      }
    >
      {/* Form */}
      <form id="pdg-contact-form" onSubmit={handleSubmit} style={{ background: "var(--cream)", border: "1px solid var(--hairline)", borderRadius: "var(--radius-xl)", padding: 23, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: "var(--radius-md)", background: date && time ? "var(--coral-tint)" : "var(--surface-card)", border: "1px solid", borderColor: date && time ? "var(--coral-soft)" : "var(--hairline)" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: date && time ? "var(--coral)" : "var(--stone)" }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 500, color: "var(--charcoal)" }}>
            {date && time ? `${fmt(date)} · ${time}` : "Select a date and time to continue"}
          </span>
        </div>
        <div className="r-stack-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Input label="Name" name="name" placeholder="Jane Smith" required />
          <Input label="Email" name="email" type="email" placeholder="jane@business.com" required />
        </div>
        <div className="r-stack-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Input label="Business" name="business" placeholder="Reyes Realty" />
          <Input label="Phone" name="phone" type="tel" placeholder="(214) 555-0142" />
        </div>
        <Select label="What service are you interested in?" name="service" placeholder="Choose a service" options={serviceOptions} value={service} onChange={(e) => setService(e.target.value)} />
        <Textarea label="What can we help with?" name="message" rows={4} placeholder="Tell us a little about your business and what you're hoping to do." />
      </form>

      {/* Calendar */}
      <div style={{ background: "var(--cream)", border: "1px solid var(--hairline)", borderRadius: "var(--radius-xl)", padding: 28 }}>
        <div style={{ maxWidth: 384, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 600, color: "var(--charcoal)" }}>{MONTHS[view.m]} {view.y}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <CalArrow dir="prev" disabled={!canPrev} onClick={() => canPrev && step(-1)} />
            <CalArrow dir="next" onClick={() => step(1)} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 6 }}>
          {WD.map((w) => (
            <div key={w} style={{ textAlign: "center", fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: "var(--muted)", padding: "4px 0" }}>{w}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, alignItems: "start" }}>
          {cells.map((d, i) => {
            if (!d) return <div key={i} />;
            const disabled = isDisabled(d);
            const selected = sameDay(startOfDay(d), date);
            return (
              <button key={i} disabled={disabled} onClick={() => { setDate(startOfDay(d)); setTime(null); }}
                style={{
                  width: "100%", aspectRatio: "1 / 1", border: "1px solid", borderColor: selected ? "var(--coral)" : "transparent",
                  borderRadius: "var(--radius-md)", background: selected ? "var(--coral)" : disabled ? "transparent" : "var(--canvas)",
                  color: selected ? "var(--cream)" : disabled ? "var(--hairline)" : "var(--charcoal)",
                  fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: selected ? 700 : 500,
                  cursor: disabled ? "default" : "pointer", transition: "background var(--t-quick), border-color var(--t-quick)",
                }}>
                {d.getDate()}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 22, paddingTop: 20, borderTop: "1px solid var(--hairline)" }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--charcoal)", marginBottom: 12 }}>
            {date ? `Times for ${fmt(date)}` : "Pick a day to see open times"}
          </div>
          {date ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(92px, 1fr))", gap: 8 }}>
              {SLOTS.map((s) => {
                const on = s === time;
                return (
                  <button key={s} onClick={() => setTime(s)}
                    style={{ padding: "9px 0", borderRadius: "var(--radius-md)", border: "1px solid", borderColor: on ? "var(--coral)" : "var(--hairline)",
                      background: on ? "var(--coral-tint)" : "var(--canvas)", color: on ? "var(--coral)" : "var(--body)",
                      fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: on ? 600 : 500, cursor: "pointer", transition: "all var(--t-quick)" }}>
                    {s}
                  </button>
                );
              })}
            </div>
          ) : (
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, color: "var(--muted)" }}>Weekdays, 9:00 AM to 4:00 PM Central.</div>
          )}
        </div>
        </div>
      </div>
    </ContactShell>
  );
}

/* ============================ HERO ============================ */
const CT_THREAD = [
  { side: "in", name: "PDG", text: "Hi! So glad you reached out." },
  { side: "out", name: "You", text: "We're thinking about a new site and brand." },
  { side: "in", name: "PDG", text: "Love it. Want to hop on a quick 15 minute call?" },
  { side: "out", name: "You", text: "Yes please. Tuesday morning?" },
  { side: "in", name: "PDG", text: "Tuesday at 10:00 it is. Talk soon!", booked: true },
];

function ContactHero() {
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setCount(CT_THREAD.length); setTyping(false); return; }
    let alive = true;
    const timers = [];
    const wait = (ms, fn) => { const t = setTimeout(() => { if (alive) fn(); }, ms); timers.push(t); };
    const run = () => {
      setCount(0); setTyping(true);
      let i = 0;
      const stepFn = () => {
        if (!alive) return;
        if (i >= CT_THREAD.length) { setTyping(false); wait(3000, run); return; }
        setTyping(true);
        wait(950, () => {
          setCount(i + 1);
          i += 1;
          setTyping(i < CT_THREAD.length);
          wait(1450, stepFn);
        });
      };
      wait(500, stepFn);
    };
    run();
    return () => { alive = false; timers.forEach(clearTimeout); };
  }, []);

  const typingSide = count < CT_THREAD.length ? CT_THREAD[count].side : null;

  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--canvas)", borderBottom: "1px solid var(--hairline)" }}>
      <ContactStyles />
      <div aria-hidden="true" style={{ position: "absolute", top: "-30%", right: "-6%", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, var(--coral-tint), transparent 62%)", filter: "blur(18px)", pointerEvents: "none" }} />

      <div className="ct-hero-grid" style={{ position: "relative", maxWidth: "var(--content-max)", margin: "0 auto", padding: "80px var(--content-gutter) 56px", display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)", gap: 48, alignItems: "center" }}>
        <div>
          <div className="ct-rise" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--coral)" }}>
            <span className="ct-pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--coral)" }} />
            Book a call · 15 min
          </div>
          <h1 className="ct-rise ct-rise-1 r-htitle" style={{ margin: "18px 0 0", fontFamily: "var(--font-sans)", fontSize: 58, fontWeight: 700, letterSpacing: "-2px", lineHeight: 1.02, color: "var(--charcoal)" }}>
            Let's talk<span className="ct-dot" style={{ color: "var(--coral)" }}>.</span>
          </h1>
          <p className="ct-rise ct-rise-2" style={{ margin: "20px 0 0", maxWidth: 500, fontFamily: "var(--font-sans)", fontSize: 19, lineHeight: 1.55, color: "var(--muted)" }}>
            Book with us for a free 15-minute discovery call. No pitch. No pressure. Just a real conversation about your business and what's possible.
          </p>

          <ul className="ct-points">
            {[
              "Get clear on your goals and timeline",
              "See what's working and what's holding you back",
              "Leave with clear next steps, no strings attached",
            ].map((t, i) => (
              <li key={t} className={"ct-rise ct-point ct-rise-" + (3 + i)}>
                <span className="ct-check" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                {t}
              </li>
            ))}
          </ul>

          <div className="ct-rise ct-rise-6 ct-assure">
            <span className="ct-tag"><span className="ct-tag-dot" />Free 15-minute call</span>
            <span className="ct-tag"><span className="ct-tag-dot" />Response within one business day</span>
          </div>
        </div>

        <div className="ct-rise ct-rise-3" style={{ display: "grid", placeItems: "center" }}>
          <div className="ct-chatwrap" aria-hidden="true">
            <div className="ct-chat">
              <div className="ct-chat-head">
                <span className="ct-chat-av">PDG</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, letterSpacing: "-0.3px", color: "var(--charcoal)" }}>PDG Studio</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontSize: 11.5, color: "var(--muted)" }}>
                    <span className="ct-online" />Online now
                  </span>
                </span>
              </div>
              <div className="ct-thread">
                {CT_THREAD.slice(0, count).map((m, i) => (
                  <div key={i} className={"ct-msg " + (m.side === "out" ? "ct-msg-out" : "ct-msg-in")}>
                    <span className="ct-bubble">{m.text}</span>
                    {m.booked ? (
                      <span className="ct-booked">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        Call booked · Tue 10:00 AM
                      </span>
                    ) : null}
                  </div>
                ))}
                {typing && typingSide ? (
                  <div className={"ct-msg " + (typingSide === "out" ? "ct-msg-out" : "ct-msg-in")}>
                    <span className="ct-bubble ct-bubble-typing"><i /><i /><i /></span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactStyles() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes ctRise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
      @keyframes ctDot { 0%,100% { transform: scale(1); } 50% { transform: scale(1.35); } }
      @keyframes ctPulseDot { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--coral) 55%, transparent); } 70% { box-shadow: 0 0 0 9px transparent; } 100% { box-shadow: 0 0 0 0 transparent; } }
      @keyframes ctFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
      @keyframes ctPop { from { opacity: 0; transform: translateY(10px) scale(0.94); } to { opacity: 1; transform: none; } }
      @keyframes ctEll { 0%,100% { opacity: 0.28; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-2px); } }
      @keyframes ctOnline { 0%,100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--teal, #2fa37c) 60%, transparent); } 70% { box-shadow: 0 0 0 6px transparent; } }
      @keyframes ctBooked { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

      .ct-rise { animation: ctRise 0.7s var(--ease-house) both; }
      .ct-rise-1 { animation-delay: 0.08s; }
      .ct-rise-2 { animation-delay: 0.16s; }
      .ct-rise-3 { animation-delay: 0.12s; }
      .ct-rise-4 { animation-delay: 0.34s; }
      .ct-rise-5 { animation-delay: 0.42s; }
      .ct-rise-6 { animation-delay: 0.52s; }
      .ct-dot { display: inline-block; animation: ctDot 1.8s var(--ease-house) infinite; }
      .ct-pulse-dot { animation: ctPulseDot 1.8s ease-out infinite; }

      .ct-points { list-style: none; margin: 30px 0 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
      .ct-point { display: flex; align-items: flex-start; gap: 12px; max-width: 500px; font-family: var(--font-sans); font-size: 16.5px; line-height: 1.4; color: var(--charcoal); }
      .ct-check { flex: 0 0 auto; width: 24px; height: 24px; margin-top: 1px; border-radius: 50%; background: var(--coral-tint); color: var(--coral); display: grid; place-items: center; }
      .ct-assure { margin-top: 28px; display: flex; flex-wrap: wrap; gap: 10px; }
      .ct-tag { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-sans); font-size: 13px; font-weight: 500; color: var(--body); background: var(--cream); border: 1px solid var(--hairline); border-radius: var(--radius-pill); padding: 8px 14px; }
      .ct-tag-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--coral); }

      .ct-chatwrap { width: 100%; max-width: 420px; animation: ctFloat 6.5s ease-in-out infinite; }
      .ct-chat { background: var(--cream); border: 1px solid var(--hairline); border-radius: var(--radius-xl); box-shadow: 0 40px 80px -44px rgba(44,44,42,0.55); overflow: hidden; }
      .ct-chat-head { display: flex; align-items: center; gap: 12px; padding: 16px 18px; border-bottom: 1px solid var(--hairline); background: color-mix(in srgb, var(--coral) 5%, var(--cream)); }
      .ct-chat-av { flex: 0 0 auto; width: 40px; height: 40px; border-radius: 50%; background: var(--coral); color: var(--cream); display: grid; place-items: center; font-family: var(--font-sans); font-size: 12.5px; font-weight: 700; letter-spacing: -0.5px; }
      .ct-online { width: 8px; height: 8px; border-radius: 50%; background: var(--teal, #2fa37c); animation: ctOnline 2s ease-out infinite; }

      .ct-thread { display: flex; flex-direction: column; gap: 10px; padding: 20px 18px 22px; min-height: 320px; justify-content: flex-end; }
      .ct-msg { display: flex; flex-direction: column; max-width: 82%; animation: ctPop 0.42s var(--ease-house) both; }
      .ct-msg-in { align-self: flex-start; align-items: flex-start; }
      .ct-msg-out { align-self: flex-end; align-items: flex-end; }
      .ct-bubble { font-family: var(--font-sans); font-size: 14.5px; line-height: 1.42; padding: 11px 15px; border-radius: 18px; }
      .ct-msg-in .ct-bubble { background: var(--surface-card, #f0ece4); color: var(--charcoal); border-bottom-left-radius: 6px; }
      .ct-msg-out .ct-bubble { background: var(--coral); color: var(--cream); border-bottom-right-radius: 6px; }
      .ct-bubble-typing { display: inline-flex; gap: 4px; align-items: center; padding: 14px 16px; }
      .ct-bubble-typing i { width: 6px; height: 6px; border-radius: 50%; background: var(--stone, #a89f92); animation: ctEll 1.2s ease-in-out infinite; }
      .ct-msg-out .ct-bubble-typing i { background: color-mix(in srgb, var(--cream) 80%, var(--coral)); }
      .ct-bubble-typing i:nth-child(2) { animation-delay: 0.16s; }
      .ct-bubble-typing i:nth-child(3) { animation-delay: 0.32s; }
      .ct-booked { display: inline-flex; align-items: center; gap: 7px; margin-top: 7px; font-family: var(--font-sans); font-size: 12px; font-weight: 600; color: var(--coral); background: var(--coral-tint); border: 1px solid var(--coral-soft); border-radius: var(--radius-pill); padding: 6px 12px; animation: ctBooked 0.5s var(--ease-house) both; }

      @media (max-width: 980px) {
        .ct-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        .ct-chatwrap { margin: 0 auto; }
      }
      @media (prefers-reduced-motion: reduce) {
        .ct-rise, .ct-dot, .ct-pulse-dot, .ct-chatwrap, .ct-msg, .ct-online, .ct-bubble-typing i, .ct-booked { animation: none !important; }
        .ct-rise { opacity: 1 !important; transform: none !important; }
      }
    ` }} />
  );
}

function ContactShell({ children, footer }) {
  return (
    <div>
      <ContactHero />
      <section style={{ background: "var(--canvas)", padding: `56px var(--content-gutter) ${footer ? 44 : 96}px` }}>
        <div className="r-stack" style={{ maxWidth: "var(--content-max)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, alignItems: "stretch" }}>
          {children}
        </div>
      </section>
      {footer ? (
        <section style={{ background: "var(--canvas)", padding: "8px var(--content-gutter) 96px", borderTop: "1px solid var(--hairline)" }}>
          <div style={{ maxWidth: 520, margin: "0 auto", paddingTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
            {footer}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function CalArrow({ dir, disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled} aria-label={dir === "prev" ? "Previous month" : "Next month"}
      style={{ width: 34, height: 34, borderRadius: "var(--radius-md)", border: "1px solid var(--hairline)", background: "var(--canvas)", cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.4 : 1, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: dir === "prev" ? "rotate(180deg)" : "none" }}>
        <path d="M5 3l4 4-4 4" stroke="var(--charcoal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}
