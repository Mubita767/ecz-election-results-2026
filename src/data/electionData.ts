// ============================================
// ECZ ELECTION RESULTS 2026 - ALL ELECTION TYPES
// Presidential | Parliamentary | Councilor | Mayoral
// Status: MID-ELECTION
// ============================================

import type {
  Party, Candidate, ParliamentaryCandidate, ParliamentarySeat,
  CouncilorCandidate, WardResult, MayoralCandidate, MayoralResult,
  ProvinceResult, ConstituencyResult, TickerItem, SeatAllocation,
  ElectionState, CandidateProvinceBreakdown
} from '../types';

// --- PARTIES ---
export const parties: Party[] = [
  { id: 'upnd', name: 'United Party for National Development', shortName: 'UPND', color: '#DC2626', alliance: 'UPND Alliance' },
  { id: 'nrpup', name: 'National Reconciliation Party for Unity and Prosperity', shortName: 'NRPUP', color: '#1B5E20', alliance: 'Tonse Alliance' },
  { id: 'sp', name: 'Socialist Party', shortName: 'SP', color: '#EA580C', alliance: 'People\'s Pact' },
  { id: 'cf', name: 'Citizens First', shortName: 'CF', color: '#F59E0B', alliance: 'Orange Alliance' },
  { id: 'pf', name: 'Patriotic Front', shortName: 'PF', color: '#7C3AED', alliance: 'PF Pamodzi Alliance' },
  { id: 'ind', name: 'Independent', shortName: 'IND', color: '#6B7280' },
];

// --- PROVINCES ---
export const provinces: ProvinceResult[] = [
  { id: 'western', name: 'Western', code: 'WES', constituencies: 19, leadingParty: 'UPND', partyColor: '#DC2626', voteShare: 65.8, turnout: 62.4, totalVotes: 312456, mapPath: '', labelX: 0, labelY: 0 },
  { id: 'northwestern', name: 'North-Western', code: 'NWE', constituencies: 18, leadingParty: 'UPND', partyColor: '#DC2626', voteShare: 68.4, turnout: 65.1, totalVotes: 298234, mapPath: '', labelX: 0, labelY: 0 },
  { id: 'luapula', name: 'Luapula', code: 'LUA', constituencies: 16, leadingParty: 'NRPUP', partyColor: '#1B5E20', voteShare: 51.2, turnout: 58.7, totalVotes: 254678, mapPath: '', labelX: 0, labelY: 0 },
  { id: 'northern', name: 'Northern', code: 'NOR', constituencies: 20, leadingParty: 'NRPUP', partyColor: '#1B5E20', voteShare: 48.6, turnout: 57.3, totalVotes: 345678, mapPath: '', labelX: 0, labelY: 0 },
  { id: 'copperbelt', name: 'Copperbelt', code: 'COP', constituencies: 22, leadingParty: 'UPND', partyColor: '#DC2626', voteShare: 42.3, turnout: 68.2, totalVotes: 412345, mapPath: '', labelX: 0, labelY: 0 },
  { id: 'central', name: 'Central', code: 'CEN', constituencies: 21, leadingParty: 'UPND', partyColor: '#DC2626', voteShare: 42.5, turnout: 61.8, totalVotes: 356789, mapPath: '', labelX: 0, labelY: 0 },
  { id: 'lusaka', name: 'Lusaka', code: 'LUS', constituencies: 17, leadingParty: 'UPND', partyColor: '#DC2626', voteShare: 43.8, turnout: 66.4, totalVotes: 398765, mapPath: '', labelX: 0, labelY: 0 },
  { id: 'muchinga', name: 'Muchinga', code: 'MUC', constituencies: 15, leadingParty: 'NRPUP', partyColor: '#1B5E20', voteShare: 53.8, turnout: 55.6, totalVotes: 234567, mapPath: '', labelX: 0, labelY: 0 },
  { id: 'eastern', name: 'Eastern', code: 'EAS', constituencies: 19, leadingParty: 'NRPUP', partyColor: '#1B5E20', voteShare: 44.2, turnout: 56.8, totalVotes: 298765, mapPath: '', labelX: 0, labelY: 0 },
  { id: 'southern', name: 'Southern', code: 'SOU', constituencies: 21, leadingParty: 'UPND', partyColor: '#DC2626', voteShare: 75.6, turnout: 64.2, totalVotes: 345678, mapPath: '', labelX: 0, labelY: 0 },
];

// --- PRESIDENTIAL CANDIDATES ---
export const presidentialCandidates: Candidate[] = [
  {
    id: 'hh', name: 'Hakainde Hichilema', party: parties[0], runningMate: 'Mutale Nalumango',
    photo: '/candidate-hh.jpg', votes: 1856234, percentage: 52.4, isLeading: true,
    bio: 'Incumbent President seeking second term. Businessman turned politician. Running under UPND Alliance with 15 member parties.',
    provincialBreakdown: [
      { province: 'Southern', provinceCode: 'SOU', percentage: 78.5, votes: 245678 },
      { province: 'Western', provinceCode: 'WES', percentage: 71.2, votes: 198234 },
      { province: 'North-Western', provinceCode: 'NWE', percentage: 74.8, votes: 187654 },
      { province: 'Lusaka', provinceCode: 'LUS', percentage: 58.3, votes: 234567 },
      { province: 'Central', provinceCode: 'CEN', percentage: 54.1, votes: 176543 },
      { province: 'Copperbelt', provinceCode: 'COP', percentage: 48.7, votes: 198765 },
      { province: 'Eastern', provinceCode: 'EAS', percentage: 38.4, votes: 123456 },
      { province: 'Northern', provinceCode: 'NOR', percentage: 35.2, votes: 145678 },
      { province: 'Muchinga', provinceCode: 'MUC', percentage: 32.1, votes: 87654 },
      { province: 'Luapula', provinceCode: 'LUA', percentage: 36.7, votes: 112345 },
    ],
  },
  {
    id: 'bm', name: 'Brian Mundubile', party: parties[1], runningMate: 'Makebi Zulu', runningMatePhoto: '/candidate-mz.jpg',
    photo: '/candidate-bm.jpg', votes: 1234567, percentage: 34.8, isLeading: false,
    bio: 'Member of Parliament for Mporokoso since 2016. NRPUP presidential candidate. Backed by the Tonse Alliance coalition. Former PF Secretary General.',
    provincialBreakdown: [
      { province: 'Luapula', provinceCode: 'LUA', percentage: 56.3, votes: 172345 },
      { province: 'Muchinga', provinceCode: 'MUC', percentage: 58.7, votes: 160234 },
      { province: 'Northern', provinceCode: 'NOR', percentage: 51.8, votes: 214567 },
      { province: 'Eastern', provinceCode: 'EAS', percentage: 48.9, votes: 157234 },
      { province: 'Copperbelt', provinceCode: 'COP', percentage: 36.2, votes: 147654 },
      { province: 'Central', provinceCode: 'CEN', percentage: 30.8, votes: 100567 },
      { province: 'Lusaka', provinceCode: 'LUS', percentage: 26.4, votes: 106234 },
      { province: 'Western', provinceCode: 'WES', percentage: 22.1, votes: 61543 },
      { province: 'North-Western', provinceCode: 'NWE', percentage: 18.9, votes: 47432 },
      { province: 'Southern', provinceCode: 'SOU', percentage: 15.4, votes: 48157 },
    ],
  },
  {
    id: 'fm', name: "Fred M'membe", party: parties[2],
    photo: '/candidate-fm.jpg', votes: 234567, percentage: 6.6, isLeading: false,
    bio: 'Former journalist. Socialist Party president. Running under People\'s Pact coalition with civil society backing.',
    provincialBreakdown: [
      { province: 'Lusaka', provinceCode: 'LUS', percentage: 8.2, votes: 32987 },
      { province: 'Copperbelt', provinceCode: 'COP', percentage: 6.8, votes: 27754 },
      { province: 'Central', provinceCode: 'CEN', percentage: 4.2, votes: 13726 },
      { province: 'Eastern', provinceCode: 'EAS', percentage: 3.5, votes: 11256 },
      { province: 'Northern', provinceCode: 'NOR', percentage: 3.2, votes: 13245 },
      { province: 'Southern', provinceCode: 'SOU', percentage: 3.1, votes: 9695 },
      { province: 'Western', provinceCode: 'WES', percentage: 2.8, votes: 7792 },
      { province: 'Luapula', provinceCode: 'LUA', percentage: 2.1, votes: 6432 },
      { province: 'Muchinga', provinceCode: 'MUC', percentage: 1.8, votes: 4912 },
      { province: 'North-Western', provinceCode: 'NWE', percentage: 1.5, votes: 3767 },
    ],
  },
  {
    id: 'hk', name: 'Harry Kalaba', party: parties[3],
    photo: '/candidate-hk.jpg', votes: 156789, percentage: 4.4, isLeading: false,
    bio: 'Former Foreign Minister. Citizens First party leader. Running under Orange Alliance with NDC and other parties.',
    provincialBreakdown: [
      { province: 'Eastern', provinceCode: 'EAS', percentage: 7.8, votes: 25078 },
      { province: 'Northern', provinceCode: 'NOR', percentage: 6.4, votes: 26489 },
      { province: 'Central', provinceCode: 'CEN', percentage: 5.6, votes: 18295 },
      { province: 'Luapula', provinceCode: 'LUA', percentage: 5.2, votes: 15928 },
      { province: 'Copperbelt', provinceCode: 'COP', percentage: 4.8, votes: 19587 },
      { province: 'Lusaka', provinceCode: 'LUS', percentage: 3.9, votes: 15682 },
      { province: 'Muchinga', provinceCode: 'MUC', percentage: 4.1, votes: 11198 },
      { province: 'Southern', provinceCode: 'SOU', percentage: 1.8, votes: 5631 },
      { province: 'Western', provinceCode: 'WES', percentage: 1.9, votes: 5289 },
      { province: 'North-Western', provinceCode: 'NWE', percentage: 1.2, votes: 3014 },
    ],
  },
  {
    id: 'gk', name: 'Given Katuta', party: parties[5],
    photo: '/candidate-ind.jpg', votes: 18765, percentage: 0.5, isLeading: false,
    bio: 'Independent candidate. Former MP for Chiengi constituency (2016-2026). Only woman in the presidential race.',
    provincialBreakdown: [
      { province: 'Lusaka', provinceCode: 'LUS', percentage: 0.7, votes: 2814 },
      { province: 'Copperbelt', provinceCode: 'COP', percentage: 0.6, votes: 2448 },
      { province: 'Central', provinceCode: 'CEN', percentage: 0.5, votes: 1634 },
      { province: 'Eastern', provinceCode: 'EAS', percentage: 0.4, votes: 1286 },
      { province: 'Northern', provinceCode: 'NOR', percentage: 0.3, votes: 1241 },
      { province: 'Southern', provinceCode: 'SOU', percentage: 0.3, votes: 938 },
      { province: 'Western', provinceCode: 'WES', percentage: 0.4, votes: 1112 },
      { province: 'Luapula', provinceCode: 'LUA', percentage: 0.3, votes: 919 },
      { province: 'Muchinga', provinceCode: 'MUC', percentage: 0.2, votes: 546 },
      { province: 'North-Western', provinceCode: 'NWE', percentage: 0.2, votes: 502 },
    ],
  },
];

// --- CONSTITUENCY RESULTS ---
export const constituencies: ConstituencyResult[] = [
  { id: '1', name: 'Mongu Central', province: 'Western', winner: 'H. Hichilema', winnerParty: 'UPND', partyColor: '#DC2626', votes: 18567, margin: 12450, turnout: 65.2, status: 'declared' },
  { id: '2', name: 'Kaoma Central', province: 'Western', winner: 'H. Hichilema', winnerParty: 'UPND', partyColor: '#DC2626', votes: 15234, margin: 8934, turnout: 62.5, status: 'declared' },
  { id: '3', name: 'Senanga', province: 'Western', winner: 'H. Hichilema', winnerParty: 'UPND', partyColor: '#DC2626', votes: 12345, margin: 6789, turnout: 60.1, status: 'declared' },
  { id: '4', name: 'Solwezi Central', province: 'North-Western', winner: 'H. Hichilema', winnerParty: 'UPND', partyColor: '#DC2626', votes: 22456, margin: 14567, turnout: 68.3, status: 'declared' },
  { id: '5', name: 'Mwinilunga', province: 'North-Western', winner: 'H. Hichilema', winnerParty: 'UPND', partyColor: '#DC2626', votes: 18987, margin: 11234, turnout: 64.5, status: 'declared' },
  { id: '6', name: 'Ndola Central', province: 'Copperbelt', winner: 'H. Hichilema', winnerParty: 'UPND', partyColor: '#DC2626', votes: 28765, margin: 5432, turnout: 70.1, status: 'declared' },
  { id: '7', name: 'Kitwe Central', province: 'Copperbelt', winner: 'H. Hichilema', winnerParty: 'UPND', partyColor: '#DC2626', votes: 25678, margin: 6789, turnout: 69.4, status: 'declared' },
  { id: '8', name: 'Lusaka Central', province: 'Lusaka', winner: 'H. Hichilema', winnerParty: 'UPND', partyColor: '#DC2626', votes: 34156, margin: 18765, turnout: 72.8, status: 'declared' },
  { id: '9', name: 'Chawama', province: 'Lusaka', winner: 'H. Hichilema', winnerParty: 'UPND', partyColor: '#DC2626', votes: 29567, margin: 11234, turnout: 68.2, status: 'declared' },
  { id: '10', name: 'Mandevu', province: 'Lusaka', winner: 'H. Hichilema', winnerParty: 'UPND', partyColor: '#DC2626', votes: 31234, margin: 13234, turnout: 70.5, status: 'declared' },
  { id: '11', name: 'Livingstone', province: 'Southern', winner: 'H. Hichilema', winnerParty: 'UPND', partyColor: '#DC2626', votes: 20123, margin: 11234, turnout: 65.8, status: 'declared' },
  { id: '12', name: 'Mazabuka', province: 'Southern', winner: 'H. Hichilema', winnerParty: 'UPND', partyColor: '#DC2626', votes: 18456, margin: 9876, turnout: 63.4, status: 'declared' },
  { id: '13', name: 'Monze', province: 'Southern', winner: 'H. Hichilema', winnerParty: 'UPND', partyColor: '#DC2626', votes: 19567, margin: 12345, turnout: 66.1, status: 'declared' },
  { id: '14', name: 'Choma', province: 'Southern', winner: 'H. Hichilema', winnerParty: 'UPND', partyColor: '#DC2626', votes: 17654, margin: 8765, turnout: 62.8, status: 'declared' },
  { id: '15', name: 'Kalomo', province: 'Southern', winner: 'H. Hichilema', winnerParty: 'UPND', partyColor: '#DC2626', votes: 16543, margin: 7654, turnout: 61.2, status: 'declared' },
  { id: '16', name: 'Kabwe Central', province: 'Central', winner: 'H. Hichilema', winnerParty: 'UPND', partyColor: '#DC2626', votes: 19456, margin: 4567, turnout: 64.5, status: 'declared' },
  { id: '17', name: 'Kapiri Mposhi', province: 'Central', winner: 'H. Hichilema', winnerParty: 'UPND', partyColor: '#DC2626', votes: 16234, margin: 3890, turnout: 61.2, status: 'declared' },
  { id: '18', name: 'Kasama Central', province: 'Northern', winner: 'B. Mundubile', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 17876, margin: 5432, turnout: 58.1, status: 'declared' },
  { id: '19', name: 'Mbala', province: 'Northern', winner: 'B. Mundubile', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 15432, margin: 4321, turnout: 55.8, status: 'declared' },
  { id: '20', name: 'Mporokoso', province: 'Northern', winner: 'B. Mundubile', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 12345, margin: 3456, turnout: 53.2, status: 'declared' },
  { id: '21', name: 'Chipata Central', province: 'Eastern', winner: 'B. Mundubile', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 19456, margin: 5678, turnout: 57.4, status: 'declared' },
  { id: '22', name: 'Petauke', province: 'Eastern', winner: 'B. Mundubile', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 16543, margin: 4321, turnout: 55.6, status: 'declared' },
  { id: '23', name: 'Mansa', province: 'Luapula', winner: 'B. Mundubile', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 14321, margin: 4567, turnout: 54.3, status: 'declared' },
  { id: '24', name: 'Samfya', province: 'Luapula', winner: 'B. Mundubile', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 12876, margin: 3456, turnout: 52.1, status: 'declared' },
  { id: '25', name: 'Isoka', province: 'Muchinga', winner: 'B. Mundubile', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 11234, margin: 3456, turnout: 51.8, status: 'declared' },
  { id: '26', name: 'Mufulira', province: 'Copperbelt', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '27', name: 'Chingola', province: 'Copperbelt', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '28', name: 'Kabushi', province: 'Copperbelt', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '29', name: 'Kamfinsa', province: 'Copperbelt', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '30', name: 'Bwacha', province: 'Central', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '31', name: 'Mkushi', province: 'Central', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '32', name: 'Matero', province: 'Lusaka', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '33', name: 'Kanyama', province: 'Lusaka', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '34', name: 'Bweengwa', province: 'Southern', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '35', name: 'Gwembe', province: 'Southern', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '36', name: 'Itezhi-Tezhi', province: 'Southern', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '37', name: 'Luena', province: 'Western', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '38', name: 'Lukulu', province: 'Western', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '39', name: 'Chavuma', province: 'North-Western', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '40', name: 'Kabompo', province: 'North-Western', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '41', name: 'Chilubi', province: 'Northern', winner: 'Counting...', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '42', name: 'Kaputa', province: 'Northern', winner: 'Counting...', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '43', name: 'Lundazi', province: 'Eastern', winner: 'Counting...', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '44', name: 'Vubwi', province: 'Eastern', winner: 'Counting...', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '45', name: 'Bangweulu', province: 'Luapula', winner: 'Counting...', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '46', name: 'Chembe', province: 'Luapula', winner: 'Counting...', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '47', name: 'Chinsali', province: 'Muchinga', winner: 'Counting...', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '48', name: 'Nakonde', province: 'Muchinga', winner: 'Counting...', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: '49', name: 'Roan', province: 'Copperbelt', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
  { id: '50', name: 'Wusakile', province: 'Copperbelt', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
  { id: '51', name: 'Chililabombwe', province: 'Copperbelt', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
  { id: '52', name: 'Mufumbwe', province: 'North-Western', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
  { id: '53', name: 'Zambezi', province: 'North-Western', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
  { id: '54', name: 'Sesheke', province: 'Western', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
  { id: '55', name: 'Sinazongwe', province: 'Southern', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
  { id: '56', name: 'Namwala', province: 'Southern', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
  { id: '57', name: 'Chirundu', province: 'Southern', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
  { id: '58', name: 'Zimba', province: 'Southern', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
  { id: '59', name: 'Kafue', province: 'Lusaka', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
  { id: '60', name: 'Chilanga', province: 'Lusaka', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
];

// ============================================
// PARLIAMENTARY ELECTION DATA
// 156 constituencies, MPs elected per constituency
// ============================================

export const parliamentarySeats: ParliamentarySeat[] = [
  // UPND declared seats
  { id: 'pm-1', constituency: 'Mongu Central', province: 'Western', winner: 'Mabvuto Banda', winnerParty: 'UPND', partyColor: '#DC2626', votes: 18567, margin: 12450, turnout: 65.2, status: 'declared' },
  { id: 'pm-2', constituency: 'Kaoma Central', province: 'Western', winner: 'Morgan Sitwala', winnerParty: 'UPND', partyColor: '#DC2626', votes: 15234, margin: 8934, turnout: 62.5, status: 'declared' },
  { id: 'pm-3', constituency: 'Senanga', province: 'Western', winner: 'Walubita Imakando', winnerParty: 'UPND', partyColor: '#DC2626', votes: 12345, margin: 6789, turnout: 60.1, status: 'declared' },
  { id: 'pm-4', constituency: 'Solwezi Central', province: 'North-Western', winner: 'Nathaniel Mubukwanu', winnerParty: 'UPND', partyColor: '#DC2626', votes: 22456, margin: 14567, turnout: 68.3, status: 'declared' },
  { id: 'pm-5', constituency: 'Mwinilunga', province: 'North-Western', winner: 'Newton Samakayi', winnerParty: 'UPND', partyColor: '#DC2626', votes: 18987, margin: 11234, turnout: 64.5, status: 'declared' },
  { id: 'pm-6', constituency: 'Ndola Central', province: 'Copperbelt', winner: 'Frank Tayali', winnerParty: 'UPND', partyColor: '#DC2626', votes: 28765, margin: 5432, turnout: 70.1, status: 'declared' },
  { id: 'pm-7', constituency: 'Kitwe Central', province: 'Copperbelt', winner: 'Ekron Dovutwa', winnerParty: 'UPND', partyColor: '#DC2626', votes: 25678, margin: 6789, turnout: 69.4, status: 'declared' },
  { id: 'pm-8', constituency: 'Lusaka Central', province: 'Lusaka', winner: 'Mulambo Haimbe', winnerParty: 'UPND', partyColor: '#DC2626', votes: 34156, margin: 18765, turnout: 72.8, status: 'declared' },
  { id: 'pm-9', constituency: 'Chawama', province: 'Lusaka', winner: 'Gary Nkombo', winnerParty: 'UPND', partyColor: '#DC2626', votes: 29567, margin: 11234, turnout: 68.2, status: 'declared' },
  { id: 'pm-10', constituency: 'Mandevu', province: 'Lusaka', winner: 'Emmanuel Munaile', winnerParty: 'UPND', partyColor: '#DC2626', votes: 31234, margin: 13234, turnout: 70.5, status: 'declared' },
  { id: 'pm-11', constituency: 'Livingstone', province: 'Southern', winner: 'Mathews Jere', winnerParty: 'UPND', partyColor: '#DC2626', votes: 20123, margin: 11234, turnout: 65.8, status: 'declared' },
  { id: 'pm-12', constituency: 'Mazabuka', province: 'Southern', winner: 'Emmanuel Munalula', winnerParty: 'UPND', partyColor: '#DC2626', votes: 18456, margin: 9876, turnout: 63.4, status: 'declared' },
  { id: 'pm-13', constituency: 'Monze', province: 'Southern', winner: 'Fred Chaatila', winnerParty: 'UPND', partyColor: '#DC2626', votes: 19567, margin: 12345, turnout: 66.1, status: 'declared' },
  { id: 'pm-14', constituency: 'Choma', province: 'Southern', winner: 'Jason Mutimbwa', winnerParty: 'UPND', partyColor: '#DC2626', votes: 17654, margin: 8765, turnout: 62.8, status: 'declared' },
  { id: 'pm-15', constituency: 'Kalomo', province: 'Southern', winner: 'Jacob Siwale', winnerParty: 'UPND', partyColor: '#DC2626', votes: 16543, margin: 7654, turnout: 61.2, status: 'declared' },
  // NRPUP declared seats
  { id: 'pm-16', constituency: 'Kasama Central', province: 'Northern', winner: 'Geoffrey Mwamba', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 17876, margin: 5432, turnout: 58.1, status: 'declared' },
  { id: 'pm-17', constituency: 'Mbala', province: 'Northern', winner: 'Stephen Kampyongo', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 15432, margin: 4321, turnout: 55.8, status: 'declared' },
  { id: 'pm-18', constituency: 'Mporokoso', province: 'Northern', winner: 'Brian Mundubile', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 12345, margin: 3456, turnout: 53.2, status: 'declared' },
  { id: 'pm-19', constituency: 'Chipata Central', province: 'Eastern', winner: 'Lameck Mangani', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 19456, margin: 5678, turnout: 57.4, status: 'declared' },
  { id: 'pm-20', constituency: 'Petauke', province: 'Eastern', winner: 'Dora Siliya', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 16543, margin: 4321, turnout: 55.6, status: 'declared' },
  { id: 'pm-21', constituency: 'Mansa', province: 'Luapula', winner: 'Dr. Chitalu Chilufya', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 14321, margin: 4567, turnout: 54.3, status: 'declared' },
  { id: 'pm-22', constituency: 'Samfya', province: 'Luapula', winner: 'Chinga Miyutu', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 12876, margin: 3456, turnout: 52.1, status: 'declared' },
  { id: 'pm-23', constituency: 'Isoka', province: 'Muchinga', winner: 'Alice Simango', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 11234, margin: 3456, turnout: 51.8, status: 'declared' },
  { id: 'pm-24', constituency: 'Bangweulu', province: 'Luapula', winner: 'Anthony Kasandwe', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 9876, margin: 2345, turnout: 50.2, status: 'declared' },
  { id: 'pm-25', constituency: 'Chinsali', province: 'Muchinga', winner: 'Kalaluka Musukuma', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 8765, margin: 2134, turnout: 49.8, status: 'declared' },
  // Counting
  { id: 'pm-26', constituency: 'Mufulira', province: 'Copperbelt', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: 'pm-27', constituency: 'Chingola', province: 'Copperbelt', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: 'pm-28', constituency: 'Kabushi', province: 'Copperbelt', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: 'pm-29', constituency: 'Bwacha', province: 'Central', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: 'pm-30', constituency: 'Matero', province: 'Lusaka', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  // Pending
  { id: 'pm-31', constituency: 'Roan', province: 'Copperbelt', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
  { id: 'pm-32', constituency: 'Wusakile', province: 'Copperbelt', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
  { id: 'pm-33', constituency: 'Sesheke', province: 'Western', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
  { id: 'pm-34', constituency: 'Kafue', province: 'Lusaka', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
];

export const parliamentarySeatAllocation: SeatAllocation[] = [
  { party: 'UPND', partyColor: '#DC2626', seats: 82 },
  { party: 'NRPUP', partyColor: '#1B5E20', seats: 48 },
  { party: 'SP', partyColor: '#EA580C', seats: 8 },
  { party: 'CF', partyColor: '#F59E0B', seats: 6 },
  { party: 'PF', partyColor: '#7C3AED', seats: 5 },
  { party: 'IND', partyColor: '#6B7280', seats: 3 },
];

export const parliamentaryState: ElectionState = {
  status: 'counting',
  totalRegistered: 8800000,
  totalVotesCast: 3542600,
  nationalTurnout: 62.4,
  constituenciesTotal: 156,
  constituenciesReported: 89,
  lastUpdated: '2026-08-13T18:30:00Z',
  leadingCandidate: null,
};

// ============================================
// COUNCILOR ELECTION DATA
// Wards within each constituency
// ============================================

export const wardResults: WardResult[] = [
  // UPND declared wards
  { id: 'cw-1', ward: 'Kamwala Ward', council: 'Lusaka City Council', province: 'Lusaka', winner: 'Charles Musonda', winnerParty: 'UPND', partyColor: '#DC2626', votes: 3456, margin: 1234, turnout: 58.2, status: 'declared' },
  { id: 'cw-2', ward: 'Mandevu Ward 1', council: 'Lusaka City Council', province: 'Lusaka', winner: 'Patricia Ngoma', winnerParty: 'UPND', partyColor: '#DC2626', votes: 2890, margin: 876, turnout: 55.4, status: 'declared' },
  { id: 'cw-3', ward: 'Mandevu Ward 2', council: 'Lusaka City Council', province: 'Lusaka', winner: 'John Mwale', winnerParty: 'UPND', partyColor: '#DC2626', votes: 3120, margin: 1560, turnout: 60.1, status: 'declared' },
  { id: 'cw-4', ward: 'Kabulonga Ward', council: 'Lusaka City Council', province: 'Lusaka', winner: 'Sarah Mulenga', winnerParty: 'UPND', partyColor: '#DC2626', votes: 2678, margin: 1345, turnout: 62.3, status: 'declared' },
  { id: 'cw-5', ward: 'Woodlands Ward', council: 'Lusaka City Council', province: 'Lusaka', winner: 'David Bwalya', winnerParty: 'UPND', partyColor: '#DC2626', votes: 2345, margin: 987, turnout: 59.8, status: 'declared' },
  { id: 'cw-6', ward: 'Ndola Ward 12', council: 'Ndola City Council', province: 'Copperbelt', winner: 'Emmanuel Kunda', winnerParty: 'UPND', partyColor: '#DC2626', votes: 1876, margin: 654, turnout: 61.2, status: 'declared' },
  { id: 'cw-7', ward: 'Itawa Ward', council: 'Ndola City Council', province: 'Copperbelt', winner: 'Grace Mwamba', winnerParty: 'UPND', partyColor: '#DC2626', votes: 2134, margin: 876, turnout: 63.5, status: 'declared' },
  { id: 'cw-8', ward: 'Kitwe Ward 5', council: 'Kitwe City Council', province: 'Copperbelt', winner: 'Joseph Lungu', winnerParty: 'UPND', partyColor: '#DC2626', votes: 1567, margin: 432, turnout: 57.8, status: 'declared' },
  // NRPUP declared wards
  { id: 'cw-9', ward: 'Chipata Ward 3', council: 'Chipata Municipal Council', province: 'Eastern', winner: 'Lackson Lupiya', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 1234, margin: 345, turnout: 52.1, status: 'declared' },
  { id: 'cw-10', ward: 'Mansa Ward 1', council: 'Mansa Municipal Council', province: 'Luapula', winner: 'Alice Chileshe', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 1456, margin: 567, turnout: 54.3, status: 'declared' },
  { id: 'cw-11', ward: 'Kasama Ward 2', council: 'Kasama Municipal Council', province: 'Northern', winner: 'Peter Mumba', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 1678, margin: 789, turnout: 56.7, status: 'declared' },
  { id: 'cw-12', ward: 'Mbala Ward 1', council: 'Mbala Municipal Council', province: 'Northern', winner: 'Ruth Nakamba', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 987, margin: 234, turnout: 50.8, status: 'declared' },
  // SP declared wards
  { id: 'cw-13', ward: 'Matero Ward 3', council: 'Lusaka City Council', province: 'Lusaka', winner: 'Cosmas Musumali', winnerParty: 'SP', partyColor: '#EA580C', votes: 876, margin: 123, turnout: 48.5, status: 'declared' },
  { id: 'cw-14', ward: 'Kamanga Ward', council: 'Lusaka City Council', province: 'Lusaka', winner: 'Chishala Kateka', winnerParty: 'SP', partyColor: '#EA580C', votes: 654, margin: 89, turnout: 45.2, status: 'declared' },
  // Counting
  { id: 'cw-15', ward: 'Chilenje Ward', council: 'Lusaka City Council', province: 'Lusaka', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: 'cw-16', ward: 'Makeni Ward', council: 'Lusaka City Council', province: 'Lusaka', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: 'cw-17', ward: 'Bwana Mkubwa Ward', council: 'Ndola City Council', province: 'Copperbelt', winner: 'Counting...', winnerParty: 'UPND', partyColor: '#DC2626', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  { id: 'cw-18', ward: 'Minga Ward', council: 'Chipata Municipal Council', province: 'Eastern', winner: 'Counting...', winnerParty: 'NRPUP', partyColor: '#1B5E20', votes: 0, margin: 0, turnout: 0, status: 'counting' },
  // Pending
  { id: 'cw-19', ward: 'Mfuwe Ward', council: 'Mambwe District Council', province: 'Eastern', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
  { id: 'cw-20', ward: 'Mpika Ward', council: 'Mpika District Council', province: 'Muchinga', winner: 'Pending', winnerParty: '', partyColor: '#6B7280', votes: 0, margin: 0, turnout: 0, status: 'pending' },
];

export const councilorSeatAllocation: SeatAllocation[] = [
  { party: 'UPND', partyColor: '#DC2626', seats: 1450 },
  { party: 'NRPUP', partyColor: '#1B5E20', seats: 980 },
  { party: 'SP', partyColor: '#EA580C', seats: 120 },
  { party: 'CF', partyColor: '#F59E0B', seats: 85 },
  { party: 'PF', partyColor: '#7C3AED', seats: 60 },
  { party: 'IND', partyColor: '#6B7280', seats: 45 },
];

export const councilorState: ElectionState = {
  status: 'counting',
  totalRegistered: 8800000,
  totalVotesCast: 3100000,
  nationalTurnout: 58.2,
  constituenciesTotal: 3640,
  constituenciesReported: 2100,
  lastUpdated: '2026-08-13T18:30:00Z',
  leadingCandidate: null,
};

// ============================================
// MAYORAL ELECTION DATA
// Mayors for City, Municipal, and District Councils
// ============================================

export const mayoralResults: MayoralResult[] = [
  // Declared
  { id: 'my-1', council: 'Lusaka City Council', province: 'Lusaka', candidateName: 'Chilando Chitangala', party: 'UPND', partyColor: '#DC2626', votes: 245678, percentage: 56.3, turnout: 64.2, status: 'declared' },
  { id: 'my-2', council: 'Ndola City Council', province: 'Copperbelt', candidateName: 'Jones Kalyati', party: 'UPND', partyColor: '#DC2626', votes: 187654, percentage: 52.8, turnout: 66.5, status: 'declared' },
  { id: 'my-3', council: 'Kitwe City Council', province: 'Copperbelt', candidateName: 'Mpundu Mutambo', party: 'UPND', partyColor: '#DC2626', votes: 165432, percentage: 51.2, turnout: 63.8, status: 'declared' },
  { id: 'my-4', council: 'Livingstone City Council', province: 'Southern', candidateName: 'Constance Muleabai', party: 'UPND', partyColor: '#DC2626', votes: 98765, percentage: 68.4, turnout: 60.2, status: 'declared' },
  { id: 'my-5', council: 'Chipata Municipal Council', province: 'Eastern', candidateName: 'George Mwanza', party: 'NRPUP', partyColor: '#1B5E20', votes: 45678, percentage: 54.2, turnout: 55.8, status: 'declared' },
  { id: 'my-6', council: 'Kasama Municipal Council', province: 'Northern', candidateName: 'Elizabeth Chanda', party: 'NRPUP', partyColor: '#1B5E20', votes: 38765, percentage: 58.7, turnout: 53.4, status: 'declared' },
  { id: 'my-7', council: 'Mansa Municipal Council', province: 'Luapula', candidateName: 'Patrick Kalumba', party: 'NRPUP', partyColor: '#1B5E20', votes: 34567, percentage: 52.1, turnout: 51.2, status: 'declared' },
  { id: 'my-8', council: 'Kabwe Municipal Council', province: 'Central', candidateName: 'Prince Chileshe', party: 'UPND', partyColor: '#DC2626', votes: 56789, percentage: 48.9, turnout: 59.6, status: 'declared' },
  { id: 'my-9', council: 'Mongu Municipal Council', province: 'Western', candidateName: 'Mwangala Akapelwa', party: 'UPND', partyColor: '#DC2626', votes: 42345, percentage: 72.3, turnout: 61.8, status: 'declared' },
  { id: 'my-10', council: 'Solwezi Municipal Council', province: 'North-Western', candidateName: 'Remmy Kalepa', party: 'UPND', partyColor: '#DC2626', votes: 34567, percentage: 65.8, turnout: 64.5, status: 'declared' },
  // Counting
  { id: 'my-11', council: 'Mufulira Municipal Council', province: 'Copperbelt', candidateName: 'Counting...', party: 'UPND', partyColor: '#DC2626', votes: 0, percentage: 0, turnout: 0, status: 'counting' },
  { id: 'my-12', council: 'Chingola Municipal Council', province: 'Copperbelt', candidateName: 'Counting...', party: 'UPND', partyColor: '#DC2626', votes: 0, percentage: 0, turnout: 0, status: 'counting' },
  { id: 'my-13', council: 'Mazabuka Municipal Council', province: 'Southern', candidateName: 'Counting...', party: 'UPND', partyColor: '#DC2626', votes: 0, percentage: 0, turnout: 0, status: 'counting' },
  { id: 'my-14', council: 'Chinsali District Council', province: 'Muchinga', candidateName: 'Counting...', party: 'NRPUP', partyColor: '#1B5E20', votes: 0, percentage: 0, turnout: 0, status: 'counting' },
  // Pending
  { id: 'my-15', council: 'Kafue District Council', province: 'Lusaka', candidateName: 'Pending', party: '', partyColor: '#6B7280', votes: 0, percentage: 0, turnout: 0, status: 'pending' },
  { id: 'my-16', council: 'Kalomo District Council', province: 'Southern', candidateName: 'Pending', party: '', partyColor: '#6B7280', votes: 0, percentage: 0, turnout: 0, status: 'pending' },
  { id: 'my-17', council: 'Sesheke District Council', province: 'Western', candidateName: 'Pending', party: '', partyColor: '#6B7280', votes: 0, percentage: 0, turnout: 0, status: 'pending' },
  { id: 'my-18', council: 'Mpika District Council', province: 'Muchinga', candidateName: 'Pending', party: '', partyColor: '#6B7280', votes: 0, percentage: 0, turnout: 0, status: 'pending' },
];

export const mayoralSeatAllocation: SeatAllocation[] = [
  { party: 'UPND', partyColor: '#DC2626', seats: 72 },
  { party: 'NRPUP', partyColor: '#1B5E20', seats: 38 },
  { party: 'SP', partyColor: '#EA580C', seats: 5 },
  { party: 'CF', partyColor: '#F59E0B', seats: 3 },
  { party: 'PF', partyColor: '#7C3AED', seats: 2 },
  { party: 'IND', partyColor: '#6B7280', seats: 2 },
];

export const mayoralState: ElectionState = {
  status: 'counting',
  totalRegistered: 8800000,
  totalVotesCast: 2950000,
  nationalTurnout: 55.8,
  constituenciesTotal: 122,
  constituenciesReported: 74,
  lastUpdated: '2026-08-13T18:30:00Z',
  leadingCandidate: null,
};

// --- TICKER ITEMS ---
export const tickerItems: TickerItem[] = [
  { id: 1, text: 'UPND leading in Lusaka Central with 58.3% — results still being verified', partyColor: '#DC2626', type: 'result' },
  { id: 2, text: 'BREAKING: 89 of 156 constituencies now reporting — ECZ urges patience', partyColor: '#F59E0B', type: 'breaking' },
  { id: 3, text: 'NRPUP holds strong in Northern Province — Mundubile gains ground', partyColor: '#1B5E20', type: 'result' },
  { id: 4, text: 'Southern Province: UPND commanding lead with 78% vote share', partyColor: '#DC2626', type: 'result' },
  { id: 5, text: 'Copperbelt battle tight: UPND 48.7%, NRPUP 36.2% with 4 constituencies still counting', partyColor: '#DC2626', type: 'result' },
  { id: 6, text: 'National turnout at 62.4% so far — expected to exceed 70%', partyColor: '#06B6D4', type: 'update' },
  { id: 7, text: 'Kalaba (Orange Alliance) making gains in Eastern Province — now at 7.8%', partyColor: '#F59E0B', type: 'result' },
  { id: 8, text: 'M\'membe (People\'s Pact) holds socialist stronghold in Lusaka at 8.2%', partyColor: '#EA580C', type: 'result' },
  { id: 9, text: 'Independent candidate Given Katuta polling strongly in Chiengi constituency', partyColor: '#8B5CF6', type: 'result' },
  { id: 10, text: 'ECZ confirms vote counting proceeding smoothly nationwide', partyColor: '#06B6D4', type: 'update' },
  { id: 11, text: 'Western Province: UPND leads with 71.2% — traditional stronghold', partyColor: '#DC2626', type: 'result' },
  { id: 12, text: 'BREAKING: 22 constituencies still pending — results expected within 2 hours', partyColor: '#F59E0B', type: 'breaking' },
  { id: 13, text: 'PARLIAMENTARY: UPND wins 15 of 25 declared seats — majority path clear', partyColor: '#DC2626', type: 'result' },
  { id: 14, text: 'COUNCILOR: UPND leads in 1,450 wards nationwide', partyColor: '#DC2626', type: 'result' },
  { id: 15, text: 'MAYORAL: Chilando Chitangala retains Lusaka Mayorship with 56.3%', partyColor: '#DC2626', type: 'result' },
];

// --- PRESIDENTIAL SEAT ALLOCATION ---
export const presidentialSeatAllocation: SeatAllocation[] = [
  { party: 'UPND', partyColor: '#DC2626', seats: 52 },
  { party: 'NRPUP', partyColor: '#1B5E20', seats: 28 },
  { party: 'SP', partyColor: '#EA580C', seats: 4 },
  { party: 'CF', partyColor: '#F59E0B', seats: 3 },
  { party: 'PF', partyColor: '#7C3AED', seats: 1 },
  { party: 'IND', partyColor: '#6B7280', seats: 1 },
];

// --- ELECTION STATE ---
export const electionState: ElectionState = {
  status: 'counting',
  totalRegistered: 8800000,
  totalVotesCast: 3542600,
  nationalTurnout: 62.4,
  constituenciesTotal: 156,
  constituenciesReported: 89,
  lastUpdated: '2026-08-13T18:30:00Z',
  leadingCandidate: 'Hakainde Hichilema',
};

// --- STATS ---
export const stats = {
  totalRegistered: 8800000,
  totalVotesCast: 3542600,
  turnout: 62.4,
  constituenciesTotal: 156,
  constituenciesReported: 89,
  constituenciesCounting: 45,
  constituenciesPending: 22,
  totalSeats: 167,
};
