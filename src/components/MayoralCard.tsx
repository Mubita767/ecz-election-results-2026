import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import CountUp from './CountUp';

export default function MayoralCard() {
  const { mayoralResults, mayoralSeatAllocation, mayoralState } = useStore();

  const declaredResults = mayoralResults.filter((r) => r.status === 'declared');
  const countingResults = mayoralResults.filter((r) => r.status === 'counting');
  const pendingResults = mayoralResults.filter((r) => r.status === 'pending');

  const totalSeats = mayoralSeatAllocation.reduce((sum, p) => sum + p.seats, 0);

  return (
    <div className="space-y-6">
      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-panel rounded-xl p-4 text-center">
          <div className="text-xs text-[#6B6B80] uppercase tracking-wider mb-1">Declared</div>
          <div className="font-mono text-2xl font-bold text-[#059669]">
            <CountUp target={declaredResults.length} />
          </div>
        </div>
        <div className="glass-panel rounded-xl p-4 text-center">
          <div className="text-xs text-[#6B6B80] uppercase tracking-wider mb-1">Counting</div>
          <div className="font-mono text-2xl font-bold text-[#F59E0B]">
            <CountUp target={countingResults.length} />
          </div>
        </div>
        <div className="glass-panel rounded-xl p-4 text-center">
          <div className="text-xs text-[#6B6B80] uppercase tracking-wider mb-1">Pending</div>
          <div className="font-mono text-2xl font-bold text-[#6B7280]">
            <CountUp target={pendingResults.length} />
          </div>
        </div>
      </div>

      {/* Seat Allocation Bars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel rounded-2xl p-6"
      >
        <h3 className="text-sm font-bold tracking-wider text-[#A0A0B8] mb-4 uppercase">
          Mayoral Seat Allocation (Councils)
        </h3>
        <div className="space-y-4">
          {mayoralSeatAllocation.map((sa) => (
            <div key={sa.party} className="flex items-center gap-4">
              <span
                className="w-4 h-4 rounded-full shrink-0"
                style={{
                  backgroundColor: sa.partyColor,
                  boxShadow: `0 0 8px ${sa.partyColor}55`,
                }}
              />
              <span className="text-sm font-semibold text-white w-12">{sa.party}</span>
              <div className="flex-1 h-5 bg-[#0E0E16] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: sa.partyColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(sa.seats / totalSeats) * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />
              </div>
              <span className="font-mono text-sm font-bold w-8 text-right" style={{ color: sa.partyColor }}>
                {sa.seats}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-[#2A2A3E]/50 flex justify-between text-xs text-[#6B6B80]">
          <span>Total Councils: <span className="text-white font-mono font-bold">{totalSeats}</span></span>
          <span>Reporting: <span className="text-[#F59E0B] font-mono font-bold">{mayoralState.constituenciesReported}/{mayoralState.constituenciesTotal}</span></span>
        </div>
      </motion.div>

      {/* Mayoral Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel rounded-2xl p-6"
      >
        <h3 className="text-sm font-bold tracking-wider text-[#A0A0B8] mb-4 uppercase">
          Mayoral Results
        </h3>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {mayoralResults.map((result) => (
            <div
              key={result.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-[#0E0E16]/50"
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: result.partyColor }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white truncate">{result.council}</div>
                <div className="text-[10px] text-[#6B6B80]">{result.province} — {result.candidateName}</div>
              </div>
              <div className="text-right shrink-0">
                {result.status === 'declared' ? (
                  <>
                    <div className="font-mono text-sm font-bold text-white">
                      <CountUp target={result.percentage} decimals={1} suffix="%" />
                    </div>
                    <div className="text-[10px] text-[#6B6B80]">{result.party}</div>
                  </>
                ) : (
                  <span className={`text-xs font-bold ${
                    result.status === 'counting' ? 'text-[#F59E0B]' : 'text-[#6B7280]'
                  }`}>
                    {result.status === 'counting' ? 'Counting...' : 'Pending'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
