import { create } from 'zustand';

export interface PaymentState {
  amount: string;
  currency: string;
  isProcessing: boolean;
  status: 'idle' | 'scanning' | 'success' | 'failed';
  setAmount: (amt: string) => void;
  appendDigit: (digit: string) => void;
  clearAmount: () => void;
  setStatus: (status: 'idle' | 'scanning' | 'success' | 'failed') => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  amount: '0',
  currency: 'USDC',
  isProcessing: false,
  status: 'idle',

  setAmount: (amount) => set({ amount }),

  appendDigit: (digit) =>
    set((state) => {
      if (state.amount === '0' && digit !== '.') return { amount: digit };
      if (digit === '.' && state.amount.includes('.')) return state;
      return { amount: state.amount + digit };
    }),

  clearAmount: () => set({ amount: '0', status: 'idle' }),

  setStatus: (status) => set({ status, isProcessing: status === 'scanning' }),
}));
