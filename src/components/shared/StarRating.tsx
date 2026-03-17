import { Star } from 'lucide-react';

interface Props {
  rating: number;
  size?: number;
  interactive?: boolean;
  onChange?: (r: number) => void;
}

export default function StarRating({ rating, size = 16, interactive = false, onChange }: Props) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button key={i} disabled={!interactive}
          onClick={() => interactive && onChange?.(i)}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}>
          <Star size={size}
            className={i <= rating ? 'fill-warning text-warning' : 'text-bg-surface-lighter'}
          />
        </button>
      ))}
    </div>
  );
}
