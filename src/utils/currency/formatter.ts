export function formatCurrencyAmount(amount: number | string, currency: string = 'XLM'): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) {
    return '0.00 ' + currency;
  }
  const decimals = currency.toUpperCase() === 'XLM' ? 7 : 2;
  const formatted = num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  });
  return formatted + ' ' + currency.toUpperCase();
}

export function parseFormattedAmount(input: string): number {
  const sanitized = input.replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(sanitized);
  return isNaN(parsed) ? 0 : parsed;
}