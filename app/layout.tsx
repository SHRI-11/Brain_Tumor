import type { Metadata } from 'next';
import { Orbitron, Montserrat, Roboto } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '700', '900'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '600', '700'],
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'NeuroVision AI - AI-Powered Brain Tumor Detection',
  description: 'Discover, Diagnose, and Visualize brain tumors with 3D precision using AI technology.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${orbitron.variable} ${montserrat.variable} ${roboto.variable} font-roboto bg-neuro-dark text-neuro-white antialiased`}>
        {children}
      </body>
    </html>
  );
}

