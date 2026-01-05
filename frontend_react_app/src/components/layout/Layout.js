import React, { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../nav/Navbar";
import Footer from "../nav/Footer";
import CartDrawer from "../cart/CartDrawer";
import FiltersDrawer from "../filters/FiltersDrawer";

/**
 * Layout controls shared UI state:
 * - search + filters stored in URL query on Home
 * - cart drawer visibility
 */

// PUBLIC_INTERFACE
export default function Layout() {
  /** Shared application layout with navbar, drawers, and footer. */
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const isHome = location.pathname === "/";

  const searchValue = isHome ? searchParams.get("q") || "" : "";

  const filters = useMemo(() => {
    if (!isHome) return null;
    return {
      cuisine: searchParams.getAll("cuisine"),
      rating: searchParams.get("rating") || "",
      price: searchParams.get("price") || "",
      maxTime: searchParams.get("maxTime") || "",
      sort: searchParams.get("sort") || "recommended"
    };
  }, [isHome, searchParams]);

  const onSearchChange = (value) => {
    if (!isHome) {
      navigate(`/?q=${encodeURIComponent(value)}`);
      return;
    }
    const next = new URLSearchParams(searchParams);
    if (value) next.set("q", value);
    else next.delete("q");
    setSearchParams(next, { replace: true });
  };

  const onApplyFilters = (nextFilters) => {
    if (!isHome) {
      navigate("/");
      return;
    }
    const next = new URLSearchParams();

    if (searchValue) next.set("q", searchValue);

    (nextFilters.cuisine || []).forEach((c) => next.append("cuisine", c));
    if (nextFilters.rating) next.set("rating", nextFilters.rating);
    if (nextFilters.price) next.set("price", nextFilters.price);
    if (nextFilters.maxTime) next.set("maxTime", nextFilters.maxTime);
    if (nextFilters.sort) next.set("sort", nextFilters.sort);

    setSearchParams(next, { replace: true });
    setIsFiltersOpen(false);
  };

  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <Navbar
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        onOpenFilters={() => setIsFiltersOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        showSearch={isHome}
        showFilters={isHome}
      />

      <main className="page" style={{ flex: 1 }}>
        <Outlet />
      </main>

      <Footer />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <FiltersDrawer
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={filters}
        onApply={onApplyFilters}
      />
    </div>
  );
}
