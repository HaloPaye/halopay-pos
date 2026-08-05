export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-sm text-slate-500">Last updated: August 5, 2026</p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">1. Information Collection</h2>
          <p>
            HaloPay collects information to provide better services to our merchants. This includes government-issued IDs for KYC purposes, submitted via SEP-12 protocols, and basic device diagnostics for application performance.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">2. Data Security</h2>
          <p>
            Your private cryptographic keys never leave your device. All sensitive KYC documents are encrypted and transmitted directly to the authorized Stellar Anchor via a secure TLS connection. HaloPay does not store your KYC photos on local servers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">3. Data Sharing</h2>
          <p>
            We share required compliance data strictly with partnered anchors (e.g., MoneyGram) to facilitate fiat off-ramping as mandated by international AML/KYC laws. We do not sell your personal data to third parties.
          </p>
        </section>
        
        <div className="pt-12">
          <a href="/" className="text-blue-400 hover:text-blue-300 transition-colors">&larr; Back to Home</a>
        </div>
      </div>
    </div>
  );
}
