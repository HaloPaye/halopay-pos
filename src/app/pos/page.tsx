'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Settings, History, RefreshCw, Smartphone } from 'lucide-react';
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

  const [amountStr, setAmountStr] = useState<string>('0');
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [activeTx, setActiveTx] = useState<TransactionRecord | null>(null);
  const [activeSep7Uri, setActiveSep7Uri] = useState<string>('');
  const [history, setHistory] = useState<TransactionRecord[]>([]);

  useEffect(() => {
    const loadedConfig = getMerchantConfig();
    setConfig(loadedConfig);
    setHistory(getTransactionHistory());
    setRateResult(getCurrentRate(loadedConfig.currency));
  }, []);

  useEffect(() => {
    if (!config) return;
    const interval = setInterval(() => {
      setRateResult(getCurrentRate(config.currency));
    }, 30000);
    return () => clearInterval(interval);
  }, [config]);

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

  const handleKeyPress = (key: string) => {
    setAmountStr((prev) => {
      if (prev === '0' && key !== '.') return key;
      if (key === '.' && prev.includes('.')) return prev;
      if (prev.length >= 9) return prev;
      return prev + key;
    });
  };

  const handleClear = () => setAmountStr('0');
  const handleBackspace = () => {
    setAmountStr((prev) => (prev.length <= 1 ? '0' : prev.slice(0, -1)));
  };

  const handleQuickAdd = (addVal: number) => {
    const current = parseFloat(amountStr) || 0;
    setAmountStr((current + addVal).toString());
  };

  const numericAmount = parseFloat(amountStr) || 0;
  const currentRate = rateResult?.rate || 1;
  const cryptoAmount = convertFiatToCrypto(numericAmount, currentRate);

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

  const handlePaymentConfirmed = useCallback(
    (tx: TransactionRecord, txHash: string) => {
      const completedTx: TransactionRecord = { ...tx, status: 'completed', txHash };
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-400">
        <RefreshCw className="w-8 h-8 animate-spin mb-3 text-blue-500" />
        <span className="font-medium text-sm">Initializing Terminal...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between max-w-md mx-auto p-4 sm:p-6 space-y-4 bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="HaloPay Logo" className="w-8 h-8 object-contain rounded-md" />
          <div>
            <h1 className="font-bold text-gray-900 leading-tight">{config.merchantName}</h1>
            <p className="text-xs text-gray-500 font-mono tracking-tight">
              {config.publicKey.substring(0, 6)}...{config.publicKey.slice(-4)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm relative transition-colors"
          >
            <History className="w-5 h-5" />
            {history.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center border border-white">
                {history.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsConfigOpen(true)}
            className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Network / Exchange Rate Indicator */}
      <StalenessIndicator
        rate={rateResult.rate}
        currency={rateResult.currency}
        staleness={rateResult.staleness}
        source={rateResult.source}
        onRefresh={handleRefreshRate}
        isRefreshing={isRefreshingRate}
      />

      {/* Amount Entry Area */}
      <main className="flex-1 flex flex-col justify-center space-y-6">
        <div className="text-center px-4">
          <div className="text-sm font-medium text-gray-500 mb-1">Charge Amount</div>
          <div className="text-5xl font-extrabold tracking-tight text-gray-900 font-sans flex justify-center items-baseline gap-2">
            <span>{numericAmount.toLocaleString('en-US')}</span>
            <span className="text-2xl font-bold text-gray-400">{config.currency}</span>
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium border border-gray-200">
            <Smartphone className="w-4 h-4 text-blue-500" />
            <span>≈ {cryptoAmount.toFixed(2)} {config.assetCode}</span>
          </div>
          
          {/* Presets */}
          <div className="grid grid-cols-4 gap-2 mt-6">
            {[500, 1000, 5000, 10000].map((preset) => (
              <button
                key={preset}
                onClick={() => handleQuickAdd(preset)}
                className="py-2 px-2 rounded-lg bg-white border border-gray-200 shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                +{preset >= 1000 ? `${preset / 1000}k` : preset}
              </button>
            ))}
          </div>
        </div>

        <Keypad
          onKeyPress={handleKeyPress}
          onClear={handleClear}
          onBackspace={handleBackspace}
          onCharge={handleCharge}
          canCharge={numericAmount > 0}
        />
      </main>

      {/* History Slide-over */}
      {isHistoryOpen && (
        <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] border-t border-gray-200 p-6 z-40 max-h-[60vh] overflow-y-auto animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Recent Transactions</h3>
            <button onClick={() => setIsHistoryOpen(false)} className="text-gray-400 hover:text-gray-600 font-medium text-sm">Close</button>
          </div>
          <div className="space-y-3">
            {history.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No transactions yet.</p>
            ) : (
              history.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div>
                    <div className="font-bold text-gray-900">{tx.amountFiat.toLocaleString()} {tx.currency}</div>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">{tx.memo}</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${tx.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {tx.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Background Modals */}
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
