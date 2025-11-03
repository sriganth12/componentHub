import React, { useState } from 'react';
import TrashIcon from './icons/TrashIcon';
import type { Order } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface CancelOrderPageProps {
  order: Order;
  onClose: () => void;
  onConfirm: (orderId: string, reason: string) => void;
}

const CancelOrderPage: React.FC<CancelOrderPageProps> = ({ order, onClose, onConfirm }) => {
    const [reason, setReason] = useState('');

    const handleConfirm = () => {
        if (!reason.trim()) return;
        onConfirm(order.id, reason);
    }

    return (
        <div className="animate-fadeIn w-full">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <TrashIcon className="w-8 h-8 text-red-500" />
                    Cancel Order
                </h1>
                <button onClick={onClose} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors group">
                    <ArrowLeftIcon className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                    Back to Orders
                </button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Are you sure?</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">You are about to cancel order #{order.id.slice(-6)}.</p>
                
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

                <div className="mt-8">
                    <button
                        onClick={handleConfirm}
                        disabled={!reason.trim()}
                        className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Confirm Cancellation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelOrderPage;
