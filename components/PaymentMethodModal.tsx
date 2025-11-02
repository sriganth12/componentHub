import React, { useState, useEffect } from 'react';
import XIcon from './icons/XIcon';
import CreditCardIcon from './icons/CreditCardIcon';
import PaypalIcon from './icons/PaypalIcon';
import GooglePayIcon from './icons/GooglePayIcon';
import ApplePayIcon from './icons/ApplePayIcon';
import CashIcon from './icons/CashIcon';

interface PaymentMethodModalProps {
  totalAmount: number;
  onClose: () => void;
  onConfirmPayment: () => void;
}

type PaymentMethod = 'card' | 'paypal' | 'google' | 'apple' | 'cod';

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({ totalAmount, onClose, onConfirmPayment }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');

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

  const handleConfirm = () => {
    setIsClosing(true);
    setTimeout(onConfirmPayment, 300);
  };

  const paymentOptions = [
    { id: 'card', name: 'Credit / Debit Card', icon: <CreditCardIcon className="w-6 h-6" /> },
    { id: 'cod', name: 'Cash on Delivery', icon: <CashIcon className="w-6 h-6" /> },
    { id: 'paypal', name: 'PayPal', icon: <PaypalIcon className="w-6 h-6" /> },
    { id: 'google', name: 'Google Pay', icon: <GooglePayIcon className="w-6 h-6" /> },
    { id: 'apple', name: 'Apple Pay', icon: <ApplePayIcon className="w-6 h-6" /> },
  ] as const;

  return (
    <div 
        className={`fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
        onClick={handleClose}
    >
      <div 
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col transition-transform duration-300 ${isClosing ? 'animate-scaleOut' : 'animate-scaleIn'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Choose a Payment Method</h2>
          <button onClick={handleClose} className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
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

        <div className="p-6 border-t dark:border-gray-700 space-y-4">
            <div className="flex justify-between font-bold text-xl text-gray-800 dark:text-gray-100">
                <span>Order Total</span>
                <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <button 
                onClick={handleConfirm}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-400/50 transform hover:-translate-y-0.5"
            >
                Confirm & Pay
            </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodModal;