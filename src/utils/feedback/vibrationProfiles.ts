export type HapticEventType =
  | 'PAYMENT_SUCCESS'
  | 'PAYMENT_ERROR'
  | 'QR_SCANNED'
  | 'KEY_PRESS'
  | 'SYNC_COMPLETE';

export interface VibrationProfile {
  name: string;
  pattern: number[];
  description: string;
}

export const VIBRATION_PROFILES: Record<HapticEventType, VibrationProfile> = {
  PAYMENT_SUCCESS: {
    name: 'Success Pulse',
    pattern: [50, 40, 100],
    description: 'Crisp double-tap pulse indicating confirmed transaction settlement',
  },
  PAYMENT_ERROR: {
    name: 'Error Buzz',
    pattern: [100, 50, 100, 50, 150],
    description: 'Urgent rhythmic buzz notifying of insufficient funds or network drop',
  },
  QR_SCANNED: {
    name: 'Scan Click',
    pattern: [30],
    description: 'Subtle micro-click confirming optical barcode acquisition',
  },
  KEY_PRESS: {
    name: 'Keypad Tap',
    pattern: [15],
    description: 'Tactile keypad actuation feedback',
  },
  SYNC_COMPLETE: {
    name: 'Reconciliation Chime',
    pattern: [40, 30, 40],
    description: 'Gentle cadence indicating offline queue has synchronized to Stellar',
  },
};

export function getVibrationPattern(event: HapticEventType): number[] {
  return VIBRATION_PROFILES[event]?.pattern || [20];
}

export function triggerHapticEvent(event: HapticEventType): boolean {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      const pattern = getVibrationPattern(event);
      return navigator.vibrate(pattern);
    } catch {
      return false;
    }
  }
  return false;
}
