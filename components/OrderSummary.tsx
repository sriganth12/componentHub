
import React, { useMemo } from 'react';
import type { CartItem } from '../types';

interface OrderSummaryProps {
  cartItems: CartItem[];
  shippingCost: number;
}

const TAX_RATE = 0.08; // 8%

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems, shippingCost }) => {
  const { subtotal, tax, total } = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + shippingCost;
    return { subtotal, tax, total };
  }, [cartItems, shippingCost]);

  return (
    <div className="space-y-3 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
      <div className="flex justify-between text-gray-600 dark:text-gray-300">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
       <div className="flex justify-between text-gray-600 dark:text-gray-300">
        <span>Shipping</span>
        <span>₹{shippingCost.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-gray-600 dark:text-gray-300">
        <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-600 my-2"></div>
      <div className="flex justify-between font-bold text-lg text-gray-800 dark:text-gray-100">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;