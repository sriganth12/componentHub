import React from 'react';
import type { Order, OrderStatus } from '../types';
import CheckCircleIcon from './icons/CheckCircleIcon';
import TruckIcon from './icons/TruckIcon';
import CogIcon from './icons/CogIcon';
import MapPinIcon from './icons/MapPinIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface TrackOrderPageProps {
  order: Order;
  onClose: () => void;
}

const statusSteps: OrderStatus[] = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

const StatusIcon = ({ status, active }: { status: OrderStatus, active: boolean }) => {
    const commonClasses = "w-10 h-10 p-2 rounded-full transition-colors duration-300";
    const activeClasses = "bg-orange-500 text-white";
    const inactiveClasses = "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400";
    const iconClasses = "w-full h-full";

    let icon;
    switch (status) {
        case 'Processing':
            icon = <CogIcon className={iconClasses} />;
            break;
        case 'Shipped':
            icon = <TruckIcon className={iconClasses} />;
            break;
        case 'Out for Delivery':
            icon = <MapPinIcon className={iconClasses} />;
            break;
        case 'Delivered':
            icon = <CheckCircleIcon className={iconClasses} />;
            break;
        default:
            icon = <CogIcon className={iconClasses} />;
    }

    return (
        <div className={`${commonClasses} ${active ? activeClasses : inactiveClasses}`}>
            {icon}
        </div>
    );
};


const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ order, onClose }) => {
  const currentStatusIndex = statusSteps.indexOf(order.status);

  return (
    <div className="animate-fadeIn w-full">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Track Order</h1>
            <button onClick={onClose} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors group">
                <ArrowLeftIcon className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                Back to Orders
            </button>
        </div>
      
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full p-6 sm:p-8 space-y-8">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">Order ID: #{order.id.slice(-6)}</p>
            <p className="text-3xl font-bold text-orange-500 mt-1">{order.status}</p>
          </div>

          <div className="flex justify-between items-start pt-4">
            {statusSteps.map((status, index) => (
                <React.Fragment key={status}>
                    <div className="flex flex-col items-center relative w-1/4">
                        <StatusIcon status={status} active={index <= currentStatusIndex} />
                        <p className={`mt-2 text-xs sm:text-sm font-semibold text-center ${index <= currentStatusIndex ? 'text-gray-800 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'}`}>
                            {status.replace(' ', '\n')}
                        </p>
                    </div>
                    {index < statusSteps.length - 1 && (
                        <div className={`flex-grow h-1 rounded-full self-start mt-5 mx-1 sm:mx-2 transition-colors duration-500 ${index < currentStatusIndex ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                    )}
               </React.Fragment>
            ))}
          </div>

          <div className="border-t dark:border-gray-600 pt-6">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-3">Order Items</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2 bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg">
                {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-300">{item.name} (x{item.quantity})</span>
                        <span className="text-gray-800 dark:text-gray-200 font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default TrackOrderPage;
