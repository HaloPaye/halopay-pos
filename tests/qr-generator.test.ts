import {
  generateSep7PayUri,
  parseSep7Uri,
  validateStellarPublicKey,
} from '../src/lib/qr-generator';

describe('HaloPay POS - QR Generator Tests', () => {
  const MOCK_PUBLIC_KEY = 'GBBD47IF6LWK2P7MDEVSCWR7DPUWV3NY3DTQEVFL4TW4523WA6WELD5J';
  const MOCK_ISSUER = 'GBBD47IF6LWK2P7MDEVSCWR7DPUWV3NY3DTQEVFL4TW4523WA6WELD5J';

  describe('SEP-0007 QR Payment URI Generator', () => {
    it('should generate valid web+stellar:pay URI according to SEP-0007 spec', () => {
      const uri = generateSep7PayUri({
        destination: MOCK_PUBLIC_KEY,
        amount: 8.12,
        assetCode: 'USDC',
        assetIssuer: MOCK_ISSUER,
        memo: 'HALO-TEST-MEMO',
        memoType: 'MEMO_TEXT',
      });

      expect(uri).toContain('web+stellar:pay?');
      expect(uri).toContain(`destination=${MOCK_PUBLIC_KEY}`);
      expect(uri).toContain('amount=8.12');
      expect(uri).toContain('asset_code=USDC');
      expect(uri).toContain(`asset_issuer=${MOCK_ISSUER}`);
      expect(uri).toContain('memo=HALO-TEST-MEMO');
      expect(uri).toContain('memo_type=MEMO_TEXT');
    });

    it('should parse generated SEP-0007 URI back to options object', () => {
      const originalOptions = {
        destination: MOCK_PUBLIC_KEY,
        amount: '15.50',
        assetCode: 'USDC',
        assetIssuer: MOCK_ISSUER,
        memo: 'HALO-PARSE-123',
        memoType: 'MEMO_TEXT' as const,
      };

      const uri = generateSep7PayUri(originalOptions);
      const parsed = parseSep7Uri(uri);

      expect(parsed.destination).toBe(MOCK_PUBLIC_KEY);
      expect(parsed.amount).toBe('15.50');
      expect(parsed.assetCode).toBe('USDC');
      expect(parsed.assetIssuer).toBe(MOCK_ISSUER);
      expect(parsed.memo).toBe('HALO-PARSE-123');
    });

    it('should validate Stellar public keys correctly', () => {
      expect(validateStellarPublicKey(MOCK_PUBLIC_KEY)).toBe(true);
      expect(validateStellarPublicKey('INVALID_KEY_123')).toBe(false);
      expect(validateStellarPublicKey('')).toBe(false);
    });
  });
});
