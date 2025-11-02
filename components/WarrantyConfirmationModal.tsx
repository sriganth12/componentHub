import React, { useState, useEffect } from 'react';
import ShieldCheckIcon from './icons/ShieldCheckIcon';

interface WarrantyConfirmationModalProps {
  onClose: () => void;
}

const WarrantyConfirmationModal: React.FC<WarrantyConfirmationModalProps> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

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

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
      onClick={handleClose}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-sm text-center p-8 transition-transform duration-300 ${isClosing ? 'animate-scaleOut' : 'animate-scaleIn'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto bg-green-100 dark:bg-green-900/50 rounded-full h-20 w-20 flex items-center justify-center">
            <ShieldCheckIcon className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-6">Claim Submitted!</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Our team will review your claim and contact you via email within 24-48 hours with the next steps.</p>
        <button
          onClick={handleClose}
          className="w-full mt-8 bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WarrantyConfirmationModal;
