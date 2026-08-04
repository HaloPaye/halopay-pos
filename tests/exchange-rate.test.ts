import {
  calculateStaleness,
  convertFiatToCrypto,
} from '../src/lib/exchange-rate';
import {
  generateSep7PayUri,
  parseSep7Uri,
  validateStellarPublicKey,
} from '../src/lib/qr-generator';

describe('HaloPay POS - Exchange Rate & Staleness Tests', () => {
  const MOCK_PUBLIC_KEY = 'GBBD47IF6LWK2P7MDEVSCWR7DPUWV3NY3DTQEVFL4TW4523WA6WELD5J';
  const MOCK_ISSUER = 'GBBD47IF6LWK2P7MDEVSCWR7DPUWV3NY3DTQEVFL4TW4523WA6WELD5J';

  describe('calculateStaleness', () => {
    it('should classify fresh rates (< 5 mins) correctly', () => {
      const now = 1700000000000;
      const timestamp = now - 2 * 60 * 1000; // 2 mins ago

      const result = calculateStaleness(timestamp, now);
      expect(result.stalenessMinutes).toBe(2);
      expect(result.isStale).toBe(false);
      expect(result.stalenessText).toBe('Rate updated 2 minutes ago');
      expect(result.statusLevel).toBe('fresh');
    });

    it('should classify warning rates (5-15 mins) correctly', () => {
      const now = 1700000000000;
      const timestamp = now - 14 * 60 * 1000; // 14 mins ago

      const result = calculateStaleness(timestamp, now);
      expect(result.stalenessMinutes).toBe(14);
      expect(result.isStale).toBe(false);
      expect(result.stalenessText).toBe('Rate updated 14 minutes ago');
      expect(result.statusLevel).toBe('warning');
    });

    it('should classify stale rates (> 15 mins) correctly', () => {
      const now = 1700000000000;
      const timestamp = now - 45 * 60 * 1000; // 45 mins ago

      const result = calculateStaleness(timestamp, now);
      expect(result.stalenessMinutes).toBe(45);
      expect(result.isStale).toBe(true);
      expect(result.stalenessText).toBe('Rate updated 45 minutes ago');
      expect(result.statusLevel).toBe('stale');
    });

    it('should format hour units correctly for > 60 mins', () => {
      const now = 1700000000000;
      const timestamp = now - 120 * 60 * 1000; // 2 hours ago

      const result = calculateStaleness(timestamp, now);
      expect(result.stalenessMinutes).toBe(120);
      expect(result.isStale).toBe(true);
      expect(result.stalenessText).toBe('Rate updated 2 hours ago');
      expect(result.statusLevel).toBe('stale');
    });

    it('should return "Just now" for < 1 minute diff', () => {
      const now = 1700000000000;
      const timestamp = now - 30 * 1000; // 30 seconds ago

      const result = calculateStaleness(timestamp, now);
      expect(result.stalenessText).toBe('Just now');
      expect(result.isStale).toBe(false);
      expect(result.statusLevel).toBe('fresh');
    });
  });

  describe('convertFiatToCrypto', () => {
    it('should accurately convert fiat to USDC based on rate', () => {
      // 6,155 XAF @ 615.5 XAF per USDC = 10.00 USDC
      const crypto = convertFiatToCrypto(6155, 615.5);
      expect(crypto).toBe(10);
    });

    it('should round correctly to 2 decimal places', () => {
      // 5,000 XAF @ 615.5 XAF per USDC = 8.123477... => 8.12 USDC
      const crypto = convertFiatToCrypto(5000, 615.5);
      expect(crypto).toBe(8.12);
    });

    it('should return 0 for invalid inputs', () => {
      expect(convertFiatToCrypto(0, 615.5)).toBe(0);
      expect(convertFiatToCrypto(5000, 0)).toBe(0);
    });
  });
});
