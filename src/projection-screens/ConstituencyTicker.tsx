import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { MapPin, TrendingUp, Clock, CheckCircle, Loader2 } from 'lucide-react';

export default function ConstituencyTicker() {
  const { constituencies, electionState } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Duplicate constituencies for seamless scroll
  const allConstituencies = [...constituencies, ...constituencies];

  useEffect(() => {
    if (!scrollRef.current || hovered) return;
    const el = scrollRef.current;
    let raf: number;
    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      scrollPos += speed;
      if (scrollPos >= el.scrollHeight / 2) {
        scrollPos = 0;
      }
      el.scrollTop = scrollPos;
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  const statusIcon = (status: string) => {
    switch (status) {
      case 'declared':
        return <CheckCircle className="w-3 h-3 text-[#059669]" />;
      case 'counting':
        return <Loader2 className="w-3 h-3 text-[#F59E0B] animate-spin" />;
      default:
        return <Clock className="w-3 h-3 text-[#6B7280]" />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#08080F] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#08080F]/80 z-[1]" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center pt-5 pb-3 shrink-0"
      >
        <h2 className="text-2xl md:text-3xl font-black tracking-wider text-white">
          CONSTITUENCY RESULTS
        </h2>
        <p className="text-sm text-[#6B6B80] mt-1">
          {electionState.constituenciesReported} of {electionState.constituenciesTotal} constituencies reported
        </p>
      </motion.div>

      {/* Scrolling grid */}
      <div
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-hidden px-6 pb-4"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {allConstituencies.map((c, i) => {
            const isUpnd = c.winnerParty === 'UPND';
            return (
              <motion.div
                key={`${c.id}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: (i % constituencies.length) * 0.03,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="glass-card p-4 hover:scale-[1.02] hover:border-white/15 transition-all cursor-pointer group"
                style={{
                  borderLeft: `4px solid ${c.partyColor}`,
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-gradient-gold transition-all">
                      {c.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-[#6B6B80] mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{c.province}</span>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold"
                    style={{
                      backgroundColor: `${c.partyColor}18`,
                      color: c.partyColor,
                      border: `1px solid ${c.partyColor}33`,
                    }}
                  >
                    {statusIcon(c.status)}
                    <span className="ml-0.5">{c.winnerParty || 'Pending'}</span>
                  </div>
                </div>

                {/* Winner / Status name */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-6 h-1 rounded-full"
                    style={{
                      backgroundColor: c.partyColor,
                      boxShadow: `0 0 6px ${c.partyColor}55`,
                    }}
                  />
                  <span className="text-xs text-[#A0A0B8] font-medium">{c.winner}</span>
                </div>

                {/* Stats row */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#6B6B80]">
                    Votes: <span className="font-mono font-bold text-white">{c.votes.toLocaleString()}</span>
                  </span>
                  <div className="flex items-center gap-1 text-[#6B6B80]">
                    <TrendingUp className="w-3 h-3" />
                    <span className="font-mono text-[#A0A0B8]">+{c.margin.toLocaleString()}</span>
                  </div>
                </div>
                {/* Turnout bar */}
                {c.turnout > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-[#0E0E16] overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${c.turnout}%`,
                          backgroundColor: c.partyColor,
                          opacity: 0.6,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-[#6B6B80]">{c.turnout}%</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
