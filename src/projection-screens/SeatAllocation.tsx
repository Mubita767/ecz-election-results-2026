import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useStore } from '../store/useStore';
import { seatAllocations as defaultSeatAllocations, stats } from '../data/mockData';
import CountUp from '../components/CountUp';
import ParticleBackground from '../components/ParticleBackground';
import LightStreaks from '../components/LightStreaks';

interface SeatDot {
  id: number;
  x: number;
  y: number;
  color: string;
  party: string;
  delay: number;
}

function generateHemicycleDots(allocations: typeof defaultSeatAllocations): SeatDot[] {
  const dots: SeatDot[] = [];
  let id = 0;

  const rows = [
    { count: 12, radius: 280 },
    { count: 18, radius: 250 },
    { count: 24, radius: 220 },
    { count: 28, radius: 190 },
    { count: 32, radius: 160 },
    { count: 30, radius: 130 },
    { count: 23, radius: 100 },
  ];

  const allSeats: { color: string; party: string }[] = [];
  allocations.forEach((sa) => {
    for (let i = 0; i < sa.seats; i++) {
      allSeats.push({ color: sa.partyColor, party: sa.party });
    }
  });

  let seatIdx = 0;
  rows.forEach((row, rowIdx) => {
    const arcStart = Math.PI * 0.05;
    const arcEnd = Math.PI * 0.95;
    const arcSpan = arcEnd - arcStart;
    for (let i = 0; i < row.count; i++) {
      if (seatIdx >= allSeats.length) break;
      const angle = arcStart + (arcSpan / (row.count - 1)) * i;
      const cx = 400 + row.radius * Math.cos(Math.PI - angle);
      const cy = 380 - row.radius * Math.sin(angle);
      dots.push({
        id: id++,
        x: cx,
        y: cy,
        color: allSeats[seatIdx].color,
        party: allSeats[seatIdx].party,
        delay: rowIdx * 0.08 + (i / row.count) * 0.15,
      });
      seatIdx++;
    }
  });

  return dots;
}

export default function SeatAllocation() {
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const dots = useMemo(() => generateHemicycleDots(defaultSeatAllocations), []);
  const majorityLine = 84;
  const seatsToMajority = Math.max(0, majorityLine - defaultSeatAllocations[0].seats);

  useEffect(() => {
    if (!svgRef.current) return;
    const circles = svgRef.current.querySelectorAll('.seat-dot');
    gsap.fromTo(
      circles,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: {
          each: 0.008,
          from: 'center',
        },
        ease: 'back.out(1.7)',
        delay: 0.3,
      }
    );

    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { attr: { y2: 380 }, opacity: 0 },
        { attr: { y2: 60 }, opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.8 }
      );
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-[#08080F] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <ParticleBackground />
      <LightStreaks />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#08080F]/80 z-[1]" />

      {/* Header */}
      <div className="relative z-10 text-center pt-6 pb-2 shrink-0">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-black tracking-wider text-white"
        >
          PARLIAMENTARY SEAT ALLOCATION
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-[#6B6B80] mt-1"
        >
          {stats.totalSeats} seats total · Majority: {majorityLine} · Results in Progress
        </motion.p>
      </div>

      {/* Seats to majority indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 flex justify-center mb-2 shrink-0"
      >
        <div className="glass-card px-6 py-2 flex items-center gap-4">
          <span className="text-sm text-[#A0A0B8]">Seats to Majority</span>
          <span className="font-mono text-2xl font-bold text-[#F59E0B]">
            <CountUp target={seatsToMajority} duration={2} delay={0.5} />
          </span>
          {seatsToMajority === 0 && (
            <span className="px-2 py-0.5 rounded bg-[#059669]/20 text-[#34D399] text-xs font-bold tracking-wider">
              ACHIEVED
            </span>
          )}
        </div>
      </motion.div>

      {/* Hemicycle SVG */}
      <div className="relative z-10 flex-1 w-full flex items-center justify-center min-h-0">
        <svg
          ref={svgRef}
          viewBox="0 0 800 400"
          className="w-full h-full max-w-[1000px]"
          preserveAspectRatio="xMidYMax meet"
        >
          {/* Majority line marker - animated */}
          <line
            ref={lineRef}
            x1={400}
            y1={380}
            x2={400}
            y2={60}
            stroke="#F59E0B"
            strokeWidth={2}
            strokeDasharray="6 4"
            opacity={0}
            style={{
              filter: 'drop-shadow(0 0 4px rgba(245,158,11,0.5))',
            }}
          />
          <motion.text
            x={410}
            y={50}
            fill="#F59E0B"
            fontSize={12}
            fontWeight={700}
            fontFamily="JetBrains Mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            MAJORITY ({majorityLine})
          </motion.text>

          {/* Seat dots with glow */}
          {dots.map((dot) => (
            <circle
              key={dot.id}
              cx={dot.x}
              cy={dot.y}
              r={6}
              fill={dot.color}
              className="seat-dot"
              style={{
                transformOrigin: `${dot.x}px ${dot.y}px`,
                filter: `drop-shadow(0 0 3px ${dot.color}88)`,
              }}
            />
          ))}

          {/* Speaker podium - enhanced */}
          <defs>
            <linearGradient id="podiumGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2A2A3E" />
              <stop offset="100%" stopColor="#1A1A2E" />
            </linearGradient>
          </defs>
          <rect x={350} y={368} width={100} height={24} rx={6} fill="url(#podiumGrad)" stroke="#3D3D5C" strokeWidth={1} />
          <text x={400} y={385} fill="#6B6B80" fontSize={10} textAnchor="middle" fontWeight={700} fontFamily="Inter">
            SPEAKER
          </text>
        </svg>
      </div>

      {/* Party legend with badges */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 md:gap-6 px-4 pb-5 shrink-0">
        {defaultSeatAllocations.map((sa, i) => (
          <motion.div
            key={sa.party}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            className="glass-card px-4 py-2 flex items-center gap-3"
          >
            <span
              className="w-4 h-4 rounded-full shrink-0"
              style={{
                backgroundColor: sa.partyColor,
                boxShadow: `0 0 8px ${sa.partyColor}66`,
              }}
            />
            <span className="text-sm font-bold text-white">{sa.party}</span>
            <span className="font-mono text-xl font-bold" style={{ color: sa.partyColor }}>
              <CountUp target={sa.seats} duration={2} delay={1} />
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
