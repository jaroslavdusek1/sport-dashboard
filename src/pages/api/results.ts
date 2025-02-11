import type { NextApiRequest, NextApiResponse } from 'next';

interface Match {
    id: number;
    team1: string;
    team1Score: number;
    team2: string;
    team2Score: number;
    date: string;
}

const mockResults: Match[] = [
    { id: 1, team1: 'Team A', team1Score: 2, team2: 'Team B', team2Score: 1, date: '2024-02-10' },
    { id: 2, team1: 'Team A', team1Score: 3, team2: 'Team C', team2Score: 4, date: '2024-02-09' },
    { id: 3, team1: 'Team A', team1Score: 1, team2: 'Team D', team2Score: 2, date: '2024-02-08' },
    { id: 4, team1: 'Team B', team1Score: 0, team2: 'Team C', team2Score: 2, date: '2024-02-07' },
    { id: 5, team1: 'Team B', team1Score: 4, team2: 'Team D', team2Score: 4, date: '2024-02-06' },
    { id: 6, team1: 'Team C', team1Score: 2, team2: 'Team D', team2Score: 3, date: '2024-02-05' },
    { id: 7, team1: 'Team A', team1Score: 1, team2: 'Team B', team2Score: 3, date: '2024-02-04' },
    { id: 8, team1: 'Team A', team1Score: 5, team2: 'Team C', team2Score: 2, date: '2024-02-03' },
    { id: 9, team1: 'Team A', team1Score: 0, team2: 'Team D', team2Score: 0, date: '2024-02-02' },
    { id: 10, team1: 'Team B', team1Score: 2, team2: 'Team C', team2Score: 2, date: '2024-02-01' },
    { id: 11, team1: 'Team B', team1Score: 3, team2: 'Team D', team2Score: 1, date: '2024-01-31' },
    { id: 12, team1: 'Team C', team1Score: 4, team2: 'Team D', team2Score: 3, date: '2024-01-30' },
];

export default function matchDataHandler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(mockResults);
}
