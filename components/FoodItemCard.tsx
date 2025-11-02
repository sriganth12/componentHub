
import React from 'react';
import type { FlatComponentItem, ComponentItem } from '../types';

interface ComponentItemCardProps {
  item: FlatComponentItem;
  onAddToCart: (item: ComponentItem) => void;
  index: number;
}

const ComponentItemCard: React.FC<ComponentItemCardProps> = ({ item, onAddToCart, index }) => {
  return (
    <div
      style={{ animationDelay: `${index * 50}ms`, opacity: 0, animationFillMode: 'forwards' }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-shadow hover:shadow-xl animate-slideInUp overflow-hidden flex flex-col h-full group"
    >
      <div className="relative w-full h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
        <item.icon className="w-20 h-20 text-gray-500 dark:text-gray-400 group-hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">{item.name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">from {item.brandName}</p>
        <div className="flex-grow" /> 
        <div className="flex justify-between items-center mt-4">
          <p className="font-semibold text-gray-700 dark:text-gray-300 text-lg">₹{item.price.toFixed(2)}</p>
          <button
            onClick={() => onAddToCart(item)}
            className="bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400 font-bold px-5 py-2.5 rounded-full hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-200 text-sm transform hover:scale-105"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComponentItemCard;