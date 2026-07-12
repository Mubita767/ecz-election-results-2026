export interface Party {
  id: string;
  name: string;
  shortName: string;
  color: string;
  alliance?: string;
}

export interface CandidateProvinceBreakdown {
  province: string;
  provinceCode: string;
  percentage: number;
  votes: number;
}

export interface Candidate {
  id: string;
  name: string;
  party: Party;
  runningMate?: string;
  runningMatePhoto?: string;
  photo: string;
  votes: number;
  percentage: number;
  isLeading: boolean;
  provincialBreakdown: CandidateProvinceBreakdown[];
  bio?: string;
}

// --- PARLIAMENTARY ---
export interface ParliamentaryCandidate {
  id: string;
  name: string;
  party: Party;
  photo: string;
  constituency: string;
  province: string;
  votes: number;
  percentage: number;
  status: 'declared' | 'counting' | 'pending';
}

export interface ParliamentarySeat {
  id: string;
  constituency: string;
  province: string;
  winner: string;
  winnerParty: string;
  partyColor: string;
  votes: number;
  margin: number;
  turnout: number;
  status: 'declared' | 'counting' | 'pending';
}

// --- COUNCILOR ---
export interface CouncilorCandidate {
  id: string;
  name: string;
  party: Party;
  photo: string;
  ward: string;
  council: string;
  province: string;
  votes: number;
  percentage: number;
  status: 'declared' | 'counting' | 'pending';
}

export interface WardResult {
  id: string;
  ward: string;
  council: string;
  province: string;
  winner: string;
  winnerParty: string;
  partyColor: string;
  votes: number;
  margin: number;
  turnout: number;
  status: 'declared' | 'counting' | 'pending';
}

// --- MAYORAL ---
export interface MayoralCandidate {
  id: string;
  name: string;
  party: Party;
  photo: string;
  council: string;
  province: string;
  votes: number;
  percentage: number;
  status: 'declared' | 'counting' | 'pending';
}

export interface MayoralResult {
  id: string;
  council: string;
  province: string;
  candidateName: string;
  party: string;
  partyColor: string;
  votes: number;
  percentage: number;
  turnout: number;
  status: 'declared' | 'counting' | 'pending';
}

// --- SHARED ---
export interface ProvinceResult {
  id: string;
  name: string;
  code: string;
  constituencies: number;
  leadingParty: string;
  partyColor: string;
  voteShare: number;
  turnout: number;
  totalVotes: number;
  mapPath: string;
  labelX: number;
  labelY: number;
}

export interface ConstituencyResult {
  id: string;
  name: string;
  province: string;
  winner: string;
  winnerParty: string;
  partyColor: string;
  votes: number;
  margin: number;
  turnout: number;
  status: 'declared' | 'counting' | 'pending';
}

export interface TickerItem {
  id: number;
  text: string;
  partyColor: string;
  type: 'result' | 'breaking' | 'update';
}

export interface SeatAllocation {
  party: string;
  partyColor: string;
  seats: number;
}

export interface ElectionState {
  status: 'not_started' | 'voting' | 'counting' | 'completed';
  totalRegistered: number;
  totalVotesCast: number;
  nationalTurnout: number;
  constituenciesTotal: number;
  constituenciesReported: number;
  lastUpdated: string;
  leadingCandidate: string | null;
}

export type ElectionType = 'presidential' | 'parliamentary' | 'councilor' | 'mayoral';

export type ProjectionScreen =
  | 'candidates' | 'results' | 'seats' | 'map' | 'turnout' | 'constituencies';

// ECZ Upload Data Format
export interface ECZUploadData {
  candidates: Array<{
    name: string;
    party: string;
    partyShortName: string;
    partyColor: string;
    votes: number;
    percentage: number;
    photo?: string;
  }>;
  constituencies: Array<{
    name: string;
    province: string;
    status: 'declared' | 'counting' | 'pending';
    winner?: string;
    winnerParty?: string;
    winnerPartyColor?: string;
    votes?: number;
    turnout?: number;
  }>;
  provinces: Array<{
    name: string;
    code: string;
    leadingParty: string;
    partyColor: string;
    turnout: number;
    constituenciesReported: number;
    constituenciesTotal: number;
  }>;
  summary: {
    totalRegistered: number;
    totalVotesCast: number;
    constituenciesTotal: number;
    constituenciesReported: number;
  };
  ticker: Array<{
    text: string;
    partyColor: string;
    type: 'result' | 'breaking' | 'update';
  }>;
}
