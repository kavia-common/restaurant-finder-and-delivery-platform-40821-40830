import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../state/cart/CartContext";
import { useOrder } from "../state/order/OrderContext";

function money(n) {
  return `$${n.toFixed(2)}`;
}

// PUBLIC_INTERFACE
export default function CheckoutPage() {
  /** Checkout flow: delivery info form + payment placeholder + create mock order. */
  const { state, derived, clear } = useCart();
  const { createOrder } = useOrder();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    instructions: "",
    paymentMethod: "card"
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    if (state.items.length === 0) return false;
    return form.fullName.trim() && form.phone.trim() && form.address.trim();
  }, [state.items.length, form.fullName, form.phone, form.address]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!canSubmit) return;

    setSubmitting(true);

    // Mock submit delay
    await new Promise((r) => setTimeout(r, 550));

    const order = createOrder({
      restaurantId: state.restaurantId,
      restaurantName: state.restaurantName,
      items: state.items,
      pricing: derived,
      delivery: { ...form }
    });

    clear();
    setSubmitting(false);
    navigate("/order-confirmation", { state: { orderId: order.id } });
  };

  if (state.items.length === 0) {
    return (
      <div className="container">
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 850 }}>Your cart is empty</div>
          <div className="muted" style={{ marginTop: 6 }}>
            Add items from a restaurant to checkout.
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

  return (
    <div className="container">
      <div className="row-between" style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 560px", minWidth: 280 }}>
          <div className="card" style={{ padding: 18, background: "var(--gradient-accent)" }}>
            <h1 className="h1">Checkout</h1>
            <p className="p" style={{ marginTop: 8 }}>
              Enter delivery details and place a mock order.
            </p>
          </div>

          <form onSubmit={onSubmit} className="card" style={{ padding: 16, marginTop: 14 }}>
            <div className="grid grid-2">
              <div>
                <div className="label">Full name</div>
                <input
                  className="input"
                  value={form.fullName}
                  onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                  placeholder="Alex Johnson"
                  aria-label="Full name"
                  required
                />
              </div>

              <div>
                <div className="label">Phone</div>
                <input
                  className="input"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="(555) 123-4567"
                  aria-label="Phone"
                  required
                />
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div className="label">Address</div>
              <input
                className="input"
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                placeholder="123 Ocean Ave, Suite 4"
                aria-label="Delivery address"
                required
              />
            </div>

            <div style={{ marginTop: 12 }}>
              <div className="label">Delivery instructions (optional)</div>
              <textarea
                className="input"
                value={form.instructions}
                onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))}
                placeholder="Leave at door, ring bell, etc."
                aria-label="Delivery instructions"
                rows={3}
                style={{ resize: "vertical" }}
              />
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 850, marginBottom: 8 }}>Payment (placeholder)</div>
              <select
                className="input"
                value={form.paymentMethod}
                onChange={(e) => setForm((f) => ({ ...f, paymentMethod: e.target.value }))}
                aria-label="Payment method"
              >
                <option value="card">Card (mock)</option>
                <option value="applepay">Apple Pay (mock)</option>
                <option value="cash">Cash on delivery (mock)</option>
              </select>

              <div className="muted" style={{ fontSize: 13, marginTop: 6 }}>
                No real payments are processed.
              </div>
            </div>

            {error ? (
              <div style={{ marginTop: 12, color: "var(--color-error)", fontWeight: 750 }}>{error}</div>
            ) : null}

            <div className="row" style={{ marginTop: 14, justifyContent: "flex-end" }}>
              <Link className="btn btn-ghost" to="/">
                Continue shopping
              </Link>
              <button className="btn btn-secondary" type="submit" disabled={!canSubmit || submitting}>
                {submitting ? "Placing order…" : "Place order"}
              </button>
            </div>
          </form>
        </div>

        <aside style={{ flex: "0 0 360px", minWidth: 280 }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 900 }}>Order summary</div>
            <div className="muted" style={{ marginTop: 6 }}>
              {state.restaurantName}
            </div>

            <div className="divider" style={{ margin: "12px 0" }} />

            <div className="grid" style={{ gap: 10 }}>
              {state.items.map((i) => (
                <div className="row-between" key={i.id}>
                  <div className="muted" style={{ maxWidth: 220 }}>
                    {i.quantity}× {i.name}
                  </div>
                  <div style={{ fontWeight: 750 }}>{money(i.price * i.quantity)}</div>
                </div>
              ))}
            </div>

            <div className="divider" style={{ margin: "12px 0" }} />

            <div className="grid" style={{ gap: 8 }}>
              <div className="row-between">
                <div className="muted">Subtotal</div>
                <div style={{ fontWeight: 700 }}>{money(derived.subtotal)}</div>
              </div>
              <div className="row-between">
                <div className="muted">Tax</div>
                <div style={{ fontWeight: 700 }}>{money(derived.tax)}</div>
              </div>
              <div className="row-between">
                <div className="muted">Delivery</div>
                <div style={{ fontWeight: 700 }}>{money(derived.deliveryFee)}</div>
              </div>
              <div className="row-between">
                <div className="muted">Service fee</div>
                <div style={{ fontWeight: 700 }}>{money(derived.serviceFee)}</div>
              </div>
              <div className="divider" style={{ margin: "6px 0" }} />
              <div className="row-between">
                <div style={{ fontWeight: 900 }}>Total</div>
                <div style={{ fontWeight: 900 }}>{money(derived.total)}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
