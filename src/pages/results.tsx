import { Container, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import ResultsTable from "@/components/ResultsTable";
import { CONFIG } from "./constants/config";
import { JSX } from "react";

/**
 * Interface representing a match result.
 */
interface Match {
    id: number;
    team1: string;
    team1Score: number;
    team2: string;
    team2Score: number;
    date: string;
}

/**
 * Props for the ResultsPage component.
 */
interface ResultsPageProps {
    matches: Match[];
}

/**
 * ResultsPage component that displays a list of sports match results.
 *
 * @param {ResultsPageProps} props - Component props.
 * @param {Match[]} props.matches - Array of match results.
 * @returns {JSX.Element} The rendered page component.
 */
export default function ResultsPage({ matches }: ResultsPageProps): JSX.Element {
    return (
        <Container sx={{ py: 4, textAlign: "center" }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#b0bec5" }}>
                Sports Results
            </Typography>
            <ResultsTable matches={matches} />
        </Container>
    );
}

/**
 * Fetches match results on the server side and passes them as props to the page.
 *
 * @returns {Promise<GetServerSidePropsResult<ResultsPageProps>>} An object containing match data as props.
 */
export const getServerSideProps: GetServerSideProps = async (): Promise<GetServerSidePropsResult<ResultsPageProps>> => {
    try {
        const result = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.API_RESULTS_ENDPOINT}`);

        if (!result.ok) {
            throw new Error(`HTTP error, status: ${result.status}`);
        }

        const data: Match[] = await result.json();

        if (!Array.isArray(data)) {
            throw new Error("Invalid data format received from API");
        }

        return {
            props: { matches: data },
        };
    } catch (error) {
        console.error("Error fetching match data:", error);
        return {
            props: { matches: [] },
        };
    }
};