export type NetworkStatus = 'online' | 'offline';

export type StatusListener = (status: NetworkStatus) => void;

export class ConnectionMonitor {
  private listeners: Set<StatusListener> = new Set();
  private currentStatus: NetworkStatus = 'online';

  constructor() {
    if (typeof window !== 'undefined') {
      this.currentStatus = navigator.onLine ? 'online' : 'offline';
      window.addEventListener('online', () => this.updateStatus('online'));
      window.addEventListener('offline', () => this.updateStatus('offline'));
    }
  }

  public getStatus(): NetworkStatus {
    return this.currentStatus;
  }

  public isOnline(): boolean {
    return this.currentStatus === 'online';
  }

  public subscribe(listener: StatusListener): () => void {
    this.listeners.add(listener);
    listener(this.currentStatus);
    return () => this.listeners.delete(listener);
  }

  private updateStatus(newStatus: NetworkStatus): void {
    this.currentStatus = newStatus;
    this.listeners.forEach((cb) => cb(newStatus));
  }
}
