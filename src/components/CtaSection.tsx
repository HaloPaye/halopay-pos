import React from 'react';
import { Zap, Rocket, Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <div className="bg-white/10 backdrop-blur-xl overflow-hidden border border-white/20 rounded-3xl py-10 lg:py-16 shadow-2xl shadow-blue-900/20">
            <div className="gap-0 px-4 md:px-6 lg:px-12">
              <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
                {/* Left Content */}
                <div className="flex flex-col justify-center">
                  <div className="flex flex-col gap-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 font-bold text-blue-900 bg-blue-50 rounded-md w-fit text-xs uppercase tracking-widest mx-auto lg:mx-0">
                      <Rocket className="w-4 h-4" />
                      Launch Your Success
                    </div>

                    <div className="flex flex-col gap-4 text-center lg:text-left">
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white lg:text-4xl leading-tight">
                        HaloPaye is the vital bridge for local impact.
                      </h2>
                      <p className="text-blue-100 text-base lg:text-lg leading-relaxed">
                        Join organizations leveraging our cutting-edge POS platform to empower local merchants, automate offline settlements, and deliver digital aid effectively.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row mt-4">
                      <Link 
                        href="/pos" 
                        className="w-full sm:w-auto flex items-center justify-center text-base px-8 py-4 bg-blue-600/90 text-white border border-blue-400/50 hover:bg-blue-500 font-bold backdrop-blur-md rounded-xl transition-colors shadow-lg shadow-blue-900/20"
                      >
                        <Zap className="w-5 h-5 mr-2" />
                        Launch Terminal
                      </Link>
                      <a 
                        href="https://github.com/HaloPaye" 
                        className="w-full sm:w-auto flex items-center justify-center text-base px-8 py-4 bg-white/10 text-white border border-white/30 hover:bg-white/20 font-bold backdrop-blur-md rounded-xl transition-colors"
                      >
                        View GitHub
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Content */}
                <div className="flex flex-col gap-6">
                  <a href="https://github.com/HaloPaye/halopay-pos" target="_blank" rel="noreferrer" className="group block bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400 shadow-2xl shadow-blue-900/20">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-950/50 flex items-center justify-center rounded-xl border border-blue-800">
                            <Smartphone className="text-blue-300 w-6 h-6" />
                          </div>
                          <h3 className="text-lg font-bold text-white">POS Terminal App</h3>
                        </div>
                        <ArrowRight className="text-blue-400 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                      </div>
                      <p className="text-blue-200 text-sm leading-relaxed">
                        The progressive web app (PWA) used by merchants to generate SEP-7 QR codes and track offline payments.
                      </p>
                    </div>
                  </a>

                  <a href="https://github.com/HaloPaye/halopay-api" target="_blank" rel="noreferrer" className="group block bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400 shadow-2xl shadow-blue-900/20">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-950/50 flex items-center justify-center rounded-xl border border-blue-800">
                            <ShieldCheck className="text-blue-300 w-6 h-6" />
                          </div>
                          <h3 className="text-lg font-bold text-white">Settlement API</h3>
                        </div>
                        <ArrowRight className="text-blue-400 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                      </div>
                      <p className="text-blue-200 text-sm leading-relaxed">
                        The Node.js backend handling SEP-12 KYC compliance and automated SEP-24 withdrawals via MoneyGram.
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
