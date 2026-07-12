import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  size: number;
  opacity: number;
  color: string;
  duration: number;
  delay: number;
  drift: number;
}

export default function ParticleBackground() {
  const particles = useMemo<Particle[]>(() => {
    const colors = ['#F59E0B', '#DC2626', '#06B6D4'];
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 2 + Math.random() * 4,
      opacity: 0.1 + Math.random() * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: 15 + Math.random() * 25,
      delay: Math.random() * 20,
      drift: -30 + Math.random() * 60,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            animation: `float-particle ${p.duration}s linear ${p.delay}s infinite`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
