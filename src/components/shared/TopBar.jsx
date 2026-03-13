import { ArrowLeft } from 'lucide-react';

export default function TopBar({ title, onBack, rightAction }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-14 bg-surface/90 backdrop-blur-xl border-b border-surface-lighter/20">
      <div className="flex items-center justify-between h-full px-4 max-w-lg mx-auto">
        {/* Left: back button or spacer */}
        <div className="w-10 flex items-center justify-start">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-surface-light/60 active:bg-surface-lighter transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft size={20} className="text-text-primary" />
            </button>
          )}
        </div>

        {/* Center: title */}
        <h1 className="text-base font-semibold text-text-primary truncate text-center flex-1 mx-2">
          {title}
        </h1>

        {/* Right: optional action or spacer */}
        <div className="w-10 flex items-center justify-end">
          {rightAction || null}
        </div>
      </div>
    </header>
  );
}
