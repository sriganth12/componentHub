import React, { useState } from 'react';
import type { CartItem, User, DeliveryOption } from '../types';
import { DELIVERY_OPTIONS } from '../constants';
import OrderSummary from './OrderSummary';
import UserIcon from './icons/UserIcon';
import MailIcon from './icons/MailIcon';
import MapPinIcon from './icons/MapPinIcon';
import PhoneIcon from './icons/PhoneIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface CheckoutPageProps {
  user: User;
  cartItems: CartItem[];
  onBack: () => void;
  onProceedToPayment: (deliveryOption: DeliveryOption) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ user, cartItems, onBack, onProceedToPayment }) => {
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption>(DELIVERY_OPTIONS[0]);

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    onProceedToPayment(selectedDelivery);
  }

  return (
    <div className="animate-fadeIn w-full">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Checkout</h1>
            <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors group">
                <ArrowLeftIcon className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                Back to Cart
            </button>
        </div>
        
        <form onSubmit={handleProceed} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact & Delivery</h3>
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border dark:border-gray-700">
                <p className="flex items-center gap-3"><UserIcon className="w-5 h-5 text-gray-500" /> <span className="text-gray-800 dark:text-gray-200">{user.name}</span></p>
                <p className="flex items-center gap-3"><MailIcon className="w-5 h-5 text-gray-500" /> <span className="text-gray-800 dark:text-gray-200">{user.email}</span></p>
                {user.phoneNumber && (
                  <p className="flex items-center gap-3"><PhoneIcon className="w-5 h-5 text-gray-500" /> <span className="text-gray-800 dark:text-gray-200">{user.phoneNumber}</span></p>
                )}
                <div className="flex items-start gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <MapPinIcon className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div className="text-gray-800 dark:text-gray-200">
                        <p>{user.address}</p>
                        {(user.state || user.pinCode) && (
                            <p>{user.state}{user.state && user.pinCode && ', '}{user.pinCode}</p>
                        )}
                        {user.country && (
                            <p>{user.country}</p>
                        )}
                    </div>
                </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Delivery Options</h3>
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
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Order Summary</h3>
            <OrderSummary cartItems={cartItems} shippingCost={selectedDelivery.cost} />
          </div>

          <button type="submit" className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-400/50 transform hover:-translate-y-0.5">
            Proceed to Payment
          </button>
        </form>
    </div>
  );
};

export default CheckoutPage;
