import { create } from 'zustand';

interface POSState {
  amount: string;
  currency: string;
  isProcessing: boolean;
  setAmount: (val: string) => void;
  setProcessing: (val: boolean) => void;
  reset: () => void;
}

export const usePOSStore = create<POSState>((set) => ({
  amount: '0.00',
  currency: 'XLM',
  isProcessing: false,
  setAmount: (amount: string) => set({ amount }),
  setProcessing: (isProcessing: boolean) => set({ isProcessing }),
  reset: () => set({ amount: '0.00', isProcessing: false }),
}));
