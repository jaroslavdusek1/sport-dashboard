import { useState, useEffect, JSX } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    MenuItem,
    FormControl,
    Select,
    CircularProgress,
    TableSortLabel
} from "@mui/material";
import { Match, ResultsTableProps } from "@/pages/types/match";
import { TEAM_COLORS } from "@/pages/constants/teams";
import { SelectChangeEvent } from "@mui/material";

/**
 * ResultsTable component that displays a list of match results with sorting and filtering options.
 *
 * @param {ResultsTableProps} props - Component props.
 * @param {Match[]} props.matches - Array of match data.
 * @returns {JSX.Element} The ResultsTable component.
 */
export default function ResultsTable({ matches }: ResultsTableProps): JSX.Element {
    const [selectedTeam, setSelectedTeam] = useState<string>("All");
    const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showTimeoutMessage, setShowTimeoutMessage] = useState<boolean>(true);
    const [sortBy, setSortBy] = useState<keyof Match>("date");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

    useEffect(() => {
        // Simulating a 1500ms loading delay
        const timeout = setTimeout(() => {
            setFilteredMatches(matches);
            setLoading(false);
            setTimeout(() => setShowTimeoutMessage(false), 500);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [matches]);

    /**
     * Handles the change of the selected team for filtering.
     *
     * @param {React.ChangeEvent<{ value: unknown }>} event - The change event.
     */
     const handleFilterChange = (event: SelectChangeEvent<string>): void => {
        const team = event.target.value;
        setSelectedTeam(team);
        setLoading(true);
    
        setTimeout(() => {
            if (team === "All") {
                setFilteredMatches(matches);
            } else {
                setFilteredMatches(
                    matches.filter((match) => match.team1 === team || match.team2 === team)
                );
            }
            setLoading(false);
        }, 500);
    };

    /**
     * Handles sorting by column.
     *
     * @param {keyof Match} column - The column to sort by.
     */
    const handleSort = (column: keyof Match): void => {
        const isAsc = sortBy === column && sortDirection === "asc";
        setSortBy(column);
        setSortDirection(isAsc ? "desc" : "asc");

        const sortedData = [...filteredMatches].sort((a, b) => {
            if (column === "date") {
                return isAsc
                    ? new Date(a.date).getTime() - new Date(b.date).getTime()
                    : new Date(b.date).getTime() - new Date(a.date).getTime();
            }
            return isAsc ? (a[column] as number) - (b[column] as number) : (b[column] as number) - (a[column] as number);
        });

        setFilteredMatches(sortedData);
    };

    // Extract unique team names for filtering
    const uniqueTeams = ["All", ...new Set(matches.flatMap((match) => [match.team1, match.team2]))];

    return (
        <Box sx={{ width: "100%", mt: 3, px: 3 }}>
            {/* Message while loading */}
            {showTimeoutMessage && (
                <Typography
                    sx={{
                        position: "absolute",
                        top: 100,
                        right: 100,
                        background: "black",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "5px",
                        fontSize: "14px",
                        transition: "opacity 0.5s ease-in-out",
                    }}
                >
                    1500ms timeout due to be able to see data loading spinning icon...
                </Typography>
            )}

            {/* Dropdown filter */}
            <FormControl sx={{ mb: 2, width: 250 }}>
                <Select value={selectedTeam} onChange={handleFilterChange} displayEmpty
                    sx={{
                        backgroundColor: "#1e1e1e",
                        color: "white",
                        "& .MuiSelect-icon": { color: "white" },
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#b0bec5" },
                    }}
                >
                    {uniqueTeams.map((team) => (
                        <MenuItem key={team} value={team}
                            sx={{
                                color: team === "All" ? "white" : "inherit",
                                backgroundColor: team === "All" ? "#1e1e1e" : "inherit",
                                "&:hover": { backgroundColor: "#2a2a2a" },
                            }}
                        >
                            {team}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Loader */}
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper} sx={{ boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.2)" }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#1e1e1e" }}>
                                {[
                                    { id: "team1", label: "Team 1" },
                                    { id: "team1Score", label: "Score" },
                                    { id: "team2Score", label: "Score" },
                                    { id: "team2", label: "Team 2" },
                                    { id: "date", label: "Date" },
                                ].map((column) => (
                                    <TableCell key={column.id}
                                        sx={{ color: "white", fontWeight: "bold" }}
                                        sortDirection={sortBy === column.id ? sortDirection : false}
                                    >
                                        <TableSortLabel
                                            active={sortBy === column.id}
                                            direction={sortBy === column.id ? sortDirection : "asc"}
                                            onClick={() => handleSort(column.id as keyof Match)}
                                            sx={{
                                                color: "white",
                                                "&.MuiTableSortLabel-root": { color: "white" },
                                                "&.MuiTableSortLabel-root:hover": { color: "#b0bec5" },
                                                "&.Mui-active": { color: "#ffcc00" },
                                                "& .MuiTableSortLabel-icon": { color: "#ffcc00 !important" },
                                            }}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredMatches.length > 0 ? (
                                filteredMatches.map((match) => (
                                    <TableRow key={match.id}
                                        sx={{ "&:hover": { backgroundColor: "#333333" }, transition: "background-color 0.3s ease" }}
                                    >
                                        <TableCell sx={{ fontWeight: "bold", color: TEAM_COLORS[match.team1] || "white" }}>
                                            {match.team1}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>{match.team1Score}</TableCell>
                                        <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>{match.team2Score}</TableCell>
                                        <TableCell sx={{ fontWeight: "bold", color: TEAM_COLORS[match.team2] || "white" }}>
                                            {match.team2}
                                        </TableCell>
                                        <TableCell>{new Date(match.date).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} sx={{ textAlign: "center", py: 3, fontWeight: "bold", color: "gray" }}>
                                        No matches found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}
