import React, { createContext, useContext, useMemo, useReducer } from "react";
import { SERVICE_FEE, calcSubtotal, calcTax, calcTotal } from "./cartUtils";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { restaurantId, restaurantName, item } = action.payload;

      // If cart has items from another restaurant, clear it first (common delivery-app behavior).
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        return {
          ...state,
          restaurantId,
          restaurantName,
          items: [{ ...item, quantity: 1 }]
        };
      }

      const existing = state.items.find((i) => i.id === item.id);
      const items = existing
        ? state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...state.items, { ...item, quantity: 1 }];

      return { ...state, restaurantId, restaurantName, items };
    }

    case "REMOVE_ITEM": {
      const { itemId } = action.payload;
      const items = state.items.filter((i) => i.id !== itemId);
      return { ...state, items, ...(items.length === 0 ? { restaurantId: null, restaurantName: null } : {}) };
    }

    case "SET_QUANTITY": {
      const { itemId, quantity } = action.payload;
      const qty = Math.max(0, Number(quantity) || 0);
      const items = qty === 0 ? state.items.filter((i) => i.id !== itemId) : state.items.map((i) => (i.id === itemId ? { ...i, quantity: qty } : i));
      return { ...state, items, ...(items.length === 0 ? { restaurantId: null, restaurantName: null } : {}) };
    }

    case "CLEAR": {
      return { restaurantId: null, restaurantName: null, items: [] };
    }

    default:
      return state;
  }
}

const initialState = { restaurantId: null, restaurantName: null, items: [] };

// PUBLIC_INTERFACE
export function CartProvider({ children }) {
  /** Provides cart state and actions to the application. */
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const derived = useMemo(() => {
    const subtotal = calcSubtotal(state.items);
    const tax = calcTax(subtotal);
    const deliveryFee = state.items.length ? 2.49 : 0; // mock flat
    const serviceFee = state.items.length ? SERVICE_FEE : 0;
    const total = calcTotal({ subtotal, tax, deliveryFee, serviceFee });

    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

    return { subtotal, tax, deliveryFee, serviceFee, total, itemCount };
  }, [state.items]);

  const api = useMemo(() => {
    return {
      state,
      derived,
      addItem: (restaurant, item) =>
        dispatch({
          type: "ADD_ITEM",
          payload: { restaurantId: restaurant.id, restaurantName: restaurant.name, item }
        }),
      removeItem: (itemId) => dispatch({ type: "REMOVE_ITEM", payload: { itemId } }),
      setQuantity: (itemId, quantity) => dispatch({ type: "SET_QUANTITY", payload: { itemId, quantity } }),
      clear: () => dispatch({ type: "CLEAR" })
    };
  }, [state, derived]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

// PUBLIC_INTERFACE
export function useCart() {
  /** Hook to access cart context. */
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
