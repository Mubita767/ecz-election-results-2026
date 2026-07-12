import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

export default function GlowBar() {
  const [time, setTime] = useState(new Date());
  const { electionState } = useStore();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const reported = electionState.constituenciesReported;
  const total = electionState.constituenciesTotal;
  const progressPct = ((reported / total) * 100).toFixed(1);

  return (
    <div className="h-16 shrink-0 flex items-center justify-between px-8 border-b border-[#2A2A3E] bg-[#08080F]/95 backdrop-blur-sm z-50 relative">
      {/* Left: ECZ Logo - Official from elections.org.zm */}
      <div className="flex items-center gap-4">
        <img src="/ecz-logo.png" alt="ECZ" className="w-10 h-10 object-contain" />
        <div className="hidden md:block">
          <div className="text-[11px] font-semibold tracking-[0.2em] text-[#A0A0B8] uppercase">
            Electoral Commission
          </div>
          <div className="text-[10px] text-[#6B6B80]">of Zambia</div>
        </div>
      </div>

      {/* Center: Title + Mid-election status */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <h1 className="text-[15px] md:text-lg font-black tracking-[0.15em] text-[#F59E0B] glow-gold uppercase whitespace-nowrap">
          Election Results 2026
        </h1>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
          <span className="text-[9px] text-[#6B6B80] tracking-[0.3em] uppercase">
            RESULTS IN PROGRESS — {reported}/{total} CONSTITUENCIES ({progressPct}%)
          </span>
        </div>
      </div>

      {/* Right: Live + Clock */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
          <span className="w-2 h-2 rounded-full bg-red-500 live-dot" />
          <span className="text-xs font-bold text-red-400 tracking-wider">LIVE</span>
        </div>
        <div className="font-mono text-lg font-bold text-white tracking-wider">
          {formatTime(time)}
        </div>
      </div>
    </div>
  );
}
