export interface TactileMetrics {
  scale: number;
  durationMs: number;
  vibrateMs: number;
}

export function computeTactileFeedback(key: string): TactileMetrics {
  if (key === 'CLEAR' || key === 'BACKSPACE') {
    return { scale: 0.92, durationMs: 80, vibrateMs: 25 };
  }
  if (key === 'ENTER' || key === 'PAY') {
    return { scale: 0.96, durationMs: 120, vibrateMs: 50 };
  }
  return { scale: 0.95, durationMs: 60, vibrateMs: 15 };
}

export function triggerTactileVibration(key: string): boolean {
  const metrics = computeTactileFeedback(key);
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      return navigator.vibrate(metrics.vibrateMs);
    } catch {
      return false;
    }
  }
  return false;
}
