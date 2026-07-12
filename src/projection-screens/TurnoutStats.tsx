import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useStore } from '../store/useStore';
import CountUp from '../components/CountUp';
import ParticleBackground from '../components/ParticleBackground';
import { Users, Vote, MapPin } from 'lucide-react';

function CircularProgressRing({
  percentage,
  size = 240,
  strokeWidth = 14,
  color = '#F59E0B',
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2.5, ease: [0.32, 0.72, 0, 1], delay: 0.3 }}
          style={{
            filter: `drop-shadow(0 0 8px ${color}66)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-5xl md:text-6xl font-bold text-gradient-gold">
          <CountUp target={percentage} duration={2.5} decimals={1} delay={0.3} />
        </span>
        <span className="text-lg text-[#6B6B80] mt-1">%</span>
        <span className="text-xs text-[#A0A0B8] tracking-[0.15em] uppercase mt-1 font-semibold">Turnout</span>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  delay,
  color = '#F59E0B',
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  delay: number;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className="glass-card p-5 flex flex-col items-center text-center"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div className="font-mono text-3xl md:text-4xl font-bold text-white mb-1">{value}</div>
      <span className="text-xs text-[#6B6B80] tracking-wider uppercase font-semibold">{label}</span>
    </motion.div>
  );
}

export default function TurnoutStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { provinces, electionState } = useStore();
  const totalRegistered = electionState.totalRegistered;
  const totalVotesCast = electionState.totalVotesCast;
  const constituenciesTotal = electionState.constituenciesTotal;
  const constituenciesReported = electionState.constituenciesReported;
  const turnoutPercent = totalRegistered > 0 ? (totalVotesCast / totalRegistered) * 100 : 0;

  // Derive mid-election stats
  const constituenciesCounting = 45;
  const constituenciesPending = constituenciesTotal - constituenciesReported - constituenciesCounting;

  useEffect(() => {
    if (!containerRef.current) return;
    const bars = containerRef.current.querySelectorAll('.turnout-bar');
    gsap.fromTo(
      bars,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.8,
      }
    );
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-[#08080F] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#08080F]/80 z-[1]" />

      {/* Content */}
      <div ref={containerRef} className="relative z-10 flex-1 flex flex-col p-6 overflow-auto no-scrollbar">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-black tracking-wider text-white mb-6 text-center shrink-0"
        >
          TURNOUT & PARTICIPATION STATISTICS
        </motion.h2>

        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col min-h-0">
          {/* Top Row: Big circle + stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 shrink-0">
            {/* Giant Turnout Circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center"
            >
              <CircularProgressRing percentage={turnoutPercent} size={220} strokeWidth={14} color="#F59E0B" />
            </motion.div>

            {/* Stat Cards */}
            <div className="flex flex-col gap-4">
              <StatCard
                icon={Vote}
                label="Total Votes Cast"
                value={<CountUp target={totalVotesCast} duration={2.5} />}
                delay={0.15}
                color="#F59E0B"
              />
              <StatCard
                icon={Users}
                label="Registered Voters"
                value={<CountUp target={totalRegistered} duration={2.5} />}
                delay={0.3}
                color="#06B6D4"
              />
            </div>

            <div className="flex flex-col gap-4">
              <StatCard
                icon={MapPin}
                label="Constituencies"
                value={
                  <span>
                    <CountUp target={constituenciesReported} duration={1.5} />
                    <span className="text-[#6B6B80] text-2xl">/{constituenciesTotal}</span>
                  </span>
                }
                delay={0.45}
                color="#059669"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glass-card p-5 flex flex-col items-center justify-center flex-1"
              >
                <span className="text-xs text-[#6B6B80] tracking-wider uppercase font-semibold mb-2">
                  Reporting Progress
                </span>
                <div className="w-full h-4 comparison-bar-bg">
                  <motion.div
                    className="h-full rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#FCD34D]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(constituenciesReported / constituenciesTotal) * 100}%` }}
                    transition={{ duration: 2, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  />
                </div>
                <span className="font-mono text-sm text-[#F59E0B] mt-2 font-bold">
                  {((constituenciesReported / constituenciesTotal) * 100).toFixed(1)}% Complete
                </span>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-[#6B6B80]">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />{constituenciesReported} declared</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />{constituenciesCounting} counting</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />{constituenciesPending} pending</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Provincial Turnout Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-panel rounded-2xl p-5 flex-1 min-h-0"
          >
            <h3 className="text-sm font-bold tracking-wider text-[#A0A0B8] mb-4 uppercase">
              Provincial Turnout Comparison
            </h3>
            <div className="space-y-3 overflow-auto no-scrollbar max-h-[280px]">
              {[...provinces]
                .sort((a, b) => b.turnout - a.turnout)
                .map((p, i) => (
                  <div key={p.id} className="flex items-center gap-4">
                    <span className="w-28 text-xs font-medium text-white shrink-0 text-right">
                      {p.name}
                    </span>
                    <div className="flex-1 h-7 comparison-bar-bg relative">
                      <motion.div
                        className="turnout-bar h-full rounded-lg flex items-center justify-end pr-2 origin-left"
                        style={{
                          backgroundColor: p.partyColor,
                          width: `${(p.turnout / 80) * 100}%`,
                          boxShadow: `0 0 8px ${p.partyColor}44`,
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: 1,
                          delay: 0.6 + i * 0.08,
                          ease: [0.32, 0.72, 0, 1],
                        }}
                      >
                        <span className="font-mono text-xs font-bold text-white/90">
                          {p.turnout}%
                        </span>
                      </motion.div>
                    </div>
                    <span className="w-14 text-xs font-mono text-[#6B6B80] text-right">
                      {p.totalVotes.toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
