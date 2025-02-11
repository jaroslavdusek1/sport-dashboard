import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Box, useTheme } from "@mui/material";
import { JSX, ReactNode } from "react";
import { LayoutProps } from "@/pages/types/match";

/**
 * Layout component that wraps pages with a Navbar and Footer.
 *
 * @param {LayoutProps} props - Component props.
 * @param {ReactNode} props.children - The main content to render within the layout.
 * @param {boolean} props.darkMode - Indicates whether dark mode is enabled.
 * @param {() => void} props.toggleDarkMode - Function to toggle dark mode.
 * @returns {JSX.Element} The Layout component.
 */
export default function Layout({ children, darkMode, toggleDarkMode }: LayoutProps): JSX.Element {
    const theme = useTheme();

    return (
        <>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Box
                sx={{
                    paddingTop: "64px",
                    paddingBottom: "60px",
                    minHeight: "100vh",
                    background: theme.palette.background.default,
                }}
            >
                {children}
            </Box>
            <Footer />
        </>
    );
}
