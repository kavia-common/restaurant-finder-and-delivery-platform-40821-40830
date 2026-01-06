import { getApiBaseUrl } from "../utils/env";
import { getMenuForRestaurant, getRestaurantById, restaurants } from "./mockData";

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE
export async function fetchRestaurants() {
  /**
   * Fetch restaurants. If API base URL is set, try network first.
   * Falls back to local mock data when API is unavailable.
   */
  const base = getApiBaseUrl();
  if (base) {
    try {
      const res = await fetch(`${base}/restaurants`, {
        headers: { "Content-Type": "application/json" }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await safeJson(res);
      if (Array.isArray(data)) return data;
      if (data && Array.isArray(data.restaurants)) return data.restaurants;
    } catch {
      // fall through to mock
    }
  }
  return restaurants;
}

// PUBLIC_INTERFACE
export async function fetchRestaurantDetails(restaurantId) {
  /**
   * Fetch a restaurant + menu details.
   * Network attempt if API base URL set; otherwise mock.
   */
  const base = getApiBaseUrl();
  if (base) {
    try {
      const res = await fetch(`${base}/restaurants/${restaurantId}`, {
        headers: { "Content-Type": "application/json" }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await safeJson(res);
      if (data) return data;
    } catch {
      // fall through
    }
  }

  const restaurant = getRestaurantById(restaurantId);
  const menu = getMenuForRestaurant(restaurantId);
  if (!restaurant) return null;

  // Prefer a dedicated hero image for details view when present; otherwise keep imageUrl.
  const imageUrl = restaurant.heroImageUrl || restaurant.imageUrl;
  return { ...restaurant, imageUrl, menu };
}
