import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { BarChart3, Map, Users, Vote, TrendingUp, ChevronRight, AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';
import GlowBar from '../components/GlowBar';
import LiveTicker from '../components/LiveTicker';
import RealZambiaMap from '../components/RealZambiaMap';
import CountUp from '../components/CountUp';
import ElectionTypeSwitcher from '../components/ElectionTypeSwitcher';
import ParliamentaryCard from '../components/ParliamentaryCard';
import CouncilorCard from '../components/CouncilorCard';
import MayoralCard from '../components/MayoralCard';
import { seatAllocations, stats } from '../data/mockData';
import type { Candidate } from '../types';

function CandidateAvatar({ candidate, size = 'md' }: { candidate: Candidate; size?: 'md' | 'lg' }) {
  const [imgError, setImgError] = useState(false);
  const dims = size === 'lg' ? 'w-20 h-20' : 'w-16 h-16';
  const textSize = size === 'lg' ? 'text-xl' : 'text-lg';

  if (!candidate.photo || imgError) {
    return (
      <div
        className={`${dims} rounded-full flex items-center justify-center ${textSize} font-black text-white border-2 shrink-0`}
        style={{
          borderColor: candidate.party.color,
          background: `radial-gradient(circle at 30% 30%, ${candidate.party.color}dd, ${candidate.party.color}88)`,
        }}
      >
        {candidate.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
      </div>
    );
  }

  return (
    <div
      className={`${dims} rounded-full overflow-hidden flex items-center justify-center border-2 shrink-0`}
      style={{ borderColor: candidate.party.color }}
    >
      <img
        src={candidate.photo}
        alt={candidate.name}
        className="w-full h-full object-cover"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

export default function Dashboard() {
  const { candidates, electionState, constituencies, provinces, electionType } = useStore();
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const leadingCandidate = candidates.find((c) => c.isLeading);
  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);

  // Mid-election stats
  const constituenciesCounting = constituencies.filter((c) => c.status === 'counting').length;
  const constituenciesPending = constituencies.filter((c) => c.status === 'pending').length;
  const constituenciesDeclared = constituencies.filter((c) => c.status === 'declared').length;

  useEffect(() => {
    if (!statsRef.current) return;
    const cards = statsRef.current.querySelectorAll('.stat-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll('.candidate-dash-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.3 }
    );
  }, [electionType]);

  return (
    <div className="min-h-screen bg-[#08080F] flex flex-col">
      <GlowBar />

      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-black tracking-wider text-white">ECZ Results Dashboard</h1>
              <p className="text-xs text-[#6B6B80] mt-1">Presidential & Parliamentary Elections 2026</p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/projection"
                className="flex items-center gap-2 px-4 py-2 bg-[#141420] border border-[#2A2A3E] rounded-lg text-sm font-semibold text-[#A0A0B8] hover:border-[#F59E0B] hover:text-white transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                Projection
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/control"
                className="flex items-center gap-2 px-4 py-2 bg-[#F59E0B] rounded-lg text-sm font-bold text-black hover:bg-[#fbbf24] transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                Control Panel
              </Link>
            </div>
          </div>

          {/* Election Type Switcher */}
          <ElectionTypeSwitcher />

          {/* Mid-Election Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mid-election-banner rounded-xl px-6 py-3 mb-6 flex items-center gap-4"
          >
            <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0" />
            <div className="flex-1">
              <span className="text-sm font-bold text-[#F59E0B] tracking-wider uppercase">
                RESULTS IN PROGRESS — NO WINNER DECLARED
              </span>
              <span className="text-xs text-[#A0A0B8] ml-3">
                {electionState.constituenciesReported} of {electionState.constituenciesTotal} constituencies reporting
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
              <span className="text-xs font-mono text-[#A0A0B8]">{constituenciesDeclared} declared</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
              <span className="text-xs font-mono text-[#A0A0B8]">{constituenciesCounting} counting</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6B7280]" />
              <span className="text-xs font-mono text-[#A0A0B8]">{constituenciesPending} pending</span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="stat-card glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-[#F59E0B]" />
                <span className="text-xs text-[#6B6B80] uppercase tracking-wider">Turnout</span>
              </div>
              <div className="font-mono text-2xl font-bold text-[#F59E0B]">
                <CountUp target={electionState.nationalTurnout} decimals={1} suffix="%" />
              </div>
            </div>

            <div className="stat-card glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Vote className="w-4 h-4 text-[#DC2626]" />
                <span className="text-xs text-[#6B6B80] uppercase tracking-wider">Votes Cast</span>
              </div>
              <div className="font-mono text-2xl font-bold text-white">
                <CountUp target={electionState.totalVotesCast} />
              </div>
            </div>

            <div className="stat-card glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Map className="w-4 h-4 text-[#059669]" />
                <span className="text-xs text-[#6B6B80] uppercase tracking-wider">Constituencies</span>
              </div>
              <div className="font-mono text-2xl font-bold text-white">
                <CountUp target={electionState.constituenciesReported} />/<CountUp target={electionState.constituenciesTotal} />
              </div>
            </div>

            <div className="stat-card glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#7C3AED]" />
                <span className="text-xs text-[#6B6B80] uppercase tracking-wider">Currently Leading</span>
              </div>
              <div className="font-mono text-lg font-bold text-[#DC2626] truncate">
                {leadingCandidate ? leadingCandidate.name.split(' ').slice(1).join(' ') : '—'}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-xl p-4 mb-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#6B6B80] uppercase tracking-wider">Results Reporting Progress</span>
              <span className="font-mono text-sm text-[#F59E0B] font-bold">
                {((electionState.constituenciesReported / electionState.constituenciesTotal) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full h-3 bg-[#0E0E16] rounded-full overflow-hidden flex">
              <motion.div
                className="h-full bg-[#059669]"
                initial={{ width: 0 }}
                animate={{ width: `${(constituenciesDeclared / electionState.constituenciesTotal) * 100}%` }}
                transition={{ duration: 1.5, ease: [0.32, 0.72, 0, 1] }}
              />
              <motion.div
                className="h-full bg-[#F59E0B]"
                initial={{ width: 0 }}
                animate={{ width: `${(constituenciesCounting / electionState.constituenciesTotal) * 100}%` }}
                transition={{ duration: 1.5, ease: [0.32, 0.72, 0, 1], delay: 0.3 }}
              />
              <motion.div
                className="h-full bg-[#6B7280]"
                initial={{ width: 0 }}
                animate={{ width: `${(constituenciesPending / electionState.constituenciesTotal) * 100}%` }}
                transition={{ duration: 1.5, ease: [0.32, 0.72, 0, 1], delay: 0.6 }}
              />
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs">
              <span className="flex items-center gap-1 text-[#6B6B80]">
                <span className="w-2 h-2 rounded-full bg-[#059669]" />
                Declared: {constituenciesDeclared}
              </span>
              <span className="flex items-center gap-1 text-[#6B6B80]">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                Counting: {constituenciesCounting}
              </span>
              <span className="flex items-center gap-1 text-[#6B6B80]">
                <span className="w-2 h-2 rounded-full bg-[#6B7280]" />
                Pending: {constituenciesPending}
              </span>
            </div>
          </motion.div>

          {/* Election-Type-Specific Content */}
          {electionType === 'presidential' && (
            <>
              {/* All 5 Candidate Cards */}
              <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                {sortedCandidates.map((candidate) => (
                  <motion.div
                    key={candidate.id}
                    className={`candidate-dash-card glass-card p-4 flex flex-col items-center text-center relative ${
                      candidate.isLeading ? 'ring-2 ring-[#F59E0B]/60' : ''
                    }`}
                    whileHover={{ scale: 1.03 }}
                  >
                    {candidate.isLeading && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/40">
                        <span className="text-[8px] font-black text-[#F59E0B] tracking-wider">LEADING</span>
                      </div>
                    )}
                    <div className="mb-3">
                      <CandidateAvatar candidate={candidate} />
                    </div>
                    <h3 className="text-xs font-bold text-white mb-0.5 truncate w-full">{candidate.name}</h3>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded mb-2"
                      style={{
                        backgroundColor: `${candidate.party.color}22`,
                        color: candidate.party.color,
                        border: `1px solid ${candidate.party.color}33`,
                      }}
                    >
                      {candidate.party.shortName}
                    </span>
                    <div className="font-mono text-lg font-bold text-white">
                      <CountUp target={candidate.votes} />
                    </div>
                    <div className="font-mono text-xs text-[#6B6B80]">
                      {candidate.percentage.toFixed(1)}%
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Main Content: Map + Seat Allocation + Leading Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Map */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="lg:col-span-2 glass-panel rounded-2xl p-4 min-h-[400px]"
                >
                  <h3 className="text-sm font-bold tracking-wider text-[#A0A0B8] mb-2 uppercase">
                    Provincial Map
                  </h3>
                  <div className="h-[360px]">
                    <RealZambiaMap className="w-full h-full" />
                  </div>
                </motion.div>

                {/* Leading Candidate Mini Panel */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card p-6 flex flex-col"
                >
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-full mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                      <span className="text-[#F59E0B] text-xs font-black tracking-wider">CURRENTLY LEADING</span>
                    </div>

                    {leadingCandidate && (
                      <>
                        <div className="mx-auto mb-3">
                          <CandidateAvatar candidate={leadingCandidate} size="lg" />
                        </div>

                        <h2 className="text-lg font-black text-[#F59E0B] glow-gold mb-1">
                          {leadingCandidate.name}
                        </h2>
                        <p className="text-xs text-[#A0A0B8] mb-4">{leadingCandidate.party.name}</p>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-[#0E0E16]/50 rounded-lg p-3">
                            <div className="font-mono text-lg font-bold text-white">
                              <CountUp target={leadingCandidate.votes} />
                            </div>
                            <div className="text-[10px] text-[#6B6B80] uppercase">Votes</div>
                          </div>
                          <div className="bg-[#0E0E16]/50 rounded-lg p-3">
                            <div className="font-mono text-lg font-bold text-white">
                              <CountUp target={leadingCandidate.percentage} decimals={1} suffix="%" />
                            </div>
                            <div className="text-[10px] text-[#6B6B80] uppercase">Share</div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Runner up */}
                  {sortedCandidates[1] && (
                    <div className="mt-auto pt-4 border-t border-[#2A2A3E]/50">
                      <div className="text-[10px] text-[#6B6B80] uppercase tracking-wider mb-2">Second Place</div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{ backgroundColor: sortedCandidates[1].party.color }}
                          >
                            {sortedCandidates[1].party.shortName.slice(0, 2)}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">{sortedCandidates[1].name}</div>
                            <div className="text-[10px] text-[#6B6B80]">{sortedCandidates[1].party.shortName}</div>
                          </div>
                        </div>
                        <div className="font-mono text-sm font-bold text-[#A0A0B8]">
                          {sortedCandidates[1].percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Seat allocation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 glass-panel rounded-2xl p-6"
              >
                <h3 className="text-sm font-bold tracking-wider text-[#A0A0B8] mb-4 uppercase">
                  Seat Allocation (Mid-Election)
                </h3>
                <div className="space-y-4">
                  {seatAllocations.map((sa) => (
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
                          animate={{ width: `${(sa.seats / stats.totalSeats) * 100}%` }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                      <span className="font-mono text-sm font-bold w-8 text-right" style={{ color: sa.partyColor }}>
                        {sa.seats}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}

          {electionType === 'parliamentary' && <ParliamentaryCard />}
          {electionType === 'councilor' && <CouncilorCard />}
          {electionType === 'mayoral' && <MayoralCard />}
        </div>
      </div>

      {/* Developer Footer */}
      <div className="mt-8 border-t border-[#2A2A3E] pt-6 pb-6 text-center">
        <p className="text-sm text-[#6B6B80]">
          Developed by <span className="text-[#F59E0B] font-bold">Mupo Mubita</span> · mubitamupo@outlook.com · WhatsApp +260760457622
        </p>
        <p className="text-xs text-[#6B6B80] mt-1">
          ECZ Election Results Visualization System v1.0 · All Rights Reserved
        </p>
      </div>

      <LiveTicker />
    </div>
  );
}
