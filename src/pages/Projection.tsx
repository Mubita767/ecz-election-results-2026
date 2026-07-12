import { useEffect, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { Maximize2, Minimize2, Monitor, Play } from 'lucide-react';
import { useStore } from '../store/useStore';
import GlowBar from '../components/GlowBar';
import LiveTicker from '../components/LiveTicker';
import OpeningMontage from '../components/OpeningMontage';
import CandidateShowcase from '../projection-screens/CandidateShowcase';
import ResultsBreakdown from '../projection-screens/ResultsBreakdown';
import SeatAllocation from '../projection-screens/SeatAllocation';
import ProvincialMapScreen from '../projection-screens/ProvincialMapScreen';
import TurnoutStats from '../projection-screens/TurnoutStats';
import ConstituencyTicker from '../projection-screens/ConstituencyTicker';

// Simple transition montage between screen cycles
function TransitionMontage({ onComplete }: { onComplete: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete });
      tl.fromTo('.trans-particle', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: 'back.out' });
      tl.fromTo('.trans-text', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5');
      tl.fromTo('.trans-line', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3');
      tl.to(ref.current, { opacity: 0, duration: 0.5, delay: 2.5 });
    }, ref);
    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={ref} className="absolute inset-0 z-40 bg-[#08080F] flex flex-col items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="trans-particle absolute rounded-full opacity-0"
            style={{
              width: `${Math.random() * 6 + 2}px`, height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              backgroundColor: ['#DC2626', '#F59E0B', '#1B5E20', '#EA580C'][i % 4],
            }}
          />
        ))}
      </div>
      <div className="trans-line w-32 h-0.5 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent mb-6" style={{ transformOrigin: 'center' }} />
      <div className="trans-text text-2xl font-black tracking-[0.3em] text-gradient-gold opacity-0">ECZ ELECTIONS 2026</div>
      <div className="trans-text text-sm text-[#6B6B80] tracking-wider mt-3 opacity-0">CONTINUING COVERAGE</div>
      <div className="trans-line w-32 h-0.5 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent mt-6" style={{ transformOrigin: 'center' }} />
    </div>
  );
}

// Entry overlay to trigger fullscreen via user gesture
function EntryOverlay({ onStart }: { onStart: () => void }) {
  return (
    <div className="absolute inset-0 z-50 bg-[#030305] flex flex-col items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.08]" style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 60%)', animation: 'pulse-orb 10s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #DC2626 0%, transparent 60%)', animation: 'pulse-orb 14s ease-in-out infinite 3s' }} />
      </div>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, #030305 80%)' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <img src="/ecz-logo.png" alt="ECZ" className="w-24 h-24 object-contain mb-6" style={{ filter: 'drop-shadow(0 0 30px rgba(245,158,11,0.4))' }} />
        <div className="text-sm tracking-[0.4em] text-[#6B6B80] uppercase mb-3">Electoral Commission of Zambia</div>
        <div className="text-4xl md:text-5xl font-black text-gradient-gold tracking-wider mb-2">ELECTION RESULTS 2026</div>
        <div className="text-base text-[#A0A0B8] tracking-wider mb-10">National Results Centre &middot; Live Projection</div>

        <button
          onClick={onStart}
          className="group relative flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#F59E0B] to-[#DC2626] rounded-xl text-black font-black text-lg tracking-wider hover:scale-105 transition-transform duration-300 cursor-pointer"
          style={{ boxShadow: '0 0 40px rgba(245,158,11,0.4), 0 0 80px rgba(220,38,38,0.2)' }}
        >
          <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
          START PROJECTION
        </button>

        <div className="mt-6 flex items-center gap-2 text-[#6B6B80] text-sm">
          <Monitor className="w-4 h-4" />
          <span>Click to enter fullscreen projection mode</span>
        </div>

        <div className="absolute bottom-6 text-[11px] text-[#6B6B80]/50 tracking-wider">
          Developed by <span className="text-[#F59E0B]/70">Mupo Mubita</span> · mubitamupo@outlook.com · +260760457622
        </div>
      </div>

      <style>{`@keyframes pulse-orb { 0%,100% { transform: scale(1); opacity: 0.06; } 50% { transform: scale(1.3); opacity: 0.1; } }`}</style>
    </div>
  );
}

export default function Projection() {
  const { currentScreen, isAutoCycling, cycleInterval, nextScreen, setAutoCycling } = useStore();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showMontage, setShowMontage] = useState(true);
  const [showTransition, setShowTransition] = useState(false);
  const [mode, setMode] = useState<'candidates' | 'others'>('candidates');
  const cycleCountRef = useRef(0);

  const renderScreen = () => {
    if (mode === 'candidates') return <CandidateShowcase />;
    switch (currentScreen) {
      case 'candidates': return <CandidateShowcase />;
      case 'results': return <ResultsBreakdown />;
      case 'seats': return <SeatAllocation />;
      case 'map': return <ProvincialMapScreen />;
      case 'turnout': return <TurnoutStats />;
      case 'constituencies': return <ConstituencyTicker />;
      default: return <ResultsBreakdown />;
    }
  };

  // Track fullscreen changes
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // Handle user-gesture-initiated start
  const handleStart = useCallback(() => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
    setHasStarted(true);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }, []);

  // Handle opening montage completion → start candidates mode
  const handleMontageComplete = useCallback(() => {
    setShowMontage(false);
    setMode('candidates');
    // After ~200s (all 5 candidates × ~38s each), switch to others
    setTimeout(() => {
      setMode('others');
    }, 200000);
  }, []);

  // Handle transition completion
  const handleTransitionComplete = useCallback(() => {
    setShowTransition(false);
    setMode('candidates');
    // After candidates cycle, show transition and go to others
    setTimeout(() => {
      setShowTransition(true);
    }, 200000);
  }, []);

  // Other screens cycling (only when mode === 'others')
  useEffect(() => {
    if (!isAutoCycling || showMontage || showTransition || mode !== 'others') return;
    const timer = setInterval(() => {
      cycleCountRef.current += 1;
      // After cycling through 5 other screens, show transition and go back to candidates
      if (cycleCountRef.current % 5 === 0) {
        setAutoCycling(false);
        setShowTransition(true);
      }
      nextScreen();
    }, cycleInterval * 1000);
    return () => clearInterval(timer);
  }, [isAutoCycling, cycleInterval, nextScreen, showMontage, showTransition, mode, setAutoCycling]);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#08080F]">
      {!hasStarted ? (
        <EntryOverlay onStart={handleStart} />
      ) : (
        <>
          <GlowBar />
          <div className="flex-1 relative overflow-hidden">
            {/* Opening Montage */}
            {showMontage && <OpeningMontage onComplete={handleMontageComplete} />}

            {/* Transition Montage */}
            {showTransition && <TransitionMontage onComplete={handleTransitionComplete} />}

            {/* Main content */}
            {!showMontage && !showTransition && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${mode}-${currentScreen}`}
                  initial={{ opacity: 0, x: 100, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0"
                >
                  {renderScreen()}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          <LiveTicker />
          {/* Developer credit */}
          <div className="fixed bottom-4 left-4 z-50 text-[10px] text-[#6B6B80]/60">
            Mupo Mubita · mubitamupo@outlook.com · +260760457622
          </div>

          {/* Fullscreen toggle button */}
          <button
            onClick={toggleFullscreen}
            className="fixed bottom-4 right-4 z-50 p-2 bg-[#141420]/80 border border-[#2A2A3E] rounded-lg text-[#6B6B80] hover:text-white hover:border-[#F59E0B] transition-colors"
            title="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </>
      )}
    </div>
  );
}
