import React, { useState, useEffect } from 'react';
import type { ComponentItem } from '../types';
import XIcon from './icons/XIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';

interface WarrantyClaimModalProps {
  item: ComponentItem;
  onClose: () => void;
  onSubmit: (description: string) => void;
}

const WarrantyClaimModal: React.FC<WarrantyClaimModalProps> = ({ item, onClose, onSubmit }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const handleSubmit = () => {
    if (!description.trim()) return;
    onSubmit(description);
  };

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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <ShieldCheckIcon className="w-7 h-7 text-yellow-500" />
            Warranty Claim
          </h2>
          <button onClick={handleClose} className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
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

export default WarrantyClaimModal;