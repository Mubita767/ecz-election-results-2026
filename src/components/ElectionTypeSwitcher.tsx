import { motion } from 'framer-motion';
import { Crown, Landmark, Users, Building2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { ElectionType } from '../types';

const tabs: { id: ElectionType; label: string; icon: React.ElementType }[] = [
  { id: 'presidential', label: 'PRESIDENTIAL', icon: Crown },
  { id: 'parliamentary', label: 'PARLIAMENTARY', icon: Landmark },
  { id: 'councilor', label: 'COUNCILOR', icon: Users },
  { id: 'mayoral', label: 'MAYORAL', icon: Building2 },
];

export default function ElectionTypeSwitcher() {
  const { electionType, setElectionType } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <div className="flex items-center gap-1 p-1 bg-[#141420] border border-[#2A2A3E] rounded-xl">
        {tabs.map((tab) => {
          const isActive = electionType === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setElectionType(tab.id)}
              className={`relative flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold tracking-wider transition-all duration-200 ${
                isActive
                  ? 'text-black'
                  : 'text-[#6B6B80] hover:text-[#A0A0B8] hover:bg-[#1E1E2E]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeElectionTab"
                  className="absolute inset-0 rounded-lg bg-[#F59E0B]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
