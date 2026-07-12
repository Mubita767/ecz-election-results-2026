import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '../store/useStore';
import CountUp from '../components/CountUp';
import ParticleBackground from '../components/ParticleBackground';
import LightStreaks from '../components/LightStreaks';

const candidatePhotoMap: Record<string, string> = {
  hh: '/candidate-hh.jpg',
  bm: '/candidate-bm.jpg',
  fm: '/candidate-fm.jpg',
  hk: '/candidate-hk.jpg',
  gk: '/candidate-gk.jpg',
};
const runningMatePhotoMap: Record<string, string> = {
  bm: '/candidate-mz.jpg',
};

export default function CandidateShowcase() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState(0); // 0=bio, 1=totals, 2=provinces, 3=stats
  const dataRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const { candidates } = useStore();
  const candidate = candidates[index];
  const totalVotes = candidates.reduce((s, c) => s + c.votes, 0);

  // Phase timing: bio(8s) → totals(8s) → provinces(14s) → stats(8s) = 38s per candidate
  const PHASE_DURATIONS = [8000, 8000, 14000, 8000];

  // Advance candidate after all phases complete
  useEffect(() => {
    const phaseDuration = PHASE_DURATIONS[phase];
    const timer = setTimeout(() => {
      if (phase < 3) {
        setPhase(p => p + 1);
      } else {
        setPhase(0);
        setIndex((prev) => (prev + 1) % candidates.length);
      }
    }, phaseDuration);
    return () => clearTimeout(timer);
  }, [phase, index, candidates.length]);

  // GSAP entrance for data panel on phase change
  useGSAP(() => {
    if (!dataRef.current) return;
    const els = dataRef.current.querySelectorAll('.phase-reveal');
    gsap.fromTo(els, { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out', delay: 0.1 });
  }, { scope: dataRef, dependencies: [phase] });

  // GSAP entrance for photo on candidate change only
  useGSAP(() => {
    if (!photoRef.current) return;
    gsap.fromTo(photoRef.current, { opacity: 0, x: -30, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'power3.out' });
  }, { scope: photoRef, dependencies: [index] });

  const allProvinces = [...candidate.provincialBreakdown].sort((a, b) => b.percentage - a.percentage);
  const top2Candidates = [...candidates].sort((a, b) => b.votes - a.votes).slice(0, 2);

  // Phase progress indicator
  const phaseLabels = ['Profile', 'National Results', 'Provincial Breakdown', 'Detailed Analysis'];

  return (
    <div className="w-full h-full flex flex-col bg-[#08080F] relative overflow-hidden">
      <ParticleBackground />
      <LightStreaks />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#08080F]/80 z-[1]" />

      {/* Top: Candidate indicator dots + phase indicator */}
      <div className="relative z-10 flex flex-col items-center pt-3 shrink-0 gap-2">
        {/* Candidate dots */}
        <div className="flex items-center gap-2">
          {candidates.map((c, i) => (
            <button key={c.id} onClick={() => { setIndex(i); setPhase(0); }}
              className={`h-2 rounded-full transition-all duration-500 ${i === index ? 'w-10' : 'w-2.5'} ${i === index ? 'bg-[#F59E0B]' : 'bg-[#2A2A3E] hover:bg-[#3D3D5C]'}`}
              title={c.name} />
          ))}
        </div>
        {/* Phase indicator */}
        <div className="flex items-center gap-1.5">
          {phaseLabels.map((label, i) => (
            <div key={label} className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all duration-300 ${
              i === phase ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30' : 'text-[#4A4A5E]'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${i === phase ? 'bg-[#F59E0B]' : i < phase ? 'bg-[#059669]' : 'bg-[#2A2A3E]'}`} />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center min-h-0 px-8 lg:px-14 gap-8">
        {/* LEFT: Photo panel — STATIC, only changes on candidate switch */}
        <motion.div
          key={`photo-${candidate.id}`}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="flex flex-col items-center shrink-0 w-[260px] lg:w-[300px]"
        >
          <div ref={photoRef} className="relative mb-4">
            <div className="absolute inset-0 rounded-2xl blur-2xl opacity-30" style={{ background: candidate.party.color, transform: 'scale(1.15)' }} />
            <div className="relative w-[220px] h-[280px] lg:w-[250px] lg:h-[320px] rounded-2xl overflow-hidden"
              style={{ border: `3px solid ${candidate.party.color}40`, boxShadow: `0 0 30px ${candidate.party.color}40` }}>
              <img src={candidatePhotoMap[candidate.id] || '/candidate-ind.jpg'} alt={candidate.name} className="w-full h-full object-cover" style={{ objectPosition: 'center 15%' }} />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="absolute -inset-2 rounded-2xl border-2 border-transparent border-t-[#F59E0B]/50 animate-[spin_4s_linear_infinite]" />
          </div>

          {/* Party badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl mb-2 font-black text-xs tracking-wider"
            style={{ backgroundColor: `${candidate.party.color}15`, border: `2px solid ${candidate.party.color}40`, color: candidate.party.color }}>
            <span className="w-6 h-5 rounded flex items-center justify-center text-[8px] font-black text-white" style={{ backgroundColor: candidate.party.color }}>
              {candidate.party.shortName}
            </span>
            <span>{candidate.party.shortName}</span>
          </div>

          <h2 className={`text-xl lg:text-2xl font-black text-center tracking-tight mb-1 ${candidate.isLeading ? 'text-gradient-gold' : 'text-white/90'}`}>
            {candidate.name}
          </h2>
          <span className="text-xs text-[#A0A0B8] font-medium text-center">{candidate.party.name}</span>

          {/* Running mate */}
          {candidate.runningMate && (
            <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141420] border border-[#2A2A3E]">
              {candidate.runningMatePhoto && (
                <img src={candidate.runningMatePhoto} alt={candidate.runningMate} className="w-8 h-8 rounded-full object-cover border border-[#2A2A3E]" />
              )}
              <div>
                <div className="text-[9px] text-[#6B6B80] uppercase tracking-wider">Running Mate</div>
                <div className="text-xs text-white font-semibold">{candidate.runningMate}</div>
              </div>
            </div>
          )}
        </motion.div>

        {/* RIGHT: Data panel — phases cycle here, photo stays */}
        <div ref={dataRef} className="flex-1 flex flex-col justify-center min-w-0 relative h-full">
          <AnimatePresence mode="wait">
            {/* === PHASE 0: Profile & Bio (8s) === */}
            {phase === 0 && (
              <motion.div key={`${candidate.id}-bio`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }} className="space-y-5">
                {candidate.isLeading && (
                  <div className="phase-reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                    <span className="text-xs font-bold text-[#F59E0B] tracking-wider uppercase">Currently Leading</span>
                  </div>
                )}
                {/* Bio */}
                <div className="phase-reveal glass-card rounded-xl p-5">
                  <div className="text-xs text-[#6B6B80] tracking-[0.2em] uppercase font-semibold mb-2">About the Candidate</div>
                  <p className="text-sm text-[#A0A0B8] leading-relaxed">{candidate.bio}</p>
                </div>
                {/* Alliance */}
                {candidate.party.alliance && (
                  <div className="phase-reveal glass-card rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                      <span className="text-lg">🤝</span>
                    </div>
                    <div>
                      <div className="text-xs text-[#6B6B80]">Coalition / Alliance</div>
                      <div className="text-sm font-bold text-[#F59E0B]">{candidate.party.alliance}</div>
                    </div>
                  </div>
                )}
                {/* Quick stats */}
                <div className="phase-reveal grid grid-cols-3 gap-3">
                  <div className="glass-card rounded-xl p-3 text-center">
                    <div className="text-xs text-[#6B6B80] mb-1">Vote Share</div>
                    <div className="font-mono text-2xl font-bold text-white">{candidate.percentage.toFixed(1)}%</div>
                  </div>
                  <div className="glass-card rounded-xl p-3 text-center">
                    <div className="text-xs text-[#6B6B80] mb-1">Votes Cast</div>
                    <div className="font-mono text-2xl font-bold text-white">{(candidate.votes / 1000).toFixed(0)}K</div>
                  </div>
                  <div className="glass-card rounded-xl p-3 text-center">
                    <div className="text-xs text-[#6B6B80] mb-1">Provinces Leading</div>
                    <div className="font-mono text-2xl font-bold text-white">{candidate.provincialBreakdown.filter(p => p.percentage > 40).length}/10</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* === PHASE 1: National Results (8s) === */}
            {phase === 1 && (
              <motion.div key={`${candidate.id}-totals`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }} className="space-y-5">
                {/* Total votes */}
                <div className="phase-reveal">
                  <div className="text-xs text-[#6B6B80] tracking-[0.2em] uppercase font-semibold mb-2">Total Votes Received</div>
                  <div className={`font-mono text-5xl lg:text-6xl font-bold ${candidate.isLeading ? 'text-gradient-gold' : 'text-white'}`}>
                    <CountUp target={candidate.votes} duration={2} />
                  </div>
                </div>
                {/* Vote share with bar */}
                <div className="phase-reveal">
                  <div className="text-xs text-[#6B6B80] tracking-[0.2em] uppercase font-semibold mb-2">National Vote Share</div>
                  <div className="flex items-center gap-5">
                    <div className="font-mono text-4xl lg:text-5xl font-bold text-white">
                      <CountUp target={candidate.percentage} duration={2} decimals={2} suffix="%" />
                    </div>
                    <div className="flex-1 max-w-[320px]">
                      <div className="h-5 bg-[#1A1A24] rounded-full overflow-hidden">
                        <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${candidate.party.color}, ${candidate.party.color}cc)` }}
                          initial={{ width: 0 }} animate={{ width: `${candidate.percentage}%` }} transition={{ duration: 1.5, ease: [0.32, 0.72, 0, 1], delay: 0.3 }} />
                      </div>
                      <div className="flex justify-between mt-1"><span className="text-[10px] text-[#6B6B80]">0%</span><span className="text-[10px] text-[#6B6B80]">50%</span><span className="text-[10px] text-[#6B6B80]">100%</span></div>
                    </div>
                  </div>
                </div>
                {/* Head to head comparison - ALL candidates */}
                <div className="phase-reveal glass-card rounded-xl p-5">
                  <div className="text-xs text-[#6B6B80] tracking-wider uppercase font-semibold mb-3">Full Candidate Rankings</div>
                  <div className="space-y-2.5">
                    {candidates.map((c, i) => (
                      <div key={c.id} className={`flex items-center gap-3 ${c.id === candidate.id ? 'opacity-100' : 'opacity-70'}`}>
                        <span className="font-mono text-xs text-[#6B6B80] w-4">{i + 1}</span>
                        <span className="w-10 h-6 rounded flex items-center justify-center text-[8px] font-black text-white shrink-0" style={{ backgroundColor: c.party.color }}>{c.party.shortName}</span>
                        <span className="text-xs text-[#A0A0B8] w-24 truncate">{c.name.split(' ').slice(-1)}</span>
                        <div className="flex-1 h-5 bg-[#1A1A24] rounded-lg overflow-hidden relative">
                          <motion.div className="h-full rounded-lg" style={{ background: `linear-gradient(90deg, ${c.party.color}, ${c.party.color}bb)` }}
                            initial={{ width: 0 }} animate={{ width: `${(c.votes / candidates[0].votes) * 100}%` }} transition={{ duration: 1, delay: i * 0.1 }} />
                        </div>
                        <span className="font-mono text-xs font-bold text-white w-12 text-right">{c.percentage.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* === PHASE 2: Provincial Breakdown - ALL 10 PROVINCES (14s) === */}
            {phase === 2 && (
              <motion.div key={`${candidate.id}-provinces`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }} className="space-y-3">
                <div className="phase-reveal flex items-center justify-between">
                  <div className="text-xs text-[#6B6B80] tracking-[0.2em] uppercase font-semibold">Provincial Breakdown — All 10 Provinces</div>
                  <div className="text-xs text-[#F59E0B] font-mono">Sorted by Vote Share</div>
                </div>
                <div className="space-y-2 max-h-[340px] overflow-y-auto no-scrollbar">
                  {allProvinces.map((prov, i) => (
                    <motion.div key={prov.provinceCode} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: i * 0.08 }}
                      className="phase-reveal flex items-center gap-3">
                      <div className="w-9 h-7 rounded-md flex items-center justify-center text-[10px] font-bold font-mono shrink-0"
                        style={{ backgroundColor: `${candidate.party.color}15`, color: candidate.party.color, border: `1px solid ${candidate.party.color}25` }}>
                        {prov.provinceCode}
                      </div>
                      <span className="text-xs text-[#A0A0B8] w-24 shrink-0 truncate">{prov.province}</span>
                      <div className="flex-1 h-6 bg-[#141420] rounded-lg overflow-hidden relative">
                        <motion.div className="h-full rounded-lg relative" style={{ background: `linear-gradient(90deg, ${candidate.party.color}70, ${candidate.party.color})` }}
                          initial={{ width: 0 }} animate={{ width: `${prov.percentage}%` }} transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: i * 0.06 }}>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                        </motion.div>
                      </div>
                      <span className="font-mono text-xs font-bold text-white w-10 text-right shrink-0">{prov.percentage.toFixed(1)}%</span>
                      <span className="font-mono text-[10px] text-[#6B6B80] w-14 text-right shrink-0">{(prov.votes / 1000).toFixed(1)}K</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* === PHASE 3: Detailed Analysis (8s) === */}
            {phase === 3 && (
              <motion.div key={`${candidate.id}-stats`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }} className="space-y-4">
                {/* Alliance info */}
                {candidate.party.alliance && (
                  <div className="phase-reveal glass-card rounded-xl p-4">
                    <div className="text-xs text-[#6B6B80] tracking-wider uppercase font-semibold mb-2">Alliance / Coalition</div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-[#F59E0B]/10">🤝</div>
                      <div>
                        <div className="text-lg font-bold text-[#F59E0B]">{candidate.party.alliance}</div>
                        <div className="text-xs text-[#6B6B80]">Coalition backing this candidate</div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Key metrics grid */}
                <div className="phase-reveal grid grid-cols-2 gap-3">
                  <div className="glass-card rounded-xl p-4">
                    <div className="text-xs text-[#6B6B80] mb-1">Strongest Province</div>
                    <div className="text-lg font-bold text-white">{allProvinces[0].province}</div>
                    <div className="font-mono text-sm" style={{ color: candidate.party.color }}>{allProvinces[0].percentage.toFixed(1)}%</div>
                  </div>
                  <div className="glass-card rounded-xl p-4">
                    <div className="text-xs text-[#6B6B80] mb-1">Votes in Strongest</div>
                    <div className="font-mono text-lg font-bold text-white">{allProvinces[0].votes.toLocaleString()}</div>
                  </div>
                  <div className="glass-card rounded-xl p-4">
                    <div className="text-xs text-[#6B6B80] mb-1">Provinces &gt; 50%</div>
                    <div className="font-mono text-2xl font-bold text-white">{candidate.provincialBreakdown.filter(p => p.percentage > 50).length}<span className="text-sm text-[#6B6B80]">/10</span></div>
                  </div>
                  <div className="glass-card rounded-xl p-4">
                    <div className="text-xs text-[#6B6B80] mb-1">Avg. Provincial Share</div>
                    <div className="font-mono text-2xl font-bold text-white">
                      {(candidate.provincialBreakdown.reduce((s, p) => s + p.percentage, 0) / 10).toFixed(1)}%
                    </div>
                  </div>
                </div>
                {/* Comparison with leader */}
                {!candidate.isLeading && (
                  <div className="phase-reveal glass-card rounded-xl p-4">
                    <div className="text-xs text-[#6B6B80] tracking-wider uppercase font-semibold mb-2">Gap to Leader ({top2Candidates[0].name.split(' ').slice(-1)})</div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-6 bg-[#1A1A24] rounded-lg overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full rounded-l-lg" style={{ width: `${(candidate.votes / top2Candidates[0].votes) * 100}%`, background: `linear-gradient(90deg, ${candidate.party.color}, ${candidate.party.color}80)` }} />
                        <div className="absolute top-0 left-0 h-full w-full rounded-lg border-r-2 border-dashed border-[#F59E0B]" style={{ width: '100%' }} />
                      </div>
                      <span className="font-mono text-sm font-bold text-[#F59E0B]">+{((top2Candidates[0].percentage - candidate.percentage)).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-[#6B6B80]">{candidate.party.shortName}: {candidate.votes.toLocaleString()}</span>
                      <span className="text-[10px] text-[#6B6B80]">{top2Candidates[0].party.shortName}: {top2Candidates[0].votes.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="relative z-10 glass-panel mx-6 mb-3 rounded-xl px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#6B6B80] tracking-wider">TOTAL VOTES CAST</span>
          <span className="font-mono text-lg font-bold text-[#F59E0B]">{totalVotes.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-4">
          {candidates.slice(0, 5).map((c) => (
            <div key={c.id} className={`flex items-center gap-1.5 ${c.id === candidate.id ? 'opacity-100' : 'opacity-60'}`}>
              <span className="w-7 h-4 rounded flex items-center justify-center text-[7px] font-black text-white" style={{ backgroundColor: c.party.color }}>{c.party.shortName}</span>
              <span className="font-mono text-xs font-bold text-white">{c.percentage.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
