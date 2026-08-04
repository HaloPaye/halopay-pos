'use client';

import React from 'react';
import { Wifi, WifiOff, RefreshCw, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { StalenessInfo } from '@/lib/exchange-rate';

interface StalenessIndicatorProps {
  rate: number;
  currency: string;
  staleness: StalenessInfo;
  source: string;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const StalenessIndicator: React.FC<StalenessIndicatorProps> = ({
  rate,
  currency,
  staleness,
  source,
  onRefresh,
  isRefreshing = false,
}) => {
  const isOnline = typeof window !== 'undefined' ? navigator.onLine : true;

  const getBadgeStyle = () => {
    switch (staleness.statusLevel) {
      case 'fresh':
        return 'bg-emerald-950/60 border-emerald-800/80 text-emerald-400';
      case 'warning':
        return 'bg-amber-950/60 border-amber-800/80 text-amber-300';
      case 'stale':
        return 'bg-rose-950/80 border-rose-800/80 text-rose-300 animate-pulse';
    }
  };

  return (
    <div className={`w-full p-3 rounded-2xl border backdrop-blur-md transition-all duration-300 ${getBadgeStyle()}`}>
      <div className="flex items-center justify-between gap-3">
        {/* Left: Rate Info */}
        <div className="flex items-center gap-2.5">
          {staleness.statusLevel === 'fresh' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          {staleness.statusLevel === 'warning' && <Clock className="w-5 h-5 text-amber-400 shrink-0" />}
          {staleness.statusLevel === 'stale' && <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />}

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base tracking-wide">
                1 USDC = {rate.toLocaleString()} {currency}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900/60 border border-slate-700/50 text-slate-300">
                {source}
              </span>
            </div>
            
            <p className="text-xs text-slate-300/90 mt-0.5 flex items-center gap-1.5">
              <span>{staleness.stalenessText}</span>
              {staleness.isStale && (
                <span className="font-semibold text-rose-300">• Offline Cache Expired!</span>
              )}
            </p>
          </div>
        </div>

        {/* Right: Network status & Refresh button */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
            {isOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-rose-400">Offline</span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 active:scale-95 transition-all border border-slate-800 flex items-center justify-center disabled:opacity-50"
            title="Refresh Exchange Rate"
            aria-label="Refresh Exchange Rate"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
