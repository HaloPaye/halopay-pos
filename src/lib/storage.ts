export interface MerchantConfig {
  merchantName: string;
  publicKey: string;
  currency: string;
  assetCode: string;
  assetIssuer: string;
  wsUrl: string;
}

export interface CachedRateData {
  rate: number; // e.g. 615.5 XAF per 1 USDC
  currency: string;
  timestamp: number; // Unix epoch ms
  source: string;
}

export interface TransactionRecord {
  id: string;
  amountFiat: number;
  currency: string;
  amountCrypto: number;
  assetCode: string;
  memo: string;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
}

const STORAGE_KEYS = {
  MERCHANT_CONFIG: 'halopay_merchant_config',
  EXCHANGE_RATES: 'halopay_exchange_rates',
  TRANSACTIONS: 'halopay_tx_history',
};

export const DEFAULT_CONFIG: MerchantConfig = {
  merchantName: 'HaloPay Express Merchant',
  publicKey: 'GBBD47IF6LWK2P7MDEVSCWR7DPUWV3NY3DTQEVFL4TW4523WA6WELD5J',
  currency: 'XAF',
  assetCode: 'USDC',
  assetIssuer: 'GBBD47IF6LWK2P7MDEVSCWR7DPUWV3NY3DTQEVFL4TW4523WA6WELD5J',
  wsUrl: 'ws://localhost:3000/ws',
};

// Default fallback exchange rates (per 1 USDC)
export const DEFAULT_FALLBACK_RATES: Record<string, number> = {
  XAF: 615.5,
  NGN: 1520.0,
  KES: 129.5,
  GHS: 15.2,
  USD: 1.0,
  EUR: 0.92,
};

export const getMerchantConfig = (): MerchantConfig => {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MERCHANT_CONFIG);
    if (!raw) return DEFAULT_CONFIG;
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
};

export const saveMerchantConfig = (config: Partial<MerchantConfig>): MerchantConfig => {
  const current = getMerchantConfig();
  const updated = { ...current, ...config };
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.MERCHANT_CONFIG, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save merchant config to localStorage:', e);
    }
  }
  return updated;
};

export const getCachedRateData = (currency: string): CachedRateData | null => {
  if (typeof window === 'undefined') {
    return {
      rate: DEFAULT_FALLBACK_RATES[currency] || 615.5,
      currency,
      timestamp: Date.now(),
      source: 'Default Fallback',
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXCHANGE_RATES);
    if (!raw) return null;
    const allRates: Record<string, CachedRateData> = JSON.parse(raw);
    return allRates[currency] || null;
  } catch {
    return null;
  }
};

export const saveCachedRateData = (data: CachedRateData): void => {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXCHANGE_RATES);
    const allRates: Record<string, CachedRateData> = raw ? JSON.parse(raw) : {};
    allRates[data.currency] = data;
    localStorage.setItem(STORAGE_KEYS.EXCHANGE_RATES, JSON.stringify(allRates));
  } catch (e) {
    console.error('Failed to save cached rate data:', e);
  }
};

export const getTransactionHistory = (): TransactionRecord[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveTransaction = (tx: TransactionRecord): void => {
  if (typeof window === 'undefined') return;
  try {
    const history = getTransactionHistory();
    const updated = [tx, ...history.filter(item => item.id !== tx.id)].slice(0, 50); // Keep last 50
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save transaction record:', e);
  }
};
