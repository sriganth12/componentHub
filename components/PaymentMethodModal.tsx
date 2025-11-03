import React, { useState } from 'react';
import CreditCardIcon from './icons/CreditCardIcon';
import PaypalIcon from './icons/PaypalIcon';
import GooglePayIcon from './icons/GooglePayIcon';
import ApplePayIcon from './icons/ApplePayIcon';
import CashIcon from './icons/CashIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface PaymentMethodPageProps {
  totalAmount: number;
  onBack: () => void;
  onConfirm: (method: PaymentMethod) => void;
}

export type PaymentMethod = 'card' | 'paypal' | 'google' | 'apple' | 'cod';

const PaymentMethodPage: React.FC<PaymentMethodPageProps> = ({ totalAmount, onBack, onConfirm }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');

  const paymentOptions = [
    { id: 'card', name: 'Credit / Debit Card', icon: <CreditCardIcon className="w-6 h-6" /> },
    { id: 'cod', name: 'Cash on Delivery', icon: <CashIcon className="w-6 h-6" /> },
    { id: 'paypal', name: 'PayPal', icon: <PaypalIcon className="w-6 h-6" /> },
    { id: 'google', name: 'Google Pay', icon: <GooglePayIcon className="w-6 h-6" /> },
    { id: 'apple', name: 'Apple Pay', icon: <ApplePayIcon className="w-6 h-6" /> },
  ] as const;

  return (
    <div className="animate-fadeIn w-full">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Payment Method</h1>
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors group">
            <ArrowLeftIcon className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            Back to Details
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className="p-6 sm:p-8 space-y-4">
          {paymentOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setSelectedMethod(option.id)}
              className={`w-full flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedMethod === option.id
                  ? 'border-orange-500 bg-orange-50 dark:bg-gray-700/50 shadow-md'
                  : 'border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-500 hover:bg-gray-50 dark:hover:bg-gray-700/30'
              }`}
            >
              <div className="text-gray-600 dark:text-gray-300">{option.icon}</div>
              <span className="ml-4 font-semibold text-gray-800 dark:text-gray-200">{option.name}</span>
              {selectedMethod === option.id && (
                <div className="ml-auto w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8 border-t dark:border-gray-700 space-y-4">
            <div className="flex justify-between font-bold text-xl text-gray-800 dark:text-gray-100">
                <span>Order Total</span>
                <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <button 
                onClick={() => onConfirm(selectedMethod)}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-400/50 transform hover:-translate-y-0.5"
            >
                Confirm & Pay
            </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodPage;
