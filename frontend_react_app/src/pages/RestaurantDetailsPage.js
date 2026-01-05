import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchRestaurantDetails } from "../services/apiClient";
import { useCart } from "../state/cart/CartContext";
import QuantityControl from "../components/common/QuantityControl";

function money(n) {
  return `$${n.toFixed(2)}`;
}

// PUBLIC_INTERFACE
export default function RestaurantDetailsPage() {
  /** Restaurant details page: header + menu sections with add/remove to cart. */
  const { restaurantId } = useParams();
  const { state, addItem, setQuantity } = useCart();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [details, setDetails] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    fetchRestaurantDetails(restaurantId)
      .then((data) => {
        if (!alive) return;
        setDetails(data);
        setLoading(false);
      })
      .catch((e) => {
        if (!alive) return;
        setError(e?.message || "Failed to load restaurant");
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [restaurantId]);

  const quantitiesById = useMemo(() => {
    const map = new Map();
    state.items.forEach((i) => map.set(i.id, i.quantity));
    return map;
  }, [state.items]);

  const onAdd = (item) => {
    addItem(details, item);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card" style={{ padding: 16 }}>
          Loading restaurant…
        </div>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="container">
        <div className="card" style={{ padding: 16, borderColor: "rgba(239,68,68,0.35)" }}>
          <div style={{ fontWeight: 850, color: "var(--color-error)" }}>Restaurant not available</div>
          <div className="muted" style={{ marginTop: 6 }}>
            {error || "The restaurant could not be found."}
          </div>
          <div style={{ marginTop: 12 }}>
            <Link className="btn btn-ghost" to="/">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const cartMismatch = state.restaurantId && state.restaurantId !== details.id;

  return (
    <div className="container">
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ height: 180, background: "rgba(37, 99, 235, 0.08)" }}>
          <img
            src={details.imageUrl}
            alt={`${details.name} cover`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        <div style={{ padding: 18 }}>
          <div className="row-between" style={{ alignItems: "flex-start" }}>
            <div>
              <h1 className="h1">{details.name}</h1>
              <div className="muted" style={{ marginTop: 6 }}>
                {details.cuisine.join(" • ")} · {details.rating.toFixed(1)} rating · {details.deliveryTimeMins} mins ·{" "}
                {details.price}
              </div>
            </div>
            <Link className="btn btn-ghost" to="/">
              Back
            </Link>
          </div>

          {cartMismatch ? (
            <div
              className="card"
              style={{
                marginTop: 14,
                padding: 12,
                borderColor: "rgba(245,158,11,0.45)",
                background: "rgba(245,158,11,0.08)"
              }}
            >
              <div style={{ fontWeight: 850 }}>Heads up</div>
              <div className="muted" style={{ marginTop: 6 }}>
                Adding items here will replace items from your current cart (different restaurant).
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div style={{ marginTop: 16 }} className="grid" aria-label="Menu sections">
        {details.menu?.sections?.map((section) => (
          <div key={section.id} className="card" style={{ padding: 16 }}>
            <div className="row-between">
              <h2 className="h2">{section.title}</h2>
              <div className="muted" style={{ fontSize: 13 }}>
                {section.items.length} items
              </div>
            </div>

            <div className="divider" style={{ margin: "12px 0" }} />

            <div className="grid" style={{ gap: 10 }}>
              {section.items.map((item) => {
                const qty = quantitiesById.get(item.id) || 0;
                return (
                  <div key={item.id} className="card" style={{ padding: 12 }}>
                    <div className="row-between" style={{ alignItems: "flex-start" }}>
                      <div style={{ paddingRight: 10 }}>
                        <div style={{ fontWeight: 850 }}>{item.name}</div>
                        <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>
                          {item.description}
                        </div>
                      </div>
                      <div style={{ fontWeight: 900 }}>{money(item.price)}</div>
                    </div>

                    <div className="row-between" style={{ marginTop: 12 }}>
                      {qty > 0 ? (
                        <QuantityControl value={qty} onChange={(q) => setQuantity(item.id, q)} min={0} />
                      ) : (
                        <div className="muted" style={{ fontSize: 13 }}>
                          Not in cart
                        </div>
                      )}

                      <button className="btn" onClick={() => onAdd(item)} aria-label={`Add ${item.name} to cart`}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18 }}>
        <Link className="btn btn-secondary" to="/checkout" aria-label="Go to checkout">
          Go to checkout
        </Link>
      </div>
    </div>
  );
}
