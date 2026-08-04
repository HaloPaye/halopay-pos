'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, Loader2 } from 'lucide-react';
import { TransactionRecord } from '@/lib/storage';

interface PaymentQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  sep7Uri: string;
  transaction: TransactionRecord;
  merchantName: string;
}

export const PaymentQRModal: React.FC<PaymentQRModalProps> = ({
  isOpen,
  onClose,
  sep7Uri,
  transaction,
  merchantName,
}) => {
  const [copied, setCopied] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    setElapsed(0);
    const interval = setInterval(() => setElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(sep7Uri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 flex flex-col gap-6 animate-slide-up relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center pt-2">
          <h3 className="font-semibold text-gray-900">{merchantName}</h3>
          <div className="mt-4 flex flex-col items-center">
            <span className="text-sm text-gray-500 font-medium">Total Due</span>
            <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {transaction.amountFiat.toLocaleString()} {transaction.currency}
            </div>
            <div className="text-sm font-semibold text-blue-600 mt-1">
              ≈ {transaction.amountCrypto} {transaction.assetCode}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <QRCodeSVG value={sep7Uri} size={220} level="H" includeMargin={true} />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Memo</span>
            <span className="font-mono font-bold text-gray-900">{transaction.memo}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Network</span>
            <span className="font-medium text-gray-900">Stellar</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm font-medium text-gray-500 px-2">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            <span>Awaiting payment...</span>
          </div>
          <span className="font-mono">{formatSeconds(elapsed)}</span>
        </div>

        <button
          onClick={handleCopy}
          className="w-full py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          {copied ? 'URI Copied' : 'Copy SEP-0007 URI'}
        </button>
      </div>
    </div>
  );
};
