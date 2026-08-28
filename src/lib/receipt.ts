export function generateEODReceipt(total: number) {
  return `=== END OF DAY ===\nTotal: $${total}\n==================`;
}
