import React from "react";
import { Link } from "react-router-dom";

function stars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "☆" : "") + "·".repeat(empty);
}

// PUBLIC_INTERFACE
export default function RestaurantCard({ restaurant }) {
  /** Displays a restaurant summary card for discovery list. */
  return (
    <Link to={`/restaurants/${restaurant.id}`} aria-label={`View ${restaurant.name}`}>
      <article className="card card-hover" style={{ overflow: "hidden" }}>
        <div style={{ height: 140, background: "rgba(37, 99, 235, 0.08)" }}>
          <img
            src={restaurant.imageUrl}
            alt={`${restaurant.name} cover`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            loading="lazy"
          />
        </div>

        <div style={{ padding: 14 }}>
          <div className="row-between" style={{ alignItems: "flex-start" }}>
            <div>
              <div style={{ fontWeight: 900, letterSpacing: "-0.01em" }}>{restaurant.name}</div>
              <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>
                {restaurant.cuisine.join(" • ")}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 850 }}>{restaurant.rating.toFixed(1)}</div>
              <div className="muted" style={{ fontSize: 12 }}>
                {stars(restaurant.rating)}
              </div>
            </div>
          </div>

          <div className="divider" style={{ margin: "12px 0" }} />

          <div className="row-between" style={{ fontSize: 13 }}>
            <div className="muted">{restaurant.deliveryTimeMins} mins</div>
            <div className="muted">{restaurant.price}</div>
            <div className="muted">${restaurant.deliveryFee.toFixed(2)} delivery</div>
          </div>
        </div>
      </article>
    </Link>
  );
}
