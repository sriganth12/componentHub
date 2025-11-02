import React, { useRef } from 'react';
import type { Brand } from '../types';
import StarIcon from './icons/StarIcon';
import ClockIcon from './icons/ClockIcon';

interface BrandCardProps {
  brand: Brand;
  onClick: () => void;
  index: number;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand, onClick, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <div
      ref={cardRef}
      onClick={onClick}
      style={{ animationDelay: `${index * 75}ms`, opacity: 0, animationFillMode: 'forwards' }}
      className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm overflow-hidden cursor-pointer group relative border border-gray-200/80 dark:border-gray-700/50 hover:border-orange-500 dark:hover:border-orange-500/80 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg animate-slideInUp"
    >
      <div className="w-full h-40 flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100/50 dark:from-gray-800 dark:to-gray-900/50 p-4">
        <brand.icon className="w-20 h-20 text-gray-500 dark:text-gray-400 group-hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 truncate">{brand.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{brand.category}</p>
        <div className="flex items-center justify-end mt-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold">{brand.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
