import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useStore } from '../store/useStore';
import CountUp from '../components/CountUp';
import ParticleBackground from '../components/ParticleBackground';

const barGradientMap: Record<string, string> = {
  '#DC2626': 'linear-gradient(90deg, #DC2626 0%, #EF4444 50%, #DC2626 100%)',
  '#1B5E20': 'linear-gradient(90deg, #1B5E20 0%, #2E7D32 50%, #1B5E20 100%)',
  '#EA580C': 'linear-gradient(90deg, #EA580C 0%, #F97316 50%, #EA580C 100%)',
  '#F59E0B': 'linear-gradient(90deg, #F59E0B 0%, #FCD34D 50%, #F59E0B 100%)',
  '#7C3AED': 'linear-gradient(90deg, #7C3AED 0%, #8B5CF6 50%, #7C3AED 100%)',
  '#6B7280': 'linear-gradient(90deg, #6B7280 0%, #9CA3AF 50%, #6B7280 100%)',
};

export default function ResultsBreakdown() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { candidates, provinces, electionState } = useStore();
  const totalVotes = candidates.reduce((s, c) => s + c.votes, 0);

  useEffect(() => {
    if (!containerRef.current) return;
    const bars = containerRef.current.querySelectorAll('.result-bar');
    const rows = containerRef.current.querySelectorAll('.province-row');
    gsap.fromTo(
      bars,
      { width: 0, opacity: 0 },
      {
        width: 'auto',
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      }
    );
    gsap.fromTo(
      rows,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
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

      <div ref={containerRef} className="relative z-10 flex-1 flex flex-col p-6 overflow-auto no-scrollbar">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-black tracking-wider text-white mb-5 text-center shrink-0"
        >
          PRESIDENTIAL RESULTS BREAKDOWN
        </motion.h2>

        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
          {/* Bar Chart */}
          <div className="flex-1 glass-panel rounded-2xl p-6 overflow-auto no-scrollbar">
            <h3 className="text-sm font-bold tracking-wider text-[#A0A0B8] mb-5 uppercase">
              Vote Share by Candidate
            </h3>
            <div className="space-y-5">
              {candidates.map((c, i) => (
                <div key={c.id} className="space-y-2">
                  <div className="flex justify-between text-sm items-center">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full shrink-0"
                        style={{
                          backgroundColor: c.party.color,
                          boxShadow: `0 0 8px ${c.party.color}55`,
                        }}
                      />
                      <span className="font-semibold text-white">{c.name}</span>
                      <span className="text-[#6B6B80] text-xs">({c.party.shortName})</span>
                      {c.isLeading && (
                        <span className="px-2 py-0.5 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/40 text-[#F59E0B] text-[10px] font-black tracking-wider">
                          LEADING
                        </span>
                      )}
                    </div>
                    <span className="font-mono font-bold text-white text-base">
                      <CountUp target={c.percentage} duration={2} decimals={2} suffix="%" />
                    </span>
                  </div>
                  <div className="h-10 comparison-bar-bg relative">
                    <motion.div
                      className="result-bar h-full rounded-xl flex items-center justify-end pr-4"
                      style={{
                        background: barGradientMap[c.party.color] || c.party.color,
                        width: `${c.percentage}%`,
                        boxShadow: `0 0 12px ${c.party.color}33`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${c.percentage}%` }}
                      transition={{
                        duration: 1.5,
                        delay: 0.2 + i * 0.15,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                    >
                      <span className="font-mono text-sm font-bold text-white/90">
                        <CountUp target={c.votes} duration={1.5} delay={0.5 + i * 0.15} />
                      </span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-sm text-[#6B6B80]">Total Votes Cast</span>
              <span className="font-mono text-2xl font-bold text-gradient-gold">
                <CountUp target={totalVotes} duration={2} />
              </span>
            </div>

            {/* Constituency reporting status */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B6B80]">Constituencies Reported</span>
                <span className="font-mono text-sm font-bold text-[#F59E0B]">
                  {electionState.constituenciesReported}/{electionState.constituenciesTotal}
                </span>
              </div>
              <div className="w-full h-2 bg-[#1A1A24] rounded-full overflow-hidden mt-2">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FCD34D]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(electionState.constituenciesReported / electionState.constituenciesTotal) * 100}%` }}
                  transition={{ duration: 1.5, ease: [0.32, 0.72, 0, 1] }}
                />
              </div>
            </div>
          </div>

          {/* Province Table */}
          <div className="lg:w-[420px] glass-panel rounded-2xl p-5 overflow-hidden flex flex-col">
            <h3 className="text-sm font-bold tracking-wider text-[#A0A0B8] mb-4 uppercase shrink-0">
              Provincial Results
            </h3>
            <div className="overflow-auto no-scrollbar flex-1">
              <table className="w-full">
                <thead className="sticky top-0 z-10">
                  <tr className="text-left text-xs text-[#6B6B80] uppercase tracking-wider">
                    <th className="pb-2 font-semibold">Province</th>
                    <th className="pb-2 font-semibold text-right">Leading</th>
                    <th className="pb-2 font-semibold text-right">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {provinces.map((p) => (
                    <tr
                      key={p.id}
                      className="province-row glass-row hover:bg-[#1E1E30]/60"
                    >
                      <td className="py-2.5 px-2 text-sm font-medium text-white rounded-l-lg">{p.name}</td>
                      <td className="py-2.5 px-2 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              backgroundColor: p.partyColor,
                              boxShadow: `0 0 6px ${p.partyColor}55`,
                            }}
                          />
                          <span className="text-xs font-bold" style={{ color: p.partyColor }}>
                            {p.leadingParty}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-right font-mono text-sm font-bold text-white rounded-r-lg">
                        {p.voteShare}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
