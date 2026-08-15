
import React from 'react';
import { ShieldCheck, Smartphone, WifiOff, FileCheck, Landmark, Github, Twitter } from 'lucide-react';
import FAQ from '@/components/FAQ';
import CtaSection from '@/components/CtaSection';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';
import SpecularButton from '@/components/SpecularButton';
import PoweredByStellar from '@/components/PoweredByStellar';
import ScrollExpand from '@/components/ScrollExpand';
import { Reveal } from '@/components/Reveal';
import { DynamicVelaris as Velaris, DynamicAurora as AuroraBackground } from '@/components/ui/DynamicBackgrounds';
import CardNav from '@/components/ui/CardNav';
import { Footer } from '@/components/ui/footer';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import SplashOverlay from '@/components/SplashOverlay';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-transparent text-white font-sans selection:bg-blue-300 relative">
      <SplashOverlay />
      <div className="fixed inset-0 z-[-2]">
        <Velaris />
      </div>
      {/* Navbar */}
      <CardNav
        logo="/logo.png"
        logoAlt="HaloPaye Logo"
        baseColor="rgba(255, 255, 255, 0.05)"
        menuColor="#ffffff"
        buttonBgColor="#ffffff"
        buttonTextColor="#2563eb"
        items={[
          {
            label: "Product",
            bgColor: "rgba(255, 255, 255, 0.15)",
            textColor: "#ffffff",
            links: [
              { label: "Launch POS", href: "/pos", ariaLabel: "Launch POS" },
              { label: "Documentation", href: "https://halopay-docs.vercel.app", ariaLabel: "View Documentation" }
            ]
          },
          {
            label: "Developers", 
            bgColor: "rgba(255, 255, 255, 0.1)",
            textColor: "#ffffff",
            links: [
              { label: "GitHub Source", href: "https://github.com/HaloPaye", ariaLabel: "View Source on GitHub" },
              { label: "Settlement API", href: "https://github.com/HaloPaye/halopay-api", ariaLabel: "Settlement API Documentation" }
            ]
          },
          {
            label: "Organization",
            bgColor: "rgba(255, 255, 255, 0.05)", 
            textColor: "#ffffff",
            links: [
              { label: "Stellar SDF", href: "https://stellar.org", ariaLabel: "Stellar Development Foundation" },
              { label: "Aid Assist", href: "https://stellar.org/use-cases/stellar-for-aid", ariaLabel: "Stellar Aid Assist" }
            ]
          }
        ]}
        sectionLinks={[
          { label: "How it Works", href: "#how-it-works" },
          { label: "Architecture", href: "#architecture" },
          { label: "FAQ", href: "#faq" }
        ]}
      />

      <main>
        <section className="relative bg-transparent">
          <ScrollExpand
            useWindowScroll
            scrollHint="Scroll to explore"
            startWidth={75}
            startHeight={60}
            mediaZoom={1.0}
            overlayScrim={0}
            childrenMedia={<AuroraBackground variant="default" className="w-full h-full bg-blue-950" />}
            title={
              <div className="flex flex-col items-center mt-[-5vh] px-4 md:px-0 text-center">
                 <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight drop-shadow-sm">
                   The standard for <br/> <span className="text-blue-200">crypto point-of-sale</span>
                 </h1>
              </div>
            }
          >
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4 md:px-0">
              <p className="text-lg md:text-2xl text-blue-50 mb-10 leading-relaxed font-medium">
                Accept Stellar USDC instantly. Hardware-free setup, verifiable receipts, and zero hidden fees. Built for modern merchants.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <SpecularButton 
                  as="a"
                  href="/pos"
                  className="text-lg px-8 py-4 bg-white/10 text-white border border-white/30 hover:bg-white/20 font-bold backdrop-blur-md" 
                >
                  Launch POS
                </SpecularButton>
                <SpecularButton 
                  as="a"
                  href="https://halopay-docs.vercel.app"
                  className="text-lg px-8 py-4 bg-white/10 text-white border border-white/30 hover:bg-white/20 font-bold backdrop-blur-md"
                >
                  View Documentation
                </SpecularButton>
              </div>
            </div>
          </ScrollExpand>
        </section>

        {/* Phase 2: Core Messaging & Mechanism */}
        <section className="py-16 md:py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <h2 className="text-xs md:text-sm font-bold tracking-widest text-blue-200 uppercase mb-3">The Last-Mile Gap</h2>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                  Disbursement is solved. <br/> Spending is not.
                </h3>
                <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                  The SDF Disbursement Platform and Stellar Aid Assist have been a resounding success, surpassing <strong>$10M in lifetime disbursements</strong>. They have proven that digital delivery works at scale.
                </p>
                <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl border-l-4 border-l-white">
                  <h4 className="font-bold text-white mb-2">The Counter Reality</h4>
                  <p className="text-blue-50">
                    Without a merchant network, recipients in "no-rail" environments (like Haiti, Syria, or Gambia) must immediately cash out their USDC, adding heavy friction, travel costs, and security risks. Unlike regions with advanced digital rails (e.g., Pix in Brazil), these crisis zones require a dedicated, offline-capable merchant acceptance layer to keep value digital until the very last mile.
                  </p>
                </div>
              </div>
              
              <div className="relative mt-12 md:mt-0 flex justify-center w-full">
                {/* Pristine Mockup Presentation */}
                <div className="bg-gray-200 rounded-[2.5rem] p-2 w-[300px] sm:w-[320px] mx-auto shadow-2xl relative">
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
                <div className="absolute top-12 md:top-20 right-0 md:-right-8 bg-white px-3 md:px-4 py-2 rounded-xl shadow-lg border border-gray-200 text-xs md:text-sm font-bold flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                  halopay-pos (PWA)
                </div>
                <div className="absolute bottom-16 md:bottom-20 left-0 md:-left-12 bg-white px-3 md:px-4 py-2 rounded-xl shadow-lg border border-gray-200 text-xs md:text-sm font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  halopay-api (Settlement)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 2: How It Works */}
        <section id="how-it-works" className="pt-16 md:pt-24 pb-4 md:pb-8 bg-transparent">
          <Reveal>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">How it Works</h2>
                <p className="text-base md:text-lg text-blue-100 max-w-2xl mx-auto">A secure, resilient pipeline designed strictly for legitimate merchants.</p>
              </div>
            </div>
          </Reveal>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full mx-auto relative mt-8 md:mt-12">
              <ScrollStack useWindowScroll={true}>
                <ScrollStackItem itemClassName="flex flex-col justify-center bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-blue-900/20 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-16">
                  <ProcessStep 
                    num="1" 
                    icon={<FileCheck className="w-8 h-8 md:w-10 md:h-10" />}
                    title="Compliant Onboarding"
                    desc="Merchants with valid government ID submit docs via halopay-api. Securely routed for standard 1–3 day SEP-12 KYC verification via MoneyGram."
                  />
                </ScrollStackItem>
                <ScrollStackItem itemClassName="flex flex-col justify-center bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-blue-900/20 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-16">
                  <ProcessStep 
                    num="2"
                    icon={<Smartphone className="w-8 h-8 md:w-10 md:h-10" />}
                    title="Native USDC Acceptance"
                    desc="The PWA POS generates standard Stellar payment QR codes. Recipients pay instantly from their USDC Aid Assist balance."
                  />
                </ScrollStackItem>
                <ScrollStackItem itemClassName="flex flex-col justify-center bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-blue-900/20 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-16">
                  <ProcessStep 
                    num="3"
                    icon={<WifiOff className="w-8 h-8 md:w-10 md:h-10" />}
                    title="Offline-Capable Pricing"
                    desc="Generate QR codes even offline using securely cached exchange rates. The UI surfaces a clear staleness indicator when connectivity is low."
                  />
                </ScrollStackItem>
                <ScrollStackItem itemClassName="flex flex-col justify-center bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-blue-900/20 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-16">
                  <ProcessStep 
                    num="4"
                    icon={<Landmark className="w-8 h-8 md:w-10 md:h-10" />}
                    title="Automatic Settlement"
                    desc="halopay-api programmatically aggregates balances and initiates a daily SEP-24 withdrawal to the merchant's MoneyGram location."
                  />
                </ScrollStackItem>
              </ScrollStack>
            </div>
          </div>
        </section>

        {/* Phase 3: Technical Integrity */}
        <section id="architecture" className="pt-4 pb-24 bg-transparent">
          <Reveal>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Architecture Overview</h2>
                <p className="text-lg text-blue-100 max-w-3xl mx-auto">
                  HaloPaye targets true "no-rail" environments, serving as a complementary extension to the SDF stack where traditional payment rails do not exist.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ArchitectureDiagram />
          </div>
        </section>

        {/* Built on Stellar */}
        <Reveal direction="up" delay={0.2}>
          <PoweredByStellar />
        </Reveal>

        {/* Phase 3: FAQ */}
        <section id="faq" className="bg-transparent">
          <Reveal direction="up" delay={0.2}>
            <FAQ />
          </Reveal>
        </section>

        {/* Phase 4: Final CTA */}
        <Reveal direction="none" delay={0.2}>
          <CtaSection />
        </Reveal>
      </main>

      <Footer
        logo={<img src="/logo.png" alt="HaloPaye Logo" className="h-8 w-8" />}
        brandName="HaloPaye"
        socialLinks={[
          {
            icon: <Twitter className="h-5 w-5" />,
            href: "https://twitter.com/stellarorg",
            label: "Twitter",
          },
          {
            icon: <Github className="h-5 w-5" />,
            href: "https://github.com/HaloPaye",
            label: "GitHub",
          },
        ]}
        mainLinks={[
          { href: "/pos", label: "Launch POS" },
          { href: "https://github.com/HaloPaye", label: "Source" },
          { href: "#how-it-works", label: "How it works" },
          { href: "https://stellar.org", label: "Stellar" },
          { href: "https://stellar.org/use-cases/stellar-for-aid", label: "Aid Assist" },
        ]}
        legalLinks={[
          { href: "/privacy", label: "Privacy" },
          { href: "/terms", label: "Terms" },
        ]}
        copyright={{
          text: `© ${new Date().getFullYear()} HaloPaye Foundation`,
          license: "Open source software",
        }}
      />
      
    </div>
  );
}

function ProcessStep({ num, title, desc, icon }: { num: string, title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 text-white font-black text-xl md:text-2xl rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-inner">
        {num}
      </div>
      <div className="mb-3 md:mb-4 text-white">
        {icon}
      </div>
      <h3 className="font-extrabold text-white mb-3 md:mb-4 text-2xl md:text-3xl">{title}</h3>
      <p className="text-base md:text-lg text-blue-50 leading-relaxed max-w-2xl">{desc}</p>
    </div>
  );
}
