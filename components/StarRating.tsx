import React from 'react';
import StarIcon from './icons/StarIcon';

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating, size = 'md' }) => {
  const [hoverRating, setHoverRating] = React.useState(0);
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const isInteractive = !!setRating;
        const starValue = isInteractive ? hoverRating || rating : rating;
        
        return (
          <button
            key={star}
            disabled={!isInteractive}
            onClick={() => setRating && setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className={`transition-colors duration-200 ${isInteractive ? 'cursor-pointer' : ''}`}
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          >
            <StarIcon 
              className={`
                ${sizeClasses[size]}
                ${starValue >= star 
                  ? 'text-yellow-400' 
                  : 'text-gray-300 dark:text-gray-600'}
                ${isInteractive ? 'hover:text-yellow-300' : ''}
              `}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;