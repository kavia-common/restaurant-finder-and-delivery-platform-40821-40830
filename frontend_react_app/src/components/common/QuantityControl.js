import React from "react";

// PUBLIC_INTERFACE
export default function QuantityControl({ value, onChange, min = 0 }) {
  /** Simple quantity control with +/- buttons. */
  return (
    <div className="row" style={{ gap: 8 }}>
      <button
        className="btn btn-ghost"
        onClick={() => onChange(Math.max(min, (Number(value) || 0) - 1))}
        aria-label="Decrease quantity"
        style={{ padding: "8px 10px" }}
      >
        −
      </button>
      <div style={{ minWidth: 22, textAlign: "center", fontWeight: 800 }}>{value}</div>
      <button
        className="btn btn-ghost"
        onClick={() => onChange((Number(value) || 0) + 1)}
        aria-label="Increase quantity"
        style={{ padding: "8px 10px" }}
      >
        +
      </button>
    </div>
  );
}
