'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, ShieldCheck, Loader2, QrCode, ExternalLink } from 'lucide-react';
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
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
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

  const truncatedDestination = transaction
    ? `${transaction.id.substring(0, 6)}...${transaction.id.slice(-4)}`
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl shadow-emerald-950/40 text-slate-100 flex flex-col items-center gap-4">
        {/* Modal Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-100">{merchantName}</h3>
              <p className="text-xs text-slate-400">Stellar SEP-0007 POS Terminal</p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all"
            aria-label="Close Payment Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Breakdown Banner */}
        <div className="w-full bg-slate-950/80 rounded-2xl p-4 border border-slate-800 text-center flex flex-col items-center">
          <div className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Due</div>
          <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-400 my-1">
            {transaction.amountFiat.toLocaleString()} {transaction.currency}
          </div>
          <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800/60 mt-1">
            <span>≈ {transaction.amountCrypto} {transaction.assetCode}</span>
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        {/* High-Contrast QR Code Card */}
        <div className="bg-white p-5 rounded-2xl shadow-xl border-4 border-slate-800 flex flex-col items-center justify-center transition-transform hover:scale-[1.02]">
          <QRCodeSVG
            value={sep7Uri}
            size={210}
            level="H"
            includeMargin={true}
            bgColor="#FFFFFF"
            fgColor="#0B0F17"
          />
        </div>

        {/* Transaction Reference & Memo */}
        <div className="w-full bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 text-xs space-y-1.5 font-mono">
          <div className="flex justify-between text-slate-400">
            <span>Payment Memo:</span>
            <span className="text-emerald-400 font-bold">{transaction.memo}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Asset:</span>
            <span className="text-slate-200">{transaction.assetCode} (Stellar Mainnet/Testnet)</span>
          </div>
        </div>

        {/* Waiting Status Bar */}
        <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-xs font-medium">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
            <span>Listening for payment... ({formatSeconds(elapsed)})</span>
          </div>
          <span className="animate-pulse font-mono text-emerald-400">LIVE WS</span>
        </div>

        {/* Actions */}
        <div className="w-full flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2 border border-slate-700"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'URI Copied!' : 'Copy SEP-0007 URI'}</span>
          </button>

          <a
            href={sep7Uri}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 font-semibold text-sm transition-all flex items-center justify-center gap-1.5 border border-emerald-800/50"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Wallet</span>
          </a>
        </div>
      </div>
    </div>
  );
};
