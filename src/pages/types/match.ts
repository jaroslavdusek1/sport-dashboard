import { ReactNode } from "react";

/**
 * Props for the Layout component.
 */
export interface LayoutProps {
    children: ReactNode;
    darkMode: boolean;
    toggleDarkMode: () => void;
}

/**
 * Interface representing a match result.
 */
export interface Match {
    id: number;
    team1: string;
    team1Score: number;
    team2: string;
    team2Score: number;
    date: string;
}

/**
 * Props for the ResultsTable component.
 */
export interface ResultsTableProps {
    matches: Match[];
}
