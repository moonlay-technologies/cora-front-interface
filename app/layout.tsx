// import localFont from "next/font/local";
import "./globals.css";
import type {Metadata} from "next";
import {Inter} from 'next/font/google'
import {AvatarProvider} from "@/components/avatar/avatar-context";
import {ThemeProvider} from "next-themes";

const inter = Inter({subsets: ['latin']})

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
    title: "Virtual Frontdesk",
    description: "Virtual Frontdesk Keren",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={inter.className}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
        >
            <AvatarProvider>
                {children}
            </AvatarProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
