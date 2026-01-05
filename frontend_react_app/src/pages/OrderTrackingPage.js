import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import OrderProgress, { steps } from "../components/tracking/OrderProgress";
import { useOrder } from "../state/order/OrderContext";

function nextStatus(current) {
  const idx = steps.findIndex((s) => s.key === current);
  if (idx < 0) return steps[0].key;
  return steps[Math.min(steps.length - 1, idx + 1)].key;
}

function pretty(status) {
  const s = steps.find((x) => x.key === status);
  return s ? s.label : "Received";
}

// PUBLIC_INTERFACE
export default function OrderTrackingPage() {
  /** Order tracking page with polling mock updates. */
  const { orderId } = useParams();
  const { latestOrder } = useOrder();

  const [status, setStatus] = useState("received");
  const [pollCount, setPollCount] = useState(0);

  const order = useMemo(() => {
    if (latestOrder && latestOrder.id === orderId) return latestOrder;
    return null;
  }, [latestOrder, orderId]);

  useEffect(() => {
    // Mock polling: advance status every ~4 seconds until delivered.
    const interval = setInterval(() => {
      setPollCount((c) => c + 1);
      setStatus((s) => (s === "delivered" ? s : nextStatus(s)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="card" style={{ padding: 18, background: "var(--gradient-accent)" }}>
        <h1 className="h1">Track your order</h1>
        <p className="p" style={{ marginTop: 8 }}>
          Mock status updates run on a timer. No backend required.
        </p>
      </div>

      <div className="grid grid-2" style={{ marginTop: 14, alignItems: "start" }}>
        <div className="grid" style={{ gap: 14 }}>
          <OrderProgress status={status} />
          <div className="card" style={{ padding: 16 }}>
            <div className="row-between">
              <div>
                <div style={{ fontWeight: 900 }}>Order #{orderId}</div>
                <div className="muted" style={{ marginTop: 6 }}>
                  Current status: <span style={{ fontWeight: 800, color: "var(--color-primary)" }}>{pretty(status)}</span>
                </div>
              </div>
              <div className="muted" style={{ fontSize: 13 }}>
                Polls: {pollCount}
              </div>
            </div>

            <div className="divider" style={{ margin: "12px 0" }} />

            <div className="muted" style={{ fontSize: 13 }}>
              When status reaches “Delivered”, this page stops advancing.
            </div>

            <div className="row" style={{ marginTop: 12 }}>
              <Link className="btn btn-ghost" to="/">
                Back to home
              </Link>
              <Link className="btn" to="/checkout">
                Start new order
              </Link>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>Order details</div>
          {order ? (
            <>
              <div className="muted" style={{ marginTop: 6 }}>
                {order.restaurantName}
              </div>
              <div className="divider" style={{ margin: "12px 0" }} />
              <div className="grid" style={{ gap: 10 }}>
                {(order.items || []).map((i) => (
                  <div key={i.id} className="row-between">
                    <div className="muted">
                      {i.quantity}× {i.name}
                    </div>
                    <div style={{ fontWeight: 750 }}>${(i.price * i.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="divider" style={{ margin: "12px 0" }} />
              <div className="row-between">
                <div className="muted">Delivery to</div>
                <div style={{ fontWeight: 750, maxWidth: 220, textAlign: "right" }}>{order.delivery?.address}</div>
              </div>
            </>
          ) : (
            <>
              <div className="muted" style={{ marginTop: 6 }}>
                No stored details for this order id in the current session.
              </div>
              <div className="divider" style={{ margin: "12px 0" }} />
              <div className="muted" style={{ fontSize: 13 }}>
                Tip: Place an order first to see full details here.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
