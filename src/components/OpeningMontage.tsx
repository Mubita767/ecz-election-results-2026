import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface OpeningMontageProps {
  onComplete: () => void;
}

const candidates = [
  { name: 'Hakainde Hichilema', party: 'UPND', color: '#DC2626', photo: '/candidate-hh.jpg', mate: 'Mutale Nalumango', tagline: 'Incumbent President \u00b7 UPND Alliance' },
  { name: 'Brian Mundubile', party: 'NRPUP', color: '#1B5E20', photo: '/candidate-bm.jpg', mate: 'Makebi Zulu', tagline: 'Leader of the Opposition \u00b7 NRPUP' },
  { name: "Fred M'membe", party: 'SP', color: '#EA580C', photo: '/candidate-fm.jpg', mate: '', tagline: 'Socialist Party \u00b7 Media Veteran' },
  { name: 'Harry Kalaba', party: 'CF', color: '#F59E0B', photo: '/candidate-hk.jpg', mate: '', tagline: 'Citizens First \u00b7 Former Minister' },
  { name: 'Given Katuta', party: 'IND', color: '#6B7280', photo: '/candidate-gk.jpg', mate: '', tagline: 'Independent \u00b7 Chiengi MP' },
];

// Generate random data stream characters

export default function OpeningMontage({ onComplete }: OpeningMontageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onUpdate: () => setProgress(tl.progress() * 100),
        onComplete: () => {
          gsap.to(containerRef.current, { opacity: 0, duration: 1.2, ease: 'power2.inOut', onComplete });
        },
      });

      // === UTILITY: Flash transition between scenes ===
      const flashTransition = () => {
        tl.fromTo('.flash-transition', { opacity: 0 }, { opacity: 0.8, duration: 0.1, ease: 'power2.out' });
        tl.to('.flash-transition', { opacity: 0, duration: 0.2, ease: 'power2.in' });
      };

      // === SCENE 1: ECZ Logo - Massive with burst (0-8s) ===
      tl.set('.scene-ecz', { opacity: 1 });
      tl.fromTo('.ecz-bg-glow', { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 2.5, ease: 'power2.out' });
      tl.fromTo('.ecz-logo-img', { scale: 5, opacity: 0, z: -800 }, { scale: 1, opacity: 1, z: 0, duration: 2, ease: 'power3.out' }, 0.3);
      tl.fromTo('.ecz-ring1', { scale: 0, opacity: 0 }, { scale: 1.8, opacity: 0.4, duration: 2, ease: 'power2.out' }, 0.5);
      tl.fromTo('.ecz-ring2', { scale: 0, opacity: 0 }, { scale: 2.2, opacity: 0.2, duration: 2.5, ease: 'power2.out' }, 0.7);
      tl.fromTo('.burst-dot', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.015, ease: 'back.out(4)' }, 1.5);
      tl.to('.burst-dot', { scale: 0, opacity: 0, duration: 0.3, stagger: 0.01 }, 3);
      tl.fromTo('.ecz-name span', { opacity: 0, y: 30, rotationX: -90 }, { opacity: 1, y: 0, rotationX: 0, duration: 0.12, stagger: 0.06, ease: 'back.out(2)' }, 2);
      tl.fromTo('.ecz-fullname', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, 3.5);
      tl.to('.ecz-logo-img', { y: -8, duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 4);
      tl.to('.scene-ecz', { opacity: 0, scale: 1.15, duration: 1, ease: 'power2.in' }, '+=1');
      flashTransition();

      // === SCENE 2: Title reveal (8-18s) ===
      tl.fromTo('.scene-title', { opacity: 0 }, { opacity: 1, duration: 0.3 });
      tl.fromTo('.title-letter', { opacity: 0, y: 120, rotationX: -90 }, { opacity: 1, y: 0, rotationX: 0, duration: 0.1, stagger: 0.035, ease: 'back.out(2)' });
      tl.fromTo('.title-sweep', { x: '-120%', opacity: 0.6 }, { x: '250%', opacity: 0, duration: 1.8, ease: 'power2.inOut' }, '-=0.3');
      tl.fromTo('.title-year', { scale: 0, opacity: 0, rotationY: -180 }, { scale: 1, opacity: 1, rotationY: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, '-=0.8');
      tl.fromTo('.title-date', { opacity: 0, letterSpacing: '1em' }, { opacity: 1, letterSpacing: '0.3em', duration: 1 }, '-=0.5');
      tl.to('.scene-title', { opacity: 0, y: -40, duration: 1, ease: 'power2.in' }, '+=2');
      flashTransition();

      // === SCENE 3: Coat of Arms - dramatic (18-30s) ===
      tl.fromTo('.scene-coat', { opacity: 0 }, { opacity: 1, duration: 0.3 });
      tl.fromTo('.coat-glow1', { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1.3, duration: 3, ease: 'power2.out' }, 0);
      tl.fromTo('.coat-glow2', { opacity: 0, scale: 0.3 }, { opacity: 0.8, scale: 1, duration: 2.5, ease: 'power2.out' }, 0.3);
      tl.fromTo('.coat-ring', { opacity: 0, scale: 0.5, rotation: 0 }, { opacity: 0.5, scale: 1, rotation: 360, duration: 3, ease: 'power2.out' }, 0.5);
      tl.fromTo('.coat-img', { scale: 0.05, opacity: 0, rotationY: -360 }, { scale: 1, opacity: 1, rotationY: 0, duration: 2.5, ease: 'back.out(1)' }, 0.3);
      tl.fromTo('.coat-star', { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.9, duration: 0.5, stagger: 0.05, ease: 'back.out(3)' }, 1.8);
      tl.to('.coat-img', { scale: 1.05, duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 3 }, 2.5);
      tl.fromTo('.coat-shimmer', { x: '-120%', opacity: 0 }, { x: '250%', opacity: 0.7, duration: 2, ease: 'power2.inOut' }, 3);
      tl.fromTo('.coat-motto', { opacity: 0, y: 30, letterSpacing: '0.8em' }, { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 1.2, ease: 'power3.out' }, 3.5);
      tl.to('.scene-coat', { opacity: 0, scale: 1.08, duration: 1, ease: 'power2.in' }, '+=2.5');
      flashTransition();

      // === SCENE 4: DRAMATIC CANDIDATE SPOTLIGHTS (30-55s) ===
      tl.fromTo('.scene-candidates', { opacity: 1 }, { opacity: 1, duration: 0.1 });

      // INTRO TITLE
      tl.fromTo('.cand-intro-line', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.out' });
      tl.fromTo('.cand-intro-text', { opacity: 0, y: 40, letterSpacing: '1em' }, { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 1, ease: 'power3.out' }, '-=0.5');
      tl.fromTo('.cand-intro-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
      tl.to('.cand-intro-text, .cand-intro-sub, .cand-intro-line', { opacity: 0, y: -30, duration: 0.5, stagger: 0.05, ease: 'power2.in' }, '+=1.2');

      // CANDIDATE SPOTLIGHTS — each with enhanced effects
      candidates.forEach((c, i) => {
        // Background color wash
        tl.fromTo(`.spot-${i}-bg`, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' });
        // Hex grid fades in
        tl.fromTo(`.spot-${i}-hexgrid`, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, '<');
        // God rays fade in and rotate
        tl.fromTo(`.spot-${i}-godrays`, { opacity: 0, rotation: -10 }, { opacity: 1, rotation: 0, duration: 1.5, ease: 'power2.out' }, '<0.1');
        // Photo enters
        const photoAnims: Record<number, object> = {
          0: { x: '-120%', opacity: 0, scale: 0.7 },
          1: { scale: 0.1, opacity: 0, rotation: -15 },
          2: { y: '100%', opacity: 0, rotationX: 90 },
          3: { x: '120%', opacity: 0, scale: 0.7 },
          4: { opacity: 0, scale: 1.3, filter: 'blur(20px)' },
        };
        const photoTargets: Record<number, object> = {
          0: { x: '0%', opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
          1: { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.6)' },
          2: { y: '0%', opacity: 1, rotationX: 0, duration: 1.2, ease: 'power3.out' },
          3: { x: '0%', opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
          4: { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' },
        };
        tl.fromTo(`.spot-${i}-photo`, photoAnims[i] || photoAnims[0], photoTargets[i] || photoTargets[0], '<0.1');
        // Ring
        tl.fromTo(`.spot-${i}-ring`, { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.3, duration: 1.2, ease: 'power2.out' }, '<');
        // Orbiting particles appear
        tl.fromTo(`.spot-${i}-orbit`, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.8');
        // Rotating seal spins in
        tl.fromTo(`.spot-${i}-seal`, { scale: 0, opacity: 0, rotation: -180 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: 'back.out(2)' }, '-=0.5');
        // Name letter-by-letter
        tl.fromTo(`.spot-${i}-letter`, { opacity: 0, y: 40, rotationX: -90 }, { opacity: 1, y: 0, rotationX: 0, duration: 0.06, stagger: 0.03, ease: 'back.out(2)' }, '-=0.4');
        // Party badge
        tl.fromTo(`.spot-${i}-party`, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(3)' }, '-=0.3');
        // Tagline fades up
        tl.fromTo(`.spot-${i}-tagline`, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
        // Decorative line
        tl.fromTo(`.spot-${i}-line`, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4');
        // Running mate (if present)
        if (c.mate) {
          tl.fromTo(`.spot-${i}-mate`, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
        }
        // Floating particles on right
        tl.fromTo(`.spot-${i}-float`, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.6');
        // Hold then exit all
        tl.to(`.spot-${i}-set`, { opacity: 0, duration: 0.6, ease: 'power2.in' }, '+=1.5');
        if (i < candidates.length - 1) {
          flashTransition();
        }
      });

      tl.to('.scene-candidates', { opacity: 0, duration: 0.3 });
      flashTransition();

      // === SCENE 5: LIVE — Dramatic Broadcast (48-55s) ===
      tl.fromTo('.scene-live', { opacity: 0 }, { opacity: 1, duration: 0.3 });
      // Digital grid fades in
      tl.fromTo('.live-grid', { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '<');
      // Data streams fade in
      tl.fromTo('.live-datastream', { opacity: 0 }, { opacity: 0.15, duration: 1, ease: 'power2.out' }, '<');
      // Ripples start expanding
      tl.fromTo('.live-ripple', { scale: 0, opacity: 0.6 }, { scale: 1, opacity: 0, duration: 2, stagger: 0.25, ease: 'power2.out' }, '<');
      // Light beam rays fade in
      tl.fromTo('.live-rays', { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, '<0.2');
      // Audio bars grow from bottom
      tl.fromTo('.live-bar', { scaleY: 0 }, { scaleY: 1, duration: 0.6, stagger: { each: 0.02, from: 'center' }, ease: 'back.out(2)' }, '-=0.6');
      // LIVE text enters with glitch
      tl.fromTo('.live-text', { scale: 0, opacity: 0, rotationY: -90 }, { scale: 1, opacity: 1, rotationY: 0, duration: 0.8, ease: 'back.out(2)' }, '-=0.4');
      // Subtitle lines
      tl.fromTo('.live-sub1', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
      tl.fromTo('.live-sub2', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');
      // Location crosshair
      tl.fromTo('.live-crosshair', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(3)' }, '-=0.4');
      // Hold with all continuous animations running
      tl.to({}, { duration: 2.5 });
      // Exit with zoom-out
      tl.to('.scene-live', { opacity: 0, scale: 1.3, duration: 0.8, ease: 'power2.in' });
      flashTransition();

      // === SCENE 6: Countdown (55-60s) ===
      tl.fromTo('.scene-count', { opacity: 0 }, { opacity: 1, duration: 0.2 });
      ['3', '2', '1'].forEach((n) => {
        tl.fromTo(`.count-${n}`, { scale: 6, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: 'power3.out' });
        tl.to(`.count-${n}`, { scale: 0.2, opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.5');
      });
      tl.to('.scene-count', { opacity: 0, duration: 0.3 });
      flashTransition();

      // === SCENE 7: Final (60-63s) ===
      tl.fromTo('.scene-final', { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' });
      tl.fromTo('.final-flash', { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'power2.out', yoyo: true, repeat: 2 }, '-=0.2');
      tl.to('.scene-final', { opacity: 0, duration: 0.6 }, '+=0.8');

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-50 bg-[#030305] overflow-hidden" style={{ perspective: '1000px' }}>
      {/* ============================ */}
      {/* GLOBAL OVERLAYS (all scenes) */}
      {/* ============================ */}

      {/* Scan lines */}
      <div className="global-scanlines absolute inset-0 pointer-events-none z-[100]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)',
          opacity: 0.5,
        }} />

      {/* Film grain */}
      <div className="global-grain absolute inset-0 pointer-events-none z-[100]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
          mixBlendMode: 'overlay',
          opacity: 0.25,
        }} />

      {/* Vignette */}
      <div className="global-vignette absolute inset-0 pointer-events-none z-[99]"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)' }} />

      {/* Flash transition overlay */}
      <div className="flash-transition absolute inset-0 bg-white opacity-0 pointer-events-none z-[98]" />

      {/* Deep background layers */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[900px] h-[900px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #DC2626 0%, transparent 60%)', animation: 'pulse-orb 12s ease-in-out infinite' }} />
        <div className="absolute bottom-0 right-1/3 w-[800px] h-[800px] rounded-full opacity-[0.08]" style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 60%)', animation: 'pulse-orb 15s ease-in-out infinite 4s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #1B5E20 0%, transparent 60%)', animation: 'pulse-orb 18s ease-in-out infinite 8s' }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[1400px] h-[1400px] opacity-[0.02]" style={{ background: 'repeating-conic-gradient(from 0deg, #F59E0B 0deg 1deg, transparent 1deg 10deg)', animation: 'spin-slow 80s linear infinite' }} />
      </div>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, #030305 80%)' }} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            backgroundColor: ['#F59E0B', '#DC2626', '#1B5E20', '#ffffff20'][i % 4],
            opacity: Math.random() * 0.5 + 0.05,
            animation: `float-particle ${Math.random() * 15 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }} />
        ))}
      </div>

      {/* === SCENE 1: ECZ Logo === */}
      <div className="scene-ecz absolute inset-0 flex flex-col items-center justify-center opacity-0">
        <div className="ecz-bg-glow absolute w-[600px] h-[600px] rounded-full opacity-0" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, rgba(220,38,38,0.1) 30%, transparent 60%)' }} />
        <div className="ecz-ring1 absolute w-[400px] h-[400px] rounded-full border-2 border-[#F59E0B]/20 opacity-0" />
        <div className="ecz-ring2 absolute w-[500px] h-[500px] rounded-full border border-[#F59E0B]/10 opacity-0" />
        <div className="absolute">
          {Array.from({ length: 30 }).map((_, i) => {
            const angle = (i / 30) * Math.PI * 2;
            const dist = 160 + Math.random() * 80;
            return (
              <div key={i} className="burst-dot absolute w-1.5 h-1.5 rounded-full opacity-0"
                style={{ backgroundColor: ['#F59E0B', '#DC2626', '#1B5E20', '#fff'][i % 4], left: '50%', top: '50%', marginLeft: `${Math.cos(angle) * dist}px`, marginTop: `${Math.sin(angle) * dist}px` }} />
            );
          })}
        </div>
        <img src="/ecz-logo.png" alt="ECZ" className="ecz-logo-img relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain opacity-0 z-10"
          style={{ filter: 'drop-shadow(0 0 60px rgba(245,158,11,0.5)) drop-shadow(0 0 120px rgba(245,158,11,0.2))' }} />
        <div className="ecz-name mt-6 text-5xl md:text-7xl font-black tracking-[0.3em] z-10">
          {'ECZ'.split('').map((l, i) => <span key={i} className="inline-block opacity-0 text-[#F59E0B]" style={{ textShadow: '0 0 40px rgba(245,158,11,0.6), 0 0 80px rgba(245,158,11,0.3)' }}>{l}</span>)}
        </div>
        <div className="ecz-fullname mt-3 text-lg md:text-2xl tracking-[0.3em] text-[#F59E0B]/80 uppercase text-center font-bold opacity-0 z-10">
          Electoral Commission of Zambia
        </div>
      </div>

      {/* === SCENE 2: Title === */}
      <div className="scene-title absolute inset-0 flex flex-col items-center justify-center opacity-0">
        <div className="relative overflow-hidden">
          <div className="title-sweep absolute inset-0 z-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)', width: '40%' }} />
          <div className="flex flex-wrap justify-center">
            {'ELECTION RESULTS'.split('').map((l, i) => (
              <span key={i} className={`title-letter text-5xl md:text-7xl lg:text-8xl font-black ${l === ' ' ? 'mx-3' : ''}`}
                style={{ display: 'inline-block', color: i < 9 ? '#F59E0B' : '#fff', textShadow: l !== ' ' ? '0 0 50px rgba(245,158,11,0.4)' : 'none' }}>
                {l === ' ' ? '\u00A0' : l}
              </span>
            ))}
          </div>
        </div>
        <div className="title-year text-8xl md:text-[10rem] font-black text-[#F59E0B] mt-2" style={{ textShadow: '0 0 100px rgba(245,158,11,0.5)' }}>2026</div>
        <div className="title-date mt-6 text-base md:text-lg tracking-[0.4em] text-[#6B6B80] uppercase">13 August 2026</div>
      </div>

      {/* === SCENE 3: Coat of Arms === */}
      <div className="scene-coat absolute inset-0 flex flex-col items-center justify-center opacity-0">
        <div className="coat-glow1 absolute w-[500px] h-[500px] md:w-[650px] md:h-[650px] rounded-full opacity-0" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, rgba(27,94,32,0.1) 35%, transparent 55%)' }} />
        <div className="coat-glow2 absolute w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full opacity-0" style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.15) 0%, transparent 50%)' }} />
        <div className="coat-ring absolute w-[420px] h-[420px] md:w-[550px] md:h-[550px] rounded-full border border-dashed border-[#F59E0B]/25 opacity-0" />
        <div className="relative">
          <img src="/zambia-coat-of-arms.png" alt="Zambia Coat of Arms" className="coat-img relative w-64 h-64 md:w-96 md:h-96 object-contain z-10"
            style={{ filter: 'drop-shadow(0 0 50px rgba(245,158,11,0.4)) drop-shadow(0 0 100px rgba(27,94,32,0.2))' }} />
          <div className="coat-shimmer absolute inset-0 z-20 rounded-full" style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.25) 48%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.25) 52%, transparent 65%)' }} />
        </div>
        <div className="absolute flex items-center justify-center">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
            const r = 220;
            return (
              <div key={i} className="coat-star absolute text-[#F59E0B] text-lg opacity-0"
                style={{ left: `calc(50% + ${Math.cos(angle) * r}px)`, top: `calc(50% + ${Math.sin(angle) * r}px)`, transform: 'translate(-50%,-50%)' }}>&#9733;</div>
            );
          })}
        </div>
        <div className="coat-motto mt-10 text-3xl md:text-5xl tracking-[0.4em] text-[#F59E0B] uppercase font-black opacity-0" style={{ textShadow: '0 0 60px rgba(245,158,11,0.6)' }}>
          One Zambia &middot; One Nation
        </div>
      </div>

      {/* === SCENE 4: DRAMATIC CANDIDATE SPOTLIGHTS === */}
      <div className="scene-candidates absolute inset-0 opacity-0">
        {/* INTRO TITLE */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="cand-intro-line w-48 h-0.5 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent mb-8" style={{ transformOrigin: 'center' }} />
          <div className="cand-intro-text text-4xl md:text-6xl font-black text-white tracking-[0.3em] uppercase text-center">Presidential Candidates</div>
          <div className="cand-intro-sub mt-4 text-xl md:text-3xl text-[#F59E0B] tracking-[0.4em] uppercase font-bold">5 Contesting &middot; 2026</div>
          <div className="cand-intro-line w-48 h-0.5 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent mt-8" style={{ transformOrigin: 'center' }} />
        </div>

        {/* INDIVIDUAL CANDIDATE SPOTLIGHTS */}
        {candidates.map((c, i) => (
          <div key={i} className={`spot-${i}-set absolute inset-0 flex items-center justify-center z-10`}>
            {/* Full-screen color wash background */}
            <div className={`spot-${i}-bg absolute inset-0`} style={{ background: `radial-gradient(ellipse at center, ${c.color}30 0%, ${c.color}10 30%, transparent 60%)` }} />

            {/* Hexagon grid overlay */}
            <div className={`spot-${i}-hexgrid absolute inset-0 pointer-events-none`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='49' viewBox='0 0 28 49' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5z' stroke='${encodeURIComponent(c.color)}' stroke-width='0.5' fill='none' opacity='0.5'/%3E%3C/svg%3E")`,
                backgroundSize: '28px 49px',
                opacity: 0,
              }} />

            {/* Animated ring behind photo */}
            <div className={`spot-${i}-ring absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border-2 border-dashed`} style={{ borderColor: `${c.color}40` }} />
            <div className={`spot-${i}-ring absolute w-[420px] h-[420px] md:w-[600px] md:h-[600px] rounded-full border`} style={{ borderColor: `${c.color}25` }} />

            {/* God rays fanning out from behind photo center */}
            <div className={`spot-${i}-godrays absolute left-[20%] md:left-[25%] top-1/2 -translate-y-1/2 pointer-events-none`}>
              {Array.from({ length: 6 }).map((_, ri) => {
                const rot = -60 + ri * 24;
                return (
                  <div key={ri} className="absolute origin-bottom"
                    style={{
                      width: '180px',
                                                      height: '600px',
                                                      left: '-30px',
                                                      top: '-300px',
                                                      background: `linear-gradient(to top, ${c.color}25, transparent)`,
                                                      clipPath: 'polygon(50% 0%, 45% 100%, 55% 100%)',
                                                      transform: `rotate(${rot}deg)`,
                                                      animation: `godray-pulse 4s ease-in-out infinite`,
                                                      animationDelay: `${ri * 0.3}s`,
                                                    }} />
                );
              })}
            </div>

            {/* MASSIVE Photo - left side */}
            <div className={`spot-${i}-photo absolute left-[2%] md:left-[3%] top-1/2 -translate-y-1/2 w-[50vw] h-[78vh] md:w-[38vw] md:h-[82vh] rounded-3xl overflow-hidden`}
              style={{ boxShadow: `0 0 100px ${c.color}50, 0 0 200px ${c.color}20, inset 0 0 60px ${c.color}15`, border: `2px solid ${c.color}60` }}>
              <img src={c.photo} alt={c.name} className="w-full h-full object-cover" style={{ objectPosition: 'center 15%' }} />
              {/* Gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: `linear-gradient(to top, ${c.color}40, transparent)` }} />

              {/* Orbiting particle dots around photo */}
              <div className={`spot-${i}-orbit absolute inset-0 pointer-events-none`}>
                {Array.from({ length: 20 }).map((_, oi) => {
                  const angle = (oi / 20) * 360;
                  const radius = 48 + (oi % 3) * 6;
                  const dur = 4 + (oi % 4) * 1.5;
                  return (
                    <div key={oi} className="absolute w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: c.color,
                                                        boxShadow: `0 0 4px ${c.color}`,
                                                        left: '50%',
                                                        top: '50%',
                                                        animation: `orbit ${dur}s linear infinite`,
                                                        animationDelay: `${-oi * 0.2}s`,
                                                        ['--orbit-angle' as string]: `${angle}deg`,
                                                        ['--orbit-radius' as string]: `${radius}%`,
                                                      }} />
                  );
                })}
              </div>

              {/* Rotating party seal — hexagonal badge top-right */}
              <div className={`spot-${i}-seal absolute top-4 right-4 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center`}
                style={{
                  background: `linear-gradient(135deg, ${c.color}30, ${c.color}10)`,
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  border: `2px solid ${c.color}`,
                  animation: 'seal-rotate 8s linear infinite',
                }}>
                <span className="text-white text-sm md:text-base font-black tracking-wider">{c.party}</span>
              </div>
            </div>

            {/* Text content - right side */}
            <div className="absolute right-[3%] md:right-[5%] top-1/2 -translate-y-1/2 flex flex-col items-start max-w-[48%] md:max-w-[42%]">
              {/* Decorative line */}
              <div className={`spot-${i}-line w-24 h-1 mb-6`} style={{ background: `linear-gradient(to right, ${c.color}, transparent)`, transformOrigin: 'left' }} />

              {/* Full name — kinetic letter reveal */}
              <div className="spot-name-letters text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight whitespace-nowrap" style={{ textShadow: `0 0 50px ${c.color}60, 0 0 100px ${c.color}20` }}>
                {c.name.split('').map((char, ci) => (
                  <span key={ci} className={`spot-${i}-letter inline-block ${char === ' ' ? 'w-4' : ''}`}
                    style={{ transformOrigin: 'center bottom' }}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>

              {/* Party badge */}
              <div className={`spot-${i}-party mt-6 px-6 py-3 text-lg md:text-2xl font-black tracking-[0.2em] uppercase text-white rounded-lg`}
                style={{ backgroundColor: c.color, boxShadow: `0 0 30px ${c.color}60, 0 0 60px ${c.color}20` }}>
                {c.party}
              </div>

              {/* Tagline */}
              <div className={`spot-${i}-tagline mt-3 text-base md:text-xl text-[#A0A0B8] tracking-wider font-medium`}>
                {c.tagline}
              </div>

              {/* Running mate */}
              {c.mate && (
                <div className={`spot-${i}-mate mt-4 text-base md:text-xl text-[#A0A0B8] tracking-wider`}>
                  <span className="text-[#6B6B80] uppercase text-sm tracking-[0.2em] mr-2">Running Mate</span><br />
                  <span className="text-white font-semibold">{c.mate}</span>
                </div>
              )}

              {/* Contestant number */}
              <div className="mt-8 text-[160px] md:text-[220px] font-black leading-none opacity-[0.1]" style={{ color: c.color }}>
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>

            {/* Floating particles on right side */}
            <div className={`spot-${i}-float absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none overflow-hidden`}>
              {Array.from({ length: 15 }).map((_, fi) => (
                <div key={fi} className="absolute rounded-full"
                  style={{
                    width: `${3 + (fi % 3) * 2}px`,
                                                      height: `${3 + (fi % 3) * 2}px`,
                                                      backgroundColor: c.color,
                                                      opacity: 0.25 + (fi % 3) * 0.1,
                                                      right: `${10 + (fi % 5) * 15}%`,
                                                      bottom: '-10px',
                                                      animation: `float-up ${6 + (fi % 4) * 3}s linear infinite`,
                                                      animationDelay: `${fi * 0.7}s`,
                                                    }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* === SCENE 5: LIVE — Dramatic Broadcast === */}
      <div className="scene-live absolute inset-0 flex flex-col items-center justify-center opacity-0">
        {/* Digital grid overlay */}
        <div className="live-grid absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(239,68,68,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.04) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: 0,
          }} />



        {/* Light beam rays emanating from center */}
        <div className="live-rays absolute inset-0 pointer-events-none flex items-center justify-center">
          {Array.from({ length: 8 }).map((_, ri) => {
            const rot = (ri / 8) * 360;
            return (
              <div key={ri} className="absolute origin-bottom"
                style={{
                  width: '80px',
                                                      height: '120vh',
                                                      background: `linear-gradient(to top, rgba(239,68,68,0.03), transparent 70%)`,
                                                      clipPath: 'polygon(50% 0%, 35% 100%, 65% 100%)',
                                                      transform: `rotate(${rot}deg) translateY(-30vh)`,
                                                      animation: `ray-rotate 20s linear infinite`,
                                                      animationDelay: `${ri * 0.5}s`,
                                                    }} />
            );
          })}
        </div>

        {/* Pulsing concentric ripples */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {Array.from({ length: 8 }).map((_, ri) => (
            <div key={ri} className="live-ripple absolute rounded-full border border-red-500"
              style={{
                width: '80px',
                                                      height: '80px',
                                                      animation: `ripple-expand 3s ease-out infinite`,
                                                      animationDelay: `${ri * 0.375}s`,
                                                      borderColor: `rgba(239,68,68,${0.5 - ri * 0.06})`,
                                                    }} />
          ))}
        </div>

        {/* Zambia location marker / crosshair */}
        <div className="live-crosshair absolute flex items-center justify-center pointer-events-none">
          <div className="relative w-24 h-24">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-red-500/30" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-red-500/30" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-red-500/50" />
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 text-red-500/40 text-sm md:text-base tracking-[0.3em] uppercase font-bold whitespace-nowrap">
              Lusaka, Zambia
            </div>
          </div>
        </div>

        {/* LIVE text with glitch effect */}
        <div className="live-text relative z-10" style={{ perspective: '800px' }}>
          <div className="live-glitch text-7xl md:text-9xl lg:text-[10rem] font-black tracking-[0.15em] text-[#EF4444]"
            style={{
              textShadow: '0 0 60px rgba(239,68,68,0.6), 0 0 120px rgba(239,68,68,0.3), 2px 0 #DC2626, -2px 0 #7F1D1D',
              animation: 'live-glitch 3s ease-in-out infinite',
              transform: 'rotateX(5deg)',
            }}>
            LIVE
          </div>
          {/* Glitch clone layers */}
          <div className="absolute inset-0 text-7xl md:text-9xl lg:text-[10rem] font-black tracking-[0.15em] text-[#EF4444]/30 pointer-events-none"
            style={{ animation: 'glitch-shift 2s ease-in-out infinite', clipPath: 'inset(20% 0 60% 0)' }}>
            LIVE
          </div>
        </div>

        {/* NATIONAL RESULTS CENTRE */}
        <div className="live-sub1 mt-8 text-2xl md:text-4xl font-bold tracking-[0.3em] text-white text-center uppercase"
          style={{ textShadow: '0 0 30px rgba(239,68,68,0.3)' }}>
          National Results Centre
        </div>

        {/* Location and date */}
        <div className="live-sub2 mt-4 text-base md:text-lg text-[#A0A0B8] tracking-[0.3em] uppercase">
          Lusaka &middot; Zambia &middot; 13 August 2026
        </div>

        {/* ZAMBIA CONSTELLATION RADAR — 10 province nodes with sweep */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 pointer-events-none">
          {/* Province constellation map */}
          <div className="relative w-[300px] md:w-[500px] h-[180px] md:h-[260px]">
            {/* Connecting lines between provinces */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 260">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#DC2626" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              {/* Western → North-Western → Northern → Muchinga */}
              <line x1="30" y1="180" x2="80" y2="80" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="80" y1="80" x2="160" y2="30" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="160" y1="30" x2="280" y2="50" stroke="url(#lineGrad)" strokeWidth="1" />
              {/* Northern → Luapula → Copperbelt */}
              <line x1="160" y1="30" x2="220" y2="100" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="220" y1="100" x2="200" y2="140" stroke="url(#lineGrad)" strokeWidth="1" />
              {/* Copperbelt → Central → Lusaka */}
              <line x1="200" y1="140" x2="260" y2="160" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="260" y1="160" x2="300" y2="200" stroke="url(#lineGrad)" strokeWidth="1" />
              {/* Muchinga → Eastern → Southern */}
              <line x1="280" y1="50" x2="380" y2="120" stroke="url(#lineGrad)" strokeWidth="1" />
              <line x1="380" y1="120" x2="360" y2="210" stroke="url(#lineGrad)" strokeWidth="1" />
              {/* Lusaka → Southern */}
              <line x1="300" y1="200" x2="360" y2="210" stroke="url(#lineGrad)" strokeWidth="1" />
              {/* Central → Southern diagonal */}
              <line x1="260" y1="160" x2="360" y2="210" stroke="url(#lineGrad)" strokeWidth="0.5" strokeDasharray="4,4" />
            </svg>

            {/* 10 Province dots with labels */}
            {[
              { name: 'Western',       x: '6%',  y: '69%', delay: 0.0 },
              { name: 'North-Western', x: '16%', y: '31%', delay: 0.3 },
              { name: 'Northern',      x: '32%', y: '12%', delay: 0.6 },
              { name: 'Muchinga',      x: '56%', y: '19%', delay: 0.9 },
              { name: 'Luapula',       x: '44%', y: '38%', delay: 1.2 },
              { name: 'Copperbelt',    x: '40%', y: '54%', delay: 1.5 },
              { name: 'Central',       x: '52%', y: '62%', delay: 1.8 },
              { name: 'Lusaka',        x: '60%', y: '77%', delay: 2.1 },
              { name: 'Eastern',       x: '76%', y: '46%', delay: 2.4 },
              { name: 'Southern',      x: '72%', y: '81%', delay: 2.7 },
            ].map((prov, pi) => (
              <div key={pi} className="absolute" style={{ left: prov.x, top: prov.y, transform: 'translate(-50%, -50%)' }}>
                {/* Pulsing ring */}
                <div className="absolute -inset-2 md:-inset-3 rounded-full border border-[#F59E0B]/20"
                  style={{ animation: `radar-ping 3s ease-out infinite`, animationDelay: `${prov.delay}s` }} />
                {/* Core dot */}
                <div className="w-2.5 h-2.5 md:w-4 md:h-4 rounded-full"
                  style={{
                    background: `radial-gradient(circle, #F59E0B, #DC2626)`,
                    boxShadow: `0 0 10px #F59E0B80, 0 0 20px #F59E0B40`,
                    animation: `radar-dot-glow 2s ease-in-out infinite`,
                    animationDelay: `${prov.delay}s`,
                  }} />
                {/* Label */}
                <div className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 whitespace-nowrap">
                  <span className="text-[8px] md:text-[11px] text-[#A0A0B8]/70 tracking-wider uppercase font-semibold">{prov.name}</span>
                </div>
              </div>
            ))}

            {/* Rotating radar sweep line */}
            <div className="absolute left-1/2 top-1/2 w-[140px] md:w-[240px] h-[1px] origin-left"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(245,158,11,0.4), rgba(220,38,38,0.6))',
                animation: 'radar-sweep 4s linear infinite',
              }} />

            {/* Center hub — Lusaka capital */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 md:w-10 md:h-10 rounded-full border-2 border-[#F59E0B]/40 flex items-center justify-center"
                style={{ animation: 'radar-hub-pulse 2s ease-in-out infinite' }}>
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#F59E0B]" style={{ boxShadow: '0 0 15px #F59E0B' }} />
              </div>
            </div>

            {/* Outer ring */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[340px] h-[200px] md:h-[340px] rounded-full border border-[#F59E0B]/8" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] md:w-[220px] h-[140px] md:h-[220px] rounded-full border border-[#F59E0B]/12" />
          </div>

          {/* Bottom label */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="text-[#6B6B80] text-xs md:text-sm tracking-[0.3em] uppercase">10 Provinces &middot; 156 Constituencies</span>
          </div>
        </div>
      </div>

      {/* === SCENE 6: Countdown === */}
      <div className="scene-count absolute inset-0 flex items-center justify-center opacity-0">
        {['3', '2', '1'].map((n) => (
          <div key={n} className={`count-${n} absolute text-[16rem] md:text-[20rem] font-black text-gradient-gold opacity-0`} style={{ textShadow: '0 0 100px rgba(245,158,11,0.5)' }}>{n}</div>
        ))}
      </div>

      {/* === SCENE 7: Final === */}
      <div className="scene-final absolute inset-0 flex items-center justify-center opacity-0">
        <div className="final-flash absolute inset-0 bg-[#F59E0B] opacity-0" />
        <div className="relative z-10 text-center">
          <div className="text-5xl md:text-7xl font-black text-gradient-gold tracking-wider">ELECTION</div>
          <div className="text-4xl md:text-6xl font-black text-white tracking-wider mt-2">RESULTS 2026</div>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm md:text-base text-[#A0A0B8] tracking-[0.2em] uppercase">
            <span className="text-[#F59E0B]">Presidential</span>
            <span className="text-[#6B6B80]">&middot;</span>
            <span>Parliamentary</span>
            <span className="text-[#6B6B80]">&middot;</span>
            <span>Councilor</span>
            <span className="text-[#6B6B80]">&middot;</span>
            <span>Mayoral</span>
          </div>
          <div className="mt-4 text-xs text-[#6B6B80] tracking-wider">
            Developed by <span className="text-[#F59E0B]">Mupo Mubita</span> · mubitamupo@outlook.com · +260760457622
          </div>
          <div className="mt-5 text-xl tracking-[0.4em] text-[#F59E0B]">BEGIN NOW</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-96 h-0.5 bg-[#1A1A24] rounded-full overflow-hidden z-10">
        <div className="h-full bg-gradient-to-r from-[#DC2626] via-[#F59E0B] to-[#1B5E20] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <style>{`
        @keyframes pulse-orb { 0%,100% { transform: scale(1); opacity: 0.06; } 50% { transform: scale(1.3); opacity: 0.1; } }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes float-particle { 0% { transform: translateY(110vh) translateX(0); opacity: 0; } 10% { opacity: 0.4; } 90% { opacity: 0.4; } 100% { transform: translateY(-100px) translateX(80px); opacity: 0; } }

        /* Candidate scene effects */
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(var(--orbit-angle, 0deg)) translateX(var(--orbit-radius, 40%)) rotate(calc(-1 * var(--orbit-angle, 0deg))); }
          to { transform: translate(-50%, -50%) rotate(calc(var(--orbit-angle, 0deg) + 360deg)) translateX(var(--orbit-radius, 40%)) rotate(calc(-1 * var(--orbit-angle, 0deg) - 360deg)); }
        }
        @keyframes godray-pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes seal-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float-up { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 0.5; } 90% { opacity: 0.3; } 100% { transform: translateY(-100vh); opacity: 0; } }

        /* LIVE scene effects */
        @keyframes ripple-expand { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(12); opacity: 0; } }
        @keyframes radar-sweep { 0% { transform: translate(-50%,-50%) rotate(0deg); } 100% { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes radar-ping { 0% { transform: scale(1); opacity: 0.6; border-color: rgba(245,158,11,0.3); } 100% { transform: scale(2.5); opacity: 0; border-color: rgba(245,158,11,0); } }
        @keyframes radar-dot-glow { 0%, 100% { box-shadow: 0 0 8px #F59E0B60, 0 0 16px #F59E0B30; } 50% { box-shadow: 0 0 16px #F59E0BA0, 0 0 32px #F59E0B50; } }
        @keyframes radar-hub-pulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.15); opacity: 1; } }
        @keyframes live-glitch {
          0%, 90%, 100% { transform: translate(0) rotateX(5deg); filter: none; }
          91% { transform: translate(-3px, 1px) rotateX(5deg); filter: hue-rotate(90deg); }
          92% { transform: translate(2px, -1px) rotateX(5deg); filter: none; }
          93% { transform: translate(0) rotateX(5deg); }
          94% { transform: translate(3px, 0) rotateX(5deg); filter: saturate(2); }
          95% { transform: translate(0) rotateX(5deg); filter: none; }
        }
        @keyframes glitch-shift { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-4px); } 40% { transform: translateX(4px); } 60% { transform: translateX(-2px); } }
        @keyframes ray-rotate { from { transform: rotate(0deg) translateY(-30vh); } to { transform: rotate(360deg) translateY(-30vh); } }
        @keyframes data-scroll { 0% { transform: translateY(100%); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(-100%); opacity: 0; } }
      `}</style>
    </div>
  );
}
