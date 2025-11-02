import React, { useState, useEffect } from 'react';
import type { CartItem, User, DeliveryOption } from '../types';
import { DELIVERY_OPTIONS } from '../constants';
import OrderSummary from './OrderSummary';
import XIcon from './icons/XIcon';
import UserIcon from './icons/UserIcon';
import MailIcon from './icons/MailIcon';
import MapPinIcon from './icons/MapPinIcon';

interface PaymentModalProps {
  user: User | null;
  cartItems: CartItem[];
  onClose: () => void;
  onProceedToPayment: (deliveryOption: DeliveryOption) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ user, cartItems, onClose, onProceedToPayment }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption>(DELIVERY_OPTIONS[0]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    setIsClosing(true);
    setTimeout(() => onProceedToPayment(selectedDelivery), 300);
  }
  
  const InputField = ({ icon, ...props }: { icon: React.ReactNode, [key: string]: any }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-10 p-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-70 disabled:cursor-not-allowed"
        required
      />
    </div>
  );

  return (
    <div 
        className={`fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
        onClick={handleClose}
    >
      <div 
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col transition-transform duration-300 ${isClosing ? 'animate-scaleOut' : 'animate-scaleIn'}`}
        onClick={(e) => e.stopPropagation()}
    >
        <div className="flex justify-between items-center p-5 border-b dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Confirm Details</h2>
          <button onClick={handleClose} className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleProceed} className="flex-grow overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Contact & Delivery</h3>
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <p className="flex items-center gap-3"><UserIcon className="w-5 h-5 text-gray-500" /> <span className="text-gray-800 dark:text-gray-200">{user?.name}</span></p>
                <p className="flex items-center gap-3"><MailIcon className="w-5 h-5 text-gray-500" /> <span className="text-gray-800 dark:text-gray-200">{user?.email}</span></p>
                <p className="flex items-center gap-3"><MapPinIcon className="w-5 h-5 text-gray-500" /> <span className="text-gray-800 dark:text-gray-200">{user?.address}</span></p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Delivery Options</h3>
             <div className="space-y-3">
              {DELIVERY_OPTIONS.map(option => (
                <div
                  key={option.id}
                  onClick={() => setSelectedDelivery(option)}
                  className={`flex justify-between items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedDelivery.id === option.id 
                    ? 'border-orange-500 bg-orange-50 dark:bg-gray-700/50 shadow-md'
                    : 'border-gray-200 dark:border-gray-600 hover:border-orange-400'
                  }`}
                >
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{option.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{option.days}</p>
                  </div>
                  <p className="font-bold text-gray-800 dark:text-gray-200">₹{option.cost.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Order Summary</h3>
            <OrderSummary cartItems={cartItems} shippingCost={selectedDelivery.cost} />
          </div>

          <button type="submit" className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-400/50 transform hover:-translate-y-0.5">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;