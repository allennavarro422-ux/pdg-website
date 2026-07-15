"use client";
import React, { useState } from "react";

/**
 * PDG Textarea — multi-line field matching Input.
 */
export function Textarea({ label, hint, error, id, rows = 5, required, style, ...rest }) {
  const [focus, setFocus] = useState(false);
  const inputId = id || (label ? `ta-${String(label).toLowerCase().replace(/\s+/g, "-")}` : undefined);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7, ...style }}>
      {label ? (
        <label htmlFor={inputId} style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--charcoal)" }}>
          {label}
          {required ? <span style={{ color: "var(--coral)" }}> *</span> : null}
        </label>
      ) : null}
      <textarea
        id={inputId}
        rows={rows}
        required={required}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          padding: "12px 14px",
          fontFamily: "var(--font-sans)",
          fontSize: 15,
          lineHeight: 1.55,
          color: "var(--charcoal)",
          background: "var(--canvas)",
          border: "1px solid",
          borderColor: error ? "var(--coral)" : focus ? "var(--accent)" : "var(--hairline)",
          borderRadius: "var(--radius-md)",
          outline: "none",
          resize: "vertical",
          boxShadow: focus ? "0 0 0 3px color-mix(in srgb, var(--accent) 16%, transparent)" : "none",
          transition: "border-color var(--t-quick), box-shadow var(--t-quick)",
          boxSizing: "border-box",
          width: "100%",
        }}
        {...rest}
      />
      {error ? <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--coral)" }}>{error}</span> : hint ? <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--muted)" }}>{hint}</span> : null}
    </div>
  );
}
