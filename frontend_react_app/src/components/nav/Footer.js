import React from "react";

// PUBLIC_INTERFACE
export default function Footer() {
  /** Simple footer for the app layout. */
  return (
    <footer style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
      <div className="container" style={{ padding: "18px 16px" }}>
        <div className="row-between" style={{ flexWrap: "wrap" }}>
          <div className="muted" style={{ fontSize: 13 }}>
            © {new Date().getFullYear()} OceanEats — mock food delivery experience
          </div>
          <div className="muted" style={{ fontSize: 13 }}>
            Theme: Ocean Professional · Primary #2563EB · Accent #F59E0B
          </div>
        </div>
      </div>
    </footer>
  );
}
