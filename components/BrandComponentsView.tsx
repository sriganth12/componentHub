import React, { useState, useMemo, useEffect } from 'react';
import type { Brand, ComponentItem, Review } from '../types';
import StarRating from './StarRating';
import InfoIcon from './icons/InfoIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';
import StarIcon from './icons/StarIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import CheckBadgeIcon from './icons/CheckBadgeIcon';
import CpuChipIcon from './icons/CpuChipIcon';

interface BrandComponentsViewProps {
  brand: Brand;
  reviews: Review[];
  onBack: () => void;
  onAddToCart: (item: ComponentItem, brand: Brand) => void;
}

type ActiveComponentTab = 'details' | 'specs' | 'reviews';

const BrandComponentsView: React.FC<BrandComponentsViewProps> = ({ brand, reviews, onBack, onAddToCart }) => {
    const [selectedComponentId, setSelectedComponentId] = useState<number | null>(brand.components[0]?.id || null);
    const [addedItemId, setAddedItemId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<ActiveComponentTab>('details');

    const selectedComponent = useMemo(() => {
        return brand.components.find(c => c.id === selectedComponentId) || null;
    }, [selectedComponentId, brand.components]);

    useEffect(() => {
        setActiveTab('details');
    }, [selectedComponentId]);

    const handleAddItemClick = (item: ComponentItem) => {
        onAddToCart(item, brand);
        setAddedItemId(item.id);
        setTimeout(() => {
            setAddedItemId(null);
        }, 2000);
    };

    const TabButton = ({ tabName, label, icon, count }: { tabName: ActiveComponentTab, label: string; icon: React.ReactNode; count?: number }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === tabName
                    ? 'text-orange-600 border-orange-600'
                    : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-orange-500'
            }`}
        >
            {icon} {label} {count !== undefined && count > 0 && <span className="text-xs bg-orange-100 text-orange-600 font-bold px-1.5 py-0.5 rounded-full">{count}</span>}
        </button>
    );
    
    const { componentReviews, averageRating, ratingDistribution } = useMemo(() => {
        if (!selectedComponent) {
            return { componentReviews: [], averageRating: 0, ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
        }
        const reviewsForComponent = reviews.filter(r => r.componentId === selectedComponent.id);
        if (reviewsForComponent.length === 0) {
            return { componentReviews: reviewsForComponent, averageRating: 0, ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
        }

        const avg = reviewsForComponent.reduce((sum, r) => sum + r.rating, 0) / reviewsForComponent.length;

        const distribution: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviewsForComponent.forEach(review => {
            distribution[review.rating] = (distribution[review.rating] || 0) + 1;
        });

        return {
            componentReviews: reviewsForComponent,
            averageRating: avg,
            ratingDistribution: distribution,
        };
    }, [selectedComponent, reviews]);
    
    const DetailItem = ({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) => (
        <div>
            <h5 className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                {icon}
                {label}
            </h5>
            <div className="pl-7 text-gray-500 dark:text-gray-400">{children}</div>
        </div>
    );


  return (
    <div className="animate-fadeIn">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors group">
                <ArrowLeftIcon className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                Back to All Brands
            </button>
            <div className="flex items-center gap-3">
                 <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-right">{brand.name}</h2>
                 <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm p-2 rounded-full">
                    <brand.icon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6 items-start">
            <div className="lg:col-span-1 lg:sticky lg:top-24">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 px-2 mb-3">Components ({brand.components.length})</h3>
                <div className="space-y-2 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 scrollbar-width-none [&::-webkit-scrollbar]:hidden">
                    {brand.components.map(item => {
                        const isSelected = item.id === selectedComponentId;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setSelectedComponentId(item.id)}
                                className={`w-full flex items-center gap-4 p-3 text-left rounded-xl transition-all duration-300 ease-in-out ${
                                    isSelected
                                        ? 'bg-white dark:bg-gray-800 shadow-lg scale-105 transform'
                                        : 'bg-white/50 dark:bg-gray-800/40 hover:shadow-md hover:bg-white dark:hover:bg-gray-800/80 transform hover:-translate-y-1'
                                }`}
                            >
                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                                    <item.icon className="w-8 h-8 text-gray-500 dark:text-gray-300" />
                                </div>
                                <div className="flex-grow overflow-hidden">
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 truncate">{item.name}</h4>
                                    <p className="font-bold text-gray-600 dark:text-gray-300 mt-1">₹{item.price.toFixed(2)}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="lg:col-span-2">
                {selectedComponent ? (
                    <div key={selectedComponent.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-slideInRight">
                        <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/30 p-4">
                            <selectedComponent.icon className="w-40 h-40 text-gray-500 dark:text-gray-400" />
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-grow">
                                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">{selectedComponent.name}</h2>
                                    <p className="text-2xl font-bold text-gray-700 dark:text-gray-300 mt-2">₹{selectedComponent.price.toFixed(2)}</p>
                                </div>
                                <button 
                                    onClick={() => handleAddItemClick(selectedComponent)}
                                    disabled={addedItemId === selectedComponent.id}
                                    className={`font-bold px-6 py-3 rounded-full transition-all duration-300 text-base whitespace-nowrap shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                                        addedItemId === selectedComponent.id 
                                        ? 'bg-green-500 text-white cursor-default' 
                                        : 'bg-orange-500 text-white hover:bg-orange-600'
                                    }`}
                                >
                                    {addedItemId === selectedComponent.id ? (
                                        <span className="flex items-center justify-center animate-fadeIn">
                                            <CheckCircleIcon className="w-5 h-5 mr-2" /> Added
                                        </span>
                                    ) : (
                                        'Add to Cart'
                                    )}
                                </button>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-200 dark:border-gray-700">
                             <div className="flex border-b border-gray-200 dark:border-gray-700 px-4">
                                <TabButton tabName="details" label="Details" icon={<InfoIcon className="w-5 h-5"/>} />
                                <TabButton tabName="specs" label="Specs" icon={<ClipboardListIcon className="w-5 h-5"/>} />
                                <TabButton tabName="reviews" label="Reviews" icon={<StarIcon className="w-5 h-5"/>} count={componentReviews.length}/>
                            </div>
                            <div className="p-6 bg-gray-50/70 dark:bg-gray-900/40 min-h-[250px]">
                                {activeTab === 'details' && (
                                    <div className="space-y-6 text-sm animate-fadeIn">
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">{selectedComponent.description}</p>
                                        
                                        {selectedComponent.keyFeatures && selectedComponent.keyFeatures.length > 0 && (
                                            <div>
                                                <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">Key Features</h4>
                                                <ul className="list-disc list-inside space-y-1 text-gray-500 dark:text-gray-400">
                                                    {selectedComponent.keyFeatures.map((feature, index) => (
                                                        <li key={index}>{feature}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {selectedComponent.inTheBox && selectedComponent.inTheBox.length > 0 && (
                                            <div>
                                                <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">What's in the Box</h4>
                                                <ul className="list-disc list-inside space-y-1 text-gray-500 dark:text-gray-400">
                                                    {selectedComponent.inTheBox.map((item, index) => (
                                                        <li key={index}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                                            <DetailItem icon={<CpuChipIcon className="w-5 h-5" />} label="Compatibility">
                                                <p>{selectedComponent.compatibility.join(', ')}</p>
                                            </DetailItem>
                                            <DetailItem icon={<CheckBadgeIcon className="w-5 h-5" />} label="Warranty">
                                                <p>{selectedComponent.warrantyPeriod}</p>
                                            </DetailItem>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'specs' && (
                                    <div className="animate-fadeIn">
                                        <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Technical Specifications</h4>
                                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {Object.entries(selectedComponent.specifications).map(([key, value]) => (
                                                <div key={key} className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-3">
                                                    <div className="font-semibold text-gray-700 dark:text-gray-200">{key}:</div>
                                                    <div className="text-gray-500 dark:text-gray-400">{value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'reviews' && (
                                    <div className="animate-fadeIn">
                                        {componentReviews.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div>
                                                    <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">Customer Reviews</h4>
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <p className="text-4xl font-bold text-gray-800 dark:text-gray-100">{averageRating.toFixed(1)}</p>
                                                        <div>
                                                            <StarRating rating={averageRating} />
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">based on {componentReviews.length} reviews</p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        {[5, 4, 3, 2, 1].map(star => {
                                                            const count = ratingDistribution[star] || 0;
                                                            const percentage = componentReviews.length > 0 ? (count / componentReviews.length) * 100 : 0;
                                                            return (
                                                                <div key={star} className="flex items-center gap-2 text-sm">
                                                                    <span className="text-gray-500 dark:text-gray-400 w-12">{star} star</span>
                                                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                                                                    </div>
                                                                    <span className="w-8 text-right font-semibold text-gray-600 dark:text-gray-300">{percentage.toFixed(0)}%</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                                <div className="space-y-4 max-h-64 overflow-y-auto pr-2 group [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent group-hover:[&::-webkit-scrollbar-thumb]:bg-gray-400/50 dark:group-hover:[&::-webkit-scrollbar-thumb]:bg-gray-500/50 [&::-webkit-scrollbar-thumb:hover]:bg-gray-500/80 dark:[&::-webkit-scrollbar-thumb:hover]:bg-gray-600/80">
                                                    {componentReviews.map(review => (
                                                        <div key={review.id} className="border-t border-gray-200 dark:border-gray-700 pt-4 first:border-t-0">
                                                            <div className="flex items-start gap-3">
                                                                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center font-bold text-orange-600 dark:text-orange-400 flex-shrink-0">
                                                                    {review.userName[0].toUpperCase()}
                                                                </div>
                                                                <div className="flex-grow">
                                                                    <div className="flex justify-between items-center">
                                                                        <div>
                                                                            <p className="font-semibold text-gray-800 dark:text-gray-200">{review.userName}</p>
                                                                            <StarRating rating={review.rating} size="sm" />
                                                                        </div>
                                                                        <p className="text-xs text-gray-400 dark:text-gray-500">{review.date}</p>
                                                                    </div>
                                                                    {review.verifiedPurchase && (
                                                                        <div className="mt-1 flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-semibold">
                                                                            <CheckBadgeIcon className="w-4 h-4" />
                                                                            Verified Purchase
                                                                        </div>
                                                                    )}
                                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">"{review.comment}"</p>
                                                                </div>
                                                            </div>
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
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full min-h-[60vh] bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Select a component to see its details.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default BrandComponentsView;