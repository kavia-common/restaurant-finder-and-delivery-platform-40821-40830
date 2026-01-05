import React, { useMemo, useState } from "react";
import Drawer from "../common/Drawer";

const cuisineOptions = ["Japanese", "Sushi", "Indian", "Vegetarian", "Healthy", "Bowls", "Italian", "Pizza"];

function normalizeFilters(filters) {
  return {
    cuisine: filters?.cuisine || [],
    rating: filters?.rating || "",
    price: filters?.price || "",
    maxTime: filters?.maxTime || "",
    sort: filters?.sort || "recommended"
  };
}

// PUBLIC_INTERFACE
export default function FiltersDrawer({ isOpen, onClose, filters, onApply }) {
  /** Drawer UI to adjust restaurant filters and sort. */
  const initial = useMemo(() => normalizeFilters(filters), [filters]);
  const [draft, setDraft] = useState(initial);

  // When drawer opens, reset draft to current filters for predictable behavior.
  React.useEffect(() => {
    if (isOpen) setDraft(initial);
  }, [isOpen, initial]);

  const toggleCuisine = (c) => {
    setDraft((d) => {
      const has = d.cuisine.includes(c);
      const cuisine = has ? d.cuisine.filter((x) => x !== c) : [...d.cuisine, c];
      return { ...d, cuisine };
    });
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Filters & Sort" width={520}>
      <div className="grid" style={{ gap: 14 }}>
        <div className="card" style={{ padding: 12 }}>
          <div style={{ fontWeight: 850, marginBottom: 8 }}>Cuisine</div>
          <div className="row" style={{ flexWrap: "wrap" }}>
            {cuisineOptions.map((c) => (
              <div
                key={c}
                className={`chip ${draft.cuisine.includes(c) ? "chip-active" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => toggleCuisine(c)}
                onKeyDown={(e) => (e.key === "Enter" ? toggleCuisine(c) : null)}
                aria-pressed={draft.cuisine.includes(c)}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-2">
          <div className="card" style={{ padding: 12 }}>
            <div style={{ fontWeight: 850, marginBottom: 8 }}>Minimum rating</div>
            <select
              className="input"
              value={draft.rating}
              onChange={(e) => setDraft((d) => ({ ...d, rating: e.target.value }))}
              aria-label="Minimum rating"
            >
              <option value="">Any</option>
              <option value="4.0">4.0+</option>
              <option value="4.3">4.3+</option>
              <option value="4.5">4.5+</option>
            </select>
          </div>

          <div className="card" style={{ padding: 12 }}>
            <div style={{ fontWeight: 850, marginBottom: 8 }}>Max delivery time</div>
            <select
              className="input"
              value={draft.maxTime}
              onChange={(e) => setDraft((d) => ({ ...d, maxTime: e.target.value }))}
              aria-label="Max delivery time"
            >
              <option value="">Any</option>
              <option value="25">≤ 25 mins</option>
              <option value="30">≤ 30 mins</option>
              <option value="35">≤ 35 mins</option>
              <option value="40">≤ 40 mins</option>
            </select>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="card" style={{ padding: 12 }}>
            <div style={{ fontWeight: 850, marginBottom: 8 }}>Price</div>
            <select
              className="input"
              value={draft.price}
              onChange={(e) => setDraft((d) => ({ ...d, price: e.target.value }))}
              aria-label="Price"
            >
              <option value="">Any</option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
            </select>
          </div>

          <div className="card" style={{ padding: 12 }}>
            <div style={{ fontWeight: 850, marginBottom: 8 }}>Sort</div>
            <select
              className="input"
              value={draft.sort}
              onChange={(e) => setDraft((d) => ({ ...d, sort: e.target.value }))}
              aria-label="Sort"
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Rating (high → low)</option>
              <option value="time">Delivery time (fastest)</option>
              <option value="price">Price (low → high)</option>
            </select>
          </div>
        </div>

        <div className="row" style={{ justifyContent: "flex-end" }}>
          <button className="btn btn-ghost" onClick={() => setDraft(normalizeFilters({}))}>
            Reset
          </button>
          <button className="btn" onClick={() => onApply(draft)}>
            Apply
          </button>
        </div>
      </div>
    </Drawer>
  );
}
