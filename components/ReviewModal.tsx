import React, { useState } from 'react';
import type { ComponentItem } from '../types';
import PencilIcon from './icons/PencilIcon';
import StarRating from './StarRating';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface ReviewPageProps {
  item: ComponentItem;
  onClose: () => void;
  onSubmit: (componentId: number, rating: number, comment: string) => void;
}

const ReviewPage: React.FC<ReviewPageProps> = ({ item, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0 || !comment.trim()) return;
    onSubmit(item.id, rating, comment);
  };

  return (
    <div className="animate-fadeIn w-full">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <PencilIcon className="w-8 h-8 text-orange-500" />
                Write a Review
            </h1>
            <button onClick={onClose} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors group">
                <ArrowLeftIcon className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                Back to Orders
            </button>
        </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full flex flex-col">
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-gray-700 dark:text-gray-300">You are reviewing: <span className="font-bold">{item.name}</span></p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Rating:
            </label>
            <StarRating rating={rating} setRating={setRating} size="lg" />
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Review:
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={`What did you like or dislike about the ${item.name}?`}
              rows={6}
              className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              autoFocus
            />
          </div>
        </div>
        <div className="p-6 border-t dark:border-gray-700">
            <button 
                onClick={handleSubmit}
                disabled={rating === 0 || !comment.trim()}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-400/50 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
                Submit Review
            </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
