import { generateCsvReceipts } from '../src/utils/export/csvExporter';
import { StoredReceipt } from '../src/services/storage/receiptStore';

describe('CSV Exporter Unit Tests', () => {
  it('should generate valid CSV header and rows', () => {
    const receipts: StoredReceipt[] = [
      {
        id: 'rec_1',
        txHash: '0xabc123',
        amount: '25.50',
        currency: 'USDC',
        timestamp: 1700000000000,
        synced: true,
      },
    ];

    const csv = generateCsvReceipts(receipts);
    expect(csv).toContain('ID,Transaction Hash,Amount,Currency,Timestamp,Date,Synced');
    expect(csv).toContain('"rec_1"');
    expect(csv).toContain('25.50,USDC');
    expect(csv).toContain('YES');
  });

  it('should handle empty receipt list gracefully', () => {
    const csv = generateCsvReceipts([]);
    expect(csv).toBe('ID,Transaction Hash,Amount,Currency,Timestamp,Date,Synced');
  });
});
