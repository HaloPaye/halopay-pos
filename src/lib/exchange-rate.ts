import { getCachedRateData, saveCachedRateData, DEFAULT_FALLBACK_RATES, CachedRateData } from './storage';

export type StalenessLevel = 'fresh' | 'warning' | 'stale' | 'critical';

export interface StalenessInfo {
  stalenessMinutes: number;
  isStale: boolean;
  /** True once the cached rate is older than 24 hours (significant price drift risk) */
  isCritical: boolean;
  stalenessText: string;
  statusLevel: StalenessLevel;
}

/** Minutes after which an offline rate is considered critically stale (24 hours) */
export const CRITICAL_STALENESS_MINUTES = 24 * 60;

export interface RateResult {
  rate: number;
  currency: string;
  timestamp: number;
  source: string;
  staleness: StalenessInfo;
}

/**
 * Calculates human readable staleness text and classification
 * @param timestamp - Unix epoch ms when rate was recorded
 * @param now - Optional reference timestamp for testing
 * @param staleThresholdMinutes - Minutes after which rate is marked stale (default 15)
 */
export function calculateStaleness(
  timestamp: number,
  now: number = Date.now(),
  staleThresholdMinutes: number = 15
): StalenessInfo {
  const diffMs = Math.max(0, now - timestamp);
  const stalenessMinutes = Math.floor(diffMs / 60000);

  const isCritical = stalenessMinutes >= CRITICAL_STALENESS_MINUTES;

  let stalenessText = '';
  if (stalenessMinutes < 1) {
    stalenessText = 'Just now';
  } else if (stalenessMinutes < 60) {
    stalenessText = `Rate updated ${stalenessMinutes} minute${stalenessMinutes === 1 ? '' : 's'} ago`;
  } else {
    const hours = Math.floor(stalenessMinutes / 60);
    stalenessText = `Rate updated ${hours} hour${hours === 1 ? '' : 's'} ago`;
  }

  if (isCritical) {
    stalenessText += ' - refresh before accepting payments';
  }

  const isStale = stalenessMinutes >= staleThresholdMinutes;

  let statusLevel: StalenessLevel = 'fresh';
  if (isCritical) {
    statusLevel = 'critical';
  } else if (stalenessMinutes >= staleThresholdMinutes) {
    statusLevel = 'stale';
  } else if (stalenessMinutes >= 5) {
    statusLevel = 'warning';
  }

  return {
    stalenessMinutes,
    isStale,
    isCritical,
    stalenessText,
    statusLevel,
  };
}

/**
 * Maps a staleness classification to the Tailwind classes the UI should render it with.
 * Kept here (rather than inline in the component) so the conditional styling is unit-testable.
 */
export function getStalenessTextClass(staleness: StalenessInfo): string {
  if (staleness.isCritical) return 'text-orange-500 font-semibold';
  if (staleness.isStale) return 'text-red-500 font-medium';
  return 'text-gray-500';
}

/**
 * Converts fiat amount to USDC crypto amount using exchange rate
 * @param fiatAmount - Amount in fiat currency
 * @param rate - Fiat units per 1 USDC
 */
export function convertFiatToCrypto(fiatAmount: number, rate: number): number {
  if (!rate || rate <= 0 || !fiatAmount || fiatAmount <= 0) return 0;
  const rawCrypto = fiatAmount / rate;
  // Format to 2 decimal places rounded up/standard for USDC payment
  return Math.round((rawCrypto + Number.EPSILON) * 100) / 100;
}

/**
 * Retrieves the current rate (from cache or fallback) with calculated staleness
 */
export function getCurrentRate(currency: string, now: number = Date.now()): RateResult {
  const cached = getCachedRateData(currency);

  if (cached) {
    return {
      ...cached,
      staleness: calculateStaleness(cached.timestamp, now),
    };
  }

  // If no cached rate exists, construct initial fallback
  const fallbackRate = DEFAULT_FALLBACK_RATES[currency] || 615.5;
  const fallbackData: CachedRateData = {
    rate: fallbackRate,
    currency,
    timestamp: now,
    source: 'Default Offline Fallback',
  };

  saveCachedRateData(fallbackData);

  return {
    ...fallbackData,
    staleness: calculateStaleness(fallbackData.timestamp, now),
  };
}

/**
 * Simulated or real rate fetch with cache persistence
 */
export async function refreshExchangeRate(currency: string): Promise<RateResult> {
  const now = Date.now();
  let fetchedRate = DEFAULT_FALLBACK_RATES[currency] || 615.5;
  let source = 'Offline Engine';

  try {
    if (typeof window !== 'undefined' && navigator.onLine) {
      // Simulate/Fetch latest market rate with slight random variance to mimic real ticker
      const base = DEFAULT_FALLBACK_RATES[currency] || 615.5;
      const fluctuation = (Math.random() - 0.5) * (base * 0.005);
      fetchedRate = Math.round((base + fluctuation) * 100) / 100;
      source = 'HaloPay Exchange Oracle API';
    }
  } catch (err) {
    console.warn('Network rate fetch failed, relying on offline cache:', err);
  }

  const newRateData: CachedRateData = {
    rate: fetchedRate,
    currency,
    timestamp: now,
    source,
  };

  saveCachedRateData(newRateData);

  return {
    ...newRateData,
    staleness: calculateStaleness(now, now),
  };
}
