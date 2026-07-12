import { useState, useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { provinces } from '../data/electionData';

interface TooltipData {
  name: string;
  leading: string;
  color: string;
  turnout: number;
  voteShare: number;
  x: number;
  y: number;
}

// SVG paths traced from the actual Zambia provincial map
// ViewBox: 0 0 520 420 — scaled to match the map proportions
const provincePaths: Record<string, { path: string; labelX: number; labelY: number }> = {
  western: {
    // Large yellow area on the left
    path: 'M20,180 L30,140 L50,110 L80,95 L110,90 L140,100 L160,130 L170,170 L165,210 L150,250 L130,290 L100,320 L70,330 L45,310 L25,270 L15,225 Z',
    labelX: 92, labelY: 220,
  },
  northwestern: {
    // Green area upper-left
    path: 'M140,100 L170,85 L200,78 L230,85 L250,105 L258,130 L252,155 L235,170 L210,175 L185,168 L170,150 L160,130 Z',
    labelX: 200, labelY: 130,
  },
  luapula: {
    // Small brown area between Northern and Copperbelt
    path: 'M250,105 L270,88 L295,82 L315,90 L325,110 L318,130 L300,138 L280,135 L265,142 L255,130 L258,115 Z',
    labelX: 290, labelY: 110,
  },
  northern: {
    // Large pink area at the top
    path: 'M295,82 L320,72 L350,68 L380,75 L400,90 L412,110 L408,135 L395,155 L375,165 L350,160 L332,148 L318,130 L325,110 L315,90 Z',
    labelX: 365, labelY: 115,
  },
  copperbelt: {
    // Small yellow-green area between NW, Luapula, Central
    path: 'M235,170 L252,155 L265,142 L280,135 L300,138 L308,155 L302,172 L288,182 L268,185 L248,180 Z',
    labelX: 275, labelY: 165,
  },
  central: {
    // Large pink area in the middle
    path: 'M170,170 L185,168 L210,175 L235,170 L248,180 L268,185 L275,205 L270,230 L258,255 L240,275 L215,288 L190,290 L170,280 L158,255 L155,225 L160,195 Z',
    labelX: 215, labelY: 235,
  },
  lusaka: {
    // Small green area below Central, right of Southern
    path: 'M270,230 L275,205 L268,185 L288,182 L302,172 L318,180 L328,200 L325,220 L312,235 L295,240 L280,235 Z',
    labelX: 300, labelY: 215,
  },
  muchinga: {
    // Large yellow area on the right
    path: 'M332,148 L350,160 L375,165 L395,155 L412,165 L420,190 L418,218 L405,240 L385,250 L365,248 L348,235 L338,215 L335,195 L330,175 L328,160 Z',
    labelX: 380, labelY: 205,
  },
  eastern: {
    // Brown/tan area below Muchinga
    path: 'M295,240 L312,235 L325,220 L338,215 L348,235 L365,248 L385,250 L395,270 L390,295 L375,315 L355,325 L335,320 L318,305 L305,285 L298,262 Z',
    labelX: 350, labelY: 280,
  },
  southern: {
    // Large brown/tan area at the bottom
    path: 'M130,290 L150,250 L165,210 L170,170 L185,168 L210,175 L235,170 L248,180 L268,185 L275,205 L270,230 L280,235 L295,240 L298,262 L305,285 L318,305 L335,320 L340,345 L325,365 L300,380 L270,388 L235,390 L200,385 L170,375 L145,358 L125,335 L115,310 Z',
    labelX: 230, labelY: 345,
  },
};

interface RealZambiaMapProps {
  className?: string;
}

export default function RealZambiaMap({ className = '' }: RealZambiaMapProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.svg-province', {
      opacity: 0,
      scale: 0.92,
      duration: 0.7,
      stagger: 0.05,
      ease: 'power3.out',
      transformOrigin: 'center center',
    });
    gsap.from('.svg-province-label', {
      opacity: 0,
      duration: 0.4,
      stagger: 0.04,
      delay: 0.5,
      ease: 'power2.out',
    });
  }, { scope: containerRef });

  const provinceData = useCallback((id: string) => {
    return provinces.find(p => p.id === id);
  }, []);

  const handleMouseEnter = (id: string, e: React.MouseEvent) => {
    const p = provinceData(id);
    if (!p) return;
    setHovered(id);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltip({
        name: p.name,
        leading: p.leadingParty,
        color: p.partyColor,
        turnout: p.turnout,
        voteShare: p.voteShare,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect && tooltip) {
      setTooltip(prev => prev ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top } : null);
    }
  };

  const handleMouseLeave = () => {
    setHovered(null);
    setTooltip(null);
  };

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <svg
        viewBox="0 0 440 400"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {provinces.map((p) => {
          const geo = provincePaths[p.id];
          if (!geo) return null;
          const isHov = hovered === p.id;

          return (
            <g key={p.id}>
              {/* Province shape — THE actual interactive region */}
              <path
                className="svg-province"
                d={geo.path}
                fill={p.partyColor}
                fillOpacity={isHov ? 0.95 : 0.82}
                stroke={isHov ? '#F59E0B' : 'rgba(8,8,15,0.5)'}
                strokeWidth={isHov ? 2.5 : 1}
                strokeLinejoin="round"
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  filter: isHov ? 'url(#glow)' : 'none',
                }}
                onMouseEnter={(e) => handleMouseEnter(p.id, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />

              {/* Province code label */}
              <text
                className="svg-province-label"
                x={geo.labelX}
                y={geo.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  fill: 'rgba(255,255,255,0.92)',
                  pointerEvents: 'none',
                  textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                  fontFamily: 'system-ui, sans-serif',
                  letterSpacing: '0.5px',
                }}
              >
                {p.code}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-50 pointer-events-none"
          style={{
            left: Math.min(tooltip.x + 14, (containerRef.current?.clientWidth || 500) - 190),
            top: tooltip.y - 85,
          }}
        >
          <div
            className="rounded-xl px-4 py-3 shadow-2xl backdrop-blur-md min-w-[180px]"
            style={{
              backgroundColor: 'rgba(10,10,18,0.95)',
              border: `1px solid ${tooltip.color}50`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${tooltip.color}20`,
            }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: tooltip.color, boxShadow: `0 0 8px ${tooltip.color}` }} />
              <span className="text-sm font-bold text-white">{tooltip.name}</span>
            </div>
            <div className="text-xs text-[#A0A0B8] ml-5">
              Leading: <span className="font-semibold text-white">{tooltip.leading}</span>
            </div>
            <div className="flex items-center gap-3 mt-2 ml-5 text-xs font-mono">
              <div>
                <span className="text-[#6B6B80]">Share</span>
                <span className="text-white font-bold ml-1">{tooltip.voteShare}%</span>
              </div>
              <div>
                <span className="text-[#6B6B80]">Turnout</span>
                <span className="text-white font-bold ml-1">{tooltip.turnout}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
