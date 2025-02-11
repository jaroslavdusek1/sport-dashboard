import Head from "next/head";
import { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
});

// default dark mode value
export default function MyApp({ Component, pageProps }: AppProps) {
    const [darkMode, setDarkMode] = useState(true);

    // load option from local storage
    useEffect(() => {
        const storedMode = localStorage.getItem("darkMode");
        if (storedMode) {
            setDarkMode(storedMode === "true");
        }
    }, []);

    // theme toggle
    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem("darkMode", String(newMode));
            return newMode;
        });
    };

    // create a theme
    const theme = createTheme({
        typography: {
            fontFamily: roboto.style.fontFamily,
        },
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: {
                main: "#1976d2",
            },
            secondary: {
                main: "#f50057",
            },
            background: {
                default: darkMode ? "#121212" : "#ffffff",
                paper: darkMode ? "#1c1c1c" : "#f5f5f5",
            },
            text: {
                primary: darkMode ? "#ffffff" : "#121212",
                secondary: darkMode ? "#b0bec5" : "#616161",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>Sport Dashboard</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <CssBaseline />
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
}