export interface StoredReceipt {
  id: string;
  txHash: string;
  amount: string;
  currency: string;
  timestamp: number;
  synced: boolean;
}

const STORAGE_KEY = 'halopay_offline_receipts';

export class ReceiptStorageService {
  public static getReceipts(): StoredReceipt[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  public static saveReceipt(receipt: StoredReceipt): void {
    if (typeof window === 'undefined') return;
    try {
      const current = this.getReceipts();
      current.push(receipt);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch (e) {
      console.error('Failed to store offline receipt:', e);
    }
  }

  public static markSynced(id: string): void {
    if (typeof window === 'undefined') return;
    const current = this.getReceipts().map(r => r.id === id ? { ...r, synced: true } : r);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  }
}