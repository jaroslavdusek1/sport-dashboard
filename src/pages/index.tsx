import Link from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { JSX } from "react";

/**
 * Generates dynamic styles based on the active theme (dark or light).
 *
 * @param {Theme} theme - The Material UI theme object.
 * @returns {Record<string, SxProps<Theme>>} Object containing styles.
 */
 const getStyles = (theme: Theme): Record<string, SxProps<Theme>> => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
        textAlign: "center",
        background: theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #1c1c1c, #292929, #404040)"
            : "linear-gradient(135deg, #ffffff, #f0f0f0, #e0e0e0)",
        borderRadius: "12px",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
        p: 5,
    },
    title: {
        color: theme.palette.mode === "dark" ? "#ffffff" : "#1c1c1c",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "1px",
        textShadow: theme.palette.mode === "dark"
            ? "2px 2px 8px rgba(0, 0, 0, 0.7)"
            : "2px 2px 8px rgba(255, 255, 255, 0.5)",
        mb: 2,
    },
    subtitle: {
        color: theme.palette.mode === "dark" ? "#b0bec5" : "#333333",
        fontWeight: "300",
        mb: 3,
    },
    button: {
        background: theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #ff4081, #f50057)"
            : "linear-gradient(135deg, #d81b60, #880e4f)",
        fontSize: "18px",
        fontWeight: "bold",
        padding: "12px 24px",
        borderRadius: "8px",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
            background: theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #f50057, #ff4081)"
                : "linear-gradient(135deg, #ad1457, #6a1b9a)",
            transform: "scale(1.05)",
            boxShadow: "0px 4px 14px rgba(255, 64, 129, 0.6)",
        },
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },
});

/**
 * Home page component that displays a welcome message and a navigation button.
 * This component adapts dynamically to light/dark mode.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
 export default function Home(): JSX.Element {
    const theme = useTheme();
    const styles = getStyles(theme);

    return (
        <Container maxWidth="md" sx={styles.container}>
            <Typography variant="h2" sx={styles.title}>
                Welcome to Sport Dashboard
            </Typography>

            <Typography variant="h5" sx={styles.subtitle}>
                Stay updated with the latest sports results!
            </Typography>

            <Button variant="contained" sx={styles.button}>
                <Link href="/results" passHref legacyBehavior>
                    <Typography component="span" sx={styles.link}>
                        View Results
                    </Typography>
                </Link>
            </Button>
        </Container>
    );
}
