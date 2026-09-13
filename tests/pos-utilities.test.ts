import { StructuredLogger } from '../src/utils/logging/structuredLogger';
import { QRExpirationTracker } from '../src/utils/qr/qrExpirationTracker';
import { ThemeManager } from '../src/utils/theme/themeManager';
import { OfflineRetryQueue } from '../src/utils/queue/offlineRetryQueue';

describe('POS Day 13 Core Utilities', () => {
  test('StructuredLogger outputs correct payload', () => {
    const logger = new StructuredLogger('pos-test-corr');
    const entry = logger.format('info', 'Payment started', { amount: 50 });
    expect(entry.level).toBe('info');
    expect(entry.message).toBe('Payment started');
    expect(entry.correlationId).toBe('pos-test-corr');
    expect(entry.metadata).toEqual({ amount: 50 });
  });

  test('QRExpirationTracker calculates TTL and urgency', () => {
    const now = 1000000;
    const tracker = new QRExpirationTracker(now, 100);
    const midState = tracker.getStatus(now + 50000);
    expect(midState.remainingSeconds).toBe(50);
    expect(midState.isExpired).toBe(false);
    expect(midState.urgency).toBe('warning');

    const expiredState = tracker.getStatus(now + 120000);
    expect(expiredState.remainingSeconds).toBe(0);
    expect(expiredState.isExpired).toBe(true);
  });

  test('ThemeManager returns correct effective theme', () => {
    const manager = new ThemeManager('system');
    expect(manager.getEffectiveTheme(true)).toBe('dark');
    expect(manager.getEffectiveTheme(false)).toBe('light');

    manager.setTheme('dark');
    expect(manager.getEffectiveTheme(false)).toBe('dark');
  });

  test('OfflineRetryQueue enqueues and backs off', () => {
    const queue = new OfflineRetryQueue(3);
    const now = 5000;
    queue.enqueue('tx_1', '10.5', 'GBDEST1', now);
    expect(queue.size()).toBe(1);

    const ready = queue.getReadyTransactions(now);
    expect(ready.length).toBe(1);

    queue.recordFailure('tx_1', now);
    const readyImmediatelyAfter = queue.getReadyTransactions(now);
    expect(readyImmediatelyAfter.length).toBe(0);

    queue.remove('tx_1');
    expect(queue.size()).toBe(0);
  });
});