"use client";
import React from 'react';
import { Smartphone, Server, Globe2, Landmark, ArrowDown, Cpu, Activity, ShieldCheck, Database } from 'lucide-react';

export default function ArchitectureDiagram() {
  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-[2.5rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-blue-900/20 overflow-hidden">
      
      {/* Dynamic Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      <style>{`
        @keyframes flow {
          from { stroke-dashoffset: 40; }
          to { stroke-dashoffset: 0; }
        }
        .path-flow {
          stroke-dasharray: 6 12;
          animation: flow 1s linear infinite;
        }
        @keyframes float-node {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-node {
          animation: float-node 6s ease-in-out infinite;
        }
      `}</style>

      {/* --- DESKTOP VIEW (Fully scalable SVG with foreignObject) --- */}
      <div className="hidden md:block w-full">
        <svg className="w-full h-auto" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
            <linearGradient id="indigo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Paths */}
          {/* POS (180, 250) to API (500, 250) */}
          <path d="M 260 250 L 420 250" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
          <path d="M 260 250 L 420 250" fill="none" stroke="url(#blue-gradient)" strokeWidth="3" className="path-flow" filter="url(#glow)" />
          
          {/* API (500, 250) to Stellar (820, 140) */}
          <path d="M 580 250 C 650 250, 680 140, 740 140" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
          <path d="M 580 250 C 650 250, 680 140, 740 140" fill="none" stroke="url(#indigo-gradient)" strokeWidth="3" className="path-flow" filter="url(#glow)" />

          {/* API (500, 250) to MoneyGram (820, 360) */}
          <path d="M 580 250 C 650 250, 680 360, 740 360" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
          <path d="M 580 250 C 650 250, 680 360, 740 360" fill="none" stroke="url(#emerald-gradient)" strokeWidth="3" className="path-flow" filter="url(#glow)" />

          {/* Path Labels */}
          <g transform="translate(340, 230)">
             <rect x="-50" y="-15" width="100" height="30" rx="15" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5" opacity="0.95"/>
             <text x="0" y="4" fill="#bfdbfe" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="1">SYNC / API</text>
          </g>

          <g transform="translate(660, 195)">
             <rect x="-55" y="-15" width="110" height="30" rx="15" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" opacity="0.95"/>
             <text x="0" y="4" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="1">TX SUBMIT</text>
          </g>

          <g transform="translate(660, 305)">
             <rect x="-60" y="-15" width="120" height="30" rx="15" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" opacity="0.95"/>
             <text x="0" y="4" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="1">KYC / SETTLE</text>
          </g>

          {/* Nodes via foreignObject */}
          <DesktopNode x={80} y={150} icon={Smartphone} color="#60A5FA" title="halopay-pos" sub="PWA Terminal" delay="0s" badges={[{ icon: Cpu, label: "React" }]} />
          <DesktopNode x={400} y={150} icon={Server} color="#3B82F6" title="halopay-api" sub="Settlement Engine" delay="0.5s" badges={[{ icon: Database, label: "Express" }, { icon: ShieldCheck, label: "Secure" }]} />
          <DesktopNode x={720} y={40} icon={Globe2} color="#818CF8" title="Stellar Horizon" sub="Global Mainnet" delay="1s" badges={[{ icon: Activity, label: "Consensus" }]} />
          <DesktopNode x={720} y={260} icon={Landmark} color="#34D399" title="MoneyGram Anchor" sub="Cash Out Rail" delay="1.5s" badges={[{ icon: ShieldCheck, label: "SEP-24" }]} />
        </svg>
      </div>

      {/* --- MOBILE VIEW (Flex Column) --- */}
      <div className="md:hidden flex flex-col items-center justify-center p-8 pt-12 gap-8 relative z-10">
        <MobileNode icon={Smartphone} color="#60A5FA" title="halopay-pos" sub="PWA Terminal" />
        
        <div className="flex flex-col items-center -my-2">
          <div className="text-xs text-blue-200 font-bold uppercase tracking-widest mb-2 bg-blue-900/80 px-4 py-2 rounded-full border border-blue-500/50 shadow-md z-10">Sync / API</div>
          <div className="h-12 w-px border-l-2 border-dashed border-blue-400/80 -mt-2" />
          <ArrowDown className="w-6 h-6 text-blue-400 -mt-2" />
        </div>

        <MobileNode icon={Server} color="#3B82F6" title="halopay-api" sub="Settlement Engine" />

        <div className="flex w-full items-start justify-center gap-4 mt-6">
          <div className="flex flex-col items-center w-1/2">
             <div className="h-16 w-full border-t-2 border-l-2 border-dashed border-indigo-400/80 rounded-tl-2xl mb-[-2px]" />
             <div className="text-[10px] text-indigo-200 font-bold uppercase tracking-widest my-2 bg-indigo-900/80 px-3 py-1.5 rounded-full border border-indigo-500/50 shadow-md text-center z-10 -mt-8">Tx Submit</div>
             <ArrowDown className="w-6 h-6 text-indigo-400 -mt-2" />
             <div className="mt-2"><MobileNode icon={Globe2} color="#818CF8" title="Stellar" sub="Mainnet" /></div>
          </div>

          <div className="flex flex-col items-center w-1/2">
             <div className="h-16 w-full border-t-2 border-r-2 border-dashed border-emerald-400/80 rounded-tr-2xl mb-[-2px]" />
             <div className="text-[10px] text-emerald-200 font-bold uppercase tracking-widest my-2 bg-emerald-900/80 px-3 py-1.5 rounded-full border border-emerald-500/50 shadow-md text-center z-10 -mt-8">KYC / Settle</div>
             <ArrowDown className="w-6 h-6 text-emerald-400 -mt-2" />
             <div className="mt-2"><MobileNode icon={Landmark} color="#34D399" title="MoneyGram" sub="Anchor" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopNode({ x, y, icon: Icon, color, title, sub, delay, badges = [] }: any) {
  return (
    <foreignObject x={x} y={y} width="200" height="200" className="overflow-visible">
      {/* We center the 160x160 card inside the 200x200 foreignObject to allow room for animations and badges */}
      <div className="w-full h-full flex items-center justify-center">
        <div 
          className="relative flex flex-col items-center justify-center w-[160px] h-[160px] bg-[#0f172a]/95 border border-white/20 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] group animate-float-node cursor-default"
          style={{ animationDelay: delay }}
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl pointer-events-none" style={{ backgroundColor: color }}></div>
          
          <div className="relative z-10 w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500 shadow-inner" style={{ borderColor: `${color}40` }}>
            <Icon className="w-7 h-7 drop-shadow-md" style={{ color }} />
          </div>
          
          <h3 className="font-bold text-white text-base text-center relative z-10 leading-tight px-2">{title}</h3>
          <p className="text-xs text-blue-200 font-medium mt-1 relative z-10">{sub}</p>

          {/* Mini floating badges */}
          {badges.length > 0 && (
            <div className="absolute -bottom-4 flex flex-wrap justify-center gap-1.5 z-20 w-full px-2">
              {badges.map((b: any, i: number) => (
                <div key={i} className="flex items-center gap-1 bg-[#1e293b] border border-white/10 px-2 py-1 rounded-md shadow-lg">
                  <b.icon className="w-3 h-3 text-gray-300" />
                  <span className="text-[10px] text-gray-200 font-bold uppercase tracking-wider">{b.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </foreignObject>
  );
}

function MobileNode({ icon: Icon, color, title, sub }: any) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[200px] p-6 bg-[#0f172a]/95 border border-white/20 rounded-3xl shadow-xl relative z-10">
      <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-3" style={{ borderColor: `${color}40` }}>
        <Icon className="w-7 h-7" style={{ color }} />
      </div>
      <h3 className="font-bold text-white text-base text-center leading-tight">{title}</h3>
      <p className="text-xs text-blue-200 font-medium mt-1 text-center">{sub}</p>
    </div>
  );
}
