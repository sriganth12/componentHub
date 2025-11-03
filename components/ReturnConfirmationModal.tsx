import React from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface ReturnConfirmationPageProps {
  onClose: () => void;
}

const ReturnConfirmationPage: React.FC<ReturnConfirmationPageProps> = ({ onClose }) => {
  return (
    <div className="animate-fadeIn flex justify-center items-center py-16">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md text-center p-8">
        <div className="mx-auto bg-green-100 dark:bg-green-900/50 rounded-full h-20 w-20 flex items-center justify-center animate-pop">
            <CheckCircleIcon className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-6">Return Request Submitted!</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">We have received your request. You will receive an email with return instructions and a shipping label shortly. You can track its progress in the 'My Account' section.</p>
        <button
          onClick={onClose}
          className="w-full mt-8 bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Back to My Account
        </button>
      </div>
    </div>
  );
};

export default ReturnConfirmationPage;