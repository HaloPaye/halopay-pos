import React from 'react';
import { Zap, Rocket, Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';
import SpecularButton from './SpecularButton';

export default function CtaSection() {
  return (
    <section className="py-24 bg-transparent">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <div className="bg-white/60 backdrop-blur-lg overflow-hidden border border-white/40 rounded-3xl py-12 lg:py-16 shadow-lg">
            <div className="gap-0 px-6 lg:px-12">
              <div className="grid gap-12 lg:grid-cols-2">
                {/* Left Content */}
                <div className="flex flex-col justify-center">
                  <div className="flex flex-col gap-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 font-bold text-blue-600 bg-blue-100 rounded-md w-fit text-xs uppercase tracking-widest">
                      <Rocket className="w-4 h-4" />
                      Launch Your Success
                    </div>

                    <div className="flex flex-col gap-4">
                      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl leading-tight">
                        HaloPaye is the vital bridge for local impact.
                      </h2>
                      <p className="text-gray-600 lg:text-lg leading-relaxed">
                        Join organizations leveraging our cutting-edge POS platform to empower local merchants, automate offline settlements, and deliver digital aid effectively.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row mt-4">
                      <SpecularButton 
                        as="a"
                        href="/pos" 
                        size="md"
                        className="w-full sm:w-auto"
                      >
                        <Zap className="w-5 h-5 mr-2" />
                        Launch Terminal
                      </SpecularButton>
                      <SpecularButton 
                        as="a"
                        href="https://github.com/HaloPaye" 
                        size="md"
                        tint="#ffffff"
                        textColor="#111827"
                        baseColor="#e5e7eb"
                        lineColor="#2563eb"
                        className="w-full sm:w-auto"
                      >
                        View GitHub
                      </SpecularButton>
                    </div>
                  </div>
                </div>

                {/* Right Content */}
                <div className="flex flex-col gap-6">
                  <a href="https://github.com/HaloPaye/halopay-pos" target="_blank" rel="noreferrer" className="group block bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl p-6 transition-colors hover:border-blue-300 shadow-sm hover:shadow-md">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-xl border border-blue-100">
                            <Smartphone className="text-blue-600 w-6 h-6" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">POS Terminal App</h3>
                        </div>
                        <ArrowRight className="text-gray-400 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        The progressive web app (PWA) used by merchants to generate SEP-7 QR codes and track offline payments.
                      </p>
                    </div>
                  </a>

                  <a href="https://github.com/HaloPaye/halopay-api" target="_blank" rel="noreferrer" className="group block bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl p-6 transition-colors hover:border-blue-300 shadow-sm hover:shadow-md">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-xl border border-blue-100">
                            <ShieldCheck className="text-blue-600 w-6 h-6" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">Settlement API</h3>
                        </div>
                        <ArrowRight className="text-gray-400 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
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
