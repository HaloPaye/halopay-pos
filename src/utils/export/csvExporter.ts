import { StoredReceipt } from '../../services/storage/receiptStore';

export function generateCsvReceipts(receipts: StoredReceipt[]): string {
  const headers = ['ID', 'Transaction Hash', 'Amount', 'Currency', 'Timestamp', 'Date', 'Synced'];
  const rows = receipts.map((r) => [
    JSON.stringify(r.id),
    JSON.stringify(r.txHash),
    r.amount,
    r.currency,
    r.timestamp,
    new Date(r.timestamp).toISOString(),
    r.synced ? 'YES' : 'NO',
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}

export function downloadCsv(filename: string, csvContent: string): void {
  if (typeof window === 'undefined') return;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
