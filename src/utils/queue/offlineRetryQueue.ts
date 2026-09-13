export interface QueuedTransaction {
  id: string;
  amount: string;
  destination: string;
  attempts: number;
  nextAttemptAt: number;
  createdAt: number;
}

export class OfflineRetryQueue {
  private queue: QueuedTransaction[] = [];
  private maxAttempts: number;

  constructor(maxAttempts: number = 5) {
    this.maxAttempts = maxAttempts;
  }

  public enqueue(id: string, amount: string, destination: string, now: number = Date.now()): void {
    this.queue.push({
      id,
      amount,
      destination,
      attempts: 0,
      nextAttemptAt: now,
      createdAt: now,
    });
  }

  public getReadyTransactions(now: number = Date.now()): QueuedTransaction[] {
    return this.queue.filter((tx) => tx.nextAttemptAt <= now && tx.attempts < this.maxAttempts);
  }

  public recordFailure(id: string, now: number = Date.now()): void {
    const tx = this.queue.find((t) => t.id === id);
    if (tx) {
      tx.attempts += 1;
      const delayMs = Math.min(60000, 1000 * Math.pow(2, tx.attempts));
      tx.nextAttemptAt = now + delayMs;
    }
  }

  public remove(id: string): void {
    this.queue = this.queue.filter((t) => t.id !== id);
  }

  public size(): number {
    return this.queue.length;
  }
}