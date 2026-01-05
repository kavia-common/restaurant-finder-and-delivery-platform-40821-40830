// Pricing constants (kept simple for mock UI)
export const TAX_RATE = 0.0825; // 8.25%
export const SERVICE_FEE = 1.99;

// PUBLIC_INTERFACE
export function calcSubtotal(items) {
  /** Sum of item price * quantity. */
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

// PUBLIC_INTERFACE
export function calcTax(subtotal) {
  /** Tax calculation. */
  return subtotal * TAX_RATE;
}

// PUBLIC_INTERFACE
export function calcTotal({ subtotal, tax, deliveryFee, serviceFee }) {
  /** Total = subtotal + tax + fees. */
  return subtotal + tax + deliveryFee + serviceFee;
}
