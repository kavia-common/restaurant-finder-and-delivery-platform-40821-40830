import React, { createContext, useContext, useMemo, useState } from "react";

const OrderContext = createContext(null);

function makeOrderId() {
  const suffix = Math.random().toString(16).slice(2, 6).toUpperCase();
  const time = Date.now().toString().slice(-6);
  return `FD-${time}-${suffix}`;
}

// PUBLIC_INTERFACE
export function OrderProvider({ children }) {
  /** Stores mock orders created during checkout so confirmation/tracking can read them. */
  const [latestOrder, setLatestOrder] = useState(null);

  const api = useMemo(() => {
    return {
      latestOrder,
      createOrder: (payload) => {
        const order = {
          id: makeOrderId(),
          createdAt: new Date().toISOString(),
          ...payload
        };
        setLatestOrder(order);
        return order;
      }
    };
  }, [latestOrder]);

  return <OrderContext.Provider value={api}>{children}</OrderContext.Provider>;
}

// PUBLIC_INTERFACE
export function useOrder() {
  /** Hook to access order state. */
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}
