import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <title>Sport Dashboard</title>
                <meta name="description" content="Stay updated with the latest sports results!" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
