import { create } from 'zustand';
import type {
  ProjectionScreen, Candidate, ConstituencyResult, ProvinceResult,
  TickerItem, ElectionState, ECZUploadData, ElectionType,
  ParliamentarySeat, WardResult, MayoralResult, SeatAllocation,
} from '../types';
import {
  presidentialCandidates,
  constituencies,
  provinces,
  tickerItems,
  electionState,
  presidentialSeatAllocation,
  parliamentarySeats,
  parliamentarySeatAllocation,
  parliamentaryState,
  wardResults,
  councilorSeatAllocation,
  councilorState,
  mayoralResults,
  mayoralSeatAllocation,
  mayoralState,
} from '../data/electionData';

interface Store {
  // Election type
  electionType: ElectionType;
  setElectionType: (t: ElectionType) => void;

  // Projection
  currentScreen: ProjectionScreen;
  isAutoCycling: boolean;
  cycleInterval: number;
  tickerSpeed: number;
  setScreen: (s: ProjectionScreen) => void;
  setAutoCycling: (v: boolean) => void;
  setCycleInterval: (v: number) => void;
  setTickerSpeed: (v: number) => void;
  nextScreen: () => void;

  // Presidential Data
  candidates: Candidate[];
  constituencies: ConstituencyResult[];
  provinces: ProvinceResult[];
  electionState: ElectionState;
  presidentialSeatAllocation: SeatAllocation[];

  // Parliamentary Data
  parliamentarySeats: ParliamentarySeat[];
  parliamentarySeatAllocation: SeatAllocation[];
  parliamentaryState: ElectionState;

  // Councilor Data
  wardResults: WardResult[];
  councilorSeatAllocation: SeatAllocation[];
  councilorState: ElectionState;

  // Mayoral Data
  mayoralResults: MayoralResult[];
  mayoralSeatAllocation: SeatAllocation[];
  mayoralState: ElectionState;

  // Ticker
  tickerItems: TickerItem[];
  customTickerItems: TickerItem[];
  addTickerItem: (text: string, partyColor: string, type: 'result' | 'breaking' | 'update') => void;
  removeTickerItem: (id: number) => void;
  clearCustomTicker: () => void;

  // Upload
  processUpload: (data: ECZUploadData) => void;
  resetToDefault: () => void;
  lastUploadTime: string | null;
}

const screenOrder: ProjectionScreen[] = ['candidates', 'results', 'seats', 'map', 'turnout', 'constituencies'];

export const useStore = create<Store>((set, get) => ({
  // Election type
  electionType: 'presidential',
  setElectionType: (t) => set({ electionType: t }),

  // Projection
  currentScreen: 'candidates',
  isAutoCycling: true,
  cycleInterval: 10,
  tickerSpeed: 45,

  // Presidential
  candidates: presidentialCandidates,
  constituencies: constituencies,
  provinces: provinces,
  electionState: electionState,
  presidentialSeatAllocation: presidentialSeatAllocation,

  // Parliamentary
  parliamentarySeats: parliamentarySeats,
  parliamentarySeatAllocation: parliamentarySeatAllocation,
  parliamentaryState: parliamentaryState,

  // Councilor
  wardResults: wardResults,
  councilorSeatAllocation: councilorSeatAllocation,
  councilorState: councilorState,

  // Mayoral
  mayoralResults: mayoralResults,
  mayoralSeatAllocation: mayoralSeatAllocation,
  mayoralState: mayoralState,

  // Ticker
  tickerItems: tickerItems,
  customTickerItems: [],
  lastUploadTime: null,

  setScreen: (s) => set({ currentScreen: s }),
  setAutoCycling: (v) => set({ isAutoCycling: v }),
  setCycleInterval: (v) => set({ cycleInterval: v }),
  setTickerSpeed: (v) => set({ tickerSpeed: v }),
  nextScreen: () => {
    const idx = screenOrder.indexOf(get().currentScreen);
    set({ currentScreen: screenOrder[(idx + 1) % screenOrder.length] });
  },

  addTickerItem: (text, partyColor, type) => {
    const items = get().customTickerItems;
    const newItem: TickerItem = { id: Date.now(), text, partyColor, type };
    set({ customTickerItems: [...items, newItem] });
  },
  removeTickerItem: (id) => {
    set({ customTickerItems: get().customTickerItems.filter((i) => i.id !== id) });
  },
  clearCustomTicker: () => set({ customTickerItems: [] }),

  processUpload: (data: ECZUploadData) => {
    const newCandidates: Candidate[] = data.candidates.map((c, i) => ({
      id: `uploaded-${i}`,
      name: c.name,
      party: { id: `party-${i}`, name: c.party, shortName: c.partyShortName, color: c.partyColor },
      photo: c.photo || '/candidate-ind.jpg',
      votes: c.votes,
      percentage: c.percentage,
      isLeading: false,
      provincialBreakdown: [],
    }));
    const maxVotes = Math.max(...newCandidates.map((c) => c.votes));
    newCandidates.forEach((c) => {
      if (c.votes === maxVotes) c.isLeading = true;
    });

    set({
      candidates: newCandidates,
      constituencies: data.constituencies.map((c, i) => ({
        id: `u-${i}`,
        name: c.name,
        province: c.province,
        winner: c.winner || 'Pending',
        winnerParty: c.winnerParty || '',
        partyColor: c.winnerPartyColor || '#6B7280',
        votes: c.votes || 0,
        margin: 0,
        turnout: c.turnout || 0,
        status: c.status,
      })),
      provinces: data.provinces.map((p) => ({
        id: p.code.toLowerCase(),
        name: p.name,
        code: p.code,
        constituencies: p.constituenciesTotal,
        leadingParty: p.leadingParty,
        partyColor: p.partyColor,
        voteShare: 0,
        turnout: p.turnout,
        totalVotes: 0,
        mapPath: '',
        labelX: 0,
        labelY: 0,
      })),
      electionState: {
        ...get().electionState,
        totalRegistered: data.summary.totalRegistered,
        totalVotesCast: data.summary.totalVotesCast,
        constituenciesTotal: data.summary.constituenciesTotal,
        constituenciesReported: data.summary.constituenciesReported,
      },
      lastUploadTime: new Date().toISOString(),
    });
  },

  resetToDefault: () =>
    set({
      candidates: presidentialCandidates,
      constituencies: constituencies,
      provinces: provinces,
      electionState: electionState,
      parliamentarySeats: parliamentarySeats,
      wardResults: wardResults,
      mayoralResults: mayoralResults,
      tickerItems: tickerItems,
      customTickerItems: [],
      lastUploadTime: null,
    }),
}));
