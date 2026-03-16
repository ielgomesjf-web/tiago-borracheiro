export default function TireIcon({ size = 80, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
    >
      <defs>
        <radialGradient id="hubG" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#FBA94C" />
          <stop offset="100%" stopColor="#EA580C" />
        </radialGradient>
      </defs>
      {/* Outer tire */}
      <circle cx="256" cy="256" r="240" fill="#1F2937" stroke="#374151" strokeWidth="4" />
      <circle cx="256" cy="256" r="226" fill="none" stroke="#111827" strokeWidth="8" />
      <circle cx="256" cy="256" r="208" fill="none" stroke="#111827" strokeWidth="3" />
      {/* Tread blocks */}
      <g fill="#374151" opacity="0.7">
        {[...Array(12)].map((_, i) => (
          <rect
            key={i}
            x="250"
            y="18"
            width="12"
            height="36"
            rx="4"
            transform={`rotate(${i * 30},256,256)`}
          />
        ))}
      </g>
      {/* Inner */}
      <circle cx="256" cy="256" r="175" fill="#0A0F1C" />
      {/* Rim */}
      <circle cx="256" cy="256" r="155" fill="none" stroke="#6B7280" strokeWidth="5" />
      <circle cx="256" cy="256" r="145" fill="#111827" stroke="#4B5563" strokeWidth="2" />
      {/* Spokes */}
      <g stroke="#F97316" strokeWidth="8" strokeLinecap="round" opacity="0.9">
        {[0, 72, 144, 216, 288].map((deg) => (
          <line
            key={deg}
            x1="256"
            y1="120"
            x2="256"
            y2="195"
            transform={`rotate(${deg},256,256)`}
          />
        ))}
      </g>
      {/* Hub */}
      <circle cx="256" cy="256" r="60" fill="url(#hubG)" />
      <circle cx="256" cy="256" r="42" fill="#0A0F1C" stroke="#F97316" strokeWidth="3" />
      {/* Bolts */}
      <g fill="#F97316">
        {[0, 72, 144, 216, 288].map((deg) => {
          const r = 28;
          const cx = 256 + r * Math.sin((deg * Math.PI) / 180);
          const cy = 256 - r * Math.cos((deg * Math.PI) / 180);
          return <circle key={deg} cx={cx} cy={cy} r="5" />;
        })}
      </g>
      <circle cx="256" cy="256" r="14" fill="#F97316" />
      <circle cx="256" cy="256" r="7" fill="#0A0F1C" />
    </svg>
  );
}
