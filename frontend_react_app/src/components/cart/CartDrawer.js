import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Drawer from "../common/Drawer";
import QuantityControl from "../common/QuantityControl";
import { useCart } from "../../state/cart/CartContext";

function money(n) {
  return `$${n.toFixed(2)}`;
}

// PUBLIC_INTERFACE
export default function CartDrawer({ isOpen, onClose }) {
  /** Cart drawer with item adjustments and totals. */
  const { state, derived, setQuantity, removeItem, clear } = useCart();
  const [promo, setPromo] = useState("");
  const navigate = useNavigate();

  const canCheckout = state.items.length > 0;

  const title = useMemo(() => {
    if (!state.restaurantName) return "Your Cart";
    return `Your Cart — ${state.restaurantName}`;
  }, [state.restaurantName]);

  const checkoutNow = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={title}>
      {state.items.length === 0 ? (
        <div className="muted">
          Cart is empty. Add items from a restaurant to start an order.
        </div>
      ) : (
        <div className="grid" style={{ gap: 12 }}>
          {state.items.map((item) => (
            <div key={item.id} className="card" style={{ padding: 12 }}>
              <div className="row-between" style={{ alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontWeight: 800 }}>{item.name}</div>
                  <div className="muted" style={{ fontSize: 13 }}>
                    {money(item.price)} each
                  </div>
                </div>
                <button className="btn btn-ghost" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                  Remove
                </button>
              </div>

              <div className="row-between" style={{ marginTop: 10 }}>
                <QuantityControl value={item.quantity} onChange={(q) => setQuantity(item.id, q)} min={1} />
                <div style={{ fontWeight: 850 }}>{money(item.price * item.quantity)}</div>
              </div>
            </div>
          ))}

          <div className="card" style={{ padding: 12 }}>
            <div className="label">Promo code (placeholder)</div>
            <div className="row" style={{ marginTop: 8 }}>
              <input
                className="input"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="e.g. OCEAN10"
                aria-label="Promo code"
              />
              <button className="btn btn-ghost" disabled>
                Apply
              </button>
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
                <div className="muted">Delivery fee</div>
                <div style={{ fontWeight: 700 }}>{money(derived.deliveryFee)}</div>
              </div>
              <div className="row-between">
                <div className="muted">Service fee</div>
                <div style={{ fontWeight: 700 }}>{money(derived.serviceFee)}</div>
              </div>
              <div className="divider" style={{ margin: "6px 0" }} />
              <div className="row-between">
                <div style={{ fontWeight: 850 }}>Total</div>
                <div style={{ fontWeight: 900 }}>{money(derived.total)}</div>
              </div>
            </div>

            <div className="row" style={{ marginTop: 12 }}>
              <button className="btn" onClick={checkoutNow} disabled={!canCheckout} style={{ flex: 1 }}>
                Checkout
              </button>
              <button className="btn btn-ghost" onClick={clear} aria-label="Clear cart">
                Clear
              </button>
            </div>

            <div style={{ marginTop: 10, fontSize: 13 }} className="muted">
              You can also go to <Link to="/checkout">Checkout</Link>.
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
