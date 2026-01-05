import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RestaurantCard from "../components/restaurants/RestaurantCard";
import { fetchRestaurants } from "../services/apiClient";

function parseFilters(searchParams) {
  return {
    q: (searchParams.get("q") || "").trim(),
    cuisine: searchParams.getAll("cuisine"),
    rating: searchParams.get("rating") || "",
    price: searchParams.get("price") || "",
    maxTime: searchParams.get("maxTime") || "",
    sort: searchParams.get("sort") || "recommended"
  };
}

function matchQuery(restaurant, q) {
  if (!q) return true;
  const hay = `${restaurant.name} ${restaurant.cuisine.join(" ")}`.toLowerCase();
  return hay.includes(q.toLowerCase());
}

function moneySignToRank(price) {
  return price.length; // "$" -> 1, "$$" -> 2
}

// PUBLIC_INTERFACE
export default function HomePage() {
  /** Restaurant discovery page (search, filter, sort). */
  const [searchParams] = useSearchParams();
  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    fetchRestaurants()
      .then((data) => {
        if (!alive) return;
        setRestaurants(data);
        setLoading(false);
      })
      .catch((e) => {
        if (!alive) return;
        setError(e?.message || "Failed to load restaurants");
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const minRating = filters.rating ? Number(filters.rating) : 0;
    const maxTime = filters.maxTime ? Number(filters.maxTime) : Infinity;
    const cuisineSet = new Set(filters.cuisine);

    let list = restaurants.filter((r) => {
      if (!matchQuery(r, filters.q)) return false;
      if (minRating && r.rating < minRating) return false;
      if (filters.price && r.price !== filters.price) return false;
      if (Number.isFinite(maxTime) && r.deliveryTimeMins > maxTime) return false;
      if (cuisineSet.size > 0) {
        const hasAny = r.cuisine.some((c) => cuisineSet.has(c));
        if (!hasAny) return false;
      }
      return true;
    });

    switch (filters.sort) {
      case "rating":
        list = list.slice().sort((a, b) => b.rating - a.rating);
        break;
      case "time":
        list = list.slice().sort((a, b) => a.deliveryTimeMins - b.deliveryTimeMins);
        break;
      case "price":
        list = list.slice().sort((a, b) => moneySignToRank(a.price) - moneySignToRank(b.price));
        break;
      default:
        // recommended: weighted mix
        list = list
          .slice()
          .sort((a, b) => b.rating * 2 - b.deliveryTimeMins * 0.03 - (a.rating * 2 - a.deliveryTimeMins * 0.03));
        break;
    }

    return list;
  }, [restaurants, filters]);

  return (
    <div className="container">
      <div className="card" style={{ padding: 18, background: "var(--gradient-accent)" }}>
        <h1 className="h1">Find food that arrives fast and tastes great</h1>
        <p className="p" style={{ marginTop: 8 }}>
          Search, filter, and sort restaurants. Add items to your cart and track a mock delivery.
        </p>

        <div className="row" style={{ marginTop: 14, flexWrap: "wrap" }}>
          <div className="chip chip-active">Ocean Professional</div>
          {filters.cuisine.length ? <div className="chip">Cuisine: {filters.cuisine.join(", ")}</div> : null}
          {filters.rating ? <div className="chip">Rating: {filters.rating}+</div> : null}
          {filters.maxTime ? <div className="chip">Time: ≤ {filters.maxTime} mins</div> : null}
          {filters.price ? <div className="chip">Price: {filters.price}</div> : null}
          <div className="chip">Sort: {filters.sort}</div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        {loading ? (
          <div className="card" style={{ padding: 16 }}>
            Loading restaurants…
          </div>
        ) : error ? (
          <div className="card" style={{ padding: 16, borderColor: "rgba(239,68,68,0.35)" }}>
            <div style={{ fontWeight: 850, color: "var(--color-error)" }}>Could not load restaurants</div>
            <div className="muted" style={{ marginTop: 6 }}>
              {error}
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 850 }}>No matches</div>
            <div className="muted" style={{ marginTop: 6 }}>
              Try clearing filters or searching for another cuisine.
            </div>
          </div>
        ) : (
          <div className="grid grid-3">
            {filtered.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
