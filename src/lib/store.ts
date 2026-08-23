import { create } from 'zustand';

interface POSState {
  merchantKey: string | null;
  setMerchantKey: (key: string) => void;
  isOfflineMode: boolean;
  setOfflineMode: (status: boolean) => void;
  exchangeRate: number | null;
  setExchangeRate: (rate: number) => void;
}

export const usePOSStore = create<POSState>()((set) => ({
  merchantKey: null,
  setMerchantKey: (key: string) => set({ merchantKey: key }),
  isOfflineMode: false,
  setOfflineMode: (status: boolean) => set({ isOfflineMode: status }),
  exchangeRate: null,
  setExchangeRate: (rate: number) => set({ exchangeRate: rate }),
}));
