"use client";
import React, { useState } from "react";

/**
 * PDG Select — native dropdown styled to match Input, with a custom chevron.
 */
export function Select({ label, hint, id, options = [], placeholder, required, value, onChange, defaultValue, style, ...rest }) {
  const [focus, setFocus] = useState(false);
  const inputId = id || (label ? `sel-${String(label).toLowerCase().replace(/\s+/g, "-")}` : undefined);
  const controlled = value !== undefined;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7, ...style }}>
      {label ? (
        <label htmlFor={inputId} style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--charcoal)" }}>
          {label}
          {required ? <span style={{ color: "var(--coral)" }}> *</span> : null}
        </label>
      ) : null}
      <div style={{ position: "relative" }}>
        <select
          id={inputId}
          required={required}
          {...(controlled ? { value, onChange } : { defaultValue: defaultValue !== undefined ? defaultValue : "" })}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            height: 48,
            width: "100%",
            padding: "0 40px 0 14px",
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            color: "var(--charcoal)",
            background: "var(--canvas)",
            border: "1px solid",
            borderColor: focus ? "var(--accent)" : "var(--hairline)",
            borderRadius: "var(--radius-md)",
            outline: "none",
            boxShadow: focus ? "0 0 0 3px color-mix(in srgb, var(--accent) 16%, transparent)" : "none",
            transition: "border-color var(--t-quick), box-shadow var(--t-quick)",
            boxSizing: "border-box",
            cursor: "pointer",
          }}
          {...rest}
        >
          {placeholder ? <option value="" disabled>{placeholder}</option> : null}
          {options.map((o, i) => {
            if (o && typeof o === "object" && Array.isArray(o.options)) {
              return (
                <optgroup key={o.label || i} label={o.label}>
                  {o.options.map((it) => {
                    const v = typeof it === "string" ? it : it.value;
                    const l = typeof it === "string" ? it : it.label;
                    return <option key={v} value={v}>{l}</option>;
                  })}
                </optgroup>
              );
            }
            const val = typeof o === "string" ? o : o.value;
            const labelText = typeof o === "string" ? o : o.label;
            return <option key={val} value={val}>{labelText}</option>;
          })}
        </select>
        <span aria-hidden style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", display: "inline-flex" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 5l4 4 4-4" stroke="var(--muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      {hint ? <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--muted)" }}>{hint}</span> : null}
    </div>
  );
}
