import type { Metadata } from 'next';
import { Sora, Public_Sans } from 'next/font/google';
import './globals.css';
import { RootLayoutWrapper } from '@/components/root-layout-wrapper';

const displayFont = Sora({
  variable: '--font-display',
  subsets: ['latin'],
});

const bodyFont = Public_Sans({
  variable: '--font-body',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Agromir SH | Anvelope Second Hand',
  description:
    'Platforma moderna pentru anvelope agricole second hand, cu cautare rapida si experienta simplificata.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="site-shell">
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}
