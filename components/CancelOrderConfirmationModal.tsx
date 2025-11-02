import React, { useState, useEffect } from 'react';
import TrashIcon from './icons/TrashIcon';

interface CancelOrderConfirmationModalProps {
  orderId: string;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const CancelOrderConfirmationModal: React.FC<CancelOrderConfirmationModalProps> = ({ orderId, onClose, onConfirm }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [reason, setReason] = useState('');

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
        if (!reason.trim()) return;
        setIsClosing(true);
        setTimeout(() => onConfirm(reason), 300);
    }

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
            onClick={handleClose}
        >
            <div
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md transition-transform duration-300 ${isClosing ? 'animate-scaleOut' : 'animate-scaleIn'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-8 text-center">
                    <div className="mx-auto bg-red-100 dark:bg-red-900/50 rounded-full h-20 w-20 flex items-center justify-center">
                        <TrashIcon className="w-12 h-12 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-6">Cancel Order?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Are you sure you want to cancel order #{orderId.slice(-6)}?</p>
                    
                    <div className="mt-6 text-left">
                        <label htmlFor="cancellation-reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Reason for cancellation (required)
                        </label>
                        <textarea
                            id="cancellation-reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={3}
                            className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            placeholder="e.g., Ordered by mistake, found a better price..."
                            autoFocus
                        />
                    </div>

                    <div className="mt-8 flex gap-4">
                        <button
                            onClick={handleClose}
                            className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            No, Keep Order
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={!reason.trim()}
                            className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Yes, Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CancelOrderConfirmationModal;