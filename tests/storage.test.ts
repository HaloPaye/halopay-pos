import {
  saveMerchantConfig,
  getMerchantConfig,
  saveCachedRateData,
  getCachedRateData
} from '../src/lib/storage';

describe('HaloPay POS - Storage Tests', () => {
  let store: Record<string, string> = {};

  beforeAll(() => {
    // Mock window and localStorage for Jest test environment
    (global as any).window = {};
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
          store[key] = value.toString();
        }),
        clear: jest.fn(() => {
          store = {};
        })
      },
      writable: true
    });
  });

  beforeEach(() => {
    store = {};
    jest.clearAllMocks();
  });

  describe('Settings Storage', () => {
    it('should save and retrieve merchant configuration', () => {
      const mockSettings = {
        merchantName: 'Test Merchant',
        publicKey: 'GBBD47IF6LWK2P7MDEVSCWR7DPUWV3NY3DTQEVFL4TW4523WA6WELD5J',
        currency: 'XAF',
        assetCode: 'USDC',
        assetIssuer: 'GBBD47IF6LWK2P7MDEVSCWR7DPUWV3NY3DTQEVFL4TW4523WA6WELD5J',
        wsUrl: 'wss://test.com'
      };

      saveMerchantConfig(mockSettings);
      const retrieved = getMerchantConfig();
      expect(retrieved).toEqual(mockSettings);
    });
  });

  describe('Rate Storage', () => {
    it('should save and retrieve cached rates', () => {
      const mockRate = {
        rate: 600,
        currency: 'XAF',
        timestamp: Date.now(),
        source: 'DEX'
      };

      saveCachedRateData(mockRate);
      const retrieved = getCachedRateData('XAF');
      expect(retrieved).toEqual(mockRate);
    });

    it('should return null for non-existent currency rates', () => {
      const retrieved = getCachedRateData('NON_EXISTENT');
      expect(retrieved).toBeNull();
    });
  });
});
