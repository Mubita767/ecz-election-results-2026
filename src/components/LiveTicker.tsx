import { useMemo } from 'react';
import { useStore } from '../store/useStore';

export default function LiveTicker() {
  const tickerSpeed = useStore((s) => s.tickerSpeed);
  const tickerItems = useStore((s) => s.tickerItems);
  const customTickerItems = useStore((s) => s.customTickerItems);

  const allItems = useMemo(() => {
    const combined = [...tickerItems, ...customTickerItems];
    return [...combined, ...combined]; // duplicate for seamless scroll
  }, [tickerItems, customTickerItems]);

  return (
    <div className="h-12 shrink-0 border-t border-[#F59E0B]/30 bg-[#0E0E16] relative overflow-hidden">
      <div
        className="ticker-track h-full items-center"
        style={{ '--ticker-duration': `${tickerSpeed}s` } as React.CSSProperties}
      >
        {allItems.map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="flex items-center gap-4 px-6 shrink-0">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: item.partyColor }}
            />
            <span
              className={`text-sm font-medium whitespace-nowrap ${
                item.type === 'breaking' ? 'text-[#F59E0B] font-bold' : 'text-[#A0A0B8]'
              }`}
            >
              {item.type === 'breaking' && (
                <span className="text-[10px] font-black bg-[#F59E0B]/20 text-[#F59E0B] px-2 py-0.5 rounded mr-2 tracking-wider">
                  BREAKING
                </span>
              )}
              {item.type === 'update' && (
                <span className="text-[10px] font-black bg-[#06B6D4]/20 text-[#06B6D4] px-2 py-0.5 rounded mr-2 tracking-wider">
                  UPDATE
                </span>
              )}
              {item.text}
            </span>
            <span className="text-[#2A2A3E] mx-2">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
