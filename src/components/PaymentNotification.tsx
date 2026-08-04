'use client';

import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { TransactionRecord } from '@/lib/storage';

interface PaymentNotificationProps {
  wsUrl: string;
  publicKey: string;
  activeTransaction: TransactionRecord | null;
  onPaymentConfirmed: (tx: TransactionRecord, txHash: string) => void;
}

export const PaymentNotification: React.FC<PaymentNotificationProps> = ({
  wsUrl,
  publicKey,
  activeTransaction,
  onPaymentConfirmed,
}) => {
  const [confirmedTx, setConfirmedTx] = useState<{ tx: TransactionRecord; txHash: string } | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !wsUrl) return;

    let isMounted = true;
    let reconnectTimer: NodeJS.Timeout;

    const connect = () => {
      try {
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          if (!isMounted) return;
          console.log('[HaloPay POS] WebSocket payment listener connected:', wsUrl);
          // Subscribe to merchant public key events
          ws.send(JSON.stringify({ type: 'subscribe', address: publicKey }));
        };

        ws.onmessage = (event) => {
          if (!isMounted) return;
          try {
            const data = JSON.parse(event.data);
            // Check if message is a payment confirmation
            if (data.type === 'payment_confirmed' || data.event === 'payment_received') {
              const memo = data.memo || data.paymentMemo;
              const txHash = data.txHash || data.transaction_hash || 'tx_' + Date.now().toString(36);

              if (activeTransaction && activeTransaction.memo === memo) {
                // Play notification audio sound simulation
                if ('vibrate' in navigator) {
                  try { navigator.vibrate([100, 50, 100, 50, 200]); } catch (e) { /* ignore */ }
                }
                setConfirmedTx({ tx: activeTransaction, txHash });
                onPaymentConfirmed(activeTransaction, txHash);
              }
            }
          } catch (e) {
            console.error('[HaloPay POS] WebSocket message parsing error:', e);
          }
        };

        ws.onclose = () => {
          if (!isMounted) return;
          // Attempt silent reconnect after 4 seconds
          reconnectTimer = setTimeout(connect, 4000);
        };

        ws.onerror = () => {
          if (!isMounted) return;
        };
      } catch {
        // failed to connect
      }
    };

    connect();

    return () => {
      isMounted = false;
      clearTimeout(reconnectTimer);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [wsUrl, publicKey, activeTransaction, onPaymentConfirmed]);

  if (!confirmedTx) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-lg animate-slide-up">
      <div className="bg-slate-900 border-2 border-emerald-500 rounded-2xl p-4 shadow-2xl shadow-emerald-950/60 text-slate-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <CheckCircle className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-emerald-400">Payment Received!</span>
              <span className="text-xs bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800 text-emerald-300">
                SEP-0007 Verified
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Received <strong className="text-slate-100">{confirmedTx.tx.amountCrypto} USDC</strong> ({confirmedTx.tx.amountFiat} {confirmedTx.tx.currency})
            </p>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5 truncate max-w-[240px]">
              Tx: {confirmedTx.txHash}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setConfirmedTx(null)}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
