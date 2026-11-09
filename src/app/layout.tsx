import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aurikrex Calc · Scientific PWA',
  description: 'Offline-first scientific calculator PWA for science students with live editable tape, unit dimensional analysis, and formula bank.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Aurikrex Calc',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0F172A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="icon" href="/icon-192.png" sizes="192x192" type="image/png" />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased overflow-hidden select-none">
        {children}
      </body>
    </html>
  );
}
