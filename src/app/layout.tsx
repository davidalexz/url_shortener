import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import './globals.css';

const quicksand = Quicksand({ subsets: ['latin'], weight: '600' });

export const metadata: Metadata = {
	title: 'URL Shortener',
	description:
		'A simple and efficient URL shortener that helps you create short, shareable links quickly.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" style={{ background: 'linear-gradient(145deg, #F7FFFF, #ADB5C4' }}>
			<body className={`${quicksand.className} min-h-screen`}>{children}</body>
		</html>
	);
}
