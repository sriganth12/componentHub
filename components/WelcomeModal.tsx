import React, { useState } from 'react';
import BuildingStorefrontIcon from './icons/RestaurantIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';

interface WelcomeModalProps {
  onSelectRestaurants: () => void;
  onClaimWarranty: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onSelectRestaurants, onClaimWarranty }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleSelect = (callback: () => void) => {
    setIsClosing(true);
    setTimeout(callback, 300);
  };

  return (
    <div className={`fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
      <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl text-center p-8 sm:p-12 transition-transform duration-300 ${isClosing ? 'animate-scaleOut' : 'animate-scaleIn'}`}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-600 tracking-tight">
          Welcome to Component Hub!
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          What are you looking for today?
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-2xl mx-auto">
          <button
            onClick={() => handleSelect(onSelectRestaurants)}
            className="group flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-700/50 rounded-xl border-2 border-transparent hover:border-orange-500 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 dark:focus:ring-offset-gray-800"
          >
            <div className="bg-orange-100 dark:bg-orange-900/50 p-4 rounded-full">
              <BuildingStorefrontIcon className="w-10 h-10 text-orange-500" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-100">Browse by brand</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Explore parts from Apple, Samsung, etc.</p>
          </button>

          <button
            onClick={() => handleSelect(onClaimWarranty)}
            className="group flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-700/50 rounded-xl border-2 border-transparent hover:border-orange-500 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 dark:focus:ring-offset-gray-800"
          >
            <div className="bg-orange-100 dark:bg-orange-900/50 p-4 rounded-full">
              <ShieldCheckIcon className="w-10 h-10 text-orange-500" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-100">Claim Warranty</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Start a claim for a past order.</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;