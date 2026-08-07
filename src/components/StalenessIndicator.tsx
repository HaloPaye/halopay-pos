'use client';

import React from 'react';
import { Wifi, WifiOff, RefreshCw, AlertTriangle } from 'lucide-react';
import { StalenessInfo, getStalenessTextClass } from '@/lib/exchange-rate';

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

  return (
    <div className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-gray-100">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">
            1 USDC = {rate.toLocaleString()} {currency}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md">
            {source}
          </span>
        </div>
        <span
          data-testid="staleness-text"
          className={`text-xs mt-0.5 flex items-center gap-1 ${getStalenessTextClass(staleness)}`}
        >
          {staleness.isCritical && (
            <AlertTriangle
              data-testid="staleness-warning-icon"
              aria-label="Exchange rate is over 24 hours old"
              className="w-3.5 h-3.5 shrink-0"
            />
          )}
          {staleness.stalenessText}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {isOnline ? (
          <Wifi className="w-4 h-4 text-green-500" />
        ) : (
          <WifiOff className="w-4 h-4 text-red-500" />
        )}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-500' : ''}`} />
        </button>
      </div>
    </div>
  );
};
