export interface Sep7PayOptions {
  destination: string;
  amount: string | number;
  assetCode?: string;
  assetIssuer?: string;
  memo?: string;
  memoType?: 'MEMO_TEXT' | 'MEMO_ID' | 'MEMO_HASH' | 'MEMO_RETURN';
}

/**
 * Generates an offline SEP-0007 compliant Stellar Payment URI
 * Specification: web+stellar:pay?destination=...&amount=...&asset_code=...&asset_issuer=...&memo=...&memo_type=...
 */
export function generateSep7PayUri(options: Sep7PayOptions): string {
  const {
    destination,
    amount,
    assetCode = 'USDC',
    assetIssuer,
    memo,
    memoType = 'MEMO_TEXT',
  } = options;

  if (!destination) {
    throw new Error('Destination Stellar public key is required for SEP-0007 URI');
  }

  const formattedAmount = typeof amount === 'number' ? amount.toFixed(2) : amount;

  const params = new URLSearchParams();
  params.append('destination', destination);
  params.append('amount', formattedAmount);

  if (assetCode) {
    params.append('asset_code', assetCode);
  }

  if (assetIssuer) {
    params.append('asset_issuer', assetIssuer);
  }

  if (memo) {
    params.append('memo', memo);
    params.append('memo_type', memoType);
  }

  return `web+stellar:pay?${params.toString()}`;
}

/**
 * Parses a web+stellar:pay URI string into Sep7PayOptions
 */
export function parseSep7Uri(uri: string): Sep7PayOptions {
  if (!uri.startsWith('web+stellar:pay?')) {
    throw new Error('Invalid SEP-0007 URI format');
  }

  const queryString = uri.replace('web+stellar:pay?', '');
  const params = new URLSearchParams(queryString);

  const destination = params.get('destination') || '';
  const amount = params.get('amount') || '0';
  const assetCode = params.get('asset_code') || 'USDC';
  const assetIssuer = params.get('asset_issuer') || undefined;
  const memo = params.get('memo') || undefined;
  const memoType = (params.get('memo_type') as Sep7PayOptions['memoType']) || 'MEMO_TEXT';

  return {
    destination,
    amount,
    assetCode,
    assetIssuer,
    memo,
    memoType,
  };
}

/**
 * Validates Stellar public key format (56 chars, starting with 'G')
 */
export function validateStellarPublicKey(key: string): boolean {
  if (!key) return false;
  const stellarKeyRegex = /^G[A-Z2-7]{55}$/;
  return stellarKeyRegex.test(key.trim());
}

/**
 * Generates a unique short payment reference / memo for transaction tracking
 */
export function generatePaymentMemo(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `HALO-${timestamp}-${random}`;
}
