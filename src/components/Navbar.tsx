import { AppBar, Toolbar, Typography, Box, Button, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import { JSX } from "react";

/**
 * Navbar component with navigation links and a dark mode toggle button.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.darkMode - Current theme mode (true for dark and false for light).
 * @param {() => void} props.toggleDarkMode - Function to toggle dark/light mode.
 * @returns {JSX.Element} The Navbar component.
 */
export default function Navbar({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }): JSX.Element {

    const router = useRouter();
    const theme = useTheme();

    return (
        <AppBar
            position="fixed"
            sx={{
                top: 0,
                left: 0,
                width: "100%",
                background: theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #121212, #1c1c1c, #292929)"
                    : "linear-gradient(135deg, #ffffff, #f5f5f5, #e0e0e0)",
                boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.9)",
                zIndex: 1000,
                transition: "all 0.3s ease-in-out",
                backdropFilter: "blur(10px)",
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 3,
                    py: 1,
                }}
            >
                {/* logo and text */}
                <Button
                    component={Link}
                    href="/"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        textTransform: "none",
                        color: "inherit",
                    }}
                >
                    <Box
                        component="img"
                        src="/navbar-icon-ball.png"
                        alt="Sport Icon"
                        sx={{ width: 80, height: "auto" }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            letterSpacing: "1.5px",
                            fontSize: "20px",
                            transition: "color 0.3s ease-in-out",
                            "&:hover": {
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        Sport Dashboard
                    </Typography>
                </Button>

                {/* links and dark mode toggle */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {[
                        { label: "Home", href: "/" },
                        { label: "Results", href: "/results" },
                    ].map((item) => (
                        <Button
                            key={item.label}
                            component={Link}
                            href={item.href}
                            sx={{
                                color: router.pathname === item.href ? theme.palette.primary.main : theme.palette.text.primary,
                                fontSize: "16px",
                                fontWeight: "500",
                                letterSpacing: "0.5px",
                                textTransform: "uppercase",
                                borderBottom: router.pathname === item.href ? `2px solid ${theme.palette.primary.main}` : "2px solid transparent",
                                transition: "all 0.3s ease-in-out",
                                "&:hover": {
                                    color: theme.palette.primary.main,
                                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                                },
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}

                    {/* dark mode toggle button */}
                    <IconButton onClick={toggleDarkMode} sx={{ color: theme.palette.text.primary }}>
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
