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
          ws.send(JSON.stringify({ type: 'subscribe', address: publicKey }));
        };

        ws.onmessage = (event) => {
          if (!isMounted) return;
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'payment_confirmed' || data.event === 'payment_received') {
              const memo = data.memo || data.paymentMemo;
              const txHash = data.txHash || data.transaction_hash || 'tx_' + Date.now().toString(36);
              if (activeTransaction && activeTransaction.memo === memo) {
                if ('vibrate' in navigator) {
                  try { navigator.vibrate([100, 50, 100, 50, 200]); } catch { /* ignore */ }
                }
                setConfirmedTx({ tx: activeTransaction, txHash });
                onPaymentConfirmed(activeTransaction, txHash);
              }
            }
          } catch (e) {
            console.error(e);
          }
        };

        ws.onclose = () => {
          if (!isMounted) return;
          reconnectTimer = setTimeout(connect, 4000);
        };
      } catch {
        /* ignore */
      }
    };
    connect();

    return () => {
      isMounted = false;
      clearTimeout(reconnectTimer);
      if (wsRef.current) wsRef.current.close();
    };
  }, [wsUrl, publicKey, activeTransaction, onPaymentConfirmed]);

  if (!confirmedTx) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm animate-slide-up">
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-green-100 text-green-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Payment Received</h4>
            <p className="text-xs text-gray-500 mt-0.5">
              {confirmedTx.tx.amountCrypto} USDC ({confirmedTx.tx.amountFiat} {confirmedTx.tx.currency})
            </p>
          </div>
        </div>
        <button
          onClick={() => setConfirmedTx(null)}
          className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
