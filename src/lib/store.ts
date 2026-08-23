import { create } from 'zustand';

interface POSState {
  merchantKey: string | null;
  setMerchantKey: (key: string) => void;
  isOfflineMode: boolean;
  setOfflineMode: (status: boolean) => void;
  exchangeRate: number | null;
  setExchangeRate: (rate: number) => void;
}

export const usePOSStore = create<POSState>((set) => ({
  merchantKey: null,
  setMerchantKey: (key) => set({ merchantKey: key }),
  isOfflineMode: false,
  setOfflineMode: (status) => set({ isOfflineMode: status }),
  exchangeRate: null,
  setExchangeRate: (rate) => set({ exchangeRate: rate }),
}));
