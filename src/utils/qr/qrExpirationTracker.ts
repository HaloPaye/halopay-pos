export interface QRExpirationState {
  remainingSeconds: number;
  percentage: number;
  isExpired: boolean;
  urgency: 'normal' | 'warning' | 'critical';
}

export class QRExpirationTracker {
  private createdAt: number;
  private ttlSeconds: number;

  constructor(createdAt: number, ttlSeconds: number = 300) {
    this.createdAt = createdAt;
    this.ttlSeconds = ttlSeconds;
  }

  public getStatus(currentTime: number = Date.now()): QRExpirationState {
    const elapsedSeconds = Math.floor((currentTime - this.createdAt) / 1000);
    const remainingSeconds = Math.max(0, this.ttlSeconds - elapsedSeconds);
    const percentage = Math.max(0, Math.min(100, Math.round((remainingSeconds / this.ttlSeconds) * 100)));
    const isExpired = remainingSeconds === 0;

    let urgency: 'normal' | 'warning' | 'critical' = 'normal';
    if (remainingSeconds <= 30) urgency = 'critical';
    else if (remainingSeconds <= 60) urgency = 'warning';

    return { remainingSeconds, percentage, isExpired, urgency };
  }
}