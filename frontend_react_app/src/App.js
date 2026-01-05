import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./theme/theme.css";
import "./App.css";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import NotFoundPage from "./pages/NotFoundPage";

import { CartProvider } from "./state/cart/CartContext";
import { OrderProvider } from "./state/order/OrderContext";

// PUBLIC_INTERFACE
function App() {
  /** Root application component with routing and global providers. */
  return (
    <BrowserRouter>
      <CartProvider>
        <OrderProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/restaurants/:restaurantId" element={<RestaurantDetailsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/track/:orderId" element={<OrderTrackingPage />} />
              <Route path="/track" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </OrderProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
