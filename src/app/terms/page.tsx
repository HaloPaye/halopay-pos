export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Terms of Service</h1>
        <p className="text-sm text-slate-500">Last updated: August 5, 2026</p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the HaloPay Point-of-Sale (POS) terminal, you agree to comply with these Terms of Service. If you do not agree, you may not use the software.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">2. Description of Service</h2>
          <p>
            HaloPay provides a decentralized interface to the Stellar network. We facilitate the creation of SEP-0007 payment URIs and orchestrate SEP-24 fiat off-ramping via third-party anchors. HaloPay itself is not a bank or custodian.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">3. User Responsibilities</h2>
          <p>
            Merchants are responsible for maintaining the security of their Stellar secret keys. You agree to provide accurate KYC information when requested by an Anchor and to comply with all local laws regarding digital asset transactions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-100">4. Limitation of Liability</h2>
          <p>
            HaloPay is provided "as is" without warranties of any kind. We are not liable for lost funds due to compromised devices, incorrect exchange rate caching, or anchor downtime.
          </p>
        </section>
        
        <div className="pt-12">
          <a href="/" className="text-blue-400 hover:text-blue-300 transition-colors">&larr; Back to Home</a>
        </div>
      </div>
    </div>
  );
}
