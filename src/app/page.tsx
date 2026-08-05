import Link from 'next/link';
import React from 'react';
import { ArrowRight, Globe2, ShieldCheck, Smartphone, WifiOff, FileCheck, Landmark, HelpCircle, Rocket } from 'lucide-react';
import FAQ from '@/components/FAQ';
import CtaSection from '@/components/CtaSection';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';
import SpecularButton from '@/components/SpecularButton';
import PoweredByStellar from '@/components/PoweredByStellar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="HaloPaye Logo" className="w-8 h-8 object-contain rounded-md" />
            <span className="text-xl font-bold tracking-tight text-gray-900">HaloPaye</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/pos" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
              POS Terminal
            </Link>
            <SpecularButton
              as="a"
              href="https://github.com/HaloPaye/halopay-pos"
              className="!px-5 !py-2.5 !text-sm"
              size="sm"
            >
              View GitHub
            </SpecularButton>
          </div>
        </div>
      </nav>

      <main>
        {/* Phase 1: Hero Section */}
        <section className="relative overflow-hidden bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 flex flex-col items-center text-center">
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-gray-900 max-w-4xl leading-tight">
              Bridging Humanitarian Aid and <br className="hidden md:block"/>
              <span className="text-blue-600">Local Informal Commerce</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mb-12 leading-relaxed font-medium">
              HaloPaye provides true "no-rail" crisis zones with merchant-side POS systems, allowing local vendors to natively accept digital aid (USDC) and receive compliant settlement via MoneyGram.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <SpecularButton 
                as={Link}
                href="/pos" 
                size="lg"
                className="w-full sm:w-auto min-w-[240px]"
              >
                Launch POS Terminal
                <ArrowRight className="w-5 h-5 ml-2" />
              </SpecularButton>
              <SpecularButton 
                as="a"
                href="#how-it-works" 
                size="lg"
                tint="#ffffff"
                textColor="#111827"
                baseColor="#e5e7eb"
                lineColor="#2563eb"
                className="w-full sm:w-auto min-w-[240px]"
              >
                Learn More
              </SpecularButton>
            </div>

            {/* Abstracted Bridge Visual */}
            <div className="mt-20 w-full max-w-5xl mx-auto">
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-sm flex items-center justify-between relative overflow-hidden hidden md:flex">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
                {/* Left: Digital Aid */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm z-10 w-64 text-left">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Digital Aid (USDC)</h3>
                  <p className="text-sm text-gray-500">Powered by Stellar Network</p>
                </div>
                
                {/* Center: The Bridge */}
                <div className="flex-1 flex items-center justify-center relative z-0 px-8">
                  <div className="w-full h-1 bg-gray-200 absolute top-1/2 -translate-y-1/2"></div>
                  <div className="w-full h-1 bg-blue-600 absolute top-1/2 -translate-y-1/2 scale-x-0 origin-left animate-[grow_1.5s_ease-out_forwards]"></div>
                  <div className="bg-white px-6 py-3 rounded-full border-2 border-blue-600 text-blue-600 font-bold z-10 shadow-sm">
                    HaloPaye Bridge
                  </div>
                </div>

                {/* Right: Local Commerce */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm z-10 w-64 text-right">
                  <div className="w-12 h-12 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center mb-4 ml-auto">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Local Merchant</h3>
                  <p className="text-sm text-gray-500">Fiat Cash-out via MoneyGram</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 2: Core Messaging & Mechanism */}
        <section className="py-24 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">The Last-Mile Gap</h2>
                <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                  Disbursement is solved. <br/> Spending is not.
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  The SDF Disbursement Platform and Stellar Aid Assist have been a resounding success, surpassing <strong>$10M in lifetime disbursements</strong>. They have proven that digital delivery works at scale.
                </p>
                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm border-l-4 border-l-blue-600">
                  <h4 className="font-bold text-gray-900 mb-2">The Counter Reality</h4>
                  <p className="text-gray-600">
                    Without a merchant network, recipients in "no-rail" environments (like Haiti, Syria, or Gambia) must immediately cash out their USDC, adding heavy friction, travel costs, and security risks. Unlike regions with advanced digital rails (e.g., Pix in Brazil), these crisis zones require a dedicated, offline-capable merchant acceptance layer to keep value digital until the very last mile.
                  </p>
                </div>
              </div>
              
              <div className="relative hidden md:block">
                {/* Pristine Mockup Presentation */}
                <div className="bg-gray-200 rounded-[2.5rem] p-2 w-[320px] mx-auto shadow-2xl relative">
                  <div className="bg-white rounded-[2.25rem] overflow-hidden h-[640px] flex flex-col relative border border-gray-100">
                    {/* Mockup Header */}
                    <div className="px-6 pt-12 pb-4 border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 font-bold text-xs">H</div>
                        <span className="font-bold text-gray-900 text-sm">Vendor Name</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <WifiOff className="w-4 h-4 text-red-500" />
                      </div>
                    </div>
                    {/* Mockup Body */}
                    <div className="flex-1 px-6 py-8 flex flex-col justify-center">
                      <div className="text-center mb-8">
                        <div className="text-xs font-semibold text-gray-500 mb-2">Charge Amount</div>
                        <div className="text-5xl font-extrabold text-gray-900 tracking-tight">3,500 <span className="text-2xl text-gray-400">HTG</span></div>
                        <div className="mt-3 inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                          ≈ 26.51 USDC
                        </div>
                      </div>
                      {/* Keypad Mockup */}
                      <div className="grid grid-cols-3 gap-2 mt-auto">
                        {[1,2,3,4,5,6,7,8,9,'.',0,'C'].map(k => (
                          <div key={k} className="h-14 bg-white border border-gray-200 rounded-2xl flex items-center justify-center font-bold text-xl text-gray-900 shadow-sm">
                            {k}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <div className="h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                          Charge
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating Labels */}
                <div className="absolute top-20 -right-8 bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-200 text-sm font-bold flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                  halopay-pos (PWA)
                </div>
                <div className="absolute bottom-20 -left-12 bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-200 text-sm font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  halopay-api (Settlement)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 2: How It Works */}
        <section id="how-it-works" className="py-24 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">How it Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">A secure, resilient pipeline designed strictly for legitimate merchants.</p>
            </div>

            <div className="w-full mx-auto relative mt-12 mb-32">
              <ScrollStack useWindowScroll={true}>
                <ScrollStackItem itemClassName="flex flex-col justify-center bg-white border border-gray-200 shadow-xl shadow-gray-200/40 rounded-[2.5rem] p-10 lg:p-16">
                  <ProcessStep 
                    num="1" 
                    icon={<FileCheck className="w-10 h-10" />}
                    title="Compliant Onboarding"
                    desc="Merchants with valid government ID submit docs via halopay-api. Securely routed for standard 1–3 day SEP-12 KYC verification via MoneyGram."
                  />
                </ScrollStackItem>
                <ScrollStackItem itemClassName="flex flex-col justify-center bg-white border border-gray-200 shadow-xl shadow-gray-200/40 rounded-[2.5rem] p-10 lg:p-16">
                  <ProcessStep 
                    num="2"
                    icon={<Smartphone className="w-10 h-10" />}
                    title="Native USDC Acceptance"
                    desc="The PWA POS generates standard Stellar payment QR codes. Recipients pay instantly from their USDC Aid Assist balance."
                  />
                </ScrollStackItem>
                <ScrollStackItem itemClassName="flex flex-col justify-center bg-white border border-gray-200 shadow-xl shadow-gray-200/40 rounded-[2.5rem] p-10 lg:p-16">
                  <ProcessStep 
                    num="3"
                    icon={<WifiOff className="w-10 h-10" />}
                    title="Offline-Capable Pricing"
                    desc="Generate QR codes even offline using securely cached exchange rates. The UI surfaces a clear staleness indicator when connectivity is low."
                  />
                </ScrollStackItem>
                <ScrollStackItem itemClassName="flex flex-col justify-center bg-white border border-gray-200 shadow-xl shadow-gray-200/40 rounded-[2.5rem] p-10 lg:p-16">
                  <ProcessStep 
                    num="4"
                    icon={<Landmark className="w-10 h-10" />}
                    title="Automatic Settlement"
                    desc="halopay-api programmatically aggregates balances and initiates a daily SEP-24 withdrawal to the merchant's MoneyGram location."
                  />
                </ScrollStackItem>
              </ScrollStack>
            </div>
          </div>
        </section>

        {/* Phase 3: Technical Integrity */}
        <section className="py-24 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Architecture Overview</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                HaloPaye targets true "no-rail" environments, serving as a complementary extension to the SDF stack where traditional payment rails do not exist.
              </p>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-200 max-w-5xl mx-auto hidden md:block">
              {/* Technical Diagram SVG */}
              <div className="overflow-x-auto">
                <svg className="w-full min-w-[700px] text-gray-900" viewBox="0 0 900 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* PWA Node */}
                  <rect x="50" y="150" width="160" height="100" rx="16" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2"/>
                  <text x="130" y="195" textAnchor="middle" className="text-base font-bold fill-gray-900">halopay-pos</text>
                  <text x="130" y="215" textAnchor="middle" className="text-sm font-medium fill-gray-500">React / TypeScript</text>
                  
                  {/* API Node */}
                  <rect x="370" y="150" width="160" height="100" rx="16" fill="#ffffff" stroke="#2563eb" strokeWidth="2"/>
                  <text x="450" y="195" textAnchor="middle" className="text-base font-bold fill-blue-600">halopay-api</text>
                  <text x="450" y="215" textAnchor="middle" className="text-sm font-medium fill-gray-500">Node / Express</text>

                  {/* Network Node */}
                  <rect x="690" y="50" width="160" height="100" rx="16" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="2"/>
                  <text x="770" y="95" textAnchor="middle" className="text-base font-bold fill-gray-900">Stellar Horizon</text>
                  <text x="770" y="115" textAnchor="middle" className="text-sm font-medium fill-gray-500">Mainnet</text>

                  {/* MoneyGram Node */}
                  <rect x="690" y="250" width="160" height="100" rx="16" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="2"/>
                  <text x="770" y="295" textAnchor="middle" className="text-base font-bold fill-gray-900">MoneyGram Anchor</text>
                  <text x="770" y="315" textAnchor="middle" className="text-sm font-medium fill-gray-500">SEP-10, 12, 24, 9</text>

                  {/* Lines */}
                  {/* POS -> API */}
                  <path d="M 210 200 L 370 200" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-gray)"/>
                  <text x="290" y="190" textAnchor="middle" className="text-xs font-semibold fill-gray-500">Sync / Config</text>

                  {/* API -> Horizon */}
                  <path d="M 490 150 Q 590 100 690 100" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrow-blue)"/>
                  <text x="590" y="115" textAnchor="middle" className="text-xs font-semibold fill-blue-600">Tx Submit / Listen</text>

                  {/* API -> MoneyGram */}
                  <path d="M 490 250 Q 590 300 690 300" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrow-blue)"/>
                  <text x="590" y="295" textAnchor="middle" className="text-xs font-semibold fill-blue-600">KYC Payload / Settle</text>

                  <defs>
                    <marker id="arrow-gray" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                      <polygon points="0 0, 10 5, 0 10" fill="#9ca3af" />
                    </marker>
                    <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                      <polygon points="0 0, 10 5, 0 10" fill="#2563eb" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Built on Stellar */}
        <PoweredByStellar />

        {/* Phase 3: FAQ */}
        <FAQ />

        {/* Phase 4: Final CTA */}
        <CtaSection />
      </main>

      <footer className="bg-gray-900 py-12 text-center text-gray-500 text-sm border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <img src="/logo.png" alt="HaloPaye" className="w-6 h-6 grayscale opacity-50" />
            <span className="font-bold text-gray-400">HaloPaye</span>
          </div>
          <p>&copy; {new Date().getFullYear()} HaloPaye Foundation. Open source software.</p>
        </div>
      </footer>
    </div>
  );
}

function ProcessStep({ num, title, desc, icon }: { num: string, title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="w-16 h-16 bg-blue-100 text-blue-600 font-black text-2xl rounded-2xl flex items-center justify-center mb-6">
        {num}
      </div>
      <div className="mb-4 text-blue-600">
        {icon}
      </div>
      <h3 className="font-extrabold text-gray-900 mb-4 text-3xl">{title}</h3>
      <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">{desc}</p>
    </div>
  );
}

function FaqItem({ q, a }: { q: string, a: string }) {
  return (
    <div className="pb-6 border-b border-gray-200 last:border-0">
      <h4 className="text-lg font-bold text-gray-900 mb-2">{q}</h4>
      <p className="text-gray-600 leading-relaxed">{a}</p>
    </div>
  );
}
