import React, { useState, useEffect, useRef } from 'react';
import type { CartItem } from '../types';
import ShoppingCartIcon from './icons/ShoppingCartIcon';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
  onClose: () => void; // Represents "Continue Shopping"
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onUpdateQuantity, onClose, onCheckout }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [displaySubtotal, setDisplaySubtotal] = useState(subtotal);
  const prevSubtotalRef = useRef(subtotal);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const previous = prevSubtotalRef.current;
    if (previous === subtotal) return;

    if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
    }

    const duration = 500;
    const startTime = Date.now();

    const animate = () => {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime > duration) {
            setDisplaySubtotal(subtotal);
            prevSubtotalRef.current = subtotal;
            return;
        }
        
        const progress = elapsedTime / duration;
        const easeOutQuint = 1 - Math.pow(1 - progress, 5);
        const currentAmount = previous + (subtotal - previous) * easeOutQuint;

        setDisplaySubtotal(currentAmount);
        animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        prevSubtotalRef.current = subtotal;
    };
  }, [subtotal]);

  if (cartItems.length === 0) {
    return (
        <div className="text-center py-20 animate-fadeIn max-w-lg mx-auto bg-white dark:bg-gray-800 p-10 rounded-lg shadow-xl">
            <ShoppingCartIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" />
            <h2 className="mt-6 text-2xl font-bold text-gray-800 dark:text-gray-100">Your Cart is Empty</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Looks like you haven't added anything to your cart yet.</p>
            <button
                onClick={onClose}
                className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-8 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-orange-400/50 transform hover:-translate-y-0.5"
            >
                Continue Shopping
            </button>
        </div>
    );
  }

  return (
    <div className="w-full animate-fadeIn">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Shopping Cart</h1>
            <button onClick={onClose} className="text-orange-600 dark:text-orange-400 font-semibold hover:underline transition-colors">
                Continue Shopping
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Items List */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center animate-fadeIn border-b dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-center gap-4 flex-grow">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-md flex-shrink-0 flex items-center justify-center">
                                <item.icon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-semibold text-gray-700 dark:text-gray-200">{item.name}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">from {item.brandName}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium">₹{item.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 ml-2">
                            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="text-orange-500 font-bold w-8 h-8 rounded-full hover:bg-orange-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0">-</button>
                            <span className="dark:text-gray-200 font-semibold w-5 text-center">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="text-orange-500 font-bold w-8 h-8 rounded-full hover:bg-orange-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0">+</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md sticky top-24">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Order Summary</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between font-bold text-xl dark:text-gray-100">
                            <span>Subtotal</span>
                            <span>₹{displaySubtotal.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Shipping & taxes calculated at checkout.</p>
                    </div>
                    <button 
                        onClick={onCheckout}
                        className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-orange-400/50 transform hover:-translate-y-0.5"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Cart;
