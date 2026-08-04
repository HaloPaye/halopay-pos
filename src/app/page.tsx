import Link from 'next/link';
import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-400/30">
      {/* Navbar */}
      <nav className="border-b border-slate-800 glass-panel sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-slate-950 font-bold">H</div>
            <span className="text-xl font-bold tracking-tight">HaloPay</span>
          </div>
          <Link 
            href="/pos" 
            className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold rounded-lg transition-colors"
          >
            Launch POS Terminal
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <section className="text-center py-20 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Empowering <span className="text-emerald-400">Humanitarian Aid</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Bridging digital humanitarian aid (USDC via SDP/Stellar Aid Assist) with local merchants in no-rail environments. A robust, offline-first Point of Sale terminal.
          </p>
          <Link 
            href="/pos" 
            className="inline-flex items-center px-8 py-4 text-lg font-bold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-full transition-transform hover:scale-105 shadow-glow-emerald"
          >
            Launch POS Terminal
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </section>

        {/* Features Grid */}
        <section className="py-20 border-t border-slate-800/50">
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard 
              title="Offline-First PWA" 
              description="Keep operating even when the internet drops. Progressive Web App technology ensures the terminal is always available."
              icon="⚡"
            />
            <FeatureCard 
              title="SEP-0007 Payment URIs" 
              description="Seamless interoperability with Stellar wallets via standard QR code generation for secure payment routing."
              icon="🔗"
            />
            <FeatureCard 
              title="SEP-24 Fiat Off-Ramp" 
              description="Integrated support for direct fiat withdrawals, allowing merchants to convert digital aid directly into local currency."
              icon="💱"
            />
            <FeatureCard 
              title="Real-Time WebSockets" 
              description="Instant payment confirmation notifications powered by Horizon and HaloPay's resilient websocket backend."
              icon="📡"
            />
          </div>
        </section>

        {/* Architecture Flow */}
        <section className="py-20 border-t border-slate-800/50">
          <h2 className="text-3xl font-bold text-center mb-12">System Architecture</h2>
          <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto flex justify-center">
            <svg width="100%" viewBox="0 0 800 300" className="text-slate-300 fill-current" xmlns="http://www.w3.org/2000/svg">
              {/* Terminal */}
              <rect x="50" y="100" width="140" height="80" rx="8" className="fill-slate-800 stroke-slate-600" strokeWidth="2"/>
              <text x="120" y="145" textAnchor="middle" className="text-sm font-mono fill-emerald-400">POS Terminal</text>
              
              {/* Arrow */}
              <path d="M 190 140 L 330 140" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <text x="260" y="130" textAnchor="middle" className="text-xs fill-slate-500">SEP-0007 QR</text>

              {/* Wallet */}
              <rect x="330" y="100" width="140" height="80" rx="8" className="fill-slate-800 stroke-slate-600" strokeWidth="2"/>
              <text x="400" y="145" textAnchor="middle" className="text-sm font-mono fill-emerald-400">Stellar Wallet</text>

              {/* Arrow */}
              <path d="M 470 140 L 610 140" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <text x="540" y="130" textAnchor="middle" className="text-xs fill-slate-500">Submit TX</text>

              {/* Network */}
              <circle cx="680" cy="140" r="50" className="fill-slate-800 stroke-emerald-500" strokeWidth="2"/>
              <text x="680" y="145" textAnchor="middle" className="text-sm font-mono fill-emerald-400">Network</text>

              {/* Feedback Loop */}
              <path d="M 680 190 Q 680 250 400 250 T 120 180" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead-green)"/>
              <text x="400" y="240" textAnchor="middle" className="text-xs fill-emerald-500">WebSocket Confirmation</text>

              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                </marker>
                <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#34d399" />
                </marker>
              </defs>
            </svg>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} HaloPay. Open source software.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: string }) {
  return (
    <div className="glass-panel p-8 rounded-xl hover:border-emerald-500/50 transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-slate-100">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
