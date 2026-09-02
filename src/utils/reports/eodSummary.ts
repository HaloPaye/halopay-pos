export function generateEODSummary(transactions: any[]) { return { count: transactions.length, timestamp: new Date().toISOString() }; }
