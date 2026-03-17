interface Props { size?: number; spinning?: boolean; }

export default function TireIcon({ size = 64, spinning = false }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={spinning ? 'animate-spin' : ''}
      style={{ animationDuration: '4s' }}>
      <defs>
        <linearGradient id="tireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#1F2937" stroke="#374151" strokeWidth="2" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="#374151" strokeWidth="3" />
      <circle cx="32" cy="32" r="12" fill="url(#tireGrad)" />
      <circle cx="32" cy="32" r="5" fill="#0A0F1C" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <line key={angle} x1="32" y1="32"
          x2={32 + 20 * Math.cos((angle * Math.PI) / 180)}
          y2={32 + 20 * Math.sin((angle * Math.PI) / 180)}
          stroke="#374151" strokeWidth="2" strokeLinecap="round" />
      ))}
    </svg>
  );
}
