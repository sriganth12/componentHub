import React, { useState, useMemo } from 'react';
import type { FlatComponentItem, ComponentItem } from '../types';
import ComponentItemCard from './FoodItemCard';

interface ComponentSearchViewProps {
  allItems: FlatComponentItem[];
  onAddToCart: (item: ComponentItem) => void;
}

const ComponentSearchView: React.FC<ComponentSearchViewProps> = ({ allItems, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return allItems;
    }
    return allItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brandName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allItems, searchTerm]);

  return (
    <div className="animate-fadeIn">
      <div className="relative mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a component or brand..."
          className="w-full p-4 pl-12 text-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, index) => (
          <ComponentItemCard 
            key={`${item.id}-${item.brandId}`} 
            item={item} 
            onAddToCart={onAddToCart}
            index={index}
           />
        ))}
      </div>
      {filteredItems.length === 0 && (
          <div className="text-center py-16 col-span-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">No Results Found</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Try searching for something else!</p>
          </div>
      )}
    </div>
  );
};

export default ComponentSearchView;