import { openDB } from 'idb';
import { TransactionRecord } from './storage';

const DB_NAME = 'HaloPayOfflineDB';
const STORE_NAME = 'transactionQueue';
const DB_VERSION = 1;

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

export async function enqueueTransaction(tx: TransactionRecord) {
  const db = await initDB();
  await db.put(STORE_NAME, tx);
}

export async function getQueuedTransactions(): Promise<TransactionRecord[]> {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function removeTransactionFromQueue(id: string) {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
}

export async function syncQueue() {
  if (typeof window === 'undefined' || !navigator.onLine) return;

  const queued = await getQueuedTransactions();
  if (queued.length === 0) return;

  for (const tx of queued) {
    try {
      // Simulate backend POST
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tx),
      });

      // Just clear from queue if it succeeds or gets 404
      if (res.ok || res.status === 404) {
        await removeTransactionFromQueue(tx.id);
      }
    } catch (error) {
      console.warn('[SyncManager] Failed to sync tx', tx.id, error);
      break;
    }
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('online', syncQueue);
  setInterval(syncQueue, 30000);
}
