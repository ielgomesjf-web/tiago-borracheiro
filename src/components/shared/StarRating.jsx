import { Star } from 'lucide-react';

export default function StarRating({ rating = 0, onChange, size = 20 }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => {
        const isFilled = star <= Math.round(rating);

        if (onChange) {
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className="cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-95"
              aria-label={`${star} estrela${star > 1 ? 's' : ''}`}
            >
              <Star
                size={size}
                className={isFilled ? 'text-warning' : 'text-surface-lighter'}
                fill={isFilled ? '#EAB308' : 'none'}
                strokeWidth={isFilled ? 0 : 1.5}
              />
            </button>
          );
        }

        return (
          <Star
            key={star}
            size={size}
            className={isFilled ? 'text-warning' : 'text-surface-lighter'}
            fill={isFilled ? '#EAB308' : 'none'}
            strokeWidth={isFilled ? 0 : 1.5}
          />
        );
      })}
    </div>
  );
}
