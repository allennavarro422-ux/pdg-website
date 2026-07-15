"use client";
import React, { useState } from "react";

/**
 * PDG Input — text field on the cream canvas. 1px hairline, 12px radius, focus
 * ring in the section accent.
 */
export function Input({ label, hint, error, id, type = "text", required, style, ...rest }) {
  const [focus, setFocus] = useState(false);
  const inputId = id || (label ? `in-${String(label).toLowerCase().replace(/\s+/g, "-")}` : undefined);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7, ...style }}>
      {label ? (
        <label htmlFor={inputId} style={labelStyle}>
          {label}
          {required ? <span style={{ color: "var(--coral)" }}> *</span> : null}
        </label>
      ) : null}
      <input
        id={inputId}
        type={type}
        required={required}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          height: 48,
          padding: "0 14px",
          fontFamily: "var(--font-sans)",
          fontSize: 15,
          color: "var(--charcoal)",
          background: "var(--canvas)",
          border: "1px solid",
          borderColor: error ? "var(--coral)" : focus ? "var(--accent)" : "var(--hairline)",
          borderRadius: "var(--radius-md)",
          outline: "none",
          boxShadow: focus ? "0 0 0 3px color-mix(in srgb, var(--accent) 16%, transparent)" : "none",
          transition: "border-color var(--t-quick), box-shadow var(--t-quick)",
          boxSizing: "border-box",
          width: "100%",
        }}
        {...rest}
      />
      {error ? <span style={{ ...hintStyle, color: "var(--coral)" }}>{error}</span> : hint ? <span style={hintStyle}>{hint}</span> : null}
    </div>
  );
}

const labelStyle = {
  fontFamily: "var(--font-sans)",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--charcoal)",
};
const hintStyle = {
  fontFamily: "var(--font-sans)",
  fontSize: 12.5,
  color: "var(--muted)",
};
