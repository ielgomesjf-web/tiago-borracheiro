import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StarRating from '../../components/shared/StarRating';

export default function RatingPage() {
  const navigate = useNavigate();
  const { currentOrder, clearOrder } = useApp();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    clearOrder();
    navigate('/client');
  };

  const handleSkip = () => {
    clearOrder();
    navigate('/client');
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-12">
      {/* Success icon with glow */}
      <div className="relative mb-8 animate-fade-in">
        <div className="absolute inset-0 bg-success/20 rounded-full blur-2xl scale-150" />
        <div className="relative w-24 h-24 bg-success/15 rounded-full flex items-center justify-center">
          <CheckCircle size={48} className="text-success" strokeWidth={1.5} />
        </div>
      </div>

      {/* Heading */}
      <h1
        className="text-2xl font-bold text-text-primary mb-2 animate-fade-in"
        style={{ animationDelay: '0.1s', opacity: 0 }}
      >
        Servico Concluido!
      </h1>

      {/* Provider + service summary */}
      <p
        className="text-text-secondary text-center mb-8 animate-fade-in"
        style={{ animationDelay: '0.15s', opacity: 0 }}
      >
        {currentOrder?.service?.name || 'Troca de pneu'} por{' '}
        <span className="text-text-primary font-medium">
          {currentOrder?.provider?.name || 'Roberto'}
        </span>
      </p>

      {/* Star rating */}
      <div
        className="mb-6 animate-fade-in"
        style={{ animationDelay: '0.25s', opacity: 0 }}
      >
        <p className="text-text-secondary text-sm text-center mb-3">
          Como foi o atendimento?
        </p>
        <StarRating rating={rating} onChange={setRating} size={36} />
      </div>

      {/* Comment textarea */}
      <div
        className="w-full max-w-sm mb-8 animate-fade-in"
        style={{ animationDelay: '0.35s', opacity: 0 }}
      >
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Deixe um comentario (opcional)"
          rows={3}
          className="w-full bg-surface border border-surface-lighter/30 rounded-2xl px-4 py-3 text-text-primary text-sm placeholder:text-text-secondary/50 resize-none focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={rating === 0}
        className={`w-full max-w-sm py-4 rounded-2xl font-bold text-base transition-all duration-200 mb-3 animate-fade-in ${
          rating > 0
            ? 'bg-gradient-to-r from-primary to-primary-dark text-white active:scale-[0.98] glow-primary'
            : 'bg-surface-lighter text-text-secondary cursor-not-allowed'
        }`}
        style={{ animationDelay: '0.45s', opacity: 0 }}
      >
        Enviar Avaliacao
      </button>

      {/* Skip link */}
      <button
        onClick={handleSkip}
        className="text-text-secondary text-sm hover:text-text-primary transition-colors animate-fade-in"
        style={{ animationDelay: '0.5s', opacity: 0 }}
      >
        Pular
      </button>
    </div>
  );
}
