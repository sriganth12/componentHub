import React, { useState } from 'react';
import CreditCardIcon from './icons/CreditCardIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface CardDetailsPageProps {
  totalAmount: number;
  onBack: () => void;
  onConfirmPayment: () => void;
}

const CardDetailsPage: React.FC<CardDetailsPageProps> = ({ totalAmount, onBack, onConfirmPayment }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');


  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmPayment();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formattedValue);
  };
  
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/\D/g, '');

    if (rawValue.length > 4) {
      rawValue = rawValue.slice(0, 4);
    }
    
    const month = rawValue.slice(0, 2);
    if (month.length === 2) {
      const monthInt = parseInt(month, 10);
      if (monthInt === 0) {
        // If user types '00', reset to '0' to allow valid entry like '01'
        rawValue = '0';
      } else if (monthInt > 12) {
        // If user types an invalid month like '13', reset to the first digit '1'
        rawValue = month[0];
      }
    }
    
    let formattedValue = rawValue;
    if (rawValue.length > 2) {
        formattedValue = `${rawValue.slice(0, 2)} / ${rawValue.slice(2)}`;
    }

    setExpiry(formattedValue);
  };

  const isFormValid = cardNumber.length === 19 && expiry.length === 7 && cvv.length >= 3 && cardName.trim() !== '';

  return (
    <div className="animate-fadeIn w-full">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <CreditCardIcon className="w-8 h-8 text-orange-500" />
                Card Details
            </h1>
            <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors group">
                <ArrowLeftIcon className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                Back
            </button>
        </div>
      <form 
        onSubmit={handleConfirm}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full flex flex-col"
      >
        <div className="p-6 sm:p-8 space-y-4">
            <div className="bg-gray-100 dark:bg-gray-900/50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">You are paying</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">₹{totalAmount.toFixed(2)}</p>
            </div>
            
            <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name on Card</label>
                <input id="cardName" type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="John Doe" className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500" required />
            </div>

            <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Number</label>
                <input id="cardNumber" type="text" value={cardNumber} onChange={handleCardNumberChange} placeholder="0000 0000 0000 0000" className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry Date</label>
                    <input id="expiry" type="text" value={expiry} onChange={handleExpiryChange} placeholder="MM / YY" className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500" required />
                </div>
                <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVV</label>
                    <input id="cvv" type="password" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="•••" className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500" required />
                </div>
            </div>
        </div>

        <div className="p-6 border-t dark:border-gray-700">
            <button 
                type="submit"
                disabled={!isFormValid}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-400/50 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
                Pay ₹{totalAmount.toFixed(2)}
            </button>
        </div>
      </form>
    </div>
  );
};

export default CardDetailsPage;
