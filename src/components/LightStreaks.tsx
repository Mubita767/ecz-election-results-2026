export default function LightStreaks() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Diagonal streak 1 */}
      <div
        className="absolute"
        style={{
          width: '3px',
          height: '150%',
          top: '-25%',
          left: '20%',
          background: 'linear-gradient(180deg, transparent, rgba(245,158,11,0.06), rgba(255,255,255,0.04), rgba(245,158,11,0.06), transparent)',
          transform: 'rotate(25deg)',
          animation: 'streak-drift-1 20s ease-in-out infinite',
        }}
      />
      {/* Diagonal streak 2 */}
      <div
        className="absolute"
        style={{
          width: '2px',
          height: '150%',
          top: '-25%',
          left: '50%',
          background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.04), rgba(245,158,11,0.05), rgba(255,255,255,0.04), transparent)',
          transform: 'rotate(20deg)',
          animation: 'streak-drift-2 25s ease-in-out infinite',
        }}
      />
      {/* Diagonal streak 3 */}
      <div
        className="absolute"
        style={{
          width: '2px',
          height: '150%',
          top: '-25%',
          left: '75%',
          background: 'linear-gradient(180deg, transparent, rgba(220,38,38,0.04), rgba(255,255,255,0.03), rgba(220,38,38,0.04), transparent)',
          transform: 'rotate(30deg)',
          animation: 'streak-drift-1 22s ease-in-out infinite reverse',
        }}
      />
      {/* Horizontal glow band */}
      <div
        className="absolute w-full"
        style={{
          height: '200px',
          top: '40%',
          background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.03) 0%, transparent 70%)',
          animation: 'streak-pulse 8s ease-in-out infinite',
        }}
      />
    </div>
  );
}
