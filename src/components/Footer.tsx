import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { JSX } from "react";
import { FOOTER_LINKS } from "@/constants/teams";

const socialLinks = [
    { icon: <Facebook />, href: "https://www.facebook.com", color: "#1877F2" },
    { icon: <Twitter />, href: "https://twitter.com", color: "#1DA1F2" },
    { icon: <Instagram />, href: "https://www.instagram.com", color: "#E1306C" },
    { icon: <LinkedIn />, href: "https://www.linkedin.com", color: "#0077B5" },
];

// const footerLinks = ["About Us", "Privacy Policy", "Terms of Service"];

/**
 * Footer component for the Sport Dashboard.
 * 
 * This component displays:
 * - Copyright information.
 * - Footer navigation links.
 * - Social media icons with links.
 * 
 * The footer automatically adapts to the theme (light/dark mode).
 * 
 * @returns {JSX.Element} The rendered Footer component.
 */
export default function Footer(): JSX.Element {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";

    return (
        <Box
            component="footer"
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                background: isDarkMode
                    ? "linear-gradient(135deg, #1e1e1e, #2a2a2a, #404040)"
                    : "linear-gradient(135deg, #f5f5f5, #e0e0e0, #cfcfcf)",
                boxShadow: isDarkMode
                    ? "0px -4px 12px rgba(0, 0, 0, 0.6)"
                    : "0px -4px 12px rgba(255, 255, 255, 0.6)",
                color: isDarkMode ? "white" : "black",
                textAlign: "center",
                py: 2,
                fontSize: "14px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                    background: isDarkMode
                        ? "linear-gradient(135deg, #252525, #333333, #505050)"
                        : "linear-gradient(135deg, #e5e5e5, #d5d5d5, #bfbfbf)",
                },
            }}
        >
            <Typography variant="body2" sx={{ mb: 1 }}>
                © 2024 Sport Dashboard
            </Typography>

            {/* footer Links */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 1 }}>
                {FOOTER_LINKS.map((text) => (
                    <Typography
                        key={text}
                        variant="body2"
                        sx={{
                            cursor: "pointer",
                            transition: "color 0.3s ease-in-out",
                            "&:hover": { color: isDarkMode ? "#B0B0B0" : "#555555" },
                        }}
                    >
                        {text}
                    </Typography>
                ))}
            </Box>

            {/* social Icons */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                {socialLinks.map(({ icon, href, color }) => (
                    <IconButton
                        key={href}
                        component="a"
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            color,
                            transition: "color 0.3s ease-in-out",
                            "&:hover": { color: isDarkMode ? "#B0B0B0" : "#555555" },
                        }}
                    >
                        {icon}
                    </IconButton>
                ))}
            </Box>
        </Box>
    );
}
