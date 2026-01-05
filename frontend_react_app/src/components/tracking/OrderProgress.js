import React, { useMemo } from "react";

const steps = [
  { key: "received", label: "Received" },
  { key: "preparing", label: "Preparing" },
  { key: "out_for_delivery", label: "Out for delivery" },
  { key: "delivered", label: "Delivered" }
];

function idxFor(status) {
  const i = steps.findIndex((s) => s.key === status);
  return i < 0 ? 0 : i;
}

// PUBLIC_INTERFACE
export default function OrderProgress({ status }) {
  /** Progress UI showing the order status steps. */
  const index = idxFor(status);

  const percent = useMemo(() => {
    if (steps.length <= 1) return 0;
    return (index / (steps.length - 1)) * 100;
  }, [index]);

  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ fontWeight: 900, marginBottom: 10 }}>Delivery progress</div>

      <div style={{ position: "relative", height: 10, borderRadius: 999, background: "rgba(17,24,39,0.08)" }}>
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            borderRadius: 999,
            background: "linear-gradient(90deg, rgba(37,99,235,1), rgba(245,158,11,1))",
            transition: "width 400ms ease"
          }}
        />
      </div>

      <div className="row-between" style={{ marginTop: 12, alignItems: "stretch" }}>
        {steps.map((s, i) => {
          const done = i <= index;
          return (
            <div key={s.key} style={{ textAlign: "center", flex: 1 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  margin: "0 auto 6px",
                  background: done ? "var(--color-primary)" : "rgba(17,24,39,0.18)",
                  transition: "background 300ms ease"
                }}
              />
              <div style={{ fontSize: 12, fontWeight: done ? 850 : 650, color: done ? "var(--color-text)" : "var(--color-text-muted)" }}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { steps };
