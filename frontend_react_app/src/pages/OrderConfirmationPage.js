import React, { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useOrder } from "../state/order/OrderContext";

function money(n) {
  return `$${n.toFixed(2)}`;
}

// PUBLIC_INTERFACE
export default function OrderConfirmationPage() {
  /** Confirmation page for the last created order. */
  const { latestOrder } = useOrder();
  const location = useLocation();
  const navigate = useNavigate();

  const orderIdFromState = location.state?.orderId;
  const order = latestOrder && (!orderIdFromState || latestOrder.id === orderIdFromState) ? latestOrder : latestOrder;

  const createdAt = useMemo(() => {
    if (!order?.createdAt) return "";
    try {
      return new Date(order.createdAt).toLocaleString();
    } catch {
      return order.createdAt;
    }
  }, [order?.createdAt]);

  if (!order) {
    return (
      <div className="container">
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 850 }}>No recent order found</div>
          <div className="muted" style={{ marginTop: 6 }}>
            Place an order to see confirmation.
          </div>
          <div style={{ marginTop: 12 }}>
            <Link className="btn" to="/">
              Browse restaurants
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const startTracking = () => navigate(`/track/${encodeURIComponent(order.id)}`);

  return (
    <div className="container">
      <div className="card" style={{ padding: 18, background: "var(--gradient-accent)" }}>
        <h1 className="h1">Order confirmed</h1>
        <p className="p" style={{ marginTop: 8 }}>
          Your order has been placed. This is a mock confirmation.
        </p>
      </div>

      <div className="grid grid-2" style={{ marginTop: 14, alignItems: "start" }}>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>Order #{order.id}</div>
          <div className="muted" style={{ marginTop: 6 }}>
            {order.restaurantName} · {createdAt}
          </div>

          <div className="divider" style={{ margin: "12px 0" }} />

          <div className="grid" style={{ gap: 10 }}>
            {(order.items || []).map((i) => (
              <div key={i.id} className="row-between">
                <div className="muted">
                  {i.quantity}× {i.name}
                </div>
                <div style={{ fontWeight: 750 }}>{money(i.price * i.quantity)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>What’s next</div>
          <div className="muted" style={{ marginTop: 6 }}>
            Track progress from received → delivered with a mock polling timer.
          </div>

          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn" onClick={startTracking}>
              Track order
            </button>
            <Link className="btn btn-ghost" to="/">
              Back to home
            </Link>
          </div>

          <div className="divider" style={{ margin: "12px 0" }} />

          <div className="grid" style={{ gap: 8 }}>
            <div className="row-between">
              <div className="muted">Total</div>
              <div style={{ fontWeight: 900 }}>{money(order.pricing?.total || 0)}</div>
            </div>
            <div className="row-between">
              <div className="muted">Delivery address</div>
              <div style={{ fontWeight: 750, textAlign: "right", maxWidth: 220 }}>
                {order.delivery?.address}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
