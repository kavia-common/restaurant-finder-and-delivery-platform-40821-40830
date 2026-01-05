import React, { useEffect } from "react";

function useEscapeToClose(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);
}

// PUBLIC_INTERFACE
export default function Drawer({ isOpen, onClose, title, children, width = 420 }) {
  /** Accessible right-side drawer with overlay. */
  useEscapeToClose(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div aria-label={title} role="dialog" aria-modal="true">
      <button
        onClick={onClose}
        aria-label="Close drawer"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(17, 24, 39, 0.35)",
          border: "none",
          padding: 0,
          zIndex: 30
        }}
      />
      <aside
        className="card"
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          bottom: 10,
          width: "min(92vw, " + width + "px)",
          zIndex: 31,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "var(--shadow-md)"
        }}
      >
        <div
          className="row-between"
          style={{
            padding: 14,
            borderBottom: "1px solid var(--color-border)",
            background: "var(--gradient-accent)"
          }}
        >
          <div style={{ fontWeight: 800 }}>{title}</div>
          <button className="btn btn-ghost" onClick={onClose}>
            Close
          </button>
        </div>
        <div style={{ padding: 14, overflow: "auto", flex: 1 }}>{children}</div>
      </aside>
    </div>
  );
}
