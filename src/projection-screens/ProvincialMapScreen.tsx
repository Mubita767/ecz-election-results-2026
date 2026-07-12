import { motion } from 'framer-motion';
import RealZambiaMap from '../components/RealZambiaMap';
import { useStore } from '../store/useStore';
import ParticleBackground from '../components/ParticleBackground';

export default function ProvincialMapScreen() {
  const { provinces, electionState } = useStore();

  return (
    <div className="w-full h-full flex flex-col bg-[#08080F] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#08080F]/80 z-[1]" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center pt-5 pb-3 shrink-0"
      >
        <h2 className="text-2xl md:text-3xl font-black tracking-wider text-white">
          PROVINCIAL RESULTS MAP
        </h2>
        <p className="text-sm text-[#6B6B80] mt-1">
          {electionState.constituenciesReported}/{electionState.constituenciesTotal} constituencies reporting
        </p>
      </motion.div>

      <div className="relative z-10 flex-1 flex gap-5 px-6 pb-5 min-h-0">
        {/* Map - takes 70% */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="flex-[7] glass-panel rounded-2xl overflow-hidden relative"
        >
          <RealZambiaMap className="w-full h-full" />
        </motion.div>

        {/* Province List - glassmorphism cards */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex-[3] glass-panel rounded-2xl p-4 overflow-auto no-scrollbar"
        >
          <h3 className="text-xs font-bold tracking-wider text-[#6B6B80] uppercase mb-3 sticky top-0 bg-[#141420]/90 backdrop-blur-sm pb-2 z-10">
            Province Summary
          </h3>
          <div className="space-y-2.5">
            {provinces.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                className="glass-card p-3 hover:scale-[1.02] transition-transform cursor-pointer"
                style={{
                  borderLeft: `3px solid ${p.partyColor}`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">{p.name}</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: p.partyColor,
                        boxShadow: `0 0 6px ${p.partyColor}66`,
                      }}
                    />
                    <span className="text-xs font-bold" style={{ color: p.partyColor }}>
                      {p.leadingParty}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[#6B6B80]">
                    <span>Turnout: <span className="font-mono text-[#A0A0B8] font-bold">{p.turnout}%</span></span>
                    <span>Share: <span className="font-mono text-[#A0A0B8] font-bold">{p.voteShare}%</span></span>
                  </div>
                  <span className="font-mono text-[10px] text-[#6B6B80]">
                    {p.constituencies} seats
                  </span>
                </div>
                {/* Mini progress bar */}
                <div className="mt-2 h-1.5 rounded-full bg-[#0E0E16] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: p.partyColor }}
                    initial={{ width: 0 }}
                    animate={{ width: `${p.voteShare}%` }}
                    transition={{ duration: 1, delay: 0.6 + i * 0.06 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
