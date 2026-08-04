'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, Store, Key, DollarSign, Cpu, Check } from 'lucide-react';
import { MerchantConfig, saveMerchantConfig } from '@/lib/storage';
import { validateStellarPublicKey } from '@/lib/qr-generator';

interface MerchantConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: MerchantConfig;
  onSave: (updated: MerchantConfig) => void;
}

export const MerchantConfigModal: React.FC<MerchantConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<MerchantConfig>(config);
  const [error, setError] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormData(config);
    setError(null);
    setSavedSuccess(false);
  }, [config, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.merchantName.trim()) {
      setError('Merchant name is required');
      return;
    }

    if (!validateStellarPublicKey(formData.publicKey)) {
      setError('Invalid Stellar Public Key format (must start with G and be 56 characters long)');
      return;
    }

    const updated = saveMerchantConfig(formData);
    onSave(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Merchant Configuration</h3>
              <p className="text-xs text-slate-400">Configure Stellar POS parameters & wallet</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Merchant Name */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-cyan-400" />
              <span>Merchant Name</span>
            </label>
            <input
              type="text"
              value={formData.merchantName}
              onChange={(e) => setFormData({ ...formData, merchantName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-100 font-medium"
              placeholder="e.g. Douala Metro Market"
            />
          </div>

          {/* Stellar Public Key */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              <span>Stellar Destination Public Key (G...)</span>
            </label>
            <input
              type="text"
              value={formData.publicKey}
              onChange={(e) => setFormData({ ...formData, publicKey: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-100 font-mono text-xs"
              placeholder="GA..."
            />
          </div>

          {/* Default Currency */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                <span>Base Fiat Currency</span>
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-100 font-medium"
              >
                <option value="XAF">XAF (Central Africa CFA)</option>
                <option value="NGN">NGN (Nigerian Naira)</option>
                <option value="KES">KES (Kenyan Shilling)</option>
                <option value="GHS">GHS (Ghanaian Cedi)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="EUR">EUR (Euro)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Target Crypto Asset</label>
              <input
                type="text"
                disabled
                value={formData.assetCode}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-400 font-semibold cursor-not-allowed"
              />
            </div>
          </div>

          {/* USDC Issuer Key */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">USDC Stellar Issuer Key</label>
            <input
              type="text"
              value={formData.assetIssuer}
              onChange={(e) => setFormData({ ...formData, assetIssuer: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-100 font-mono text-xs"
            />
          </div>

          {/* WebSocket listener URL */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>WebSocket Notification Service URL</span>
            </label>
            <input
              type="text"
              value={formData.wsUrl}
              onChange={(e) => setFormData({ ...formData, wsUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-100 font-mono text-xs"
              placeholder="ws://localhost:3000/ws"
            />
          </div>

          {/* Save Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-5 h-5 text-slate-950" />
                  <span>Config Saved Successfully!</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
