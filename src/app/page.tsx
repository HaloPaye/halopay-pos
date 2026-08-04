'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Settings, ShieldCheck, History, ArrowUpRight, Zap, RefreshCw, CreditCard, Sparkles } from 'lucide-react';
import {
  getMerchantConfig,
  getTransactionHistory,
  saveTransaction,
  MerchantConfig,
  TransactionRecord,
} from '@/lib/storage';
import {
  getCurrentRate,
  refreshExchangeRate,
  convertFiatToCrypto,
  RateResult,
} from '@/lib/exchange-rate';
import { generateSep7PayUri, generatePaymentMemo } from '@/lib/qr-generator';
import { Keypad } from '@/components/Keypad';
import { StalenessIndicator } from '@/components/StalenessIndicator';
import { PaymentQRModal } from '@/components/PaymentQRModal';
import { PaymentNotification } from '@/components/PaymentNotification';
import { MerchantConfigModal } from '@/components/MerchantConfigModal';

export default function POSPage() {
  const [config, setConfig] = useState<MerchantConfig | null>(null);
  const [rateResult, setRateResult] = useState<RateResult | null>(null);
  const [isRefreshingRate, setIsRefreshingRate] = useState(false);

  // Amount input state (stored as raw string)
  const [amountStr, setAmountStr] = useState<string>('0');

  // Modal states
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Current active payment transaction
  const [activeTx, setActiveTx] = useState<TransactionRecord | null>(null);
  const [activeSep7Uri, setActiveSep7Uri] = useState<string>('');

  // History state
  const [history, setHistory] = useState<TransactionRecord[]>([]);

  // Load initial settings and rates
  useEffect(() => {
    const loadedConfig = getMerchantConfig();
    setConfig(loadedConfig);
    setHistory(getTransactionHistory());

    const rate = getCurrentRate(loadedConfig.currency);
    setRateResult(rate);
  }, []);

  // Update staleness ticker every 30s
  useEffect(() => {
    if (!config) return;
    const interval = setInterval(() => {
      setRateResult(getCurrentRate(config.currency));
    }, 30000);
    return () => clearInterval(interval);
  }, [config]);

  // Handle manual rate refresh
  const handleRefreshRate = async () => {
    if (!config) return;
    setIsRefreshingRate(true);
    try {
      const refreshed = await refreshExchangeRate(config.currency);
      setRateResult(refreshed);
    } finally {
      setIsRefreshingRate(false);
    }
  };

  // Keypad input handlers
  const handleKeyPress = (key: string) => {
    setAmountStr((prev) => {
      if (prev === '0' && key !== '.') {
        return key;
      }
      if (key === '.' && prev.includes('.')) {
        return prev;
      }
      // Limit to reasonable max digits
      if (prev.length >= 9) return prev;
      return prev + key;
    });
  };

  const handleClear = () => {
    setAmountStr('0');
  };

  const handleBackspace = () => {
    setAmountStr((prev) => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const handleQuickAdd = (addVal: number) => {
    const current = parseFloat(amountStr) || 0;
    setAmountStr((current + addVal).toString());
  };

  // Compute numeric values
  const numericAmount = parseFloat(amountStr) || 0;
  const currentRate = rateResult?.rate || 615.5;
  const cryptoAmount = convertFiatToCrypto(numericAmount, currentRate);

  // Generate Payment QR Modal trigger
  const handleCharge = () => {
    if (!config || numericAmount <= 0) return;

    const memo = generatePaymentMemo();
    const newTx: TransactionRecord = {
      id: 'tx_' + Date.now().toString(36),
      amountFiat: numericAmount,
      currency: config.currency,
      amountCrypto: cryptoAmount,
      assetCode: config.assetCode,
      memo,
      timestamp: Date.now(),
      status: 'pending',
    };

    const uri = generateSep7PayUri({
      destination: config.publicKey,
      amount: cryptoAmount,
      assetCode: config.assetCode,
      assetIssuer: config.assetIssuer,
      memo: newTx.memo,
      memoType: 'MEMO_TEXT',
    });

    setActiveTx(newTx);
    setActiveSep7Uri(uri);
    saveTransaction(newTx);
    setHistory(getTransactionHistory());
    setIsQRModalOpen(true);
  };

  // WebSocket payment confirmation callback
  const handlePaymentConfirmed = useCallback(
    (tx: TransactionRecord, txHash: string) => {
      const completedTx: TransactionRecord = {
        ...tx,
        status: 'completed',
        txHash,
      };
      saveTransaction(completedTx);
      setHistory(getTransactionHistory());
      setActiveTx(completedTx);
      setIsQRModalOpen(false);
      setAmountStr('0');
    },
    []
  );

  if (!config || !rateResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-cyan-400 font-mono">
        <RefreshCw className="w-8 h-8 animate-spin mb-3" />
        <span>Initializing HaloPay POS Terminal...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between max-w-lg mx-auto p-4 sm:p-6 space-y-4">
      {/* Top Navbar */}
      <header className="flex items-center justify-between p-3.5 rounded-2xl glass-panel shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 text-slate-950 font-black shadow-md shadow-cyan-500/20">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-lg text-slate-100 tracking-tight">{config.merchantName}</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
                POS
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              {config.publicKey.substring(0, 6)}...{config.publicKey.slice(-4)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 transition-all border border-slate-800 relative"
            title="Transaction History"
            aria-label="Transaction History"
          >
            <History className="w-5 h-5" />
            {history.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {history.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsConfigOpen(true)}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 transition-all border border-slate-800"
            title="Merchant Settings"
            aria-label="Merchant Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Offline Exchange Rate Staleness Indicator */}
      <StalenessIndicator
        rate={rateResult.rate}
        currency={rateResult.currency}
        staleness={rateResult.staleness}
        source={rateResult.source}
        onRefresh={handleRefreshRate}
        isRefreshing={isRefreshingRate}
      />

      {/* Main Terminal Display (Fiat Amount + Converted Crypto Estimate) */}
      <main className="flex-1 flex flex-col justify-center space-y-4 my-2">
        <div className="w-full glass-panel rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col items-center justify-center text-center space-y-2 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Enter Charge Amount ({config.currency})
          </span>

          {/* Large Touch Amount Display */}
          <div className="text-4xl sm:text-5xl font-black tracking-tight text-slate-100 font-mono my-2 break-all">
            {numericAmount.toLocaleString('en-US', { minimumFractionDigits: 0 })}
            <span className="text-2xl sm:text-3xl text-cyan-400 ml-2">{config.currency}</span>
          </div>

          {/* Converted USDC Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 font-medium text-sm sm:text-base">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>≈ {cryptoAmount.toFixed(2)} {config.assetCode}</span>
            <span className="text-xs text-emerald-500/80">(@ {currentRate} {config.currency})</span>
          </div>

          {/* Quick Preset Amount Buttons */}
          <div className="w-full grid grid-cols-4 gap-2 pt-3">
            {[500, 1000, 5000, 10000].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleQuickAdd(preset)}
                className="py-1.5 px-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 transition-all active:scale-95"
              >
                +{preset >= 1000 ? `${preset / 1000}k` : preset}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Large-Touch Target Keypad */}
        <Keypad
          onKeyPress={handleKeyPress}
          onClear={handleClear}
          onBackspace={handleBackspace}
          onCharge={handleCharge}
          canCharge={numericAmount > 0}
        />
      </main>

      {/* Transaction History Drawer */}
      {isHistoryOpen && (
        <div className="glass-panel rounded-3xl p-4 border border-slate-800 max-h-60 overflow-y-auto space-y-2 animate-fade-in">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Recent POS Transactions</span>
            <button
              onClick={() => setIsHistoryOpen(false)}
              className="text-slate-400 hover:text-slate-200"
            >
              Close
            </button>
          </div>

          {history.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-4">No recent transactions recorded</p>
          ) : (
            history.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-200">
                    {tx.amountFiat.toLocaleString()} {tx.currency} (≈ {tx.amountCrypto} {tx.assetCode})
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Memo: {tx.memo} • {new Date(tx.timestamp).toLocaleTimeString()}
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                    tx.status === 'completed'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  {tx.status}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modals & Background Services */}
      {activeTx && (
        <PaymentQRModal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          sep7Uri={activeSep7Uri}
          transaction={activeTx}
          merchantName={config.merchantName}
        />
      )}

      <PaymentNotification
        wsUrl={config.wsUrl}
        publicKey={config.publicKey}
        activeTransaction={activeTx}
        onPaymentConfirmed={handlePaymentConfirmed}
      />

      <MerchantConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        config={config}
        onSave={(updated) => {
          setConfig(updated);
          setRateResult(getCurrentRate(updated.currency));
        }}
      />
    </div>
  );
}
