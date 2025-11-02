import React, { useState, useEffect, useMemo } from 'react';
import type { Brand, ComponentItem, Review } from '../types';
import StarRating from './StarRating';
import InfoIcon from './icons/InfoIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';
import ChatAlt2Icon from './icons/ChatAlt2Icon';
import CalendarIcon from './icons/CalendarIcon';

interface BrandComponentsModalProps {
  brand: Brand;
  reviews: Review[];
  onClose: () => void;
  onAddToCart: (item: ComponentItem, brand: Brand) => void;
}

type ActiveComponentTab = 'details' | 'specs' | 'reviews';

const BrandComponentsModal: React.FC<BrandComponentsModalProps> = ({ brand, reviews, onClose, onAddToCart }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [addedItems, setAddedItems] = useState<Set<number>>(new Set());
    const [expandedComponentId, setExpandedComponentId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<ActiveComponentTab>('details');


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

    const handleAddItemClick = (item: ComponentItem) => {
        onAddToCart(item, brand);
        setAddedItems(prev => new Set(prev).add(item.id));
        setTimeout(() => {
            setAddedItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(item.id);
                return newSet;
            });
        }, 2000);
    };

    const toggleExpandComponent = (componentId: number) => {
        if (expandedComponentId === componentId) {
            setExpandedComponentId(null);
        } else {
            setExpandedComponentId(componentId);
            setActiveTab('details');
        }
    };
    
    const ComponentDetails = ({ item }: { item: ComponentItem }) => {
        const componentReviews = useMemo(() => reviews.filter(r => r.componentId === item.id), [item.id, reviews]);
        const averageRating = useMemo(() => {
            if (componentReviews.length === 0) return 0;
            return componentReviews.reduce((sum, r) => sum + r.rating, 0) / componentReviews.length;
        }, [componentReviews]);

        return (
            <div className="bg-white dark:bg-gray-800 p-4 mt-2 rounded-b-lg border-t border-gray-200 dark:border-gray-600">
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                    <TabButton tabName="details" label="Details" icon={<InfoIcon className="w-5 h-5"/>} />
                    <TabButton tabName="specs" label="Specs" icon={<ClipboardListIcon className="w-5 h-5"/>} />
                    <TabButton tabName="reviews" label="Reviews" icon={<ChatAlt2Icon className="w-5 h-5"/>} count={componentReviews.length}/>
                </div>

                {activeTab === 'details' && (
                     <div className="space-y-3 text-sm animate-fadeIn">
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                        <div>
                            <h5 className="font-semibold text-gray-700 dark:text-gray-200">Compatibility:</h5>
                            <p className="text-gray-500 dark:text-gray-400">{item.compatibility.join(', ')}</p>
                        </div>
                         <div>
                            <h5 className="font-semibold text-gray-700 dark:text-gray-200">Warranty:</h5>
                            <p className="text-gray-500 dark:text-gray-400">{item.warrantyPeriod}</p>
                        </div>
                    </div>
                )}
                {activeTab === 'specs' && (
                    <div className="animate-fadeIn">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            {Object.entries(item.specifications).map(([key, value]) => (
                                <React.Fragment key={key}>
                                    <div className="font-semibold text-gray-700 dark:text-gray-200">{key}:</div>
                                    <div className="text-gray-500 dark:text-gray-400">{value}</div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
                 {activeTab === 'reviews' && (
                    <div className="animate-fadeIn">
                        {componentReviews.length > 0 ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <StarRating rating={averageRating} />
                                    <span className="font-bold text-gray-700 dark:text-gray-200">{averageRating.toFixed(1)}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">({componentReviews.length} reviews)</span>
                                </div>
                                <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
                                    {componentReviews.map(review => (
                                        <div key={review.id} className="border-t border-gray-200 dark:border-gray-700 pt-3">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-semibold text-gray-800 dark:text-gray-200">{review.userName}</p>
                                                    <StarRating rating={review.rating} size="sm" />
                                                </div>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                                   <CalendarIcon className="w-3 h-3" /> {review.date}
                                                </p>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">"{review.comment}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">No reviews yet for this component.</p>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const TabButton = ({ tabName, label, icon, count }: { tabName: ActiveComponentTab, label: string; icon: React.ReactNode; count?: number }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`flex items-center gap-2 px-4 py-2 font-semibold text-sm rounded-t-md relative transition-colors ${
                activeTab === tabName
                    ? 'text-orange-600 bg-white dark:bg-gray-800'
                    : 'text-gray-500 dark:text-gray-400 hover:text-orange-500 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
        >
            {icon} {label} {count !== undefined && count > 0 && <span className="text-xs bg-orange-100 text-orange-600 font-bold px-1.5 py-0.5 rounded-full">{count}</span>}
        </button>
    );

  return (
    <div 
        className={`fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
        onClick={handleClose}
    >
      <div 
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transition-transform duration-300 ${isClosing ? 'animate-scaleOut' : 'animate-scaleIn'}`}
        onClick={(e) => e.stopPropagation()}
    >
        <div className="relative">
            <div className="w-full h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-t-lg">
                <brand.icon className="w-24 h-24 text-gray-500 dark:text-gray-400" />
            </div>
            <button onClick={handleClose} className="absolute top-3 right-3 bg-white dark:bg-gray-700 rounded-full p-1.5 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div className="p-6 flex-grow overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{brand.name}</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{brand.category}</p>
          
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-6 mb-4">Components</h3>
          <div className="space-y-4">
            {brand.components.map((item) => {
                const isAdded = addedItems.has(item.id);
                const isExpanded = expandedComponentId === item.id;
                return (
                    <div key={item.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg shadow-sm transition-shadow hover:shadow-md">
                        <div 
                            onClick={() => toggleExpandComponent(item.id)}
                            className={`flex items-start gap-4 p-3 cursor-pointer ${isExpanded ? 'rounded-t-lg' : 'rounded-lg'}`}
                        >
                            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-600 rounded-md flex-shrink-0 flex items-center justify-center">
                                <item.icon className="w-12 h-12 text-gray-500 dark:text-gray-300" />
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">{item.name}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                                <p className="font-bold text-gray-700 dark:text-gray-300 mt-2">₹{item.price.toFixed(2)}</p>
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleAddItemClick(item); }}
                                disabled={isAdded}
                                className={`self-center font-bold px-4 py-2 rounded-full transition-all duration-300 text-sm whitespace-nowrap ${
                                    isAdded 
                                    ? 'bg-green-500 text-white cursor-default' 
                                    : 'bg-white dark:bg-gray-800 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500'
                                }`}
                            >
                                {isAdded ? 'Added ✔' : 'Add'}
                            </button>
                        </div>
                         {isExpanded && <ComponentDetails item={item} />}
                    </div>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandComponentsModal;