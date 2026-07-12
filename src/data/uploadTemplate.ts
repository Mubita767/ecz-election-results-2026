export const eczUploadTemplate = {
  version: '1.0',
  description: 'ECZ Election Results Upload Format',
  instructions: [
    'Upload a JSON file following this exact structure',
    'Candidate vote counts will REPLACE existing data',
    'Constituency status must be: declared, counting, or pending',
    'Party colors should be hex codes (e.g. #DC2626)',
    'All numeric values must be integers except percentages',
  ],
  example: {
    candidates: [
      { name: 'Candidate Full Name', party: 'Party Full Name', partyShortName: 'SHORT', partyColor: '#DC2626', votes: 100000, percentage: 50.0 },
    ],
    constituencies: [
      { name: 'Constituency Name', province: 'Province Name', status: 'declared', winner: 'Winner Name', winnerParty: 'Party Name', winnerPartyColor: '#DC2626', votes: 25000, turnout: 65.0 },
    ],
    provinces: [
      { name: 'Province Name', code: 'ABC', leadingParty: 'Leading Party', partyColor: '#DC2626', turnout: 65.0, constituenciesReported: 10, constituenciesTotal: 15 },
    ],
    summary: {
      totalRegistered: 8000000, totalVotesCast: 4000000, constituenciesTotal: 156, constituenciesReported: 100,
    },
    ticker: [{ text: 'Your ticker message here', partyColor: '#DC2626', type: 'result' }],
  },
};
