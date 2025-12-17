import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Venkatesh Gondu | Full-Stack Developer & AI/ML Enthusiast',
    description: 'Portfolio of Venkatesh Gondu - Full-Stack Developer specializing in Java, Spring Boot, Python, and AI/ML technologies. VIT Amaravathi M.Tech student.',
    keywords: 'Full-Stack Developer, Java, Spring Boot, Python, AI/ML, React, Next.js, Portfolio',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
