import React, { useState } from 'react';
import type { ComponentItem } from '../types';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface WarrantyClaimPageProps {
  item: ComponentItem;
  onClose: () => void;
  onSubmit: (description: string) => void;
}

const WarrantyClaimPage: React.FC<WarrantyClaimPageProps> = ({ item, onClose, onSubmit }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!description.trim()) return;
    onSubmit(description);
  };

  return (
    <div className="animate-fadeIn max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <ShieldCheckIcon className="w-8 h-8 text-yellow-500" />
          Warranty Claim
        </h1>
        <button onClick={onClose} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors group">
            <ArrowLeftIcon className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            Back to Orders
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full flex flex-col">
        <div className="p-6 sm:p-8 space-y-4">
          <p className="text-gray-700 dark:text-gray-300">You are filing a claim for: <span className="font-bold">{item.name}</span></p>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Please describe the issue in detail:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., The screen has a green line on the right side, or the battery doesn't hold a charge for more than 2 hours."
              rows={6}
              className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              autoFocus
            />
          </div>
        </div>
        <div className="p-6 border-t dark:border-gray-700">
            <button 
                onClick={handleSubmit}
                disabled={!description.trim()}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-400/50 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
                Submit Claim
            </button>
        </div>
      </div>
    </div>
  );
};

export default WarrantyClaimPage;