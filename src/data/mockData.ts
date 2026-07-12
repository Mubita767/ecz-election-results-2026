// Backwards-compatibility re-exports from electionData.ts
// New code should import directly from electionData.ts
export {
  parties,
  presidentialCandidates as candidates,
  constituencies,
  provinces,
  tickerItems,
  electionState,
  presidentialSeatAllocation as seatAllocations,
  stats,
} from './electionData';

export { eczUploadTemplate } from './uploadTemplate';
