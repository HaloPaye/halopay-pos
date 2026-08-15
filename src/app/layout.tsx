import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HaloPay POS | Offline SEP-0007 Merchant Terminal',
  description: 'Instant offline-ready crypto POS terminal for merchants. Converts fiat to USDC over Stellar SEP-0007 protocol.',
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#3b82f6] text-slate-50 min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900 font-sans">
        <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<!--
THESIS: A highly polished, hyper-reliable POS terminal matching Stripe Terminal and Square POS standards, refusing the neon crypto-wallet default.
OWN-WORLD: Minimalist, stark white backgrounds, soft drop shadows, clean borders, high-contrast typography, and a prominent blue or brand-colored primary action.
STORY: The merchant enters a fiat amount, generates a QR code, and receives instant confirmation offline or online without blockchain jargon.
FIRST VIEWPORT: A clean, large-target numeric keypad occupying the lower half, a crisp fiat display above it, and a prominent 'Generate QR' button.
FORM: The category standard (Canon exit, seed key 2405ff6d).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->` }} />
        
        {children}

        {/* PWA Service Worker Registration Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('[HaloPay PWA] ServiceWorker registered with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('[HaloPay PWA] ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
