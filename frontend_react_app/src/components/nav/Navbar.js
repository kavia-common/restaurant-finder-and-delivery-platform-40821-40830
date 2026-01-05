import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../state/cart/CartContext";

// PUBLIC_INTERFACE
export default function Navbar({
  searchValue,
  onSearchChange,
  onOpenFilters,
  onOpenCart,
  showSearch,
  showFilters
}) {
  /** Top navigation bar with search/filter/cart. */
  const { derived } = useCart();
  const location = useLocation();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "rgba(249, 250, 251, 0.78)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--color-border)"
      }}
    >
      <div className="container" style={{ padding: "12px 16px" }}>
        <div className="row-between" style={{ gap: 14 }}>
          <div className="row" style={{ minWidth: 220 }}>
            <Link to="/" aria-label="Go to home">
              <div
                className="card"
                style={{
                  padding: "10px 12px",
                  borderRadius: 999,
                  background: "var(--gradient-accent)"
                }}
              >
                <span style={{ fontWeight: 850, letterSpacing: "-0.02em" }}>OceanEats</span>
              </div>
            </Link>
          </div>

          {showSearch ? (
            <div style={{ flex: 1, maxWidth: 620 }}>
              <input
                className="input"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search restaurants or cuisines…"
                aria-label="Search restaurants"
              />
            </div>
          ) : (
            <div style={{ flex: 1 }} />
          )}

          <div className="row" style={{ justifyContent: "flex-end" }}>
            {showFilters ? (
              <button className="btn btn-ghost" onClick={onOpenFilters} aria-label="Open filters">
                Filters
              </button>
            ) : (
              <Link className="btn btn-ghost" to="/" state={{ from: location.pathname }}>
                Browse
              </Link>
            )}

            <button
              className="btn"
              onClick={onOpenCart}
              aria-label="Open cart"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              Cart
              {derived.itemCount > 0 ? <span className="badge">{derived.itemCount}</span> : null}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
